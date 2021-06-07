//SlidySprite.js
//creates a sprite object with attached tween functions for sliding and rotation
//
// __Functions_Below__
// slide(x,y,time,delay,easy): Slides over the sprite with a tween
// rotate(angle, time, delay, easy): Rotates a sprite with a tween

class SlidySprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,frame){
    super(scene,x,y,texture,frame)
    }

    //tween from current position to x,y over time (in miliseconds)
    slide(x,y,time, delay = 0, ease = 'Linear'){
        this.scene.time.addEvent({
            delay:delay,
            callback: () =>{
                this.scene.tweens.add({
                    targets: this,
                    x: x,
                    y: y,
                    ease:ease,
                    duration: time
                })
            }
        })
    }

    //tween from current angle to angle over time(in miliseconds)
    rotate(angle,time, delay = 0, ease = 'Linear'){
        this.scene.time.addEvent({
            delay:delay,
            callback: () =>{
                this.scene.tweens.add({
                    targets: this,
                    angle: angle,
                    ease: ease,
                    duration: time
                })
            }
        })

    }  
}