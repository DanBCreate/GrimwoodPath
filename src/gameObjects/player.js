// player.js
// Class for our playable character
// Utilizes arcade physics
//
// __Functions_Below__
// playerControls(): Handles the movement and controls of the player
// getAction(blockY): Returns true if we are using the interact button, false otherwise. Disables pushing/pulling when ontop of block

// Keyboard inputs for player.js
let keyA, keyD, keyW, keyLEFT, keyRIGHT, keyUP, keySPACE;

class player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);    

        // Defining our keys
        keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Used for smoothing movement
        this.isMovingLeft = false;
        this.isMovingRight = false;

        // Players movement settings
        this.jumpHeight = -400;
        this.actionButton = false;
        this.bufferY = 50; // This will control the ability to push/pull while on top of a block
        this.currentAnimKey;
    }

    create(){
    }

    update(){
        // Controls the players movement
        this.playerControls(); 
    }

    playerControls(){
        if(keyA.isDown){ // A Key 
            this.setVelocityX(-playerMovementSpeed); 
            this.isMovingLeft = true; 
            this.isMovingRight = false;
            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkL'){
                this.anims.play('walkL')
            }
            this.currentAnimKey ='walkL'
        }
        else if(keyLEFT.isDown){ // LEFT Key
            this.setVelocityX(-playerMovementSpeed); 
            this.isMovingLeft = true; 
            this.isMovingRight = false;
            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkL'){
                this.anims.play('walkL')
            }
            this.currentAnimKey ='walkL'
        }
        else if(keyD.isDown){ // D Key
            this.setVelocityX(playerMovementSpeed); 
            this.isMovingRight = true; 
            this.isMovingLeft = false;
            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkR'){
                this.anims.play('walkR')
            }
            this.currentAnimKey ='walkR'
        }
        else if(keyRIGHT.isDown){ // RIGHT Key
            this.setVelocityX(playerMovementSpeed); 
            this.isMovingRight = true; 
            this.isMovingLeft = false;
            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkR'){
                this.anims.play('walkR')
            }
            this.currentAnimKey ='walkR'
        }
        else{ // Stop movement
            this.setVelocityX(0)
            this.isMovingRight = false;
            this.isMovingLeft = false;
            this.anims.pause()
        }
        // W key || UP arrow  <Only allows jumping when on a physics 'body'>
        if(keyW.isDown && this.body.velocity.y === 0  && this.actionButton == false){
            this.setVelocityY(this.jumpHeight);
        }

        if(keyUP.isDown && this.body.velocity.y === 0 && this.actionButton == false){
            this.setVelocityY(this.jumpHeight);
        }

        // SPACE key <Used for interacting with objects>
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.body.touching.down){
            this.actionButton = true;
        }
        else if(Phaser.Input.Keyboard.JustUp(keySPACE)){
            this.actionButton = false;
        }

        // Collides with world bounds
        this.setCollideWorldBounds(true); 
    }

    getAction(blockY){
        if(this.actionButton == true && this.y >= blockY - this.bufferY){
            return true;
        }
        else{
            return false;
        }
    }
}