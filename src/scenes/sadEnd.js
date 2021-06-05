

class SEnd extends Phaser.Scene {
    constructor(){
        super('sEndScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);   

        this.cameras.main.fadeIn(650);

        this.explainText = this.add.text(screenWidth/2,screenHeight/2,'your bro is sad about leaving his baby monster friend behind\n' + favKeys + 'to menu',textConfig).setOrigin(0.5)
        this.explainText.setFontSize('30px')

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)



    }
    update(){
        //debugging mode features
        debugUpdate(this);
        if(Phaser.Input.Keyboard.JustDown(keyS)){this.scene.start('menuScene')}
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){this.scene.start('menuScene')}
    }

}