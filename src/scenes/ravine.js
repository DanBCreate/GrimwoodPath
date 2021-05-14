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

        // Setting up our ground
        this.ground = this.physics.add.sprite(screenCenterX, screenCenterY + screenCenterY / 2, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        

        // Setting up slidy block
        this.block = new slidyBlock(this, screenCenterX + 150, screenCenterY, 'slidyBlock').setScale(0.05);
    
        // Colliders
        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.
        this.physics.add.collider(this.block, this.ground); // Collider between block and ground.
        this.blockCollider = this.physics.add.collider(this.player, this.block); // Collider between player and the block

    }

    update(){
        // Debugging mode features
        debugUpdate(this);

        // Update functions for our gameObjects
        this.player.update();
        this.block.update(); 

        // Checks if in range of our slidy Block and allows pushing/pulling
        this.checkSlidyBlock();
    }

    checkSlidyBlock() {
        if(this.block.checkProximity(this.player.x) == true){
            if(this.player.getAction(this.block.y) == true) {
                this.physics.world.removeCollider(this.blockCollider);
                this.block.setMovable(true, this.player.body.velocity.x);
            }
            else{
                this.block.setMovable(false, this.player.body.velocity.x);
                this.blockCollider = this.physics.add.collider(this.player, this.block); 
            }
        }
        else{
            this.block.setMovable(false, this.player.body.velocity.x);
            this.blockCollider = this.physics.add.collider(this.player, this.block);
        }
    }
}