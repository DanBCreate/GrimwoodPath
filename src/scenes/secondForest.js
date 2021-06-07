class LForest extends Phaser.Scene {
    constructor(){
        super('lForestScene')
    }

    create(){
        this.sceneKey = 'lForestScene'
        //debugging mode features
        debugCreate(this);   

        this.cameras.main.fadeIn(650);

        // Second Forest Background Ambience
        this.sfxConfig = {
            volume: 0.95,
            loop: true,
        }
        this.sfxConfigDoor = {
            volume: 0.95,
            loop: false,
        }
        this.sfBG = this.sound.add('sfBG');
        this.doorSFX = this.sound.add('door');
        this.doorLock = false;
        this.sfBG.play(this.sfxConfig);
        
        //instruction flags
        this.noInstruct = true
        this.instructDestructor = true
        
        //background
        this.blackDrop = this.add.sprite(0,0,'ground').setOrigin(0)
        this.blackDrop.displayHeight = screenHeight*2
        this.blackDrop.displayWidth = 17000
        this.backGround = this.add.sprite(0,screenHeight,'forBG').setOrigin(0,1)

        //background marked trees
        this.backFirstTree = this.physics.add.sprite(8190,screenHeight,'singleTree').setOrigin(0.5,1)
        if(ffTree1Marked){
            this.backFirstTree.anims.play('mkTree')
            this.backFirstTree.displayWidth = 100
        }
        this.backSecondTree = this.physics.add.sprite(4350,screenHeight,'singleTree').setOrigin(0.5,1)
        if(ffTree2Marked){
            this.backSecondTree.anims.play('mkTree')
            this.backSecondTree.displayWidth = 100
        }
        this.backFirstTree.body.allowGravity = false
        this.backSecondTree.body.allowGravity =- false

        //create monster in the middle of the background
        this.monster = new SlidySprite(this,9000,screenHeight/2+200,'monsterWalker').setOrigin(0.5).setScale(0.5)
        this.monsterInMotion = false
        this.monsterDir = 1
        this.monster.alpha = 0.4
        this.add.existing(this.monster)
        this.monster.anims.play('monsterWalk')
        this.tweens.add({
            targets:this.monster,
            alpha:0,
            duration:5000,
            yoyo:true,
            hold:10000,
            repeat:-1
        })

        this.backTree3 = this.add.sprite(0,screenHeight,'forTree3').setOrigin(0,1)
        this.backTree4 = this.add.sprite(0,screenHeight,'forTree4').setOrigin(0,1)
        this.backTree2 = this.add.sprite(0,screenHeight,'forTree2').setOrigin(0,1)
        this.backTree1 = this.add.sprite(0,screenHeight,'forTree1').setOrigin(0,1)
        this.backFog = this.add.sprite(0,screenHeight,'forFog').setOrigin(0,1)
        this.forGround = this.add.sprite(0,screenHeight,'for2Ground').setOrigin(0,1)
        this.cabin = this.add.sprite(0,screenHeight,'cabin').setOrigin(0,1)
        this.cabin.depth = 300

        //set up the ground
        this.ground = this.physics.add.sprite(0, screenHeight, 'ground'); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = 14400;
        this.ground.displayHeight = 100
        this.ground.setOrigin(0,1)     
        
        //set up the bounds
        this.rightBound = this.physics.add.sprite(14400,screenHeight,'clear').setOrigin(0.5,1)
        this.rightBound.body.allowGravity = false
        this.rightBound.setImmovable(true)
        this.rightBound.displayHeight = screenHeight
        this.leftBound = this.physics.add.sprite(0,screenHeight,'clear').setOrigin(0.5,1)
        this.leftBound.body.allowGravity = false
        this.leftBound.setImmovable(true)
        this.leftBound.displayHeight = screenHeight

        // Setting up our player and camera to follow player
        this.player = new player(this, playerSpawnx, playerSpawny - 200, 'player').setScale(0.3); // Initialize our Player
        this.player.depth = 200
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        this.sceneCamera.setBounds(0,0,14400,screenHeight)

        //collide with the ground
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.rightBound);
        this.physics.add.collider(this.player, this.leftBound);

        if(keyWallFlag){
            //set up the axewall
                this.keyWall = this.physics.add.sprite(1132, screenHeight, 'ground').setScale(0.05); // Initialize our ground
                this.keyWall.setImmovable(true); // Sets ground to immovable
                this.keyWall.body.allowGravity = false; // So gravity has no effect ground
                this.keyWall.displayWidth = 100;
                this.keyWall.displayHeight = screenHeight
                this.keyWall.setOrigin(1) 
        }

        //destroying the wall
        this.physics.add.collider(this.player,this.keyWall,()=>{
            if(this.noInstruct && hasKey){
                if(this.doorLock == false){
                    this.doorSFX.play(this.sfxConfigDoor);
                }
                this.instructions = this.add.text(this.keyWall.x,this.keyWall.y -600,favKeys+' unlock',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.instructions.depth =400
                this.noInstruct = false
            }
            else if(this.noInstruct){
                this.instructions = this.add.text(this.keyWall.x,this.keyWall.y -600,'maybe there\'s a key',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.instructions.depth = 400
                this.noInstruct = false
            }
            if(this.player.actionButton && hasKey){
                this.instructions.destroy()  
                this.keyWall.destroy()
                keyWallFlag = false;
                this.noInstruct = true;
            }
        })

        //cave entrance
        this.caveExit = this.physics.add.sprite(7000,screenHeight-40,'caveEnt').setOrigin(0.5,1)
        this.caveExit.body.allowGravity = false
        this.caveExit.displayHeight = 600
        this.caveExit.displayWidth = 900

        //car
        this.escapeCar = this.physics.add.sprite(14000,screenHeight-100,'carAnim').setOrigin(0.5,1)
        this.escapeCar.anims.play('drive')
        this.escapeCar.anims.pause()
        this.escapeCar.body.allowGravity = false

        //collectables
        if(!hasKey){
            this.key = this.physics.add.sprite(13000,screenHeight - 110,'key').setOrigin(0.5,1)
            this.key.setScale(0.2);
            this.key.body.allowGravity = false
        }

        if(!hasCrowbar){
            this.crowbar = this.physics.add.sprite(screenWidth/6,screenHeight - 300,'bar').setOrigin(0.5,1)
            this.crowbar.setScale(0.2);
            this.crowbar.body.allowGravity = false
        }

        //collecting things
        collect(this,this.key,'key')
        collect(this,this.crowbar,'crowbar')

        //foreground trees
        this.firstTree = this.physics.add.sprite(8140,screenHeight,'singleTree').setOrigin(0.5,1)
        if(lfTree1Marked){
            this.firstTree.anims.play('mkTree')
        }
        this.secondTree = this.physics.add.sprite(4300,screenHeight,'singleTree').setOrigin(0.5,1)
        if(lfTree2Marked){
            this.secondTree.anims.play('mkTree')
        }
        this.firstTree.body.allowGravity = false
        this.secondTree.body.allowGravity =- false

        this.firstTree.depth = 300
        this.secondTree.depth = 300

        //deal with foreground trees
        markTree(this,this.firstTree,'lf1')
        markTree(this,this.secondTree,'lf2')

        //deal with scene changes
        leave(this,this.caveExit,'cave','caveScene')
        leave(this,this.escapeCar,'car','noBroScene')
        leave(this,this.firstTree,'mtree1','fForestScene')
        leave(this,this.secondTree,'mtree2','fForestScene')

        genInventory(this);
    }

    update(){
        //debugging mode features
        debugUpdate(this);
        this.player.update();

        //remove unused instructions
        if(!this.noInstruct && this.instructDestructor){
            this.instructDestructor = false
            this.time.addEvent({
                delay: instrctionDelay,
                callback: () => {
                    this.noInstruct = true
                    this.instructions.destroy()
                    this.instructDestructor = true
                }
            })
        }

        //paralax the background
        this.backFog.x = this.player.x/25
        this.backTree1.x = this.player.x/40
        this.backTree2.x = this.player.x/50
        this.backTree3.x = this.player.x/30
        this.backTree4.x = this.player.x/20

        update_inv();

        //do the monster walk
        if(!this.monsterInMotion){
            if(this.monsterDir === 1){
                if(this.monster.x >12000){
                    this.monster.flipX = true
                    this.monster.slide('-=200',screenHeight/2+200,1000)
                    this.monsterDir = -1
                }
                else{
                    this.monster.slide('+=200',screenHeight/2+200,1000)
                }
            }
            else if(this.monsterDir === -1){
                if(this.monster.x < 1600){
                    this.monster.flipX = false
                    this.monster.slide('+=200',screenHeight/2+200,1000)
                    this.monsterDir = 1
                }
                else{
                    this.monster.slide('-=200',screenHeight/2+200,1000)
                }
            }
            else{
                console.log('ERR: monsterDir not correct')
            }
            //sleep for 1000 before checking monster status
            this.monsterInMotion = true
            this.time.addEvent({
                delay:1000,
                callback:()=>{
                    this.monsterInMotion = false
                }
            })
        }
    }
}