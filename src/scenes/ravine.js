class Ravine extends Phaser.Scene {
    constructor(){
        super('ravineScene')
    }

    preload(){
        // Preload our images
        this.load.image('player', 'assets/tempAssets/tempPlayer.png'); // Player Asset
        this.load.image('ground', 'assets/tempAssets/tempGround.png'); // Ground Asset
        this.load.image('slidyBlock', 'assets/tempAssets/tempBlock.png') // Slidy Block Asset
    }

    create(){
        // Debugging mode features
        debugCreate(this); 

        // Setting up our ground
        this.ground = this.physics.add.sprite(screenCenterX, screenCenterY + screenCenterY / 2, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground

        // Setting up our player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player

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