

class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene')
    }

    preload(){
        //loading screen
        this.LoadingBackground = this.add.rectangle(0,0,screenWidth,screenHeight,0x000000).setOrigin(0,0)
 
        this.loadingText = this.add.text(screenWidth/2,screenHeight/2,'Loading...',textConfig).setOrigin(0.5)

        //load all assets here:
        this.load.image('forest','assets/tempAssets/tempForest.png')
        this.load.image('car','assets/tempAssets/car.png')
        this.load.image('wipeTree','assets/tempAssets/tempTree.png');
        this.load.image('trail','assets/tempAssets/trail.png');
        this.load.image('dude','assets/tempAssets/tempFigure.png');

        //remove loading screen
        this.LoadingBackground.destroy()
        this.loadingText.destroy()

    }
    create(){

        //debugging mode features
        debugCreate(this);
        this.background = this.add.tileSprite(0,0,screenWidth,screenHeight,'forest').setOrigin(0)
        this.car = this.add.sprite(screenWidth/3,890,'car').setOrigin(0.5)
        this.tweens.add({
            targets:this.car,
            x: 2*screenWidth/3,
            duration: 10000,
            yoyo: true,
            ease:'Quad.InOut',
            loop: -1
        })
        this.add.text(screenWidth/2,screenHeight/2,'press 2 to start',textConfig).setOrigin(0.5)


    }
    update(){
        //debugging mode features
        debugUpdate(this);
        this.background.tilePositionX +=10
    }

}