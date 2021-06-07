//manages the clearing endings

class HEnd extends Phaser.Scene {
    constructor(){
        super('hEndScene')
        this.happy = false
    }

    create(){
        //debugging mode features
        debugCreate(this);      

        this.cameras.main.fadeIn(650);

        // Adding in SFX
        this.sfxConfigGrass = {
            volume: 0.5,
            loop: false
        } 
        this.grass = this.sound.add('grassFootstep');
        this.sfxConfigLaugh = {
            volume: 0.8,
            loop: false
        } 
        this.laugh = this.sound.add('childLaugh');
        this.sfxConfigSuspnse = {
            volume: 0.9,
            loop: false
        } 
        this.sfxConfig = {
            volume: 10,
            loop: false,
        }
        this.suspense = this.sound.add('suspense');
        this.shock = this.sound.add('shock');
        this.grab = this.sound.add('grab');
        this.happy = this.sound.add('happy');
        this.engine = this.sound.add('endEngine');
        this.drama = this.sound.add('endDrama');
        this.ambience = this.sound.add('nightAmbience');
        this.ambience.play(this.sfxConfig) ;

        this.timesequence = 0
        this.wipetime = 2500

        //first vignette
        this.grass.play(this.sfxConfigGrass);
        this.laugh.play(this.sfxConfigLaugh);
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
        this.backforest = new SlidySprite(this,0,0,'fullForest').setOrigin(0)
        this.add.existing(this.backforest)
        this.runner = new SlidySprite(this,screenWidth/3,screenHeight/2+100,'run').setOrigin(0.5)
        this.add.existing(this.runner)
        this.runner.slide(screenWidth,screenHeight/2+100,10000)
        this.callout = this.add.text(screenWidth/2 + 530, screenHeight/2 - 300, 'Brother...?', playerTextConfig).setOrigin(0.5);
        this.callout.setFontSize('250px');

        this.timesequence += 2000 //duration of vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)
        this.timesequence += this.wipetime/2 //time for middle of wipe

        //second vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.suspense.play(this.sfxConfigSuspense);
                //remove last vignette
                this.runner.destroy()
                this.callout.destroy()
                //create this vignette
                this.staring = new SlidySprite(this,screenWidth/2,screenHeight/2,'playerStare').setOrigin(0.5)
                this.add.existing(this.staring)
                //prep for next vignette
                this.blanker = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)//big blanker prevents unwanted things showing during blanked camera moves
                this.blanker.displayWidth = screenWidth*2
                this.blanker.displayHeight = screenHeight*2
                this.blanker.alpha = 0
                this.blanker.depth = 200
                //animate
                this.cameras.main.pan(screenWidth/2,screenHeight/2-30,2400) //duration + most of fade druation
                this.tweens.add({
                    targets: this.cameras.main,
                    zoom: 1.3,
                    duration:2400 //duration + most of fade druation
                })

            }
        })

        this.timesequence +=2000 //duration of scene

        this.time.addEvent({ //fade to black
            delay: this.timesequence,
            callback: () =>{
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 1,
                    duration:500,
                })
            }
        })
        this.timesequence+=500//duration of fade

        //third vignette
        this.time.addEvent({ //fade to black
            delay: this.timesequence,
            callback: () =>{
                this.shock.play(this.sfxConfigSuspense);
                //unfade and reset camera
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 0,
                    duration:500,//duration of unfade
                })
                this.cameras.main.pan(screenWidth/2,screenHeight/2,0)
                this.cameras.main.zoom = 1
                //destroy previous vignette
                this.staring.destroy()
                //create this vignette
                this.playing = new SlidySprite(this,screenWidth/2,screenHeight/2+200,'atPlay').setOrigin(0.5)
                this.add.existing(this.playing)
            }
        })

        this.timesequence+=2000 //duration of scene

        this.time.addEvent({ //fade to black
            delay: this.timesequence,
            callback: () =>{
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 1,
                    duration:500,
                })
            }
        })

        this.timesequence+=500//duration of fade

        //fourth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //unfade
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 0,
                    duration:500,//duration of unfade
                })
                this.grab.play(this.sfxConfigSuspense);
                //destroy previous vignette
                this.playing.destroy()
                //create this vignette
                this.scene.launch('hendOverlayScene')//creates the descision text overlays
                this.decisionTime = true //enables player input
                this.watch = new SlidySprite(this,2*screenWidth/3,screenHeight/2+150,'playerStand').setOrigin(0.5)
                this.add.existing(this.watch)
                this.arm = new SlidySprite(this,0,screenHeight/2-30,'reachHand').setOrigin(0,0.5).setScale(0.6)
                this.add.existing(this.arm)
                this.arm.depth = 10
                //animate
                this.cameras.main.pan(2*screenWidth/3,screenHeight/2-30,2600) //duration + most of fade druation
                this.tweens.add({
                    targets: this.cameras.main,
                    zoom: 2,
                    duration:2600 //duration + most of fade druation
                })
                this.arm.slide(screenWidth/3 + 100,screenHeight/2-30,2500)
                this.time.addEvent({ //fade to black
                    delay: 2500,
                    callback: () =>{
                        this.arm.slide(screenWidth/3 + 130, screenHeight/2+100,500)
                    }
                })
            }
        })

        this.timesequence +=3000 //duration of vignette

        //fifth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.decisionTime = false //dissables player input
                this.watch.destroy()
                this.traumaWatch = new SlidySprite(this,2*screenWidth/3-25,screenHeight/2+100,'traumaStand').setOrigin(0.5).setScale(0.6)
                this.add.existing(this.traumaWatch)
                this.tweens.add({
                    targets: [this.traumaWatch,this.arm],
                    x: '-=2',
                    duration:10,
                    yoyo:true,
                    repeat: -1
                })
                //fade to black
                this.tweens.add({
                    targets: this.blanker,
                    alpha:1,
                    duration:1000
                })
            }
        })

        this.timesequence+=2000//duration of vignette

        //sixth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //unfade and reset camera
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 0,
                    duration:500,//duration of unfade
                })
                this.cameras.main.pan(screenWidth/2,screenHeight/2,0)
                this.cameras.main.zoom = 1.2
                //destroy previous scene
                this.arm.destroy()
                this.traumaWatch.destroy()
                //create this scene
                this.monster = new SlidySprite(this,screenWidth/3,screenHeight/2,'noteMonster').setOrigin(0.5)
                this.add.existing(this.monster)
                this.turned = new SlidySprite(this,2*screenWidth/3,screenHeight/2+100,'turn').setOrigin(0.5)
                this.add.existing(this.turned)
                //animate
                this.turned.slide(2*screenWidth/3-100,screenHeight/2+100,1000)
                //add the text after a delay
                this.time.addEvent({
                    delay: 1000,
                    callback: () =>{
                        this.drama.play(this.sfxConfigSuspense);
                        this.voiced = new SlidySprite(this,2*screenWidth/3,screenHeight/2,'isKind').setOrigin(0.5)
                        this.add.existing(this.voiced)
                    }
                })
            }
        })

        this.timesequence+= 3000 //duration of vignette

        this.time.addEvent({ //fade to black
            delay: this.timesequence,
            callback: () =>{
                this.tweens.add({
                    targets:this.blanker,
                    alpha: 1,
                    duration:500,
                })
            }
        })

        this.timesequence+=500//duration of fade

        //seventh vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
               //unfade and reset camera
               this.tweens.add({
                    targets:this.blanker,
                    alpha: 0,
                    duration:500,//duration of unfade
                })
                this.happy.play(this.sfxConfigSuspense);
                this.cameras.main.pan(screenWidth/2,screenHeight/2,0)
                this.cameras.main.zoom = 1
                //destroy last vignette
                this.monster.destroy()
                this.voiced.destroy()
                this.turned.destroy()
                //create this vignette
                this.reunited = new SlidySprite(this,screenWidth/3,screenHeight/2 + 200,'reunion').setOrigin(0.5)
                this.add.existing(this.reunited)
                this.goodbye = new SlidySprite(this,3*screenWidth/4,screenHeight/2,'monsterGoodbye').setOrigin(0.5)
                this.add.existing(this.goodbye)
                //animate
                this.reunited.slide(screenWidth/3 - 200,screenHeight/2+200,3000)
            }
        })
        
        this.timesequence +=2500//duration of scene
        //wipe
        LRWipe(this,2000,'wipeTree',this.timesequence)
        this.timesequence +=1000 //half of transition

        //eighth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.engine.play(this.sfxConfigGrass);
                //destroy last vignette
                this.reunited.destroy()
                this.goodbye.destroy()
                //create this vignette
                this.car = new SlidySprite(this,0,2*screenHeight/3,'carAnim').setOrigin(0.5)
                this.add.existing(this.car)
                this.car.anims.play('drive')
                //animate
                this.car.slide(screenWidth,2*screenHeight/3,3000)
            }
        })

        this.timesequence +=2000//duration of vignette

        LRWipe(this,2000,'wipeTree',this.timesequence)
        this.timesequence+=1000//half of transition

        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.scene.start('thanksScene')
            }
        })
        


        //keys used for detecting inputs
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }
    update(){
        //debugging mode features
        debugUpdate(this);


        if(this.decisionTime){
            if(Phaser.Input.Keyboard.JustDown(keyA) || Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.stop('hendOverlayScene')//remove the descision text
                this.decisionTime = false
            }
            else if(Phaser.Input.Keyboard.JustDown(keyD) || Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('sEndScene')
            }
        }   

    }

    hendCutscene(){
        //happy ending cutscene here
        this.happyText = this.add.text(screenWidth/2,screenHeight/2,'Your Bro interupts your urge for stealth to say goodby to  the baby monster\n' + favKeys + 'to menu',textConfig).setOrigin(0.5)
        this.happyText.setFontSize('30px')
        this.happy = true
        this.decisionTime = false
    }
}

//creates text overlay that doesn't care about camera pan and zoom of parent scene
class hendOverlay extends Phaser.Scene {
    constructor(){
        super('hendOverlayScene')
        this.instructDuration = 3000
    }
    create(){
        if(favKeys === '[↓]'){
            this.leftkey = "[⟵]"
            this.rightkey = "[⟶]"
        }
        else{
            this.leftkey = '[a]'
            this.rightkey = '[d]'
        }
        this.fleeText = this.add.text(screenWidth,screenHeight,this.rightkey + ' Grab bro and run',textConfig).setOrigin(1)
        this.fleeText.setFontSize('70px')
        this.sneakText = this.add.text(0,screenHeight,this.leftkey + 'Wait',textConfig).setOrigin(0,1)
        this.sneakText.setFontSize('70px')
        this.countdown = this.add.rectangle((screenWidth-1000)/2,20,1000,50,0xFF0000).setOrigin(0)
        this.tweens.add({
            targets: this.countdown,
            scaleX:0,
            duration: this.instructDuration
        })
        this.time.addEvent({
            delay: this.instructDuration,
            callback: () =>{
                this.scene.stop('hendOverlayScene')
            }
        })
    }
}