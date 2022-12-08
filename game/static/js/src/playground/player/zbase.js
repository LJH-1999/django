class Player extends AcGameObject {
    constructor (playground, x, y, radius, color, speed, is_me) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.move_length = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.1;

        this.cur_skill = null;


    }

    start() {
        if (this.is_me) {
            this.add_listening_events();
        }
    }

    add_listening_events() {//监听事件，鼠标点击，按键盘
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function(){ //取消右键的菜单
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) { //获取右键点击的坐标
            if (e.which === 3) {
                outer.move_to(e.clientX, e.clientY);

            } else if(e.which === 1) {//点的是鼠标左键的话
                if (outer.cur_skill === "fireball") {//如果当前技能是火球的话
                    outer.shoot_fireball(e.clientX, e.clientY);//朝tx,ty坐标发火球
                }
                outer.cur_skill = null;//左键点完发完火球之后，这个状态清空
            }

        });

        $(window).keydown(function(e) {//获取键盘信息
            if (e.which === 81) {//百度keycode,js键盘按钮81代表q键
                outer.cur_skill = "fireball";

                return false;//代表后续不处理了
            }

        });
    }
    shoot_fireball(tx, ty) {
        let x = this.x;
        let y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1.5;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length);
    }

    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);

    }

    move_to(tx, ty) {
        this.move_length = this.get_dist(this.x, this.y, tx, ty); //移动的模长
        let angle = Math.atan2(ty - this.y, tx - this.x); //求移动向量的角度
        this.vx = Math.cos(angle); //表示速度，其实是1*cos(angle)
        this.vy = Math.sin(angle);

    }

    update() {
        if (this.move_length < this.eps) {
            this.move_length = 0;
            this.vx = this.vy = 0;
        } else {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000); //不能移出界，moved表示的是每秒真实移动的距离
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
