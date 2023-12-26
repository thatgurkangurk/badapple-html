import "./style.css";

const playBtn = document.getElementById("playBtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
const video = document.getElementById("badapple") as HTMLVideoElement;

onload = () => {
  console.log("onload");
  pauseBtn.style.display = "none";
};

playBtn.addEventListener("click", () => {
  video.play();
});

pauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    return;
  }
  video.pause();
});

video.addEventListener("pause", () => {
  pauseBtn.textContent = "resume";
});

video.addEventListener("play", () => {
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  pauseBtn.textContent = "pause";
});
