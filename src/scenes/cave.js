

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
        this.noInstruct = true
        this.instructDestructor = true
        //debugging mode features
        debugCreate(this); 

        //set up the ground
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = screenWidth;
        this.ground.setOrigin(0.5,1)   

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.15); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)

        //collide with the ground
        this.physics.add.collider(this.player, this.ground);

        if(axeWallFlag){
        //set up the axewall
            this.axeWall = this.physics.add.sprite(4*screenWidth/5, screenHeight, 'ground').setScale(0.05); // Initialize our ground
            this.axeWall.setImmovable(true); // Sets ground to immovable
            this.axeWall.body.allowGravity = false; // So gravity has no effect ground
            this.axeWall.displayWidth = 100;
            this.axeWall.displayHeight = screenHeight
            this.axeWall.setOrigin(0.5,1) 
        }

        if(!hasAxe){
            this.axe = this.physics.add.sprite(7*screenWidth/8,screenHeight - 100,'axe').setOrigin(0.5,1)
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
        this.caveEntrance = this.physics.add.sprite(screenWidth/2,screenHeight-100,'caveEntrance').setOrigin(0.5,1)
        this.caveEntrance.body.allowGravity = false

        //cave to SecondForest
        this.caveExit = this.physics.add.sprite(screenWidth/5,screenHeight-100,'caveEntrance').setOrigin(0.5,1)
        this.caveExit.body.allowGravity = false

        //scene transitions
        leave(this,this.caveEntrance,'cave','fForestScene')
        leave(this,this.caveExit,'cave','lForestScene')
       
        
        // Setting up slidy block
        this.block = new slidyBlock(this, screenCenterX + 200, screenCenterY, 'slidyBlock').setScale(0.05);
        // Colliders
        this.physics.add.collider(this.block, this.ground); // Collider between block and ground.
        this.physics.add.collider(this.block, this.axeWall); // Collider between block and ground.
        this.physics.add.collider(this.player, this.block); // Collider between player and the block

        //setting up the lighting
        this.lights.enable().setAmbientColor(0x222222); // enable lighting, and tint the background dark
        //make the lighting effect all the things
        this.block.setPipeline('Light2D')
        this.player.setPipeline('Light2D')
        this.ground.setPipeline('Light2D')
        this.caveEntrance.setPipeline('Light2D')
        this.caveExit.setPipeline('Light2D')
        if(!hasAxe){this.axe.setPipeline('Light2D')}
        if(axeWallFlag){this.axeWall.setPipeline('Light2D')}

        //create the actual light
        this.playerLight = this.lights.addLight(0,0,1000).setColor(0xffffff).setIntensity(2)

        genInventory(this);
    }
    update(){
        debugUpdate(this);
        this.player.update()
        this.block.update(); 

        // Checks if in range of our slidy Block and allows pushing/pulling
        this.checkSlidyBlock();

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
    checkSlidyBlock() {
        if(this.block.checkProximity(this.player.x) == true){
            
            if(this.player.getAction(this.block.y) == true) {
                this.block.setMovable(true, this.player.body.velocity.x);
            }
            else{
                this.block.setMovable(false, this.player.body.velocity.x);
            }
        }
        else{
            this.block.setMovable(false, this.player.body.velocity.x);
        }
    }

}