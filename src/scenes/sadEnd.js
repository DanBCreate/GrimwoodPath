class SEnd extends Phaser.Scene {
    constructor(){
        super('sEndScene')
    }

    create(){
        //debugging mode features
        debugCreate(this);   

        this.cameras.main.fadeIn(650);
        this.timesequence = 0
        this.wipetime = 2000

        // Adding in SFX
        this.sfxConfigGrass = {
            volume: 0.5,
            loop: false
        } 
        this.sfxConfigPiano = {
            volume: 0.9,
            loop: false
        }
        this.sfxConfigBush = {
            volume: 1.7,
            loop: false
        }
        this.grass = this.sound.add('grassFootstep');
        this.piano = this.sound.add('endPiano');
        this.engine = this.sound.add('endEngine');
        this.sadPiano = this.sound.add('endSadPiano');
        this.bush = this.sound.add('bushRustle');

        //first vignette
        this.grass.play(this.sfxConfigGrass);
        this.time.addEvent({ //fade to black
            delay: 300,
            callback: () =>{
                this.grass.play(this.sfxConfigGrass);
                this.time.addEvent({ //fade to black
                    delay: 300,
                    callback: () =>{
                        this.grass.play(this.sfxConfigGrass);
        
                    }
                })
            }
        })
        this.backForest = new SlidySprite(this,0,0,'fullForest').setOrigin(0)
        this.add.existing(this.backForest)
        this.runner = new SlidySprite(this,screenWidth/3,screenHeight/2+100,'run').setOrigin(0.5)
        this.add.existing(this.runner)
        this.runner.slide(screenWidth,screenHeight/2+100,10000)

        this.timesequence += 2500 //duration of vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)
        this.timesequence += this.wipetime/2 //time for middle of transition
        
        //second vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.piano.play(this.sfxConfigPiano);
                //remove last vignette
                this.runner.destroy()
                //create this vignette
                this.blackFog = new SlidySprite(this,screenWidth/2 - 200,screenHeight/2+50,'darkClouds').setOrigin(0.5)
                this.add.existing(this.blackFog)
                this.atPlay = new SlidySprite(this,screenWidth/2,screenHeight/2+160,'atPlay').setOrigin(0.5)
                this.add.existing(this.atPlay)
                //prep for next vignette
                this.blanker = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)//big blanker prevents unwanted things showing during blanked camera moves
                this.blanker.displayWidth = screenWidth*2
                this.blanker.displayHeight = screenHeight*2
                this.blanker.alpha = 0
                this.blanker.depth = 200
            }
        })

        this.timesequence+=2500 // duration of scene
        //blank scene
        this.fade(500)
        this.timesequence+=500 //half of transition

        //third vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.bush.play(this.sfxConfigBush);
                //remove last vignette
                this.atPlay.destroy()
                //create this vignette
                this.jumping = new SlidySprite(this,screenWidth/2,screenHeight/2+75,'altPlay').setOrigin(0.5)
                this.add.existing(this.jumping)
            }
        })

        this.timesequence+=2500 // duration of scene
        //blank scene
        this.fade(500)
        this.timesequence+=500 //half of transition

        //fourth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.jumping.destroy()
                this.blackFog.destroy()
                //create this vignette
                this.eyeFog = new SlidySprite(this,screenWidth/2 - 200,screenHeight/2+50,'eyeClouds').setOrigin(0.5)
                this.add.existing(this.eyeFog)
                this.grabbed = new SlidySprite(this,screenWidth/2,screenHeight/2+75,'grabRun').setOrigin(0.5)
                this.add.existing(this.grabbed)
            }
        })

        this.timesequence+=2500 // duration of scene
        //blank scene
        this.fade(500)
        this.timesequence+=500 //half of transition

        //fifth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.eyeFog.destroy()
                this.grabbed.destroy()
                this.backForest.destroy()
                //create this vignette
                this.lot = new SlidySprite(this,0,0,'parkingLot').setOrigin(0)
                this.add.existing(this.lot)
                this.car = new SlidySprite(this,screenWidth/2 - 200,2*screenHeight/3,'carAnim').setOrigin(0.5)
                this.add.existing(this.car)
                this.car.anims.play('drive')
                this.car.anims.pause()
                this.car.flipX = true
                this.pulled = new SlidySprite(this,screenWidth/2,screenHeight/2+75,'pulledAlong').setOrigin(0.5)
                this.add.existing(this.pulled)
                //animate
                this.pulled.slide(screenWidth/2 - 200,screenHeight/2+75,3000)
            }
        })

        this.timesequence += 2500 //duration of vignette
        LRWipe(this,this.wipetime,'wipeTree',this.timesequence)
        this.timesequence += this.wipetime/2 //time for middle of transition

        //fifth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.time.addEvent({
                    delay: 1000,
                    callback: () =>{
                        this.sadPiano.play(this.sfxConfigPiano);
                    }
                })
                this.engine.play(this.sfxConfigGrass);
                //remove last vignette
                this.pulled.destroy()
                //animate
                this.car.anims.play('drive')
                this.car.slide(0,2*screenHeight/3,3000)
            }
        })

        this.timesequence += 3000 //duration of vignette
        LRWipe(this,this.wipetime,'wipeTree',this.timesequence)
        this.timesequence += this.wipetime/2 //time for middle of transition

        //sixth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.car.destroy()
                //create this vignette
                this.forgot = new SlidySprite(this,screenWidth/2,screenHeight/2,'youForgot').setOrigin(0.5).setScale(-0.9,0.9)
                this.add.existing(this.forgot)
                //animate
            }
        })

        this.timesequence+=3500
        //blank scene
        this.fade(1000)
        this.timesequence+=1000

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

    fade(time){
        //blank scene
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.tweens.add({
                    targets: this.blanker,
                    alpha: 1,
                    duration:time,
                    yoyo:true
                })
                        
            }
        })
    }

}