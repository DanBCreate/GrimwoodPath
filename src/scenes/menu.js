class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene')
    }

    preload(){
        // Loading Screen
        this.cameras.main.fadeIn(450);
        this.loadingMusic = this.sound.add('loadingMusic');
        this.sfxConfigLoading = {
            volume: 1,
            loop: true,
        }
        this.loadingMusic.play(this.sfxConfigLoading);
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

        //assets
        this.load.image('forest','assets/tempAssets/tempForest.png')
        this.load.image('car','assets/tempAssets/car.png')
        this.load.image('wipeTree','assets/items/tree.png');
        this.load.image('trail','assets/tempAssets/trail.png');
        this.load.image('dude','assets/tempAssets/tempFigure.png');
        this.load.image('axe','assets/items/axe.png');
        this.load.image('bat','assets/items/batteries.png');
        this.load.image('bar','assets/items/crowbar.png');
        this.load.image('jacket','assets/items/revampedJacket.png');
        this.load.image('key','assets/items/key.png');
        this.load.image('knife','assets/items/pocketKnife.png');
        this.load.image('light','assets/items/flashlight.png');
        this.load.image('rope','assets/items/noose.png');
        this.load.image('shirt','assets/items/tShirt.png');
        this.load.image('wood','assets/items/logs.png');
        this.load.image('caveEntrance','assets/tempAssets/tempCave.png');
        this.load.image('clearing','assets/items/Dense_woods.png');
        this.load.image('ground', 'assets/tempAssets/tempGround.png'); // Ground Asset
        this.load.image('caveLock', 'assets/items/caveLock.png');
        this.load.image('slidyBlock', 'assets/rock/interact rock.png') // Slidy Block Asset
        this.load.image('longBlock' , 'assets/rock/long rock.png');
        this.load.image('shortBlock', 'assets/rock/new rock.png');
        this.load.image('clear','assets/other/transparent.png') // fully transparent 100x100 square for creating invisible obsitcles
        this.load.image('noteItem', 'assets/tempAssets/tempNote.png');
        this.load.image('noteGround', 'assets/tempAssets/tempNoteGround.png');
        this.load.image('page','assets/other/tatteredPaper.png');

        //player assets
        this.load.image('player', 'assets/player/playerIdle.png');
        this.load.spritesheet('playerIdle', 'assets/player/PlayerIdleSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0, endFrame:1}); // Player Asset
        this.load.spritesheet('walkLeft','assets/player/LeftRunSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0,endFrame:9});
        this.load.spritesheet('walkRight','assets/player/RightRunSheet.png',{frameWidth: 767,frameHeight:1085,startFrame:0,endFrame:9});

        //monster assets
        this.load.spritesheet('monsterWalker','assets/monster/monsterWalkSprite.png',{frameWidth: 650, frameHeight:950,startFrame:0,endframe:7})

        //forest assets
        this.load.image('forBG','assets/forest/ForestSolidBG.png')
        this.load.image('forFog','assets/forest/ForestFog.png')
        this.load.image('for1Ground','assets/forest/Forest1Ground.png')
        this.load.image('for2Ground','assets/forest/Forest2ground.png')
        this.load.image('cabin','assets/forest/transparentWindowCabin.png')
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

        //cave assets
        this.load.image('caveBG','assets/cave/caveFilling.png')
        this.load.image('caveEnt','assets/cave/caveEntrences.png')
        this.load.image('caveWall','assets/cave/caveBorder.png')

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

        //end scene assets
        this.load.image('fullForest','assets/goodCutscene/goodBG1_4plus9.png')
        this.load.image('run','assets/goodCutscene/goodSprite1.png')
        this.load.image('playerStare','assets/goodCutscene/goodSprite2.png')
        this.load.image('atPlay','assets/goodCutscene/goodSprite3.png')
        this.load.image('playerStand','assets/goodCutscene/goodSprite4.png')
        this.load.image('reachHand','assets/goodCutscene/goodSpriteHand6.png')
        this.load.image('traumaStand','assets/goodCutscene/goodSprite6.png')
        this.load.image('turn','assets/goodCutscene/goodSprite7.png')
        this.load.image('isKind','assets/goodCutscene/goodSprite8.png')
        this.load.image('reunion','assets/goodCutscene/goodSprite9.png')
        this.load.image('monsterGoodbye','assets/goodCutscene/goodSprite9Monster.png')
        this.load.image('noteMonster','assets/goodCutscene/goodSpriteMonster7_8.png')
        //assets for okay end
        this.load.image('darkClouds','assets/okayCutscene/okaySprite2_3.png')
        this.load.image('eyeClouds','assets/okayCutscene/okaySprite4.png')
        this.load.image('altPlay','assets/okayCutscene/okaySprite3.png')
        this.load.image('grabRun','assets/okayCutscene/okaySprite4people.png')
        this.load.image('pulledAlong','assets/okayCutscene/okaySprite5.png')
        this.load.image('youForgot','assets/okayCutscene/okaySprite7.png')
        //asset for bad end
        this.load.image('youDoneFd','assets/other/badEndingSprite.png')

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
        this.load.audio('thump', 'assets/sounds/Thump.wav');
        this.load.audio('ffBG', 'assets/sounds/FFBG.wav');
        this.load.audio('caveBG', 'assets/sounds/CaveBG.wav');
        this.load.audio('sfBG', 'assets/sounds/SFBG.wav');
        this.load.audio('creditsBG', 'assets/sounds/EverythingBreaks.mp3');
        this.load.audio('axeWallSFX', 'assets/sounds/axeWall.wav');
        this.load.audio('childLaugh', 'assets/sounds/ChildLaugh.wav');
        this.load.audio('suspense', 'assets/sounds/EndSuspense.wav');
        this.load.audio('shock', 'assets/sounds/EndShock.wav');
        this.load.audio('grab', 'assets/sounds/EndGrab.wav');
        this.load.audio('happy', 'assets/sounds/EndHappy.wav');
        this.load.audio('endEngine', 'assets/sounds/EndEngine.wav');
        this.load.audio('endDrama', 'assets/sounds/EndDrama.wav');
        this.load.audio('door', 'assets/sounds/Door.wav');
        this.load.audio('endPiano', 'assets/sounds/EndPiano.wav');
        this.load.audio('endSadPiano', 'assets/sounds/EndSadPiano.wav');
        this.load.audio('endBadPiano', 'assets/sounds/EndBadPiano.wav');
        this.load.audio('treeChop', 'assets/sounds/TreeChop.wav');
        this.load.audio('slide', 'assets/sounds/Slide.wav');

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

        this.game.sound.stopAll();
        this.cameras.main.fadeIn(500);

        //keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

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
        this.anims.create({
            key: 'monsterWalk',
            frames: this.anims.generateFrameNumbers('monsterWalker', {frames:[0,1,2,3,4,5,6,7]}),
            frameRate: 10,
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
        this.titleText = this.add.text(screenWidth/2, screenHeight/2 - 410, 'Grimwood Path', titleTextConfig).setOrigin(0.5);
        this.titleText.setFontSize('300px');
        this.menuText = this.add.text(screenWidth/2,screenHeight/2 - 55,'Movement Controls:\n\nOption 1: walk:[←][→]  jump:[↑]  interact:[↓]\nOption 2: walk:[a][d]  jump:[w]  interact:[s]\n\npress [interact] to start',textConfig).setOrigin(0.5)
        this.menuText.setFontSize('55px');
        this.menuText.setAlpha(0.9);
        this.creditsText = this.add.text(screenWidth - 110, 30, 'Credits [C]', textConfig).setOrigin(0.5);
        this.creditsText.setFontSize('30px');
        this.fullscreenText = this.add.text(120,30,'Fullscreen [F]', textConfig).setOrigin(0.5);
        this.fullscreenText.setFontSize('28px');

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

        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.lower = true;
            this.cameras.main.fadeOut(2000);
            this.time.addEvent({
                delay: 2000,
                callback: () =>{
                    this.scene.start('creditScene')
                }
            })
        }
        if(Phaser.Input.Keyboard.JustDown(keyJ)){
            this.scene.start('devScene')
        }

        //Full Screen Option
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen()
            }
            else{
                this.scale.startFullscreen();
            }
        }
    }

    lowerVolume() {
        this.fadeOutText();
        if(this.engine.volume >= 0){
            this.engine.setVolume(this.engine.volume - 0.0015);
        }
        if(this.driveCrickets.volume >= 0){
            this.driveCrickets.setVolume(this.driveCrickets.volume - 0.05);
        }
    }

    fadeOutText() {
        this.titleText.alpha -= 0.01;
        this.menuText.alpha -= 0.01;
        this.creditsText.alpha -= 0.01;
        this.fullscreenText.alpha -= 0.01;
    }
}
