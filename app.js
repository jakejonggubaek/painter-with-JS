const canvas = document.getElementById("painter_canvas");
const color = document.getElementsByClassName("color_control");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0,0,500,500);

function savePaint() {
    const file = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = file;
    link.download = "MyPaint";
    link.click();
}

function changeMode(e) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function changeBrushSize(e) {
    ctx.lineWidth = e.target.value;
}

function changeColor(e) {
    const paintColor = e.target.style.backgroundColor
    ctx.strokeStyle = paintColor;
    ctx.fillStyle = paintColor;
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function clickCanvas() {
    if(filling) {
        ctx.fillRect(0,0,500,500);
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", clickCanvas);
}

Array.from(color).forEach(color => color.addEventListener("click", changeColor));

if(range) {
    range.addEventListener("input", changeBrushSize);
}

if(mode) {
    mode.addEventListener("click", changeMode);
}

if(save) {
    save.addEventListener("click", savePaint);
}