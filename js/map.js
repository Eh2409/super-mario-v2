"use strict"

var gElCanvas
var gCtx

var gTileHeight = 32
var gTileWidth = 32

var gTileset = {}
var gScore = 0

var gCanvasPosX = 0
var gMapEnd = 0

const marioRunImg = {
    right: {
        1: 'images/mario-moveRight.png',
        2: 'images/mario-moveRight 2.png',
        3: 'images/mario-moveRight 3.png',
    },
    left: {
        1: 'images/mario-moveLeft.png',
        2: 'images/mario-moveLeft 2.png',
        3: 'images/mario-moveLeft 3.png',
    }

}

var gMoveNum = 0

var gMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 11, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 11, 0, 0, 0, 10, 10, 10, 10, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]

var gMario = {
    imgUrl: 'images/mario-right.png',
    pos: { x: 64, y: 352, width: gTileWidth, height: gTileHeight },
    lastPos: { x: 64, y: 352, width: gTileWidth, height: gTileWidth },
    isJumping: false,
    isFalling: false,
    direction: 'right'
}


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gMapEnd = (gMap[0].length * gTileWidth) - gElCanvas.width

    gTileset = loadImage()

    resizeCanvas()

    for (var img in gTileset) {
        gTileset[img].onload = () => {
            drawCanvas()
            addListeners()
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    updateTileset()
}

function updateTileset() {
    gTileset = loadImage()

    for (var img in gTileset) {
        gTileset[img].onload = () => {
            drawCanvas()
        }
    }

}

function drawCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

    const { floor, block, box, emptyBox, coin, roadBlock, topTube1, topTube2, bottomTube1, bottomTube2, mario, goomba } = gTileset

    for (let i = 0; i < gMap.length; i++) {
        for (let j = 0; j < gMap[0].length; j++) {

            var tileX = gTileHeight * j - gCanvasPosX

            if (gMap[i][j] === 1) {
                gCtx.drawImage(floor, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

            if (gMap[i][j] === 2) {
                gCtx.drawImage(box, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

            if (gMap[i][j] === 3) {
                gCtx.drawImage(block, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

            if (gMap[i][j] === 4) {
                gCtx.drawImage(emptyBox, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

            if (gMap[i][j] === 5) {
                gCtx.drawImage(coin, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }


            if (gMap[i][j] === 10) {
                gCtx.drawImage(roadBlock, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }


            if (gMap[i][j] === 6) {
                gCtx.drawImage(topTube1, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }
            if (gMap[i][j] === 7) {
                gCtx.drawImage(topTube2, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }
            if (gMap[i][j] === 8) {
                gCtx.drawImage(bottomTube1, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }
            if (gMap[i][j] === 9) {
                gCtx.drawImage(bottomTube2, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

            if (gMap[i][j] === 11) {
                gCtx.drawImage(goomba, tileX, gTileHeight * i, gTileHeight, gTileHeight)
            }

        }
    }

    const { x, y, width, height } = gMario.pos

    gCtx.drawImage(mario, x - gCanvasPosX, y, width, height)
}

function addListeners() {
    document.addEventListener("keydown", onKeyPress)
    document.addEventListener("keyup", onKeyup)
}

function onKeyPress(ev) {
    var { x, y, width, height } = gMario.pos
    if (gMoveNum >= 3) gMoveNum = 0

    if (ev.key === "ArrowLeft") {
        var nextX = gMario.pos.x - 8
        if (isCollides(nextX, y, width, height)) return
        gMario.pos.x = nextX
        gMario.direction = 'left'
        gMoveNum++
        gMario.imgUrl = marioRunImg.left[gMoveNum]

        if (gMario.pos.x > gMapEnd + (gElCanvas.width / 2)) {
            updateTileset()
        } else if (gMario.pos.x > gElCanvas.width / 2) {
            gCanvasPosX = gMario.pos.x - gElCanvas.width / 2;
        }

        if (!gMario.isJumping && !gMario.isFalling) isNoFloor(nextX, y, width, height)
    } else if (ev.key === "ArrowRight") {
        var nextX = gMario.pos.x + 8
        if (isCollides(nextX, y, width, height)) return
        gMario.pos.x = nextX
        gMario.direction = 'right'
        gMoveNum++
        gMario.imgUrl = marioRunImg.right[gMoveNum]
        setTimeout(() => { }, 40)


        if (gCanvasPosX >= gMapEnd) {
            updateTileset()
        } else if (gMario.pos.x > gElCanvas.width / 2) {
            gCanvasPosX = gMario.pos.x - gElCanvas.width / 2;
        }

        if (!gMario.isJumping && !gMario.isFalling) isNoFloor(nextX, y, width, height)
    } else if (ev.key === "ArrowUp") {
        if (gMario.isJumping || gMario.isFalling) return
        gMario.lastPos.y = y
        gMario.isJumping = true
        jump()
    } else if (ev.key === "ArrowDown") {
        var nextY = gMario.pos.y + 4

        if (isCollides(x, nextY, width, height)) return
        gMario.pos.y = nextY
    }

    // drawCanvas()
    updateTileset()
}

function onKeyup(ev) {

    if (gMario.isFalling) {
        if (gMario.direction === 'right') gMario.imgUrl = 'images/mario-jump-right.png'
        else gMario.imgUrl = 'images/mario-jump-left.png'
    } else {
        if (gMario.direction === 'right') gMario.imgUrl = 'images/mario-right.png'
        else gMario.imgUrl = 'images/mario-left.png'

    }

    // drawCanvas()
    updateTileset()
}

function isCollides(x, y, width, height) {
    var tileX = Math.floor(x / gTileWidth)
    var tileY = Math.floor(y / gTileHeight)
    var tileEndX = Math.floor((x + width - 1) / gTileWidth)
    var tileEndY = Math.floor((y + height - 1) / gTileHeight)

    for (let i = tileY; i <= tileEndY; i++) {
        for (let j = tileX; j <= tileEndX; j++) {
            if (gMap[i] && gMap[i][j] !== 0) return true
        }
    }

    return false;
}

function isNoFloor(x, y, width, height) {
    if (gMario.isFalling) return

    var tileX = Math.floor(x / gTileWidth)
    var tileEndX = Math.floor((x + width - 1) / gTileWidth)
    var tileY = Math.floor((y + height) / gTileHeight)

    for (let j = tileX; j <= tileEndX; j++) {
        if (gMap[tileY] && gMap[tileY][j] === 0) {

            gMario.isFalling = true

            if (gMario.direction === 'right') gMario.imgUrl = 'images/mario-jump-right.png'
            else gMario.imgUrl = 'images/mario-jump-left.png'

            // drawCanvas()
            updateTileset()
            jump()
        }
    }

    return
}

function isCoinBox(x, y, width, height) {
    var tileX = Math.floor(x / gTileWidth)
    var tileEndX = Math.floor((x + width - 1) / gTileWidth)
    var tileY = Math.floor(y / gTileHeight)

    for (let j = tileX; j <= tileEndX; j++) {
        if (gMap[tileY] && gMap[tileY][j] === 2) {
            gScore += 100
            updateScore()
            gMap[tileY][j] = 4
            gMap[tileY - 1][j] = 5

            setTimeout(() => {
                gMap[tileY - 1][j] = 0
            }, 250)
        }
    }

    return
}

function isGoomba(x, y, width, height) {
    var tileX = Math.floor(x / gTileWidth)
    var tileEndX = Math.floor((x + width - 1) / gTileWidth)
    var tileY = Math.floor((y + height) / gTileHeight)

    for (let j = tileX; j <= tileEndX; j++) {
        if (gMap[tileY] && gMap[tileY][j] === 11) {
            gMap[tileY][j] = 0
            gScore += 100
            updateScore()
            updateTileset()
            jump()
        }
    }

    return
}

function jump() {
    var { x, y, width, height } = gMario.pos

    var nextY = gMario.isFalling ? gMario.pos.y + 4 : gMario.pos.y - 4

    if (gMario.isJumping && nextY > gMario.lastPos.y - 160) {


        if (gMario.direction === 'right') gMario.imgUrl = 'images/mario-jump-right.png'
        else gMario.imgUrl = 'images/mario-jump-left.png'

        if (isCollides(x, nextY, width, height)) {
            isCoinBox(x, nextY, width, height)
            console.log(gScore);

            gMario.isJumping = false
            gMario.isFalling = true
        }
        else gMario.pos.y = nextY

        // drawCanvas()
        updateTileset()
        setTimeout(() => jump(), 12)
    } else {
        gMario.isJumping = false
        gMario.isFalling = true
        if (isCollides(x, nextY, width, height)) {
            isGoomba(x, y, width, height)
            gMario.isFalling = false

            if (gMario.direction === 'right') gMario.imgUrl = 'images/mario-right.png'
            else gMario.imgUrl = 'images/mario-left.png'

            // drawCanvas()
            updateTileset()
            return
        } else gMario.pos.y = nextY

        // drawCanvas()
        updateTileset()
        setTimeout(() => jump(), 12)
    }
}

function loadImage() {
    const floor = new Image()
    floor.src = 'images/block.png'

    const block = new Image()
    block.src = 'images/high-block.png'

    const box = new Image()
    box.src = 'images/box.png'

    const emptyBox = new Image()
    emptyBox.src = 'images/empty-box.png'

    const coin = new Image()
    coin.src = 'images/coin.png'

    const roadBlock = new Image()
    roadBlock.src = 'images/roadBlock.png'

    const topTube1 = new Image()
    topTube1.src = 'images/top tube 1.png'

    const topTube2 = new Image()
    topTube2.src = 'images/top tube 2.png'

    const bottomTube1 = new Image()
    bottomTube1.src = 'images/bottom tube 1.png'

    const bottomTube2 = new Image()
    bottomTube2.src = 'images/bottom tube 2.png'

    const mario = new Image()
    mario.src = gMario.imgUrl

    const goomba = new Image()
    goomba.src = 'images/goomba.png'

    return { floor, block, box, emptyBox, coin, roadBlock, topTube1, topTube2, bottomTube1, bottomTube2, mario, goomba }
}

function updateScore() {
    const elScore = document.querySelector('.score-num')
    elScore.innerText = gScore
}


function playSong() {
    var sound = new Audio(`music/super.mp3`)
    sound.volume = 0.1
    sound.play()
}