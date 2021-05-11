class slidyBlock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);    
    }

    create(){}

    update(){
        this.setCollideWorldBounds(true); 
    }
}