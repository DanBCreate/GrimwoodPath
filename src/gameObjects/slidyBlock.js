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

        this.helpText = this.scene.add.text(this.x, this.y - 5, favKeys +" Hold to Push/Pull", textConfig).setOrigin(0.5).setFontSize(40);
        this.helpText.setVisible(false);

        // Sound of Sliding
        this.sfxConfigSlide = {
            volume: 12,
            loop: true
        } 
        this.slide = this.scene.sound.add('slide');
        this.slideLock = false;
    }

    update(){    
        // Moves the block with the player
        if(this.movable == true){
            this.setImmovable(false);
            this.setVelocityX(this.playerX);
            if(this.slideLock == false){
                this.slide.play(this.sfxConfigSlide);
                this.slideLock = true;
            }

        }
        else{
            this.setVelocityX(0);
            this.setPushable(false);
            this.slide.stop();
            this.slideLock = false;
        }
    }

    checkProximity(playerX){
        if(Math.abs(playerX - this.x) < 150){
            this.helpText.x = this.x;
            this.helpText.y = this.y - 100;
            this.helpText.setVisible(true);
            return true;
        }
        else{
            this.helpText.setVisible(false);
        }
    }

    setMovable(movable, player){
        if(movable == true){
            this.playerX = player;
            this.movable = true;
            this.helpText.setVisible(false);
        }
        else{
            this.playerX = 0;
            this.movable = false;
        }
    }
}