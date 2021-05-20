// player.js
// Class for our playable character
// Utilizes arcade physics
//
// __Functions_Below__
// playerControls(): Handles the movement and controls of the player. Also handles footstep SFX
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

        // Players movement settings
        this.jumpHeight = -700;
        this.actionButton = false;
        this.bufferY = 50; // This will control the ability to push/pull while on top of a block
        this.currentAnimKey;
        
        // Player SFX Settings
        this.sfxLock = false;
        this.jumpLock = false;
        this.sfxConfigGrass = {
            volume: 0.22,
            loop: true
        } 
        this.sfxConfigStone = {
            volume: 0.28,
            loop: true
        } 
        this.grass = this.scene.sound.add('grassFootstep');
        this.stone = this.scene.sound.add('stoneFootstep');
        this.stone.setRate(0.95);
    }

    update(){
        // Controls the players movement and SFX sounds
        this.playerControls(); 
    }

    playerControls(){
        if(keyA.isDown){ // A Key 
            this.setVelocityX(-playerMovementSpeed); 

            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkL'){
                this.anims.play('walkL')
            }
            this.currentAnimKey ='walkL'

            if(this.sfxLock == false && this.scene == game.scene.getScene("fForestScene")){
                this.grass.play(this.sfxConfigGrass);
                this.sfxLock = true;
            }
            else if(this.sfxLock == false){
                this.stone.play(this.sfxConfigStone);
                this.sfxLock = true;
            }
            if(this.body.velocity.y != 0){
                this.grass.stop();
                this.stone.stop();
                this.jumpLock = true;
            }
            else {
                if(this.jumpLock == true){
                    this.sfxLock = false;
                    this.jumpLock = false;
                }
            }
        }
        else if(keyLEFT.isDown){ // LEFT Key
            this.setVelocityX(-playerMovementSpeed); 

            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkL'){
                this.anims.play('walkL')
            }
            this.currentAnimKey ='walkL'

            if(this.sfxLock == false && this.scene == game.scene.getScene("fForestScene")){
                this.grass.play(this.sfxConfigGrass);
                this.sfxLock = true;
            }
            else if(this.sfxLock == false){
                this.stone.play(this.sfxConfigStone);
                this.sfxLock = true;
            }
            if(this.body.velocity.y != 0){
                this.grass.stop();
                this.stone.stop();
                this.jumpLock = true;
            }
            else {
                if(this.jumpLock == true){
                    this.sfxLock = false;
                    this.jumpLock = false;
                }
            }
        }
        else if(keyD.isDown){ // D Key
            this.setVelocityX(playerMovementSpeed); 

            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkR'){
                this.anims.play('walkR')
            }
            this.currentAnimKey ='walkR'

            if(this.sfxLock == false && this.scene == game.scene.getScene("fForestScene")){
                this.grass.play(this.sfxConfigGrass);
                this.sfxLock = true;
            }
            else if(this.sfxLock == false){
                this.stone.play(this.sfxConfigStone);
                this.sfxLock = true;
            }
            if(this.body.velocity.y != 0){
                this.grass.stop();
                this.stone.stop();
                this.jumpLock = true;
            }
            else {
                if(this.jumpLock == true){
                    this.sfxLock = false;
                    this.jumpLock = false;
                }
            }
        }
        else if(keyRIGHT.isDown){ // RIGHT Key
            this.setVelocityX(playerMovementSpeed); 

            if(!this.anims.isPlaying || this.anims.currentAnim.key != 'walkR'){
                this.anims.play('walkR')
            }
            this.currentAnimKey ='walkR'

            if(this.sfxLock == false && this.scene == game.scene.getScene("fForestScene")){
                this.grass.play(this.sfxConfigGrass);
                this.sfxLock = true;
            }
            else if(this.sfxLock == false){
                this.stone.play(this.sfxConfigStone);
                this.sfxLock = true;
            }
            if(this.body.velocity.y != 0){
                this.grass.stop();
                this.stone.stop();
                this.jumpLock = true;
            }
            else {
                if(this.jumpLock == true){
                    this.sfxLock = false;
                    this.jumpLock = false;
                }
            }
        }
        else{ // Stop movement
            this.setVelocityX(0)
            this.anims.pause()
            this.sfxLock = false;
            this.grass.stop();
            this.stone.stop();
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
        this.setCollideWorldBounds(false); 
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