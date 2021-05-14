

class LForest extends Phaser.Scene {
    constructor(){
        super('lForestScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);   
        
        //instruction flags
        this.noInstruct = true
        this.instructDestructor = true
        
        //set up the ground
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = screenWidth;
        this.ground.setOrigin(0.5,1)       

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)

        //collide with the ground
        this.physics.add.collider(this.player, this.ground);

        if(keyWallFlag){
            //set up the axewall
                this.keyWall = this.physics.add.sprite(screenWidth/5, screenHeight, 'ground').setScale(0.05); // Initialize our ground
                this.keyWall.setImmovable(true); // Sets ground to immovable
                this.keyWall.body.allowGravity = false; // So gravity has no effect ground
                this.keyWall.displayWidth = 100;
                this.keyWall.displayHeight = screenHeight
                this.keyWall.setOrigin(0.5,1) 
        }

        //destroying the wall
        this.physics.add.collider(this.player,this.keyWall,()=>{
            console.log('collision')
            if(this.noInstruct && hasKey){
                this.instructions = this.add.text(this.keyWall.x,this.keyWall.y -200,'[space] open',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            else if(this.noInstruct){
                this.instructions = this.add.text(this.keyWall.x,this.keyWall.y -200,'maybe there\'s a key',textConfig).setOrigin(0.5)
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
        this.caveExit = this.physics.add.sprite(screenWidth/2,screenHeight-100,'caveEntrance').setOrigin(0.5,1)
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
                        this.scene.start('caveScene')
                    }
                })
            }
        })  

        //collectables
        if(!hasKey){
            this.key = this.physics.add.sprite(7*screenWidth/8,screenHeight - 100,'key').setOrigin(0.5,1)
            this.key.body.allowGravity = false
        }

        //collecting the axe
        this.physics.add.overlap(this.player,this.key,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.key.x,this.key.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.key.destroy()
                hasKey = true
                this.noInstruct = true;
            }
        })

        if(!hasCrowbar){
            this.crowbar = this.physics.add.sprite(screenWidth/8,screenHeight - 100,'bar').setOrigin(0.5,1)
            this.crowbar.body.allowGravity = false
        }

        //collecting the axe
        this.physics.add.overlap(this.player,this.crowbar,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.crowbar.x,this.crowbar.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.crowbar.destroy()
                hasCrowbar = true
                this.noInstruct = true;
            }
        })


    }
    update(){
        //debugging mode features
        debugUpdate(this);
        this.player.update();

        //remove unused instructions
        if(!this.noInstruct && this.instructDestructor){
            this.instructDestructor = false
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.noInstruct = true
                    this.instructions.destroy()
                    this.instructDestructor = true
                }
            })
        }

    }

}