
class HEnd extends Phaser.Scene {
    constructor(){
        super('hEndScene')
        this.happy = false
    }

    preload(){

    }
    create(){

        //debugging mode features
        debugCreate(this);      
        if(favKeys === '[↓]'){
            this.leftkey = "[⟵]"
            this.rightkey = "[⟶]"
        }
        else{
            this.leftkey = '[a]'
            this.rightkey = '[d]'
        }
        this.explainText = this.add.text(screenWidth/2,screenHeight/2,'You found your bro, and two monsters',textConfig).setOrigin(0.5)
        this.explainText.setFontSize('30px')
        this.fleeText = this.add.text(screenWidth,screenHeight,this.rightkey + ' Grab bro and run',textConfig).setOrigin(1)
        this.fleeText.setFontSize('30px')
        this.sneakText = this.add.text(0,screenHeight,this.leftkey + 'Sneak bro out',textConfig).setOrigin(0,1)
        this.sneakText.setFontSize('30px')


        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)


    }
    update(){
        //debugging mode features
        debugUpdate(this);

        if(Phaser.Input.Keyboard.JustDown(keyA) || Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.hendCutscene()
            this.explainText.destroy()
            this.fleeText.destroy()
            this.sneakText.destroy()
        }
        else if(Phaser.Input.Keyboard.JustDown(keyD) || Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('sEndScene')
        }
        if(this.happy){
            if(Phaser.Input.Keyboard.JustDown(keyS)){this.scene.start('menuScene')}
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)){this.scene.start('menuScene')}
        }

    }

    hendCutscene(){
        //happy ending cutscene here
        this.happyText = this.add.text(screenWidth/2,screenHeight/2,'Your Bro interupts your urge for stealth to say goodby to  the baby monster\n' + favKeys + 'to menu',textConfig).setOrigin(0.5)
        this.happyText.setFontSize('30px')
        this.happy = true
    }

}
