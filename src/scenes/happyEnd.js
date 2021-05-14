
class HEnd extends Phaser.Scene {
    constructor(){
        super('hEndScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);      
        this.add.text(screenWidth/2,screenHeight/2,'You found your bro, good job',textConfig).setOrigin(0.5)


    }
    update(){
        //debugging mode features
        debugUpdate(this);

    }

}
