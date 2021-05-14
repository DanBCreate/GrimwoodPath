

class LForest extends Phaser.Scene {
    constructor(){
        super('lForestScene')
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

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.05); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)

        //collide with the ground
        this.physics.add.collider(this.player, this.ground);



    }
    update(){
        //debugging mode features
        debugUpdate(this);
        this.player.update();

    }

}