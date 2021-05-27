


class Opening extends Phaser.Scene {
    constructor(){
        super('openingScene')
    }

    preload(){
    }
    create(){

        //debugging mode features
        debugCreate(this);

        //skip buttons
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //sound ambiance
        this.ambience = this.sound.add('nightAmbience');
        this.crickets = this.sound.add('crickets');
        this.bush = this.sound.add('bushRustle');
        this.roar = this.sound.add('cutsceneRoar');
        this.grass = this.sound.add('grassFootstep');
        this.spook = this.sound.add('cutsceneSpook');
        this.sfxConfigCrickets = {
            volume: 3,
            loop: false,
        }
        this.sfxConfig = {
            volume: 3,
            loop: false,
        }
        this.sfxConfigBush = {
            volume: 0.8,
            loop: false,
        }
        this.sfxConfigRoar = {
            volume: 1.5,
            loop: false,
        }
        this.sfxConfigGrass = {
            volume: 0.15,
            loop: false
        } 
        this.sfxConfigSpook = {
            volume: 1.5,
            loop: false
        } 
        //this.game.sound.stopAll();
        this.ambience.play(this.sfxConfig) ;

        //continue the treeWipe from the menu scene
        this.timesequence = 0
        this.wipetime = 1000

        this.startBlack = this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)
        
        this.timesequence += this.wipetime + 100 //half of wipe time + a bit of padding due to scene startup being weird

