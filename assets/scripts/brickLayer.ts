const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Prefab])
    bricksHor:cc.Prefab[] = [];

    @property([cc.Prefab])
    bricksVer:cc.Prefab[] = [];

    @property
    respawnTime:number = 1;

    @property
    horInterval:number = 10;

    @property
    verInterval:number = 10;

    // vertical
    @property(cc.Node)
    respawnPoint0:cc.Node = null;

    // horizontal
    @property(cc.Node)
    respawnPoint1:cc.Node = null;

    @property(cc.Node)
    respawnPoint2:cc.Node = null;


    private bricks0:cc.Node[] = [];
    private bricks1:cc.Node[] = [];
    private bricks2:cc.Node[] = [];
    private totalTime:number = 0;

    gameStart:boolean = false;

    getRandomBrickIndex(){
        let index = Math.floor(Math.random() * this.bricksHor.length);
        return index;
    }

    genRandomBrick(){
        let index = this.getRandomBrickIndex();
        let spawnPoint = Math.floor(Math.random() * 3);
        let brick:cc.Node;
        switch(spawnPoint){
            case 0: 
                brick = cc.instantiate(this.bricksVer[index]);
                brick.parent = this.node;
                this.bricks0.push(brick);
                brick.position = this.respawnPoint0.position;
                break;
            case 1:
                brick = cc.instantiate(this.bricksHor[index]);
                brick.parent = this.node;
                this.bricks1.push(brick);
                brick.position = this.respawnPoint1.position;
                break;
            case 2:
                brick = cc.instantiate(this.bricksHor[index]);
                brick.parent = this.node;
                this.bricks2.push(brick);
                brick.position = this.respawnPoint2.position;
                break;
            default:
                break;
        }

    }



    start(){
        this.initGame();
    }


    initGame(){
        this.totalTime = 0;
        this.gameStart = true;
        if(this.bricks0){
            delete this.bricks0;
            this.bricks0 = [];
        }

        if(this.bricks1){
            delete this.bricks1;
            this.bricks1 = [];
        }

        if(this.bricks2){
            delete this.bricks2;
            this.bricks2 = [];
        }
    }

    updateBrickPos(dt){
        for (let brick of this.bricks0){
            brick.position = cc.v2(brick.position.x, brick.position.y - this.verInterval*dt*30);
        }

        for (let brick of this.bricks1){
            brick.position = cc.v2(brick.position.x + this.horInterval, brick.position.y*dt*10);
        }

        for (let brick of this.bricks2){
            brick.position = cc.v2(brick.position.x - this.horInterval, brick.position.y*dt*10);
        }
    }

    update(dt){
        if(this.gameStart){
            this.updateBrickPos(dt);

            this.totalTime += dt*10;
            if(this.totalTime > this.respawnTime){
                this.totalTime = 0;
                this.genRandomBrick();
            }


        }
    }



}
