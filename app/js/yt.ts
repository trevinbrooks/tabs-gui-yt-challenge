/*! yt-player. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* updated by @tcbrooks with added functionality and to support TypeScript */
import { EventEmitter, EventMap } from "./utils/event-emitter";
import { Callback} from "./models/callback";
import loadScript from "load-script2";
import { isFunction } from "./utils/type-checks";
import { DefaultOptions, YTOptions } from "./models/yt-options";
import { YTVideoData } from "./models/yt-data";
import { Queue } from "./utils/queue";

const YOUTUBE_IFRAME_API_SRC = "https://www.youtube.com/iframe_api";

// YouTube player commands which can be queued before the player is ready
type YTPlayerCommand = {
    [K in
        | "play"
        | "pause"
        | "stop"
        | "seek"
        | "setVolume"
        | "mute"
        | "unMute"
        | "setSize"
        | "setPlaybackRate"
        | "setPlaybackQuality"]: K extends keyof YouTubePlayer
        ? YouTubePlayer[K] extends (...args: any) => any
            ? Parameters<YouTubePlayer[K]>
            : never
        : never;
};

// tuple of a command name and arguments to pass to it
type YTPlayerQueueItem = [keyof YTPlayerCommand, YTPlayerCommand[keyof YTPlayerCommand]];

const YOUTUBE_STATES = {
    "-1": "unstarted",
    0: "ended",
    1: "playing",
    2: "paused",
    3: "buffering",
    5: "cued",
};

const YOUTUBE_ERROR = {
    // The request contains an invalid parameter value. For example, this error
    // occurs if you specify a videoId that does not have 11 characters, or if the
    // videoId contains invalid characters, such as exclamation points or asterisks.
    INVALID_PARAM: 2,

    // The requested content cannot be played in an HTML5 player or another error
    // related to the HTML5 player has occurred.
    HTML5_ERROR: 5,

    // The video requested was not found. This error occurs when a video has been
    // removed (for any reason) or has been marked as private.
    NOT_FOUND: 100,

    // The owner of the requested video does not allow it to be played in embedded
    // players.
    UNPLAYABLE_1: 101,

    // This error is the same as 101. It's just a 101 error in disguise!
    UNPLAYABLE_2: 150,
};

const loadIframeAPICallbacks = [];

declare global {
    interface Window {
        onYouTubeIframeAPIReady: (() => void) | undefined;
    }
}

export interface YoutubePlayerEvent {
    playing: null;
    unstarted: null;
    ended: null;
    paused: null;
    unplayable: string;
    error: Error;
    stateChange: YT.PlayerState;
    playbackRateChange: number;
    playbackQualityChange: string;
    timeupdate: number;
    ready: string;
    buffering: null;
}

/**
 * YouTube Player. Exposes a better API, with nicer events.
 * @param {HTMLElement|selector} element The element to create the player in, or a selector for the element.
 */
export default class YouTubePlayer extends EventEmitter<YoutubePlayerEvent> {
    private _id: string;
    private _opts: YTOptions;
    private _videoId: string | undefined;
    destroyed: boolean;
    private _api: typeof YT;
    private _autoplay: boolean;
    private _player: YT.Player | undefined;
    private _ready: boolean;
    private _queue = new Queue<YTPlayerQueueItem>;
    private _interval: NodeJS.Timer | null;
    private _start: number;


    constructor(element: string | HTMLElement, opts: YTOptions = {}) {
        super();

        const elem =
            typeof element === "string"
                ? document.querySelector(element)
                : element;

        if (elem.id) {
            this._id = elem.id; // use existing element id
        } else {
            this._id = elem.id =
                "ytplayer-" + Math.random().toString(16).slice(2, 8);
        }

        this._opts = Object.assign(DefaultOptions, opts);

        this._videoId = null;
        this.destroyed = false;

        this._api = null;
        this._autoplay = false; // autoplay the first video?
        this._player = null;
        this._ready = false; // is player ready?

        this._interval = null;

        // Setup listeners for 'timeupdate' events. The YouTube Player does not fire
        // 'timeupdate' events, so they are simulated using a setInterval().
        this._startInterval = this._startInterval.bind(this);
        this._stopInterval = this._stopInterval.bind(this);

        this.on("playing", this._startInterval);
        this.on("unstarted", this._stopInterval);
        this.on("ended", this._stopInterval);
        this.on("paused", this._stopInterval);
        this.on("buffering", this._stopInterval);

        this._loadIframeAPI((err, api) => {
            if (err)
                return this._destroy(
                    new Error("YouTube Iframe API failed to load")
                );
            this._api = api;

            // If load(videoId, [autoplay, [size]]) was called before Iframe API
            // loaded, ensure it gets called again now
            if (this._videoId)
                this.load(this._videoId, this._autoplay, this._start);
        });
    }

