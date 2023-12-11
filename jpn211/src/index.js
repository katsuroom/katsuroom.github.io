let ground = new Block(0, 34*16, canvas.width, 8*16);

let player;

let questionBlock = new QuestionBlock(16*31, 16*23);
let exclamationBlock = new ExclamationBlock(16*50, 16*24);

const gravity = 1;
const moveSpeed = 10;
const jumpHeight = 16;

let slide = 0;

let leftCheckpoint, rightCheckpoint;

let coins = 0;

let lastUpdate = Date.now();

window.addEventListener("keydown", (event) => {
    if(event.key == "q")
        slide = 5;
});

if(img.rabbit.complete)
    init();

img.rabbit.onload = function() { init(); }

function init()
{
    player = new Player(4*16, -8*16);

    leftCheckpoint = 16*4;
    rightCheckpoint = canvas.width - player.width - 16*4;

    ctx.font = "16pt Calibri";

    loop();
}

function update(dt)
{
    if(KEY.Left == KEY.Right)
        player.xVel = 0;
    else if(KEY.Left)
    {
        player.xVel = -moveSpeed;
        player.flipX = -1;
    }
    else if(KEY.Right)
    {
        player.xVel = moveSpeed;
        player.flipX = 1;
    }

    if(KEY.Up && !jumped)
    {
        jumped = true;
        player.yVel = jumpHeight;
        audio.jump.play();
    }

    player.yVel -= gravity * dt;

    if(KEY.Dash)
        player.xVel *= 2;

    player.y -= player.yVel * dt;
    player.x += player.xVel * dt;

    // x pos correction

    if(player.x < 0)
    {
        if(slide > 0)
        {
            slide--;
            player.x = rightCheckpoint;
        }
        else
        {
            player.x = 0;
        }
    }

    if(player.x + player.width > canvas.width)
    {
        if(slide < 10)
        {
            slide++;
            player.x = leftCheckpoint;
        }
        else
        {
            player.x = canvas.width - player.width;
        }
    }

    player.update(dt);

    // collision detection

    switch(slide)
    {
        case 0:
            {
                if(hasCollision(player, questionBlock))
                {
                    player.yVel = 0;
                    player.y = questionBlock.y + questionBlock.height;
                    if(questionBlock.enabled)
                    {
                        coins++;
                        questionBlock.enabled = false;
                        audio.coin.play();
                    }
                }
            }
            break;
        case 4:
            {
                if(hasCollision(player, exclamationBlock))
                {
                    player.yVel = 0;
                    player.y = exclamationBlock.y + exclamationBlock.height;
                    audio.popipo.play();
                }
            }
            break;
        default:
            break;
    }

    if(hasCollision(player, ground))
    {
        player.yVel = 0;
        player.y = ground.y - player.height;
        jumped = false;
    }
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    switch(slide)
    {
        case 0:
            ctx.drawImage(img.tutorial, 0, 0);
            questionBlock.draw(ctx);
            break;
        case 1:
            ctx.drawImage(img.slide0, 0, 0);
            break;
        case 2:
            ctx.drawImage(img.slide1, 0, 0);
            break;
        case 3:
            ctx.drawImage(img.slide2, 0, 0);
            break;
        case 4:
            ctx.drawImage(img.slide3, 0, 0);
            exclamationBlock.draw(ctx);
            break;
        case 5:
            ctx.drawImage(img.slide4, 0, 0);
            break;
        case 6:
            ctx.drawImage(img.slide4_5, 0, 0);
            break;
        case 7:
            ctx.drawImage(img.slide5, 0, 0);
            break;
        case 8:
            ctx.drawImage(img.slide6, 0, 0);
            break;
        case 9:
            ctx.drawImage(img.slide7, 0, 0);
            break;
        case 10:
            ctx.drawImage(img.slide8, 0, 0);
            break;
        default:
            break;
    }
    

    ground.draw(ctx);

    switch(slide)
    {
        case 0:
            break;
        case 1:
            break;
        case 2:
            ctx.fillText("キャラクター : character", 16*2, 16*37);
            break;
        case 3:
            break;
        case 4:
            ctx.fillText("別名（べつめい） : also known as", 16*2, 16*34.5);
            ctx.fillText("音声合成（おんせいごうせい） : voice synthesis", 16*2, 16*36.5);
            ctx.fillText("ソフト : software", 16*2, 16*38.5);
            break;
        case 5:
            ctx.fillText("ボイスバンク : voicebank", 16*2, 16*37);
            break;
        case 7:
            ctx.fillText("存在する（そんざいする）: exist", 16*2, 16*37);
            break;
        case 8:
            ctx.fillText("プロデューサー : producer", 16*2, 16*34.5);
            ctx.fillText("ダウンロード : download", 16*2, 16*36.5);
            ctx.fillText("チューニング : tuning", 16*2, 16*38.5);
            ctx.fillText("曲（きょく） : song", 16*24, 16*34.5);
            break;
        case 9:
            break;
        case 10:
            break;
        default:
            break;
    }

    player.draw(ctx);

    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.fillText(slide + 1, 20, 20);

    ctx.drawImage(img.coin, canvas.width - 16*4, 16, 16, 16);

    ctx.textBaseline = "center";
    ctx.fillText(" x " + coins, canvas.width - 16*3, 16-2);

    if(debug)
        drawDebug();
}

function loop()
{
    let now = Date.now();
    let dt = (now - lastUpdate) / (1000/60);

    lastUpdate = now;

    if(dt > 2)
        dt = 1;

    if(document.hasFocus())
        update(dt);
    
    draw();

    requestAnimationFrame(loop);
}