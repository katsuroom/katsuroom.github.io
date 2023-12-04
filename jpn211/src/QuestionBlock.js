class QuestionBlock {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;

        this.enabled = true;
    }

    draw(ctx)
    {
        if(this.enabled)
            ctx.drawImage(img.question_block, 0, 0, 16, 16, this.x, this.y, this.width, this.height);
        else
            ctx.drawImage(img.question_block, 16*4, 0, 16, 16, this.x, this.y, this.width, this.height);
    }
}