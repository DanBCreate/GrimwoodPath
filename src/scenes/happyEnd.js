
class HEnd extends Phaser.Scene {
    constructor(){
        super('hEndScene')
    }

    preload(){

    }
    create(){

        //debugging mode features
        if(debugToggle){        
            console.log('happy end');
            //debugging navigation keys
            key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)        
            key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
            key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
            key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
            key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
            key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
            key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
            key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT)
            key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)
            key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        }      



    }
    update(){
        //debugging mode features
        if(debugToggle){
            //debugging navigaiton checks
            if(Phaser.Input.Keyboard.JustDown(key1)){this.scene.start('menuScene')}
            if(Phaser.Input.Keyboard.JustDown(key2)){this.scene.start('openingScene')}
            if(Phaser.Input.Keyboard.JustDown(key3)){this.scene.start('ravineScene')}
            if(Phaser.Input.Keyboard.JustDown(key4)){this.scene.start('fForestScene')}
            if(Phaser.Input.Keyboard.JustDown(key5)){this.scene.start('caveScene')}
            if(Phaser.Input.Keyboard.JustDown(key6)){this.scene.start('lForestScene')}
            if(Phaser.Input.Keyboard.JustDown(key7)){this.scene.start('noBroScene')}
            if(Phaser.Input.Keyboard.JustDown(key8)){this.scene.start('sEndScene')}
            if(Phaser.Input.Keyboard.JustDown(key9)){this.scene.start('hEndScene')}
            if(Phaser.Input.Keyboard.JustDown(key0)){this.scene.start('creditScene')}
        }

    }

}
