export interface YTOptions extends YT.PlayerVars {
    /**
     * Player width.
     */
    width?: string | number | undefined;

    /**
     * Player height
     */
    height?: string | number | undefined;

    /**
     * ID of the video to load.
     */
    videoId?: string | undefined;

    /**
     * Points host to correct origin for CORS
     */
    host?: string | undefined;
}

export const DefaultOptions: YTOptions = {
    width: '100%',
    videoId: undefined,
    rel: 0,
    origin: location.origin,
    controls: 0,
    showinfo: 0,
    mute: 1,
    modestbranding: 1,
    enablejsapi: 1,
    autoplay: 1,
    loop: 1,
};

// helper function to return just the player vars
export function playerVars(options: YTOptions): YT.PlayerVars {
    const { width, height, videoId, host, ...vars } = options;
    return vars;
}

