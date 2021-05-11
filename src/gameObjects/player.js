class player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);     
    }

    create(){
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = this.physics.add.group({
            defaultKey: texture,
        });
    }

    update(){
        //player.setVelocityX(-160);
        //if(keyLEFT.isDown) {
        //    console.log("test");
            
        //}
        //if(keyRIGHT.isDown) {
        //}

    }
}