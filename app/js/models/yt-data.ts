export interface YTVideoData {
    video_id:                              string;
    author:                                string;
    title:                                 string;
    isPlayable:                            boolean;
    errorCode:                             number;
    video_quality:                         VideoQuality;
    video_quality_features:                any[];
    backgroundable:                        boolean;
    eventId:                               string;
    cpn:                                   string;
    isLive:                                boolean;
    isWindowedLive:                        boolean;
    isManifestless:                        boolean;
    allowLiveDvr:                          boolean;
    isListed:                              boolean;
    isMultiChannelAudio:                   boolean;
    hasProgressBarBoundaries:              boolean;
    isPremiere:                            boolean;
    itct:                                  string;
    progressBarStartPositionUtcTimeMillis: number | null;
    progressBarEndPositionUtcTimeMillis:   number | null;
    paidContentOverlayDurationMs:          number;
}

export type VideoQuality = YT.VideoQualityDefault | YT.VideoQualitySmall | YT.VideoQualityMedium | YT.VideoQualityLarge | YT.VideoQualityHD720 | YT.VideoQualityHD1080 | YT.VideoQualityHighRes