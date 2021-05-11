class Ravine extends Phaser.Scene {
    constructor(){
        super('ravineScene')
    }

    preload(){
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
        this.block = new slidyBlock(this, screenCenterX + 150, screenCenterY + screenCenterY / 3 + 6, 'slidyBlock').setScale(0.05);
        this.block.setImmovable(true);
        this.block.body.allowGravity = false; // So gravity has no effect ground
    
        // Colliders
        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.
        this.physics.add.collider(this.block, this.ground); // Collider between block and ground.
        this.physics.add.collider(this.player, this.block); // Collider between player and block.
    }

    update(){
        // Debugging mode features
        debugUpdate(this);

        this.player.update(); // Update function in player.js

        //this.physics.add.overlap(this.player, this.block, this.checkSlidyBlock(), null, this);
    }
}