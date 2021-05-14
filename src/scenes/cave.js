

class Cave extends Phaser.Scene {
    constructor(){
        super('caveScene')
    }

    preload(){
        this.screentint =this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
        this.tweens.add({
            targets: this.screentint,
            alpha: 0,
            duration: 10000,     
            ease: 'linear'               
        })
    }
    create(){

        //debugging mode features
        debugCreate(this); 



    }
    update(){
        debugUpdate(this);

    }

}