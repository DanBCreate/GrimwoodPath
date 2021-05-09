//SlidySprite.js
//creates a sprite object with attached tween functions for sliding and rotation

class SlidySprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,frame){
    super(scene,x,y,texture,frame)
    }

    //tween from current position to x,y over time (in miliseconds)
    slide(x,y,time, ease = 'liner'){
        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            ease:ease,
            duration: time
        })
    }

    //tween from current angle to angle over time(in miliseconds)
    rotate(angle,time,ease = 'liner'){
        this.scene.tweens.add({
            targets: this,
            angle: angle,
            ease: ease,
            duration: time
        })
    }  
}