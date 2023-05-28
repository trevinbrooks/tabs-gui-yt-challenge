import YouTubePlayer from "./yt";

const player = new YouTubePlayer("#player", {
    width: "100%",
    rel: 0,
    controls: 1,
    showinfo: 0,
    mute: 1,
    modestbranding: 1,
    enablejsapi: 1,
    autoplay: 1,
    loop: 1,
});

// maintain a dictionary of videoId -> last played time, so we can resume
// playback if the user navigates away from the tab and then back to it
const timeHistory = new Map<string, number>();

const onMutation = (mutation: MutationRecord) => {
    const navitem = mutation.target as Element;
    // if the active attribute was added and is true
    if (
        mutation.attributeName === "active" &&
        navitem.hasAttribute("active")
    ) {
        // get the videoId from the data-video-id attribute
        const videoId = navitem.getAttribute("data-video-id");
        // start the video at the last played time, or 0 if it hasn't been played
        const start = timeHistory.get(videoId) || 0;
        player.load(videoId, true, start);

        player.play(); // call play() manually so it plays on mobile
        player.mute(); // mute the player since we're playing in the background
    }
};

const activeTabObserver = new MutationObserver((mutations) =>
    mutations.forEach(onMutation)
);

/**
 * Play the video for the active tab.
 * @param tabnavitems The tabnavitems to watch for changes.
 */
export default function playVideoForActiveTabs(tabnavitems: NodeListOf<Element>) {
    tabnavitems.forEach((navitem) => {
        activeTabObserver.observe(navitem, { attributes: true });
    });
}

// Enable lightbox mode when the player is clicked
const playerOverlay = document.getElementById("player-overlay");
if (!playerOverlay) console.error("player-overlay not found");

playerOverlay?.addEventListener("click", () => {
    const playerIFrame = player.getIframe();
    const enable = !playerIFrame.classList.contains("lightbox");
    
    playerIFrame.classList.toggle("lightbox", enable);
    playerOverlay.classList.toggle("lightbox", enable);
    
    if (enable) {
        player.play();
        player.unMute();
        // Set highest quality available
        const quality = player.getAvailableQualityLevels()?.at(0) || "hd1080";
        player.setPlaybackQuality(quality);
    } else {
        player.mute();
    }
});

player.on("timeupdate", (currentTime) => {
    // Loop the video if it's at the end
    if (currentTime === player.getDuration()) {
        player.play();
    }
    // Save the current time for the video so we can resume it later
    const id = player.getVideoData()?.video_id;
    timeHistory.set(id, currentTime);
});