    /**
     * Load a video by ID, if the YouTube Iframe API is not ready yet it will be deferred
     * The last video ID given to load will be loaded once the YouTube Iframe API is ready.
     * @param videoId The YouTube video ID
     * @param autoplay Whether to play the video immediately (default: false)
     * @param start Time in seconds to start the video at (default: 0)
     */
    load(videoId: string, autoplay = false, start = 0) {
        if (this.destroyed) return;

        this._videoId = videoId;
        this._autoplay = autoplay;
        this._start = start;

        // If the Iframe API is not ready yet, do nothing. Once the Iframe API is
        // ready, `load(this.videoId)` will be called.
        if (!this._api) return;

        // If there is no player instance, create one.
        if (!this._player) {
            this._createPlayer(videoId);
            return;
        }

        // If the player instance is not ready yet, do nothing. Once the player
        // instance is ready, `load(this.videoId)` will be called. This ensures that
        // the last call to `load()` is the one that takes effect.
        if (!this._ready) return;

        // If the player is already playing the requested video, do nothing.
        if (this.getVideoData()?.video_id === videoId) return;

        // If the player instance is ready, load the given `videoId`.
        if (autoplay) {
            this._player.loadVideoById(videoId, start);
        } else {
            this._player.cueVideoById(videoId, start);
        }
    }

    play() {
        if (this._ready) this._player.playVideo();
        else this._queueCommand("play");
    }

    pause() {
        if (this._ready) this._player.pauseVideo();
        else this._queueCommand("pause");
    }

    stop() {
        if (this._ready) this._player.stopVideo();
        else this._queueCommand("stop");
    }

    seek(seconds: number) {
        if (this._ready) this._player.seekTo(seconds, true);
        else this._queueCommand("seek", seconds);
    }

    setVolume(volume: number) {
        if (this._ready) this._player.setVolume(volume);
        else this._queueCommand("setVolume", volume);
    }

    getVolume() {
        return (this._ready && this._player.getVolume()) || 0;
    }

    mute() {
        if (this._ready) this._player.mute();
        else this._queueCommand("mute");
    }

    unMute() {
        if (this._ready) this._player.unMute();
        else this._queueCommand("unMute");
    }

    isMuted() {
        return (this._ready && this._player.isMuted()) || false;
    }

    setSize(width: number, height: number) {
        if (this._ready) this._player.setSize(width, height);
        else this._queueCommand("setSize", width, height);
    }

    setPlaybackRate(rate: number) {
        if (this._ready) this._player.setPlaybackRate(rate);
        else this._queueCommand("setPlaybackRate", rate);
    }

    setPlaybackQuality(suggestedQuality: YT.SuggestedVideoQuality) {
        if (this._ready) this._player.setPlaybackQuality(suggestedQuality);
        else this._queueCommand("setPlaybackQuality", suggestedQuality);
    }

    getPlaybackRate() {
        return (this._ready && this._player.getPlaybackRate()) || 1;
    }

    getAvailablePlaybackRates() {
        return (this._ready && this._player.getAvailablePlaybackRates()) || [1];
    }

    getAvailableQualityLevels() {
        return (this._ready && this._player.getAvailableQualityLevels()) || [];
    }

    getDuration() {
        return (this._ready && this._player.getDuration()) || 0;
    }

    getProgress() {
        return (this._ready && this._player.getVideoLoadedFraction()) || 0;
    }

