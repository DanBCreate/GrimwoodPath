class NoBro extends Phaser.Scene {
    constructor(){
        super('noBroScene')
    }

    create(){
        //debugging mode features
        debugCreate(this);      

        this.cameras.main.fadeIn(650);

        this.add.text(screenWidth/2,screenHeight/2,'You abandoned your bro\n' + favKeys + ' to menu',textConfig).setOrigin(0.5)
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