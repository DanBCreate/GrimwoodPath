


class Opening extends Phaser.Scene {
    constructor(){
        super('openingScene')
    }

    preload(){
    }
    create(){

        //debugging mode features
        debugCreate(this);

        this.timesequence = 0;
        
        //first vignette
        this.car = new SlidySprite(this,0,screenHeight/2,'car').setOrigin(0)
        this.add.existing(this.car);
        this.car.slide(screenWidth/2,screenHeight/2,2000);
        
        //black out first vignette
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

        //black second vignette
        RLWipe(this,3000,'wipeTree',2500)

        //third vignette
        this.time.addEvent({
            delay: 4000,
            callback: () =>{
                this.trail.destroy()
                this.forestPath = new SlidySprite(this,0,0,'forest').setOrigin(0)
                this.add.existing(this.forestPath)
                this.mainCharacter = new SlidySprite(this,500,700,'dude').setOrigin(0)
                this.add.existing(this.mainCharacter)
                this.sideCharacter = new SlidySprite(this,200,700,'dude').setOrigin(0)
                this.add.existing(this.sideCharacter)
                this.mainCharacter.slide(screenWidth,700,6000)
                this.sideCharacter.slide(screenWidth,700,8000)
                this.forestPath.slide(-100,0,6000)

            }
        })

        //blank blank third vinette
        RLWipe(this,4000,'wipeTree',6000)

        //fourth vignette
        this.time.addEvent({
            delay: 8000,
            callback: ()=> {
                this.mainCharacter.destroy()
                this.sideCharacter.destroy()
                this.forestPath.destroy()
                this.forestPath = new SlidySprite(this,0,0,'forest').setOrigin(0)
                this.add.existing(this.forestPath)
                this.mainCharacter = new SlidySprite(this,800,700,'dude').setOrigin(0)
                this.add.existing(this.mainCharacter)   
                this.mainCharacter.slide(900,700,2000)
                this.mainCharacter.slide(850,700,500,2050)
                this.mainCharacter.slide(860,700,200,2600)
                this.mainCharacter.slide(200,700,1000,2850)


            }
        })

        //blank fourth vignette
        LRWipe(this,2000,'wipeTree',11500)

        //fifth vignette
        this.time.addEvent({
            delay: 12500,
            callback: ()=> {
                this.mainCharacter.destroy()
                this.forestPath.destroy()
                this.forestPath = new SlidySprite(this,0,0,'forest').setOrigin(0)
                this.add.existing(this.forestPath)
                this.mainCharacter = new SlidySprite(this,screenWidth,700,'dude').setOrigin(0)
                this.add.existing(this.mainCharacter) 
                this.monster = new SlidySprite(this,200,200,'dude').setOrigin(0)
                this.add.existing(this.monster) 
                this.monster.displayHeight = 600;
                this.mainCharacter.slide(screenWidth-200,700,1000)
                this.mainCharacter.slide(screenWidth-200,500,500,1000)
                this.mainCharacter.slide(screenWidth-200,700,500,1500)
                this.mainCharacter.slide(screenWidth,700,1000,2000)
                this.monster.slide(screenWidth/2,200,6000)
            }

        })

        //blank fifth vignette
        RLWipe(this,2000,'wipeTree',16000)

        //sixth vignette
        this.time.addEvent({
            delay: 17000,
            callback: ()=> {
                this.mainCharacter.destroy()
                this.forestPath.destroy()
                this.monster.destroy()
                this.forestPath = new SlidySprite(this,-screenWidth/2,0,'forest').setOrigin(0)
                this.add.existing(this.forestPath)
                this.mainCharacter = new SlidySprite(this,screenWidth/3,700,'dude').setOrigin(0)
                this.add.existing(this.mainCharacter) 
                this.monster = new SlidySprite(this,100,200,'dude').setOrigin(0)
                this.add.existing(this.monster) 
                this.monster.displayHeight = 600;
                this.monster.slide(screenWidth/2-50,200,4000)
                this.mainCharacter.slide(screenWidth/2+50,700,1000)
                this.mainCharacter.slide(screenWidth/2+50,screenHeight+200,1000,1000)
                this.mainCharacter.rotate(90,1000,1000)

            }

        })

        //blank sixth vignette
        RLWipe(this,2000,'wipeTree',20500)

        //end scene
        this.time.addEvent({
            delay: 19500,
            callback: ()=> {
                this.scene.start('ravineScene')
            }

        })

        
    }
    update(){
        debugUpdate(this)
    }

}

