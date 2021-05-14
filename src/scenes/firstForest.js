
class FForest extends Phaser.Scene {
    constructor(){
        super('fForestScene')
    }

    preload(){
    }
    create(){
        //debugging mode features
        debugCreate(this);   

        //set up the ground
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = screenWidth;
        this.ground.setOrigin(0.5,1)
        //cave transition
        this.caveEntrance = this.physics.add.sprite(screenWidth/3,screenHeight-100,'caveEntrance').setOrigin(0.5,1)
        this.caveEntrance.body.allowGravity = false
        

        //spawn collectables
        if(!hasBat){
        this.battery = this.physics.add.sprite(3*screenWidth/4,screenHeight - 100,'bat').setOrigin(0.5,1)
        this.battery.body.allowGravity = false
        }
        if(!hasFlash){
        this.light = this.physics.add.sprite(screenWidth/2,screenHeight - 100,'light').setOrigin(0.5,1)
        this.light.body.allowGravity = false
        }
        if(!hasKnife){
        this.knife = this.physics.add.sprite(screenWidth/6,screenHeight - 100,'knife').setOrigin(0.5,1)
        this.knife.body.allowGravity = false
        }

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)

        //collide with the ground
        this.physics.add.collider(this.player, this.ground);
        

        //object interactions
        this.noInstruct = true

        //collecting the battery
        this.physics.add.overlap(this.player,this.battery,()=>{
            if(this.noInstruct){
                this.batPick = this.add.text(this.battery.x,this.battery.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.batPick.destroy()
                this.battery.destroy()
                hasBat = true
                this.noInstruct = true;
            }
        })
        //collecting the light
        this.physics.add.overlap(this.player,this.light,()=>{
            if(this.noInstruct){
                this.batPick = this.add.text(this.light.x,this.light.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            if(this.player.actionButton){
                this.batPick.alpha = 0;
                this.light.destroy()
                hasFlash = true
                this.noInstruct = true;
            }
        })
        //collecting the knife
        this.physics.add.overlap(this.player,this.knife,()=>{
            if(this.noInstruct){
                this.batPick = this.add.text(this.knife.x,this.knife.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            if(this.player.actionButton){
                this.batPick.alpha = 0;
                this.knife.destroy()
                hasKnife = true
                this.noInstruct = true;
            }
        })

        //deal with entering the cave
        this.physics.add.overlap(this.player,this.caveEntrance,()=>{
            if(this.noInstruct && hasFlash && hasBat){
                this.batPick = this.add.text(this.caveEntrance.x,this.caveEntrance.y -200,'[space] to enter',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            //transition to cave scene
            if(this.player.actionButton && hasBat && hasFlash){
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

        //I don't know why this doesn't work
        this.ping = false
        this.physics.add.overlap(this.player,this.battery,()=>{
            console.log('this should never be seen')
        },this.ping)
    }

    update(){
        //debugging mode features
        debugUpdate(this);
        this.player.update()
    }

}