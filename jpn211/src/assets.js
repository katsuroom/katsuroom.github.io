function loadImage(src)
{
    let newImage = new Image();
    newImage.onload = function() {return;}
    newImage.src = src;
    return newImage;
}

const img = {
    rabbit:             loadImage("assets/img/rabbit.png"),
    rabbit_jump:        loadImage("assets/img/rabbit_jump.png"),

    question_block:     loadImage("assets/img/question_block.png"),
    exclamation_block:  loadImage("assets/img/exclamation_block.png"),
    coin:               loadImage("assets/img/coin.png"),

    tutorial:           loadImage("assets/img/tutorial.png"),
    slide0:             loadImage("assets/img/slide0.png"),
    slide1:             loadImage("assets/img/slide1.png"),
    slide2:             loadImage("assets/img/slide2.png"),
    slide3:             loadImage("assets/img/slide3.png"),
    slide4:             loadImage("assets/img/slide4.png"),
    slide5:             loadImage("assets/img/slide5.png"),
    slide6:             loadImage("assets/img/slide6.png"),
    slide7:             loadImage("assets/img/slide7.png"),
    slide8:             loadImage("assets/img/slide8.png")
};

const audio = {
    jump: new Audio("assets/audio/jump.wav"),
    coin: new Audio("assets/audio/coin.wav"),
    popipo: new Audio("assets/audio/popipo.wav")
};

audio.popipo.volume = 0.6;