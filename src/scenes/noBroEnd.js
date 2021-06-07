class NoBro extends Phaser.Scene {
    constructor(){
        super('noBroScene')
    }

    create(){
        //debugging mode features
        debugCreate(this);      

        this.cameras.main.fadeIn(650);
        this.timesequence = 0

        // Adding in SFX
        this.sfxConfigEngine = {
            volume: 0.5,
            loop: false
        } 
        this.sfxConfig = {
            volume: 0.9,
            loop: false
        } 
        this.engine = this.sound.add('endEngine');
        this.piano = this.sound.add('endBadPiano');
        this.engine.play(this.sfxConfigEngine);
        this.piano.play(this.sfxConfig);

        this.time.addEvent({
            delay: 300,
            callback: () =>{
            }
        })

        //first vignette
        this.backGround = this.add.sprite(screenWidth,screenHeight,'forBG').setOrigin(1)
        this.backTree3 = this.add.sprite(screenWidth,screenHeight,'forTree3').setOrigin(1)
        this.backTree4 = this.add.sprite(screenWidth,screenHeight,'forTree4').setOrigin(1)
        this.backTree2 = this.add.sprite(screenWidth,screenHeight,'forTree2').setOrigin(1)
        this.backTree1 = this.add.sprite(screenWidth,screenHeight,'forTree1').setOrigin(1)
        this.backFog = this.add.sprite(screenWidth,screenHeight,'forFog').setOrigin(1)
        this.forGround = this.add.sprite(screenWidth,screenHeight,'for2Ground').setOrigin(1)

        this.car = new SlidySprite(this,screenWidth/2 - 200,2*screenHeight/3,'carAnim').setOrigin(0.5)
        this.add.existing(this.car)
        this.car.anims.play('drive')
        this.car.slide(screenWidth,2*screenHeight/3,3000)

        //animate
        this.car.slide(screenWidth,2*screenHeight/3,3000)
        this.timesequence+=2000//duration of scene

        //wipe vignette
        RLWipe(this,2000,'wipeTree',2000)
        this.timesequence += 1000 //half of transition

        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //destroy precious scene
                this.car.destroy()

                this.leftBehind = new SlidySprite(this,screenWidth/2-100,screenHeight/2,'youDoneFd').setOrigin(0.5)
                this.add.existing(this.leftBehind)
            }
        })
        this.timesequence+=3000

        //fade to black
        this.blanker = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blanker.displayWidth = screenWidth*2
        this.blanker.displayHeight = screenHeight*2
        this.blanker.alpha = 0
        this.blanker.depth = 200
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.tweens.add({
                    targets: this.blanker,
                    alpha: 1,
                    duration:1000,
                })
                        
            }
        })
        this.timesequence+=1000
        //bump to thanks scene
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.scene.start('thanksScene')                      
            }
        })

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }
    update(){
        //debugging mode features
        debugUpdate(this);
    }
}