const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pfb_help:cc.Prefab = null;

    @property(cc.Prefab)
    pfb_credits:cc.Prefab = null;

    private help:cc.Node = null;
    private credits:cc.Node = null;

    onStart(){
        cc.director.loadScene("game");
    }

    onCredits(){
        this.credits = cc.instantiate(this.pfb_credits);
        this.credits.position = cc.v2(0,0);
        this.credits.parent = this.node;
    }

    onHelp(){
        this.help = cc.instantiate(this.pfb_help);
        this.help.position = cc.v2(0,0);
        this.help.parent = this.node;
    }
}
