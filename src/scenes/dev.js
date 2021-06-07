
class dev extends Phaser.Scene {
    constructor(){
        super('devScene')
    }
    create(){
        console.log('ping')
        this.add.text(screenWidth/2,0,'Dev options\n[a] toggle devmode\n[s] back',textConfig).setOrigin(0.5,0)
        this.debugMap = this.add.text(screenWidth/2,screenHeight,'map: [1]menu [2]Opening [3]Ravine [4]FForest\n[5]Cave [6]LForest [7]NoBro [8]SEnd [9]HEnd [0]Credit',textConfig).setOrigin(0.5,1)
        this.debugMap.setFontSize('40px')
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            if(debugToggle){
                debugToggle = false
                console.log(debugToggle)
            }
            else{debugToggle = true;console.log(debugToggle)}
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){this.scene.start('menuScene')}
    }
}