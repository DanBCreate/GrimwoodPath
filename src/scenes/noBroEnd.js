

class NoBro extends Phaser.Scene {
    constructor(){
        super('noBroScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);      
        this.add.text(screenWidth/2,screenHeight/2,'You abandoned your bro',textConfig).setOrigin(0.5)


    }
    update(){
        //debugging mode features
        debugUpdate(this);

    }

}