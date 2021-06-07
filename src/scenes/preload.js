class Preload extends Phaser.Scene {
    constructor(){
        super('preloadScene')
    }

    preload(){
        this.load.image('ravineBG','assets/ravine/insideRavineBG.png')
        this.load.audio('loadingMusic', 'assets/sounds/VisionOfLight.wav');
    }

    create(){
        this.scene.start('menuScene')
    }
}