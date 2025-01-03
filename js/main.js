"use strict"

var gElCanvas
var gCtx

var gBox = {
    pos: { x: 250, y: 250, width: 100, height: 100 }
}

var gBox2 = { x: 100, y: 100, width: 100, height: 100 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    drawCanvas()
    addListeners()
}

function drawCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

    const { x, y, height, width } = gBox.pos

    gCtx.fillStyle = 'orange'
    gCtx.fillRect(gBox2.x, gBox2.y, gBox2.width, gBox2.height)

    gCtx.fillStyle = 'green'
    gCtx.fillRect(x, y, width, height)

}

function addListeners() {
    document.addEventListener("keydown", onKeyPress);
}

function onKeyPress(ev) {
    var { x, y, width, height } = gBox.pos

    if (ev.key === "ArrowLeft") {
        var nextX = gBox.pos.x - 5
        if (isCollieds(nextX, y, width, height)) return
        gBox.pos.x = nextX
    } else if (ev.key === "ArrowRight") {
        var nextX = gBox.pos.x + 5
        if (isCollieds(nextX, y, width, height)) return
        gBox.pos.x = nextX
    } else if (ev.key === "ArrowUp") {
        var nextY = gBox.pos.y - 5
        if (isCollieds(x, nextY, width, height)) return
        gBox.pos.y = nextY
    } else if (ev.key === "ArrowDown") {
        var nextY = gBox.pos.y + 5
        if (isCollieds(x, nextY, width, height)) return
        gBox.pos.y = nextY
    }

    drawCanvas()
}

function isCollieds(x, y, width, height) {

    console.log(x + width > gBox2.x && x < gBox2.x + gBox2.width &&
        y + height > gBox2.y && y < gBox2.y + gBox2.height);

    return x + width > gBox2.x && x < gBox2.x + gBox2.width &&
        y + height > gBox2.y && y < gBox2.y + gBox2.height
}