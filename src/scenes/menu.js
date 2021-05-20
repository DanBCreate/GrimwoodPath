

class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene')
    }

    preload(){
        //loading screen
        this.LoadingBackground = this.add.rectangle(0,0,screenWidth,screenHeight,0x000000).setOrigin(0,0)
 
        this.loadingText = this.add.text(screenWidth/2,screenHeight/2,'Loading...',textConfig).setOrigin(0.5)

        //temp assets
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
        this.load.image('clearing','assets/tempAssets/tempClearing.png');
        this.load.image('ground', 'assets/tempAssets/tempGround.png'); // Ground Asset
        this.load.image('slidyBlock', 'assets/tempAssets/tempBlock.png') // Slidy Block Asset
        this.load.image('clear','assets/other/transparent.png') // fully transparent 100x100 square for creating invisible obsitcles

        //player assets
        this.load.image('player', 'assets/player/playerIdle.png');
        this.load.spritesheet('playerIdle', 'assets/player/PlayerIdleSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0, endFrame:1}); // Player Asset
        this.load.spritesheet('walkLeft','assets/player/LeftRunSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0,endFrame:9});
        this.load.spritesheet('walkRight','assets/player/RightRunSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0,endFrame:9});
        
        //forest assets
        this.load.image('forBG','assets/forest/ForestSolidBG.png')
        this.load.image('forFog','assets/forest/ForestFog.png')
        this.load.image('for1Ground','assets/forest/Forest1Ground.png')
        this.load.image('forTree1','assets/forest/ForestTrees1.png')
        this.load.image('forTree2','assets/forest/ForestTrees2.png')
        this.load.image('forTree3','assets/forest/ForestTrees3.png')
        this.load.image('forTree4','assets/forest/ForestTrees4.png')
        this.load.image('singleTree','assets/forest/singleTree.png')
        this.load.spritesheet('markedTree','assets/forest/markedSingleTree.png',{frameWidth: 300, frameHeight:1080,startFrame:0,endFrame:7});

        //ravine assets
        this.load.image('ravineBG','assets/ravine/insideRavineBG.png')
        this.load.image('ravinebase','assets/ravine/insideRavineBase.png')
        this.load.image('ravineborder','assets/ravine/insideRavineBorder.png')
        this.load.image('ravinefog','assets/ravine/insideRavineFog.png')

        //audio
        this.load.audio('giggle','assets/sounds/ChildGiggle.wav')
        this.load.audio('engine', 'assets/sounds/CarEngineLoop.wav')
        this.load.audio('driveCrickets', 'assets/sounds/NightDriveLoop.wav')
        this.load.audio('nightAmbience', 'assets/sounds/NightAmbienceLoop.wav')
        this.load.audio('stoneFootstep', 'assets/sounds/StoneFootstep.wav')
        this.load.audio('grassFootstep', 'assets/sounds/GrassFootstep.wav')

        //remove loading screen
        this.LoadingBackground.destroy()
        this.loadingText.destroy()

    }
    create(){

        //debugging mode features
        debugCreate(this);

        this.blackDrop = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blackDrop.displayHeight = screenHeight*2
        this.blackDrop.displayWidth = 17000

        this.backGround = this.add.sprite(0,screenHeight,'forBG').setOrigin(0.5,1)
        this.backTree1 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree1').setOrigin(0)
        this.backTree2 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree2').setOrigin(0)
        this.backFog = this.add.tileSprite(0,0,screenWidth,screenHeight,'forFog').setOrigin(0)
        this.backTree3 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree3').setOrigin(0)
        this.backTree4 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree4').setOrigin(0)
        this.ground = this.add.sprite(0,screenHeight,'ground').setOrigin(0,1)
        this.ground.displayWidth = screenWidth
        this.ground.displayHeight = 150

        //this.background = this.add.tileSprite(0,0,screenWidth,screenHeight,'forest').setOrigin(0)
        this.car = this.add.sprite(screenWidth/3,830,'car').setOrigin(0.5)

        this.engine = this.sound.add('engine');
        this.driveCrickets = this.sound.add('driveCrickets');
        this.sfxConfigEngine = {
            volume: 0.17,
            loop: true,
        }
        this.sfxConfigDrive = {
            volume: 3.3,
            loop: true,
        }
        this.engine.play(this.sfxConfigEngine) ;
        this.driveCrickets.play(this.sfxConfigDrive);

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
        keyWallFlag = true  //is the keywall obstructing access to the crowbar
        fromRavine = true   //controls where the player spawns in fForest
        ffTree1Marked = false //are trees marked?
        ffTree2Marked = false //are trees marked?

        //create animations for later use
        this.anims.create({
            key: 'walkL',
            frames: this.anims.generateFrameNumbers('walkLeft', {frames:[0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'walkR',
            frames: this.anims.generateFrameNumbers('walkRight', {frames:[0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'mkTree',
            frames: this.anims.generateFrameNumbers('markedTree', {frames:[0,1,2,3,4,5,6,7]}),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'IdleRight',
            frames: this.anims.generateFrameNumbers('playerIdle', {frames:[1]}),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'IdleLeft',
            frames: this.anims.generateFrameNumbers('playerIdle', {frames:[0]}),
            frameRate: 0,
            repeat: -1
        })
    }
    update(){
        //debugging mode features
        debugUpdate(this);
        //this.background.tilePositionX +=10
        this.backTree1.tilePositionX += 10
        this.backTree2.tilePositionX += 9
        this.backFog.tilePositionX += 8
        this.backTree3.tilePositionX +=11
        this.backTree4.tilePositionX +=12
    }

}