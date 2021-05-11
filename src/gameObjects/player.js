class player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);     
    }

    create(){
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        this.setCollideWorldBounds(true); // Collides with world bounds

        //this.setVelocity(200);
        //player.setVelocityX(-160);
        //if(keyLEFT.isDown) {
        //    console.log("test");
            
        //}
        //if(keyRIGHT.isDown) {
        //}

    }
}