    getState(): YT.PlayerState {
        return (
            (this._ready && this._player.getPlayerState()) ||
            YT.PlayerState.UNSTARTED
        );
    }

    getCurrentTime(): number {
        return (this._ready && this._player.getCurrentTime()) || 0;
    }

    /**
     * @returns {HTMLIFrameElement | null} The YouTube iframe element, or `null` if not ready yet.
     */
    getIframe(): HTMLIFrameElement | null {
        return (this._ready && this._player.getIframe()) || null;
    }

    /**
     * @returns {YTVideoData | null} The YouTube video data, or `null` if not ready yet.
     */
    getVideoData(): YTVideoData | null {
        // undocumented function that returns video data
        // @ts-ignore
        return (this._ready && this._player.getVideoData()) || null;
    }

    /**
     * Removes the containing the player.
     */
    destroy() {
        this._destroy();
    }

    private _destroy(err: Error | null = null) {
        if (this.destroyed) return;
        this.destroyed = true;

        if (this._player) {
            this._player.stopVideo && this._player.stopVideo();
            this._player.destroy();
        }

        this._videoId = null;

        this._id = null;
        this._opts = null;
        this._api = null;
        this._player = null;
        this._ready = false;
        this._queue = null;

        this._stopInterval();

        this.off("playing", this._startInterval);
        this.off("paused", this._stopInterval);
        this.off("buffering", this._stopInterval);
        this.off("unstarted", this._stopInterval);
        this.off("ended", this._stopInterval);

        if (err) this.emit("error", err);
    }

    /**
     * Queues a command to be executed once the player is ready.
     * @param command The command to execute.
     * @param args The arguments to pass to the command.
     */
    private _queueCommand<K extends keyof YTPlayerCommand>(
        command: K,
        ...args: YTPlayerCommand[K]
    ) {
        if (this.destroyed) return;
        this._queue.enqueue([command, args]);
    }

    /**
     * Removes and executes commands from the queue until it is empty.
     */
    private _flushQueue() {
        while (!this._queue.empty) {
            const command = this._queue.dequeue();
            this[command[0]].apply(this, command[1]);
        }
    }

