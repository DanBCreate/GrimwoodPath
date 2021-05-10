

class Cave extends Phaser.Scene {
    constructor(){
        super('caveScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this); 



    }
    update(){
        debugUpdate(this);

    }

}