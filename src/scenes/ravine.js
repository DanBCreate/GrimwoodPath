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
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = screenWidth;
        this.ground.setOrigin(0.5,1)

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        
        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.
    }

    update(){
        // Debugging mode features
        debugUpdate(this);

        // Update functions for our gameObjects
        this.player.update();

    }
}