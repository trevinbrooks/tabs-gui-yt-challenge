/// <reference types="youtube" />
/*! yt-player. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
import { EventEmitter } from "./utils/event-emitter";
import { YTOptions } from "./models/yt-options";
import { YTVideoData } from "./models/yt-data";
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
    private _id;
    private _opts;
    private _videoId;
    destroyed: boolean;
    private _api;
    private _autoplay;
    private _player;
    private _ready;
    private _queue;
    private _interval;
    private _start;
    constructor(element: string | HTMLElement, opts?: YTOptions);
    /**
     * Load a video by ID, if the YouTube Iframe API is not ready yet it will be deferred
     * The last video ID given to load will be loaded once the YouTube Iframe API is ready.
     * @param videoId The YouTube video ID
     * @param autoplay Whether to play the video immediately (default: false)
     * @param start Time in seconds to start the video at (default: 0)
     */
    load(videoId: string, autoplay?: boolean, start?: number): void;
    play(): void;
    pause(): void;
    stop(): void;
    seek(seconds: number): void;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setSize(width: number, height: number): void;
    setPlaybackRate(rate: number): void;
    setPlaybackQuality(suggestedQuality: YT.SuggestedVideoQuality): void;
    getPlaybackRate(): number;
    getAvailablePlaybackRates(): number[];
    getAvailableQualityLevels(): YT.SuggestedVideoQuality[];
    getDuration(): number;
    getProgress(): number;
    getState(): YT.PlayerState;
    getCurrentTime(): number;
    /**
     * @returns {HTMLIFrameElement | null} The YouTube iframe element, or `null` if not ready yet.
     */
    getIframe(): HTMLIFrameElement | null;
    /**
     * @returns {YTVideoData | null} The YouTube video data, or `null` if not ready yet.
     */
    getVideoData(): YTVideoData | null;
    /**
     * Removes the containing the player.
     */
    destroy(): void;
    private _destroy;
    /**
     * Queues a command to be executed once the player is ready.
     * @param command The command to execute.
     * @param args The arguments to pass to the command.
     */
    private _queueCommand;
    /**
     * Removes and executes commands from the queue until it is empty.
     */
    private _flushQueue;
    /**
     * Adds the YouTube iframe API script tag to the page if necessary, and
     * queues the callback to be executed once the script is loaded.
     * @param cb The callback to execute once the API is ready.
     */
    private _loadIframeAPI;
    /**
     * Creates the YouTube player object.
     * @param videoId The YouTube video ID to load.
     */
    private _createPlayer;
    /**
     * This event fires when the player has finished loading and is ready to begin
     * receiving API calls.
     */
    private _onReady;
    /**
     * Called when the player's state changes. We emit friendly events so the user
     * doesn't need to use YouTube's YT.PlayerState.* event constants.
     */
    private _onStateChange;
    /**
     * This event fires whenever the video playback quality changes. Possible
     * values are: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'.
     */
    private _onPlaybackQualityChange;
    /**
     * This event fires whenever the video playback rate changes.
     */
    private _onPlaybackRateChange;
    /**
     * This event fires if an error occurs in the player.
     */
    private _onError;
    /**
     * This event fires when the time indicated by the `getCurrentTime()` method
     * has been updated.
     */
    private _onTimeupdate;
    private _startInterval;
    private _stopInterval;
}
