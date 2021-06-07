class NoBro extends Phaser.Scene {
    constructor(){
        super('noBroScene')
    }

    create(){
        //debugging mode features
        debugCreate(this);      

        this.cameras.main.fadeIn(650);
        this.timesequence = 0

        //first vignette
        this.backGround = this.add.sprite(screenWidth,screenHeight,'forBG').setOrigin(1)
        this.backTree3 =  this.add.sprite(screenWidth,screenHeight,'forTree3').setOrigin(1)
        this.backTree4 =  this.add.sprite(screenWidth,screenHeight,'forTree4').setOrigin(1)
        this.backTree2 =  this.add.sprite(screenWidth,screenHeight,'forTree2').setOrigin(1)
        this.backTree1 =  this.add.sprite(screenWidth,screenHeight,'forTree1').setOrigin(1)
        this.backFog =    this.add.sprite(screenWidth,screenHeight,'forFog').setOrigin(1)
        this.forGround =  this.add.sprite(screenWidth,screenHeight,'for2Ground').setOrigin(1)
        this.car = new SlidySprite(this,0,2*screenHeight/3,'carAnim').setOrigin(0.5)
        this.add.existing(this.car)
        this.car.anims.play('drive')
        //animate
        this.car.slide(screenWidth,2*screenHeight/3,3000)
        this.timesequence+=2000//duration of scene

        //wipe vignette
        RLWipe(this,2000,'wipeTree',2000)
        this.timesequence += 1000 //half of transition

        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.car.destroy()
                this.scene.start('thanksScene')
            }
        })

        this.add.text(screenWidth/2,screenHeight/2,'You abandoned your bro\n',textConfig).setOrigin(0.5)
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