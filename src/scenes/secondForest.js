

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
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.15); // Initialize our Player
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

        //car
        this.escapeCar = this.physics.add.sprite(screenWidth,screenHeight-100,'car').setOrigin(0.5,1)
        this.escapeCar.body.allowGravity = false


        //collectables
        if(!hasKey){
            this.key = this.physics.add.sprite(7*screenWidth/8,screenHeight - 100,'key').setOrigin(0.5,1)
            this.key.body.allowGravity = false
        }

        if(!hasCrowbar){
            this.crowbar = this.physics.add.sprite(screenWidth/8,screenHeight - 100,'bar').setOrigin(0.5,1)
            this.crowbar.body.allowGravity = false
        }

        //collecting things
        collect(this,this.key,'key')
        collect(this,this.crowbar,'crowbar')

        //deal with scene changes
        leave(this,this.caveExit,'cave','caveScene')
        leave(this,this.escapeCar,'car','noBroScene')

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

    }

}