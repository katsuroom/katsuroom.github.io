class ExclamationBlock {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
    }

    draw(ctx)
    {
        ctx.drawImage(img.exclamation_block, 0, 0, 16, 16, this.x, this.y, this.width, this.height);
    }
}