const mainVideo = document.getElementById("mainVideo");
const muteBtn = document.getElementById("muteBtn");
const videoItems = document.querySelectorAll(".video-item");

let isMuted = true;

// CLICK ON CATALOG ITEM
videoItems.forEach(item => {
    item.addEventListener("click", () => {

        // Remove active from all
        videoItems.forEach(btn => btn.classList.remove("active"));

        // Activate clicked
        item.classList.add("active");

        // Change video source
        const newSrc = item.getAttribute("data-video");
        mainVideo.src = newSrc;

        // Play selected video
        mainVideo.play();
    });
});

// MUTE / UNMUTE
muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    mainVideo.muted = isMuted;
    muteBtn.textContent = isMuted ? "🔇" : "🔊";
});

// AUTOPLAY WHEN SCROLLED INTO VIEW (MUTED)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            mainVideo.play().catch(() => {});
        }
    });
}, { threshold: 0.6 });

observer.observe(mainVideo);
