/// <reference types="youtube" />
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
export declare const DefaultOptions: YTOptions;
export declare function playerVars(options: YTOptions): YT.PlayerVars;
