

class Cave extends Phaser.Scene {
    constructor(){
        super('caveScene')
    }

    preload(){
        this.screentint =this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
        this.tweens.add({
            targets: this.screentint,
            alpha: 0,
            duration: 1000,     
            ease: 'linear'               
        })
    }
    create(){
        //instruction text variables
        this.noInstruct = true
        this.instructDestructor = true
        //debugging mode features
        debugCreate(this); 

        //the background
        this.background = this.add.sprite(0,screenHeight,'caveBG').setOrigin(0,1)
        this.backWalls = this.add.sprite(0,screenHeight,'caveWall').setOrigin(0,1)
        
        //set up the bounds
        this.rightBound = this.physics.add.sprite(7680,screenHeight,'clear').setOrigin(0.5,1)
        this.rightBound.body.allowGravity = false
        this.rightBound.setImmovable(true)
        this.rightBound.displayHeight = 3240
        this.leftBound = this.physics.add.sprite(0,screenHeight,'clear').setOrigin(0.5,1)
        this.leftBound.body.allowGravity = false
        this.leftBound.setImmovable(true)
        this.leftBound.displayHeight = 3240

        // Setting up our Cave Ambience Sounds
        this.sfxConfig = {
            volume: 1,
            loop: true,
        }
        this.caveBG = this.sound.add('caveBG');
        this.caveBG.play(this.sfxConfig);

        //set up the ground
        this.ground = this.physics.add.sprite(0, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = 7680;
        this.ground.displayHeight = 200
        this.ground.setOrigin(0,1)  
        
        this.firstLedge = this.physics.add.sprite(3813,screenHeight - 450).setOrigin(0)
        this.firstLedge.setImmovable(true)
        this.firstLedge.body.allowGravity = false
        this.firstLedge.displayWidth = 5364 - 3813
        this.firstLedge.displayHeight = 500

        this.midLedge = this.physics.add.sprite(5364,screenHeight - 350).setOrigin(0)
        this.midLedge.setImmovable(true)
        this.midLedge.body.allowGravity = false
        this.midLedge.displayWidth = 6200 - 5364
        this.midLedge.displayHeight = 500        

        this.backLedge = this.physics.add.sprite(6200,screenHeight - 275).setOrigin(0)
        this.backLedge.setImmovable(true)
        this.backLedge.body.allowGravity = false
        this.backLedge.displayWidth = 7680 - 6200
        this.backLedge.displayHeight = 500       

        this.TRGround = this.physics.add.sprite(5600,-1320).setOrigin(0)
        this.TRGround.setImmovable(true)
        this.TRGround.body.allowGravity = false
        this.TRGround.displayWidth = 7680 - 5600
        this.TRGround.displayHeight = 1500    

        // Setting up our player and camera to follow player
        playerSpawny-=200 
        this.player = new player(this, playerSpawnx, playerSpawny, 'player').setScale(0.15); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        this.player.depth = 200
        this.sceneCamera.setBounds(0,screenHeight-3240,7680,3240)
        playerSpawny = screenHeight -140 //reset y spawn


        this.axeWall = this.physics.add.sprite(6200, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.axeWall.setImmovable(true); // Sets ground to immovable
        this.axeWall.body.allowGravity = false; // So gravity has no effect ground
        this.axeWall.displayWidth = 100;
        this.axeWall.displayHeight = screenHeight
        this.axeWall.setOrigin(0.5,1) 
        

        if(!hasAxe){
            this.axe = this.physics.add.sprite(7000,screenHeight - 300,'axe').setOrigin(0.5,1)
            this.axe.body.allowGravity = false
        }

        //collecting the axe
        collect(this,this.axe,'axe')

        //destroying the wall
        this.physics.add.collider(this.player,this.axeWall,()=>{
            if(this.noInstruct && hasCrowbar){
                this.instructions = this.add.text(this.axeWall.x,this.axeWall.y -200,'[space] to pry',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.noInstruct = false
            }
            else if(this.noInstruct && !hasCrowbar){
                this.instructions = this.add.text(this.axeWall.x,this.axeWall.y -200,'maybe with more leverage...',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.noInstruct = false
            }
            if(this.player.actionButton && hasCrowbar){
                this.instructions.destroy()
                this.axeWall.destroy()
                axeWallFlag = false;
                this.noInstruct = true;
            }
        })

        //cave transition
        this.caveEntrance = this.physics.add.sprite(325,screenHeight-150,'clear').setOrigin(0.5,1)
        this.caveEntrance.body.allowGravity = false

        //cave to SecondForest
        this.caveExit = this.physics.add.sprite(7280,-1350,'clear').setOrigin(0.5,1)
        this.caveExit.body.allowGravity = false

        //scene transitions
        leave(this,this.caveEntrance,'cave','fForestScene')
        leave(this,this.caveExit,'cave','lForestScene')
       
        
        // Setting up slidy block
        this.block = new slidyBlock(this, 2000, screenCenterY, 'slidyBlock').setScale(0.2);

        //parkoor
        this.highBlock = new slidyBlock(this, 4360, screenCenterY+100, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.highBlock.setImmovable(true)
        this.highBlock.body.allowGravity = false
        this.otherHighBlock = new slidyBlock(this, 5000, screenCenterY+100, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.otherHighBlock.setImmovable(true)
        this.otherHighBlock.body.allowGravity = false
        this.bigHighBlock = new slidyBlock(this, 4730, screenCenterY+100, 'slidyBlock').setScale(0.4).setOrigin(0.5,1);
        this.bigHighBlock.setImmovable(true)
        this.bigHighBlock.body.allowGravity = false
        this.firstAirBlock = new slidyBlock(this,4330,screenCenterY -200,'slidyBlock').setScale(0.15).setOrigin(0.5,1);
        this.firstAirBlock.setImmovable(true)
        this.firstAirBlock.body.allowGravity = false
        this.secondAirBlock = new slidyBlock(this, 4200, screenCenterY-300, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.secondAirBlock.setImmovable(true)
        this.secondAirBlock.body.allowGravity = false
        this.thirdAirBlock = new slidyBlock(this, 4650, screenCenterY-450, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.thirdAirBlock.setImmovable(true)
        this.thirdAirBlock.body.allowGravity = false
        this.fourthAirBlock = new slidyBlock(this, 5100, screenCenterY-600, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.fourthAirBlock.setImmovable(true)
        this.fourthAirBlock.body.allowGravity = false
        this.fifthAirBlock = new slidyBlock(this, 5550, screenCenterY-750, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.fifthAirBlock.setImmovable(true)
        this.fifthAirBlock.body.allowGravity = false
        this.sixthAirBlock = new slidyBlock(this, 5100, screenCenterY-900, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.sixthAirBlock.setImmovable(true)
        this.sixthAirBlock.body.allowGravity = false
        this.seventhAirBlock = new slidyBlock(this, 4650, screenCenterY-1050, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.seventhAirBlock.setImmovable(true)
        this.seventhAirBlock.body.allowGravity = false
        this.eighthAirBlock = new slidyBlock(this, 4200, screenCenterY-1200, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.eighthAirBlock.setImmovable(true)
        this.eighthAirBlock.body.allowGravity = false
        this.ninethAirBlock = new slidyBlock(this, 4650, screenCenterY-1350, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.ninethAirBlock.setImmovable(true)
        this.ninethAirBlock.body.allowGravity = false
        this.tenthAirBlock = new slidyBlock(this, 5100, screenCenterY-1500, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.tenthAirBlock.setImmovable(true)
        this.tenthAirBlock.body.allowGravity = false
        this.elevinthAirBlock = new slidyBlock(this, 5550, screenCenterY-1650, 'slidyBlock').setScale(0.2).setOrigin(0.5,1);
        this.elevinthAirBlock.setImmovable(true)
        this.elevinthAirBlock.body.allowGravity = false

        //setting up the lighting
        this.lights.enable().setAmbientColor(0x444444); // enable lighting, and tint the background dark
        this.ground.setPipeline('Light2D')
        this.background.setPipeline('Light2D')
        if(!hasAxe){this.axe.setPipeline('Light2D')}
        if(axeWallFlag){this.axeWall.setPipeline('Light2D')}

        this.collidyThings = [this.block,this.firstAirBlock,this.secondAirBlock,this.thirdAirBlock,this.fourthAirBlock,this.fifthAirBlock,this.sixthAirBlock,
            this.seventhAirBlock,this.eighthAirBlock,this.ninethAirBlock,this.tenthAirBlock,this.elevinthAirBlock,this.TRGround,
            this.axeWall,this.ground,this.player,this.firstLedge,this.midLedge,this.backLedge,this.highBlock,this.bigHighBlock,this.otherHighBlock,this.rightBound,
            this.leftBound]

        var i
        var j
        for(i = 0;i<this.collidyThings.length;i++){
            this.collidyThings[i].setPipeline('Light2D') //add lights to physic things to aviod list
            for(j = i+1;j<this.collidyThings.length;j++){
                this.physics.add.collider(this.collidyThings[i],this.collidyThings[j])//finaly got tired of doing this manualy
            }
        }

        //create the actual light
        this.playerLight = this.lights.addLight(0,0,2000).setColor(0xffffff).setIntensity(3)

        genInventory(this);

        //remove axewall if necessasary
        if(!axeWallFlag){
            this.axeWall.destroy()
        }
    }
    update(){
        debugUpdate(this);
        this.player.update()
        this.block.update(); 

        // Checks if in range of our slidy Block and allows pushing/pulling
        this.checkSlidyBlock(this.block);

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

        //move the light to follow the player
        this.playerLight.x = this.player.body.x + this.player.displayWidth/2
        this.playerLight.y = this.player.body.y

        update_inv();
    }

    //checks if slidy block should be pushed
    checkSlidyBlock(block) {
        if(block.checkProximity(this.player.x) == true){
            
            if(this.player.getAction(block.y) == true) {
                block.setMovable(true, this.player.body.velocity.x);
            }
            else{
                block.setMovable(false, this.player.body.velocity.x);
            }
        }
        else{
            block.setMovable(false, this.player.body.velocity.x);
        }
    }

    slidyCollision() {

        console.log("test");
    }

}