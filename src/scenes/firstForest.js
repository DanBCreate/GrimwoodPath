
class FForest extends Phaser.Scene {
    constructor(){
        super('fForestScene')
    }

    preload(){
    }
    create(){
        //debugging mode features
        debugCreate(this);   

        //set up the background
        this.blackDrop = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blackDrop.displayHeight = screenHeight*2
        this.blackDrop.displayWidth = 17000
        this.backGround = this.add.sprite(0,screenHeight,'forBG').setOrigin(0.5,1)
        this.backTree3 = this.add.sprite(0,screenHeight,'forTree3').setOrigin(0.5,1)
        this.backTree4 = this.add.sprite(0,screenHeight,'forTree4').setOrigin(0.5,1)
        this.backFog = this.add.sprite(0,screenHeight,'forFog').setOrigin(0.5,1)
        this.backTree2 = this.add.sprite(0,screenHeight,'forTree2').setOrigin(0.5,1)
        this.backTree1 = this.add.sprite(0,screenHeight,'forTree1').setOrigin(0.5,1)
        this.forGround = this.add.sprite(0,screenHeight,'for1Ground').setOrigin(0.5,1)

        //invisible bounding boxes
        this.rightBound = this.physics.add.sprite((14400)/2,screenHeight,'clear').setOrigin(0,1)
        this.rightBound.body.allowGravity = false
        this.rightBound.setImmovable(true)
        this.rightBound.displayHeight = screenHeight
        this.leftBound = this.physics.add.sprite(-(14400)/2 + 1200,screenHeight,'clear').setOrigin(0,1)
        this.leftBound.body.allowGravity = false
        this.leftBound.setImmovable(true)
        this.leftBound.displayHeight = screenHeight




        //set up the ground
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight - 50, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = 17000;
        this.ground.setOrigin(0.5,0)
        //set up the ground
        this.highground = this.physics.add.sprite(-1700, screenHeight - 130, 'clear').setScale(0.05); // Initialize our ground
        this.highground.setImmovable(true); // Sets ground to immovable
        this.highground.body.allowGravity = false; // So gravity has no effect ground
        this.highground.displayWidth = 13000;
        this.highground.setOrigin(0.5,0)
        //cave transition
        this.caveEntrance = this.physics.add.sprite(screenWidth,screenHeight-150,'caveEntrance').setOrigin(0.5,1)
        // this.caveEntrance.displayHeight = 60
        // this.caveEntrance.displayWidth = 60
        this.caveEntrance.body.allowGravity = false
        
        this.clearingEntrance = this.physics.add.sprite(0,screenHeight-150,'clearing').setOrigin(0.5,1)
        // this.clearingEntrance.displayWidth = 60
        // this.clearingEntrance.displayHeight = 60
        this.clearingEntrance.body.allowGravity = false

        //spawn collectables
        if(!hasBat){
            this.battery = this.physics.add.sprite(3000,screenHeight - 150,'bat').setOrigin(0.5,1)
            // this.battery.displayHeight = 10
            // this.battery.displayWidth = 10
            this.battery.body.allowGravity = false
        }
        if(!hasFlash){
            this.light = this.physics.add.sprite(5000,screenHeight - 150,'light').setOrigin(0.5,1)
            // this.light.displayHeight = 10
            // this.light.displayWidth = 10
            this.light.body.allowGravity = false
        }
        if(!hasKnife){
            this.knife = this.physics.add.sprite(-4000,screenHeight - 150,'knife').setOrigin(0.5,1)
            // this.knife.displayWidth = 10
            // this.knife.displayHeight = 10
            this.knife.body.allowGravity = false
        }

        // Setting up our player
        if(fromRavine){
            this.player = new player(this, -5700, screenHeight - 140, 'player').setScale(0.3).setOrigin(0.5,1); // Initialize our Player
            fromRavine = false
        }
        else{
            this.player = new player(this, screenWidth, screenHeight - 140, 'player').setScale(0.3).setOrigin(0.5,1); // Initialize our Player
        }

        //set up the camera following
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        this.sceneCamera.zoom = 1
        this.sceneCamera.setBounds(-14400/2,0,14400,screenHeight)

        //collide with the ground and bounding boxes
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.highground);
        this.physics.add.collider(this.player, this.rightBound);
        this.physics.add.collider(this.player, this.leftBound,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.leftBound.x + 200,this.leftBound.y -500,'Don\'t want to fall back down',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
        });

        //sound Effects
        this.giggle = this.sound.add('giggle')
        this.sfxConfig = {
            volume: 1,
            loop: false,
        }
        this.sfxActive = false;
        this.resetSFXactive = true;
        

        //object interactions
        this.noInstruct = true
        this.instructDestructor = true

        collect(this,this.battery,'bat')
        collect(this,this.light,'flash')
        collect(this,this.knife,'knife')

        //scene changes
        leave(this,this.caveEntrance, 'cave', 'caveScene')
        leave(this,this.clearingEntrance,'clearing','hEndScene')

        //foreground trees
        this.firstTree = this.physics.add.sprite(4000,screenHeight,'singleTree').setOrigin(0.5,1)
        if(ffTree1Marked){
            this.firstTree.anims.play('mkTree')
        }
        this.secondTree = this.physics.add.sprite(1000,screenHeight,'singleTree').setOrigin(0.5,1)
        if(ffTree2Marked){
            this.secondTree.anims.play('mkTree')
        }
        this.firstTree.body.allowGravity = false
        this.secondTree.body.allowGravity =- false

        //deal with foreground trees
        this.physics.add.overlap(this.player,this.firstTree,()=>{
            if(this.noInstruct && hasShirt && !ffTree1Marked){
                this.instructions = this.add.text(this.firstTree.x,this.firstTree.y -600,'[space] to mark',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.noInstruct = false
            } 
            if(this.player.actionButton && hasShirt){
                this.firstTree.anims.play('mkTree')
                ffTree1Marked = true
            }
        })

        this.physics.add.overlap(this.player,this.secondTree,()=>{
            if(this.noInstruct && hasShirt && !ffTree2Marked){
                this.instructions = this.add.text(this.secondTree.x,this.secondTree.y -600,'[space] to mark',textConfig).setOrigin(0.5)
                this.instructions.setFontSize('40px')
                this.noInstruct = false
            } 
            if(this.player.actionButton && hasShirt){
                this.secondTree.anims.play('mkTree')
                ffTree2Marked = true
            }
        })


    }

    update(){
        //debugging mode features
        debugUpdate(this);
        this.player.update()
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

        //reset sound effect
        if(this.sfxActive && this.resetSFXactive){
            this.resetSFXactive = false;
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.sfxActive = false
                    this.resetSFXactive = true
                }
            })
        }

        //paralax the background

        this.backFog.x = this.player.x/25
        this.backTree1.x = this.player.x/40
        this.backTree2.x = this.player.x/50
        this.backTree3.x = this.player.x/30
        this.backTree4.x = this.player.x/20


    }

}