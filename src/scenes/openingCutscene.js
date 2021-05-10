


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

        this.wipetree = new SlidySprite(this,screenWidth,screenHeight,'wipeTree').setOrigin(0.5,1);
        this.add.existing(this.wipetree);
        this.physics.add.existing(this.wipetree);




    }
    update(){
        debugUpdate(this)

    }

}