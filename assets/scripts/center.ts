const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.SpriteFrame)
    sptBlue:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    sptGreen:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    sptYellow:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    sptRed:cc.SpriteFrame = null;

    @property(cc.Node)
    gameControl:cc.Node = null;

    private sprite:cc.Sprite = null;
    private anim:cc.Animation = null;

    color:string = "";

    start () {
        this.sprite = this.getComponent(cc.Sprite);
        this.anim = this.getComponent(cc.Animation);
        this.initGame();
        cc.director.getCollisionManager().enabled = true;
    }

    initGame(){
        this.sprite.spriteFrame = this.sptGreen;
        this.color = "green";
    }

    changeToBlue(){
        this.sprite.spriteFrame = this.sptBlue;
        this.anim.play("poping");
        this.color = "blue";
    }

    changeToGreen(){
        this.sprite.spriteFrame = this.sptGreen;
        this.anim.play("poping");
        this.color = "green";
    }

    changeToYellow(){
        this.sprite.spriteFrame = this.sptYellow;
        this.anim.play("poping");
        this.color = "yellow";
    }

    changeToRed(){
        this.sprite.spriteFrame = this.sptRed;
        this.anim.play("poping");
        this.color = "red";
    }

    onCollisionEnter(other, self){
        if(this.color === other.node.group){
            other.getComponent(cc.Animation).play("burst");
            this.gameControl.emit("scoreUp");
        }
    }

}
