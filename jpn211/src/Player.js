class Player {
    constructor(x, y)
    {
        this.scale = 3;       // 1.5

        this.x = x;
        this.y = y;
        this.width = 48;        // 32
        this.height = 32;       // 64

        this.xVel = 0;
        this.yVel = 0;

        this.flipX = 1;

        // moving animation
        this.animationInterval = 3;
        this.animationTime = 0;
        this.frame = 0;                 // 0, 1 total
        this.offsetY = 0;
    }

    update(dt)
    {
        if(this.xVel != 0)
        {
            this.animationTime += dt;
            if(this.animationTime >= this.animationInterval)
            {
                this.frame = 1 - this.frame;
                this.animationTime = 0;
            }
            this.offsetY = this.frame == 1 ? 3 : 0;
        }
    }

    draw(ctx)
    {
        ctx.save();

        ctx.scale(this.flipX, 1);

        let image = img.rabbit;

        if(jumped)
        {
            image = img.rabbit_jump;
            this.offsetY = 0;
        }

        ctx.drawImage(image, this.x * this.flipX - (this.flipX < 0 ? this.width : 0), this.y - 14 - this.offsetY, image.width * this.scale, image.height * this.scale);
        ctx.scale(this.flipX, 1);

        if(debug)
        {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

        ctx.restore();
    }
};