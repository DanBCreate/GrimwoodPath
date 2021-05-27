// Ravine.js
// Class for ravine scene
//
// __Functions_Below__
// checkSlidyBlock(): Checks if we are near a slidy block and our action key is pressed


class Ravine extends Phaser.Scene {
    constructor(){
        super('ravineScene')
    }

    preload(){
    }

    create(){
        // Debugging mode features
        debugCreate(this); 
        this.backDrop = this.add.sprite(0,screenHeight,'ravineBG').setOrigin(0,1)
        this.backBase = this.add.sprite(0,screenHeight,'ravinebase').setOrigin(0,1)
        this.backFog = this.add.sprite(0,screenHeight,'ravinefog').setOrigin(0,1)
        this.backBorder = this.add.sprite(0,screenHeight,'ravineborder').setOrigin(0,1)

        // Setting up our Ravine Ambience Sounds
        this.sfxConfig = {
            volume: 0.85,
            loop: true,
        }
        this.ravineBG = this.sound.add('ravineBG');
        this.ravineBG.play(this.sfxConfig) ;


        // Setting up our ground
        this.ground = this.physics.add.sprite(0, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = 4800;
        this.ground.setOrigin(0,1)

        
        //invisible bounding boxes
        this.rightBound = this.physics.add.sprite(4800,screenHeight,'clear').setOrigin(0.5,1)
        this.rightBound.body.allowGravity = false
        this.rightBound.setImmovable(true)
        this.rightBound.displayHeight = screenHeight
        this.leftBound = this.physics.add.sprite(0,screenHeight,'clear').setOrigin(0.5,1)
        this.leftBound.body.allowGravity = false
        this.leftBound.setImmovable(true)
        this.leftBound.displayHeight = screenHeight

        //object interactions
        this.noInstruct = true
        this.instructDestructor = true

        if(!hasRope){
            this.rope= this.physics.add.sprite(4100,screenHeight - 100,'rope').setOrigin(0.5,1)
            this.rope.body.allowGravity = false
        }
        if(!hasShirt){
            this.shirt = this.physics.add.sprite(screenWidth/2,screenHeight - 100,'shirt').setOrigin(0.5,1)
            this.shirt.body.allowGravity = false
        }
        if(!hasJacket){
            this.jacket = this.physics.add.sprite(screenWidth + 300,screenHeight - 100,'jacket').setOrigin(0.5,1)
            this.jacket.body.allowGravity = false
        }
        if(!hasWood){
            this.wood = this.physics.add.sprite(screenWidth/3,screenHeight - 100,'wood').setOrigin(0.5,1)
            this.wood.body.allowGravity = false
        }        

        this.ropeTree = this.physics.add.sprite(screenWidth,screenHeight,'wipeTree').setOrigin(0.5,1)
        this.ropeTree.body.allowGravity = false

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.15); // Initialize our Player
        this.player.depth = 200
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        this.sceneCamera.setBounds(0,0,4800,screenHeight)

        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.  
        this.physics.add.collider(this.player, this.rightBound);
        this.physics.add.collider(this.player, this.leftBound);

        //collecting things
        collect(this,this.rope,'rope')
        collect(this,this.shirt,'shirt')
        collect(this,this.jacket,'jacket')
        collect(this,this.wood,'wood')

        //deal with climbing the tree
        leave(this, this.ropeTree,'tree','fForestScene')

        this.inventory = genInventory(this);
        //this.inventory.fixedToCamera = true;
        /*this.tweens.add({
            targets: this.screentint,
            alpha: 255,     
            ease: 'linear'
        });*/

        //set player spawns for first forest
        playerSpawnx = -5700

    }

    update(){
        this.player.ravineFall();
        // Debugging mode features
        debugUpdate(this);

        // Update functions for our gameObjects
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
        //parallax things
        this.backFog.x = this.player.x/25
        this.backDrop.x = this.player.x/40
        update_inv();
    }
}