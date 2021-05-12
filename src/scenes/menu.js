

class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene')
    }

    preload(){
        this.load.image('forest','assets/tempAssets/tempForest.png')
        this.load.image('car','assets/tempAssets/car.png')
    }
    create(){

        //debugging mode features
        debugCreate(this);
        this.background = this.add.tileSprite(0,0,screenWidth,screenHeight,'forest').setOrigin(0)
        this.car = this.add.sprite(screenWidth/3,890,'car').setOrigin(0.5)
        this.tweens.add({
            targets:this.car,
            x: 2*screenWidth/3,
            duration: 10000,
            yoyo: true,
            ease:'Quad.InOut',
            loop: -1
        })

        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '100px',
            color: '#FF0000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }    
        this.add.text(screenWidth/2,screenHeight/2,'press 2 to start',this.textConfig).setOrigin(0.5)


    }
    update(){
        //debugging mode features
        debugUpdate(this);
        this.background.tilePositionX +=10
    }

}