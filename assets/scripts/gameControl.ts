const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    brickLayer:cc.Node = null;

    @property(cc.Node)
    ui:cc.Node = null;

    @property(cc.Node)
    center:cc.Node = null;
 
    scoreLabel:cc.Label = null;

    totalTime:number = 0.0;

    score:number = 0.0;

    levels:number[] = [1,2,3];

    public currentLevel = 0;

    scoreIncrement = 80;

    start(){
        this.scoreLabel = this.ui.getChildByName("score").getComponentInChildren(cc.Label);
        this.initGame();
        this.node.on("scoreUp", this.scoreUp, this);
    }

    scoreUp(){
        if(this.score > 600000)
            this.currentLevel = 2;
        else if(this.score > 300000)
            this.currentLevel = 1;
        else 
            this.currentLevel = 0;

        this.score += this.levels[this.currentLevel] * this.scoreIncrement;
    }

    initGame(){
        this.score = 0.0;
        this.scoreLabel.string = "00000000";
    }

    update(dt){
        let str = this.score.toFixed(0).toString();
        for (let i = 0; i < 8 - this.score.toFixed(0).length; i++){
            str = "0".concat(str);
        }
        this.scoreLabel.string = str;
    }

}
