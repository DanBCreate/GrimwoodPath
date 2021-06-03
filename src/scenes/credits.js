

class Credit extends Phaser.Scene {
    constructor(){
        super('creditScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
       debugCreate(this);   

       // Setting up our back key to go back to menu
       keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
       this.backText = this.add.text(screenWidth - 110, 30, 'Back [ESC]', textConfig).setOrigin(0.5);
       this.backText.setFontSize('30px');


    }
    update(){
        //debugging mode features
        debugUpdate(this);

        // If back button is chosen
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene')
        }
    }

}