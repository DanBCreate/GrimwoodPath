


class Opening extends Phaser.Scene {
    constructor(){
        super('openingScene')
    }

    preload(){
        //temp assets only, final asset to be loaded before menu
        this.load.image('wipeTree','assets/tempAssets/tempTree.png');
        this.load.image('car','assets/tempAssets/car.png');
        this.load.image('trail','assets/tempAssets/trail.png');
    }
    create(){

        //debugging mode features
        debugCreate(this);
        
        //first vignette
        this.car = new SlidySprite(this,0,screenHeight/2,'car').setOrigin(0)
        this.add.existing(this.car);
        this.car.slide(screenWidth/2,screenHeight/2,2000);
        
        //black out scene
        RLWipe(this,2000,'wipeTree',100)
        
        //second vignette
        this.time.addEvent({
            delay: 1100,
            callback: () =>{
                this.car.destroy()
                this.trail = new SlidySprite(this,0,0,'trail').setOrigin(0)
                this.add.existing(this.trail)
                this.trail.slide(-200,0,4000)
            }
        })

        //black screen
        RLWipe(this,4000,'wipeTree',2500)

        //third vignette
        this.time.addEvent({
            delay: 4500,
            callback: () =>{
                this.trail.destroy()
                this.scene.start('ravineScene')
            }
        })

        
    }
    update(){
        debugUpdate(this)

    }

}

