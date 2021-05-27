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
        keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // Players movement settings
        this.jumpHeight = -700;
        this.actionButton = false;
        this.bufferY = 50; // This will control the ability to push/pull while on top of a block
        this.currentAnimKey;
        this.direction = 0; // 0 is Right 1 is Left
        
        // Player SFX Settings
        this.sfxLock = false;
        this.jumpLock = false;
        this.sfxConfigGrass = {
            volume: 0.25,
            loop: true
        } 
        this.sfxConfigStone = {
            volume: 0.3,
            loop: true
        } 
        this.sfxConfigJump = {
            volume: 0.11,
            loop: false
        } 
        this.sfxConfigOw = {
            volume: 0.25,
            loop: false
        } 
        this.grass = this.scene.sound.add('grassFootstep');
        this.stone = this.scene.sound.add('stoneFootstep');
        this.jump = this.scene.sound.add('jump');
        this.ow = this.scene.sound.add('ow');
        this.stone.setRate(0.95);
    }

    update(){
        // Controls the players movement and SFX sounds
        if(fallen){
            this.playerControls(); 
        }   
    }

    playerControls(){
        if(keyA.isDown){ // A Key 
            this.setVelocityX(-playerMovementSpeed); 
            this.direction = 1;

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
            this.direction = 1;

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
            this.direction = 0;

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
            this.direction = 0;

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
            if(fallen) {
                if(this.direction == 1){
                    this.anims.play('IdleRight');
                }
                else{
                    this.anims.play('IdleLeft');
                }
            }

            this.sfxLock = false;
            this.grass.stop();
            this.stone.stop();
        }
        // W key || UP arrow  <Only allows jumping when on a physics 'body'>
        if(keyW.isDown && this.body.velocity.y === 0  && this.actionButton == false){
            this.jump.play(this.sfxConfigJump);
            this.setVelocityY(this.jumpHeight);
        }

        if(keyUP.isDown && this.body.velocity.y === 0 && this.actionButton == false){
            this.jump.play(this.sfxConfigJump);
            this.setVelocityY(this.jumpHeight);
        }

        // SPACE key <Used for interacting with objects>
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.body.touching.down){
            this.actionButton = true;
        }
        else if(Phaser.Input.Keyboard.JustUp(keySPACE)){
            this.actionButton = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyS) && this.body.touching.down){
            this.actionButton = true;
        }
        else if(Phaser.Input.Keyboard.JustUp(keyS)){
            this.actionButton = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.body.touching.down){
            this.actionButton = true;
        }
        else if(Phaser.Input.Keyboard.JustUp(keyDOWN)){
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

    ravineFall(){
        if(this.y < 885 && !fallen){
            this.setTexture('fall');
        }
        else if(!fallen){
            fallen = true;
            this.ow.play(this.sfxConfigOw);
            this.think('my leg hurts,\nmaybe I can find something to splint it')
        }
    }

    think(text,duration = 5000){
            this.scene.playerThoughts = this.scene.add.text(this.x,this.y - 200,text,playerTextConfig).setOrigin(0.5)
            this.scene.time.addEvent({
                delay: duration,
                callback: () => {
                    this.scene.playerThoughts.destroy()
                    console.log('ping')
                }
            })
    }
}