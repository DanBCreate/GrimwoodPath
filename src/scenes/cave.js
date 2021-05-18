

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
        this.physics.add.overlap(this.player,this.axe,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.axe.x,this.axe.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.axe.destroy()
                hasAxe = true
                this.noInstruct = true;
            }
        })

        //destroying the wall
        this.physics.add.collider(this.player,this.axeWall,()=>{
            if(this.noInstruct && hasCrowbar){
                this.instructions = this.add.text(this.axeWall.x,this.axeWall.y -200,'[space] to pry',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            else if(this.noInstruct && !hasCrowbar){
                this.instructions = this.add.text(this.axeWall.x,this.axeWall.y -200,'maybe with more levarage...',textConfig).setOrigin(0.5)
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

        //deal with entering the cave
        this.physics.add.overlap(this.player,this.caveEntrance,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.caveEntrance.x,this.caveEntrance.y -200,'[space] to enter',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            //transition to cave scene
            if(this.player.actionButton){
                this.screentint =this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
                this.screentint.alpha = 0
                this.tweens.add({
                    targets: this.sceneCamera,
                    zoom: 10,
                    duration: 2000,
                    ease: 'linear'                     
                })
                this.tweens.add({
                    targets: this.screentint,
                    alpha: 1,
                    duration: 2000,     
                    ease: 'linear'               
                })
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=> {
                        this.noInstruct = true;
                        this.scene.start('fForestScene')
                    }
                })
            }
        })

        //cave to SecondForest
        this.caveExit = this.physics.add.sprite(screenWidth/5,screenHeight-100,'caveEntrance').setOrigin(0.5,1)
        this.caveExit.body.allowGravity = false

        //deal with entering the cave
        this.physics.add.overlap(this.player,this.caveExit,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.caveExit.x,this.caveExit.y -200,'[space] to enter',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            //transition to cave scene
            if(this.player.actionButton){
                this.screentint =this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
                this.screentint.alpha = 0
                this.tweens.add({
                    targets: this.sceneCamera,
                    zoom: 10,
                    duration: 2000,
                    ease: 'linear'                     
                })
                this.tweens.add({
                    targets: this.screentint,
                    alpha: 1,
                    duration: 2000,     
                    ease: 'linear'               
                })
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=> {
                        this.noInstruct = true;
                        this.scene.start('lForestScene')
                    }
                })
            }
        })
        
    // Setting up slidy block
    this.block = new slidyBlock(this, screenCenterX + 200, screenCenterY, 'slidyBlock').setScale(0.05);
    // Colliders
    this.physics.add.collider(this.block, this.ground); // Collider between block and ground.
    this.physics.add.collider(this.block, this.axeWall); // Collider between block and ground.
    this.physics.add.collider(this.player, this.block); // Collider between player and the block

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
    }

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