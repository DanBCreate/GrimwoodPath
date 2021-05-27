

class SEnd extends Phaser.Scene {
    constructor(){
        super('sEndScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);   
        this.explainText = this.add.text(screenWidth/2,screenHeight/2,'your bro is sad about leaving his baby monster friend behind',textConfig).setOrigin(0.5)
        this.explainText.setFontSize('30px')



    }
    update(){
        //debugging mode features
        debugUpdate(this);

    }

}