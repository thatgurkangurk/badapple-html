import "./style.css";

const playBtn = document.getElementById("playBtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
const video = document.getElementById("badapple") as HTMLVideoElement;
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d")!;
const inputs = document.getElementById("inputs") as HTMLDivElement;
const downscaleFactorElem = document.getElementById(
  "downscalefactor"
) as HTMLInputElement;

canvas.width = video.width;
canvas.height = video.height;

let downscaleFactor = 3;

function createTable(height: number, width: number) {
  const table = document.createElement("table");
  const body = document.createElement("tbody");

  for (let y = 0; y < height; y++) {
    let row = table.insertRow(y);
    for (let x = 0; x < width; x++) {
      row.insertCell(x);
    }
  }

  table.appendChild(body);
  document.body.appendChild(table);
  return table;
}

let table: HTMLTableElement;

function fillTableCell(
  table: HTMLTableElement,
  x: number,
  y: number,
  color: string
) {
  table.rows[y].cells[x].style.backgroundColor = color;
}

function getRGBColorFromPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  const { data } = ctx.getImageData(x, y, 1, 1);
  return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
}

onload = () => {
  pauseBtn.style.display = "none";
};

playBtn.addEventListener("click", () => {
  table = createTable(
    canvas.height / downscaleFactor,
    canvas.width / downscaleFactor
  );
  inputs.style.display = "none";
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

  let frame = video;

  function draw() {
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    for (let y = 0; y < video.height; y += downscaleFactor) {
      for (let x = 0; x < video.width; x += downscaleFactor) {
        // the table size is already downscaled by the `downscaleFactor`
        fillTableCell(
          table,
          x / downscaleFactor,
          y / downscaleFactor,
          getRGBColorFromPixel(context, x, y)
        );
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
});

downscaleFactorElem.addEventListener("change", () => {
  downscaleFactor = downscaleFactorElem.valueAsNumber;
});
