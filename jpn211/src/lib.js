const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 640;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let debug = false;

let jumped = false;

const KEY = {
    Up: false,
    Left: false,
    Right: false,
    Dash: false
};

const KEYBIND = {
    "w":            "Up",
    "arrowup":      "Up",
    "a":            "Left",
    "arrowleft":    "Left",
    "d":            "Right",
    "arrowright":   "Right",
    "shift":        "Dash"
};

window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    for (const [key, value] of Object.entries(KEYBIND)) {
        if(event.key.toLowerCase() == key)
        {
            KEY[value] = true;
            break;
        }
    }

    if(event.key == "v")
        debug = !debug;
});

window.addEventListener("keyup", (event) => {
    if (event.repeat) return;
    for (const [key, value] of Object.entries(KEYBIND)) {
        if(event.key.toLowerCase() == key)
        {
            KEY[value] = false;
            break;
        }
    }
});


function hasCollision(a, b)
{
    if(a.x + a.width < b.x) return false;
    if(a.y + a.height < b.y) return false;
    if(a.x > b.x + b.width) return false;
    if(a.y > b.y + b.height) return false;
    return true;
}


function drawDebug()
{
    ctx.save();

    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;

    for(let i = 0; i < canvas.width; i += 16)
    {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    for(let i = 0; i < canvas.height; i += 16)
    {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    ctx.restore();
}