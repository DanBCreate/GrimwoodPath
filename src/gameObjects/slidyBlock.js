// slidyBlock.js
// Class for our slidable blocks
// Utilizes arcade physics
//
// __Functions_Below__
// checkProximity(playerX): Checks to see if you are near a block to be able to push/pull it
// setMovable(movable, player): Sets the players x value if we are able to move the block


class slidyBlock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);   
        
        // Used for moving the block with the player
        this.movable = false;
        this.playerX = 0;
    }

    create(){
        // Used for initially spawning the block
        this.block.body.allowGravity = true; 
        this.setVelocityX(0);

    }

    update(){    
        // Moves the block with the player
        if(this.movable == true){
            this.setImmovable(false);
            this.setVelocityX(this.playerX);
        }
        else{
            this.setVelocityX(0);
        }

        // Collides with world bounds
        this.setCollideWorldBounds(true); 
    }

    checkProximity(playerX){
        if(Math.abs(playerX - this.x) < 120){
            return true;
        }
    }

    setMovable(movable, player){
        if(movable == true){
            this.playerX = player;
            this.movable = true;
        }
        else{
            this.playerX = 0;
            this.movable = false;
        }
    }
}