


class Opening extends Phaser.Scene {
    constructor(){
        super('openingScene')
    }

    preload(){
        this.load.image('wipeTree','assets/tempAssets/tempTree.png');
    }
    create(){

        //debugging mode features
        debugCreate(this);

        this.wipetree = new SlidySprite(this,screenWidth,0,'wipeTree').setOrigin(0.5,0);
        this.add.existing(this.wipetree);
        this.physics.add.existing(this.wipetree);
        this.wipebox = this.add.rectangle(screenWidth,0,screenWidth,screenHeight,0x000000).setOrigin(0)
        this.wipetime = 8000
        this.wipeBuffer =25
        this.wipetree.slide(0,0,this.wipetime/2)
        this.tweens.add({
            targets: this.wipebox,
            x: -screenWidth,
            ease: 'Linear',
            duration: this.wipetime
        })
        this.call = this.time.delayedCall(this.wipetime/2 + this.wipeBuffer,() =>{
            this.wipetree.x = screenWidth;
            this.wipetree.slide(0,0,this.wipetime/2);
        });
        
    }
    update(){
        debugUpdate(this)

    }

}