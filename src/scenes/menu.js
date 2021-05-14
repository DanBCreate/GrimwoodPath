

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
        this.load.image('axe','assets/tempAssets/tempAxe.png');
        this.load.image('bat','assets/tempAssets/tempBat.png');
        this.load.image('bar','assets/tempAssets/tempCrowbar.png');
        this.load.image('jacket','assets/tempAssets/tempJacket.png');
        this.load.image('key','assets/tempAssets/tempKey.png');
        this.load.image('knife','assets/tempAssets/tempKnife.png');
        this.load.image('light','assets/tempAssets/tempLight.png');
        this.load.image('rope','assets/tempAssets/tempRope.png');
        this.load.image('shirt','assets/tempAssets/tempShirt.png');
        this.load.image('wood','assets/tempAssets/tempWood.png');
        this.load.image('caveEntrance','assets/tempAssets/tempCave.png');
        this.load.image('player', 'assets/tempAssets/tempPlayer.png'); // Player Asset
        this.load.image('ground', 'assets/tempAssets/tempGround.png'); // Ground Asset
        this.load.image('slidyBlock', 'assets/tempAssets/tempBlock.png') // Slidy Block Asset

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

        //unset colletable flags
        hasRope = false     //allows exit from ravine
        hasShirt = false    //allows marking of trees
        hasWood = false     //allows full movement speed when combined with hasJacket
        hasJacket = false   //allows full movement speed when combined with hasWood
        hasFlash = false    //allows entering cave when combined with hasBat
        hasBat = false      //allows entering cave when combined with hasFlash
        hasAxe = false      //allows entry to clearing with brother
        hasKey = false      //allows entry to cabin
        hasCrowbar = false  //used to set hasAxe
        hasKnife = false    //? - cosmetic?
        axeWallFlag = true  //is the wall obstructing access to the axe

    }
    update(){
        //debugging mode features
        debugUpdate(this);
        this.background.tilePositionX +=10
    }

}