        //replace the background with the first vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //create this vignette
                this.lot = new SlidySprite(this,0,0,'parkingLot').setOrigin(0)               
                this.walkers = new SlidySprite(this,400,screenHeight,'withBro').setOrigin(0,1)
                this.add.existing(this.lot)
                this.add.existing(this.walkers)
                //animate
                this.walkers.slide(800,screenHeight,10000)
                this.lot.slide(-100,0,10000)

            }
        })

        this.timesequence += 2400 //duration of scene
        this.wipetime = 2000 //nice looking time
        
        //black out first vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)
        
        this.timesequence += this.wipetime/2 

        //second vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.walkers.destroy()
                this.lot.destroy()
                //create this vignette
                this.sf = new SlidySprite(this,0,0,'sunForest').setOrigin(0)
                this.exploring = new SlidySprite(this,400,screenHeight,'withBroWalk').setOrigin(0,1)
                this.add.existing(this.sf)
                this.add.existing(this.exploring)
                //animate
                this.exploring.slide(800,screenHeight,10000)
                this.sf.slide(-100,0,10000)
            }
        })

        this.timesequence += 2000 //duration of scene

        //black second vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence += this.wipetime/2

        //third vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.sf.destroy()
                this.exploring.destroy()
                //create this vignette
                this.crickets.play(this.sfxConfigCrickets);
                this.nf = new SlidySprite(this,0,0,'moonForest').setOrigin(0)
                this.lookBack = new SlidySprite(this,400,screenHeight,'broDistracted').setOrigin(0,1)
                this.add.existing(this.nf)
                this.add.existing(this.lookBack)
                //animate
                this.lookBack.slide(800,screenHeight,20000)
                this.nf.slide(-100,0,10000)
            }
        })

        this.timesequence += 2000 //duration of scene

        //black third vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence+= this.wipetime/2

        //fourth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.nf.destroy()
                this.lookBack.destroy()
                //create this vignette
                this.cf = new SlidySprite(this,0,0,'shortForest').setOrigin(0)
                this.search = new SlidySprite(this,400,screenHeight,'searchLeft').setOrigin(0,1)
                this.add.existing(this.cf)
                this.add.existing(this.search)
                //animate
                this.search.slide(200,screenHeight,20000)
                this.cf.slide(100,0,10000)
            }
        })

        this.timesequence += 2000 // duration of scene

        //black fourth vignette
        LRWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence += this.wipetime/2

        //fith vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.cf.destroy()
                this.search.destroy()
                //create this vignette
                this.clof = new SlidySprite(this,0,0,'shortForest').setOrigin(0)
                this.searchRight = new SlidySprite(this,1000,screenHeight,'searchRight').setOrigin(0,1)
                this.add.existing(this.clof)
                this.add.existing(this.searchRight)
                //animate
                this.searchRight.slide(1200,screenHeight,20000)
                this.clof.slide(-100,0,10000)
                this.bush.play(this.sfxConfigBush);
            }
        })

        this.timesequence += 2000 // duration of scene

        //black fith vignette
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence += this.wipetime/2

        //sixth vignette
        this.time.addEvent({
            
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.clof.destroy()
                this.searchRight.destroy()
                //create this vignette
                this.spook.play(this.sfxConfigSpook);
                this.monf = new SlidySprite(this,0,0,'shortForest').setOrigin(0)
                this.monsil = new SlidySprite(this,1000,screenHeight,'monSil').setOrigin(0,1)
                this.add.existing(this.monf)
                this.add.existing(this.monsil)
                //animate
                this.monsil.slide(800,screenHeight,20000)
                this.monf.slide(100,0,10000)
            }
        })

        this.timesequence += 1500 //duration of scene

        //seventh vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.monsil.destroy()
                //create this vignette
                this.monskel = new SlidySprite(this,950,screenHeight,'monStare').setOrigin(0,1)
                this.add.existing(this.monskel)
                //animate
                this.monskel.slide(750,screenHeight,20000)
            }
        })

        this.timesequence += 1500 //duration of scene

        //eighth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.monskel.destroy()
                //create this vignette
                this.monwav = new SlidySprite(this,500,screenHeight,'monWave').setOrigin(0,1)
                this.add.existing(this.monwav)
                //animate
                this.monwav.slide(400,screenHeight,20000)
            }
        })

        this.timesequence += 1000 //duration of scene

        //nineth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.monwav.destroy()
                //create this vignette
                this.monhead = new SlidySprite(this,400,screenHeight,'monHead').setOrigin(0,1)
                this.roar.play(this.sfxConfigRoar);
                this.cameras.main.shake(1000);
                this.add.existing(this.monhead)
                //animate
                this.monhead.slide(300,screenHeight,20000)
            }
        })

        this.timesequence += 1000 //duration of scene
        this.wipetime = 1000 //faster wipes for faster action

        LRWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence += this.wipetime/2


        //tenth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.monhead.destroy()
                this.monf.destroy()
                //create this vignette
                this.clorf = new SlidySprite(this,0,0,'cliffForest').setOrigin(0)
                this.terror = new SlidySprite(this,300,screenHeight,'flee').setOrigin(0,1)
                this.grass.play(this.sfxConfigGrass);
                this.terror.anims.play('fleeOne')
                this.terror.depth = 10
                this.add.existing(this.terror)
                this.add.existing(this.clorf)
                //animate
                this.terror.slide(400,screenHeight,20000)
                this.clorf.slide(-100,0,10000)
            }
        })

        this.timesequence += 1500 //duration of scene

        //elevinth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.terror.destroy()
                //create this vignette
                this.run = new SlidySprite(this,500,screenHeight,'flee').setOrigin(0,1)
                this.grass.play(this.sfxConfigGrass);
                this.run.anims.play('fleeTwo')
                this.add.existing(this.run)
                //animate
                this.run.slide(600,screenHeight,20000)
            }
        })

        this.timesequence += 1000 //duration of scene

        //twelvth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.run.destroy()
                //create this vignette
                this.trip = new SlidySprite(this,700,screenHeight,'flee').setOrigin(0,1)
                this.grass.play(this.sfxConfigGrass);
                this.trip.anims.play('fleeThree')
                this.add.existing(this.trip)
                //animate
                this.trip.slide(800,screenHeight,20000)
            }
        })  

        this.timesequence += 500 //duration of scene
        
        RLWipe(this,this.wipetime,'wipeTree',this.timesequence)

        this.timesequence += this.wipetime/2

        //twelvth vignette
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                //remove last vignette
                this.trip.destroy()
                this.clorf.destroy()
                //create this vignette
                this.cliff = new SlidySprite(this,0,0,'cliff').setOrigin(0)
                this.fall = new SlidySprite(this,700,screenHeight,'fall').setOrigin(0,1)
                this.add.existing(this.cliff)
                this.add.existing(this.fall)
                //animate
                this.fall.slide(700,screenHeight+100,10000)
                this.cliff.slide(0,-100,10000)
            }
        })     
        
        this.timesequence += 2500 //duration of scene

        //dim screen
        this.time.addEvent({
            delay: this.timesequence,
            callback: () =>{
                this.dimmer = this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
                this.dimmer.alpha = 0
                this.tweens.add({
                    targets: this.dimmer,
                    alpha: 1, 
                    duration: 950
                })
            }
        })          

        this.timesequence += 1000 //duration of dim
        console.log(this.timesequence)
        //end scene
        this.time.addEvent({
            delay: this.timesequence,
            callback: ()=> {
                this.scene.start('ravineScene')
            }

        })

        //skip insturctions
        this.skipText = this.add.text(screenWidth,screenHeight,favKeys+' to skip',textConfig).setOrigin(1)
        this.skipText.depth = 500
        
    }
    update(){
        debugUpdate(this)
        //skip buttons
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.game.sound.stopAll();
            this.scene.start('ravineScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.game.sound.stopAll();
            this.scene.start('ravineScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.game.sound.stopAll();
            this.scene.start('ravineScene')
        }
    }

}