    /**
     * Adds the YouTube iframe API script tag to the page if necessary, and
     * queues the callback to be executed once the script is loaded.
     * @param cb The callback to execute once the API is ready.
     */
    private _loadIframeAPI(cb: Callback<typeof YT>) {
        // If API is loaded, there is nothing else to do
        if (window.YT && typeof window.YT.Player === "function") {
            return cb(null, window.YT);
        }

        // Otherwise, queue callback until API is loaded
        loadIframeAPICallbacks.push(cb);

        const scripts = Array.from(document.getElementsByTagName("script"));
        const isLoading = scripts.some(
            (script) => script.src === YOUTUBE_IFRAME_API_SRC
        );

        // If API <script> tag is not present in the page, inject it. Ensures that
        // if user includes a hardcoded <script> tag in HTML for performance, another
        // one will not be added
        if (!isLoading) {
            loadScript(YOUTUBE_IFRAME_API_SRC).catch((err: any) => {
                while (loadIframeAPICallbacks.length) {
                    const loadCb = loadIframeAPICallbacks.shift();
                    loadCb(err);
                }
            });
        }

        const prevOnYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (isFunction(prevOnYouTubeIframeAPIReady)) {
                prevOnYouTubeIframeAPIReady();
            }
            while (loadIframeAPICallbacks.length) {
                const loadCb = loadIframeAPICallbacks.shift();
                loadCb(null, window.YT);
            }
        };
    }

    /**
     * Creates the YouTube player object.
     * @param videoId The YouTube video ID to load.
     */
    private _createPlayer(videoId: string) {
        if (this.destroyed) return;
        const { width, height, host, ...playerVars } = this._opts;

        this._player = new this._api.Player(this._id, {
            width: width,
            height: height,
            videoId: videoId,
            host: host,
            playerVars: playerVars,
            events: {
                onReady: () => this._onReady(videoId),
                onStateChange: (data) => this._onStateChange(data),
                onPlaybackQualityChange: (data) =>
                    this._onPlaybackQualityChange(data),
                onPlaybackRateChange: (data) =>
                    this._onPlaybackRateChange(data),
                onError: (data) => this._onError(data),
            },
        });

        // TODO: Remove after debugging
        window["__YT_PLAYER"] = this._player;
    }

    /**
     * This event fires when the player has finished loading and is ready to begin
     * receiving API calls.
     */
    private _onReady(videoId: string) {
        if (this.destroyed) return;

        this._ready = true;

        // Once the player is ready, always call `load(videoId, [autoplay, [size]])`
        // to handle these possible cases:
        //
        //   1. `load(videoId, true)` was called before the player was ready. Ensure that
        //      the selected video starts to play.
        //
        //   2. `load(videoId, false)` was called before the player was ready. Now the
        //      player is ready and there's nothing to do.
        //
        //   3. `load(videoId, [autoplay])` was called multiple times before the player
        //      was ready. Therefore, the player was initialized with the wrong videoId,
        //      so load the latest videoId and potentially autoplay it.
        this.load(this._videoId, this._autoplay, this._start);

        this._flushQueue();
        this.emit("ready", this._videoId);
    }

    /**
     * Called when the player's state changes. We emit friendly events so the user
     * doesn't need to use YouTube's YT.PlayerState.* event constants.
     */
    private _onStateChange(data: YT.OnStateChangeEvent) {
        if (this.destroyed) return;

        const state = YOUTUBE_STATES[data.data];

        if (state ) {
            // Send a 'timeupdate' anytime the state changes. When the video halts for any
            // reason ('paused', 'buffering', or 'ended') no further 'timeupdate' events
            // should fire until the video unhalts.
            if (["paused", "buffering", "ended"].includes(state))
                this._onTimeupdate();

            this.emit(state as keyof YoutubePlayerEvent, null);

            // When the video changes ('unstarted' or 'cued') or starts ('playing') then a
            // 'timeupdate' should follow afterwards (never before!) to reset the time.
            if (["unstarted", "playing", "cued"].includes(state))
                this._onTimeupdate();
        } else {
            throw new Error("Unrecognized state change: " + data);
        }
    }

    /**
     * This event fires whenever the video playback quality changes. Possible
     * values are: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'.
     */
    private _onPlaybackQualityChange(data: YT.OnPlaybackQualityChangeEvent) {
        if (this.destroyed) return;
        this.emit("playbackQualityChange", data.data);
    }

    /**
     * This event fires whenever the video playback rate changes.
     */
    private _onPlaybackRateChange(data: YT.OnPlaybackRateChangeEvent) {
        if (this.destroyed) return;
        this.emit("playbackRateChange", data.data);
    }

    /**
     * This event fires if an error occurs in the player.
     */
    private _onError(data: YT.OnErrorEvent) {
        if (this.destroyed) return;

        const code = Number(data.data);

        // The HTML5_ERROR error occurs when the YouTube player needs to switch from
        // HTML5 to Flash to show an ad. Ignore it.
        if (code === YOUTUBE_ERROR.HTML5_ERROR) return;

        // The remaining error types occur when the YouTube player cannot play the
        // given video. This is not a fatal error. Report it as unplayable so the user
        // has an opportunity to play another video.
        if (
            code === YOUTUBE_ERROR.UNPLAYABLE_1 ||
            code === YOUTUBE_ERROR.UNPLAYABLE_2 ||
            code === YOUTUBE_ERROR.NOT_FOUND ||
            code === YOUTUBE_ERROR.INVALID_PARAM
        ) {
            return this.emit("unplayable", this._videoId);
        }

        // Unexpected error, does not match any known type
        this._destroy(
            new Error("YouTube Player Error. Unknown error code: " + code)
        );
    }

    /**
     * This event fires when the time indicated by the `getCurrentTime()` method
     * has been updated.
     */
    private _onTimeupdate() {
        this.emit("timeupdate", this.getCurrentTime());
    }

    private _startInterval() {
        this._interval = setInterval(() => this._onTimeupdate(), 1000);
    }

    private _stopInterval() {
        clearInterval(this._interval);
        this._interval = null;
    }
}
