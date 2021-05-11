


class Opening extends Phaser.Scene {
    constructor(){
        super('openingScene')
    }

    preload(){
        this.load.image('wipeTree','assets/tempAssets/tempTree.png');
    }
    create(){

        //debugging mode features
        debugCreate(this);
        RLWipe(this,3000,'wipeTree')

        
    }
    update(){
        debugUpdate(this)

    }

}

