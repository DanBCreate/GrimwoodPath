

class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene')
    }

    preload(){
        // Loading Screen
        this.back = this.add.sprite(2000,500,'ravineBG').setOrigin(0.5,0.5).setScale(1.1)
		var newLoad = this.add.graphics();
        var loadingText = this.add.text(screenCenterX,screenCenterY + 100,'Loading: ', textConfig);
        this.backDrop = new Phaser.Geom.Rectangle(0, 0, 5000, 5000);
		this.progressBarFill = new Phaser.Geom.Rectangle(screenCenterX, screenCenterY, screenWidth/2 - 10, 40);
		newLoad.fillStyle(0x9a6363, 1);
		newLoad.fillRectShape(this.progressBarFill);

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
        this.load.image('ravinebase','assets/ravine/insideRavineBase.png')
        this.load.image('ravineborder','assets/ravine/insideRavineBorder.png')
        this.load.image('ravinefog','assets/ravine/insideRavineFog.png')

        //opening cutscene assets 
        this.load.spritesheet('carAnim','assets/introCutscene/carSpriteSheet(reducedBounce).png',{frameWidth: 1100, frameHeight:460,startFrame:0,endFrame:1})
        this.load.image('parkingLot','assets/introCutscene/introBGF1.png')
        this.load.image('sunForest','assets/introCutscene/introBGF2.png')
        this.load.image('moonForest','assets/introCutscene/introBGF3.png')
        this.load.image('shortForest','assets/introCutscene/introBGF4_8.png')
        this.load.image('cliffForest','assets/introCutscene/introBGF9.png')
        this.load.image('cliff','assets/introCutscene/introBGF10.png')
        this.load.spritesheet('flee','assets/introCutscene/introSpriteAnimF9.png',{frameWidth: 767, frameHeight:1085,startFrame:0,endFrame:2})
        this.load.image('withBro','assets/introCutscene/introSpriteF1.png')
        this.load.image('withBroWalk','assets/introCutscene/introSpriteF2.png')
        this.load.image('broDistracted','assets/introCutscene/introSpriteF3.png')
        this.load.image('searchLeft','assets/introCutscene/introSpriteF4part1.png')
        this.load.image('closeBro','assets/introCutscene/introSpriteF4part2.png')
        this.load.image('searchRight','assets/introCutscene/introSpriteF5.png')
        this.load.image('monSil','assets/introCutscene/introSpriteF6.png')
        this.load.image('monStare','assets/introCutscene/introSpriteF7.png')
        this.load.image('monHead','assets/introCutscene/introSpriteF8.png')
        this.load.image('monWave','assets/introCutscene/introSpriteF8part2.png')
        this.load.image('fall','assets/introCutscene/introSpriteF10.png')

        //audio
        this.load.audio('giggle','assets/sounds/ChildGiggle.wav')
        this.load.audio('engine', 'assets/sounds/CarEngineLoop.wav')
        this.load.audio('driveCrickets', 'assets/sounds/NightDriveLoop.wav')
        this.load.audio('nightAmbience', 'assets/sounds/NightAmbienceLoop.wav')
        this.load.audio('stoneFootstep', 'assets/sounds/StoneFootstep.wav')
        this.load.audio('grassFootstep', 'assets/sounds/GrassFootstep.wav')
        this.load.audio('item', 'assets/sounds/ItemPickup.wav');
        this.load.audio('ravineBG', 'assets/sounds/RavineBG.wav');
        this.load.audio('jump', 'assets/sounds/Jump.wav');
        this.load.audio('crickets', 'assets/sounds/Crickets.wav');
        this.load.audio('bushRustle', 'assets/sounds/BushRustle.wav');
        this.load.audio('cutsceneRoar', 'assets/sounds/CutsceneRoar.wav');
        this.load.audio('cutsceneSpook', 'assets/sounds/CutsceneSpook.wav');
        this.load.audio('ow', 'assets/sounds/Ow.wav');

        //remove loading screen
        this.LoadingBackground.destroy()
        this.loadingText.destroy()

        // For Loading Screen
        this.load.on('progress', function(value) {
            newLoad.clear();
            newLoad.fillStyle(0xb48181, 0.95); // Controls color of loading screen progress bar
            newLoad.fillRectShape(new Phaser.Geom.Rectangle(screenCenterX - 310, screenCenterY - 40, value * 590, 60));
            loadingText.setText("Loading: " + Phaser.Math.RoundTo(value * 100, -1)+ "%");
            loadingText.setFontSize(80);
            loadingText.setOrigin(0.5, 0.5);
        });
    }
    create(){
        //debugging mode features
        debugCreate(this);

        //keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // Handles lowering volume when exiting scene.
        this.lower = false;

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
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('carAnim', {frames:[0,1]}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'fleeOne',
            frames: this.anims.generateFrameNumbers('flee', {frames:[0]}),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'fleeTwo',
            frames: this.anims.generateFrameNumbers('flee', {frames:[1]}),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'fleeThree',
            frames: this.anims.generateFrameNumbers('flee', {frames:[2]}),
            frameRate: 0,
            repeat: -1
        })

        //stuff displayed on the menu
        this.blackDrop = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blackDrop.displayHeight = screenHeight*2
        this.blackDrop.displayWidth = 17000

        this.backGround = this.add.sprite(0,screenHeight,'forBG').setOrigin(0.5,1)
        this.backTree3 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree3').setOrigin(0)
        this.backTree4 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree4').setOrigin(0)
        this.backFog = this.add.tileSprite(0,0,screenWidth,screenHeight,'forFog').setOrigin(0)
        this.backTree2 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree2').setOrigin(0)
        this.backTree1 = this.add.tileSprite(0,0,screenWidth,screenHeight,'forTree1').setOrigin(0)
        this.ground = this.add.sprite(0,screenHeight,'ground').setOrigin(0,1)
        this.ground.displayWidth = screenWidth
        this.ground.displayHeight = 150

        //this.background = this.add.tileSprite(0,0,screenWidth,screenHeight,'forest').setOrigin(0)
        this.car = this.add.sprite(screenWidth/3,830,'drive').setOrigin(0.5)
        this.car.anims.play('drive')
        this.car.displayWidth = screenWidth/4
        this.car.displayHeight = screenWidth/8

        this.engine = this.sound.add('engine');
        this.driveCrickets = this.sound.add('driveCrickets');
        this.sfxConfigEngine = {
            volume: 0.23,
            loop: true,
        }
        this.sfxConfigDrive = {
            volume: 1.8,
            loop: true,
        }
        this.engine.play(this.sfxConfigEngine) ;
        this.driveCrickets.play(this.sfxConfigDrive);

        this.cardrift = this.tweens.add({
            targets:this.car,
            x: 2*screenWidth/3,
            duration: 10000,
            yoyo: true,
            ease:'Quad.InOut',
            loop: -1
        })
        this.menuText = this.add.text(screenWidth/2,screenHeight/2,'press [interact] to start\n\ninteract:↓ walk:←→ jump:↑\n\ninteract:s walk:ad jump:w',textConfig).setOrigin(0.5)

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
        ffTree1Marked = false //are trees marked?
        ffTree2Marked = false //are trees marked?
        lfTree1Marked = false //are trees marked?
        lfTree2Marked = false //are trees marked?
        fallen = false

        //initalize playerTextConfig or something (this makes the first call of player.think() use the right font)
        this.add.text(-100,-100,'p',playerTextConfig)
    }
    update(){
        //debugging mode features
        debugUpdate(this);

        // Handles lowering volume when exiting scene.
        if(this.lower == true){
            this.lowerVolume();
        }

        //paralax
        this.backTree1.tilePositionX += 12
        this.backTree2.tilePositionX += 11
        this.backFog.tilePositionX += 10
        this.backTree3.tilePositionX +=9
        this.backTree4.tilePositionX +=8

        //transition between scenens
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            favKeys = '[s]'
            this.lower = true;
            this.cardrift.stop()
            this.menuText.destroy()
            this.engine.setRate(1.2);
            this.tweens.add({
                targets:this.car,
                x: screenWidth*2,
                duration: 10000,
                ease:'Quad.InOut'
            })
            RLWipe(this,1000,'wipeTree',2500)
            this.time.addEvent({
                delay: 3000,
                callback: () =>{
                    this.scene.start('openingScene')
                }
            })
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            favKeys = '[↓]'
            this.lower = true;
            this.cardrift.stop()
            this.menuText.destroy()
            this.engine.setRate(1.2);
            this.tweens.add({
                targets:this.car,
                x: screenWidth*2,
                duration: 10000,
                ease:'Quad.InOut'
            })
            RLWipe(this,1000,'wipeTree',2500)
            this.time.addEvent({
                delay: 3000,
                callback: () =>{
                    this.scene.start('openingScene')
                }
            })
        }
    }

    lowerVolume() {
        if(this.engine.volume >= 0){
            this.engine.setVolume(this.engine.volume - 0.0015);
        }
        if(this.driveCrickets.volume >= 0){
            this.driveCrickets.setVolume(this.driveCrickets.volume - 0.05);
        }
    }
}
