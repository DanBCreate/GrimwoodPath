

class Ravine extends Phaser.Scene {
    constructor(){
        super('ravineScene')
    }

    preload(){
        this.load.image('player', 'assets/tempAssets/tempPlayer.png'); // Player Asset
        this.load.image('ground', 'assets/tempAssets/tempGround.png'); // Ground Asset
    }

    create(){
        //debugging mode features
        debugCreate(this);     

        this.ground = this.physics.add.sprite(screenCenterX, screenCenterY + screenCenterY /2, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable

        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
    
        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.
    }

    update(){
        //debugging mode features
        debugUpdate(this);

        this.player.update(); // Update function in player.js

    }
}