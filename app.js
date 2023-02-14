const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
const color = document.getElementById("color");
// const colorOptions = document.getElementsByClassName("color-option");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
let isPainting = false;
const modeBtn = document.getElementById("mode-btn");
let isFilling = false;
const destroyBtn = document.getElementById("destroy-btn");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn =  document.getElementById("save");
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    //ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
  isPainting = true;
}

function cancelPainting(event) {
  isPainting = false;
  // ctx.fill();
  ctx.beginPath();
}

function onLineWidthChange(event) {
  // console.log(event);
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  console.log(event);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  console.log(event);
  console.dir(event.target.dataset.color);
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "to Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "to Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Draw";
}

function onFileChange(event) {
  console.dir(event.target);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url);
  //blob:http://127.0.0.1:5500/7c0ed131-a677-4f71-8aee-9fb122250541
  const image = new Image();
  // document.createElement("img");
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    console.log(event.offsetX, event.offsetY);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick(event){
  console.log(canvas.toDataURL());
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "drawing.png";
  console.log(a);
  a.click();
};

canvas.addEventListener("mousemove", onMove);
// canvas.onmousemove = function(){};
// canvas.onmousemove = onMove;
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
// document.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
console.log(colorOptions);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);
