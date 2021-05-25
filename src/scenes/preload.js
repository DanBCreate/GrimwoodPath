class Preload extends Phaser.Scene {
    constructor(){
        super('preloadScene')
    }

    preload(){
        this.load.image('ravineBG','assets/ravine/insideRavineBG.png')
    }

    create(){
        this.scene.start('menuScene')
    }
}