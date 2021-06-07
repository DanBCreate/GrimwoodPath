class Credit extends Phaser.Scene {
    constructor(){
        super('creditScene')
    }

    create(){

        //debugging mode features
        debugCreate(this);   

        this.cameras.main.fadeIn(500);
        this.game.sound.stopAll();

        // Setting up our Credits Sounds
        this.lower = false; // Utilized for Lowering Volume
        this.sfxConfig = {
            volume: 0.7,
            loop: true,
        }
        this.creditsBG = this.sound.add('creditsBG');
        this.creditsBG.play(this.sfxConfig);

        // Background of credits page
        this.back = this.add.sprite(2000,500,'ravineBG').setOrigin(0.5,0.5).setScale(1.1)

       // Setting up our back key to go back to menu
       keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
       this.backText = this.add.text(screenWidth - 110, 30, 'Menu [ESC]', textConfig).setOrigin(0.5);
       this.backText.setFontSize('30px');

       // Displaying all of our names in a unique way for each name
       this.name;
       this.introductionText = this.add.text(screenCenterX, 170, 'Developed By:', titleTextConfig).setOrigin(0.5);
       this.introductionText.setFontSize('100px');
       this.introductionText.alpha = 0;
       this.name = this.introductionText;

       // For Thomas
       this.thomas = this.add.text(screenCenterX, 350, 'Thomas Price', textConfig).setOrigin(0.5);
       this.thomas.alpha = 0;
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('carAnim', {frames:[0,1]}),
            frameRate: 10,
            repeat: -1
        })
        this.car = this.add.sprite(-100, 350,'drive').setOrigin(0.5)
        this.car.anims.play('drive')
        this.car.displayWidth = screenWidth/4
        this.car.displayHeight = screenWidth/8
        this.tweens.add({
            targets:this.car,
            x: screenWidth*2,
            duration: 5000,
            ease:'Quad.InOut'
        })
        this.time.addEvent({
            delay: 1600,
            callback: () =>{
                this.name = this.thomas;
            }
        })

        // For Danny
        this.danny = this.add.text(screenCenterX, 500, 'Danny Baghdasarians', textConfig).setOrigin(0.5);
        this.danny.alpha = 0;
        this.monSil = this.add.sprite(screenWidth + 800, screenCenterY, 'monSil').setOrigin(0.5).setScale(2.5);
        this.monSil.flipX = true;
        this.time.addEvent({
            delay: 3000,
            callback: () =>{
                this.tweens.add({
                    targets:this.monSil,
                    x: -screenWidth*2,
                    duration: 5500,
                    ease:'Quad.InOut'
                })
                this.time.addEvent({
                    delay: 1900,
                    callback: () =>{
                        this.name = this.danny;
                    }
                })
            }
        })

        // For Jacqueline
        this.jacqueline = this.add.text(screenCenterX, 650, 'Jacqueline Castro', textConfig).setOrigin(0.5);
        this.jacqueline.alpha = 0;
        this.fall = this.add.sprite(screenCenterX, -1000, 'fall').setOrigin(0.5).setScale(2);
        this.time.addEvent({
            delay: 5000,
            callback: () =>{
                this.tweens.add({
                    targets: this.fall,
                    y: screenHeight*2,
                    duration: 6000,
                    ease:'Quad.InOut'
                })
                this.time.addEvent({
                    delay: 2500,
                    callback: () =>{
                        this.name = this.jacqueline;
                    }
                })
            }
        })

        // For Quinn
        this.quinn = this.add.text(screenCenterX, 800, 'Quinn Satow', textConfig).setOrigin(0.5);
        this.quinn.alpha = 0;
        this.sources = this.add.text(screenCenterX, 950, 'Sources [S]', titleTextConfig).setOrigin(0.5);
        this.sources.alpha = 0;
        this.sources.setFontSize('100px');
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.time.addEvent({
            delay: 9000,
            callback: () =>{
                this.Emitter = this.add.particles('shortBlock').createEmitter({
                    x: screenCenterX,
                    y: screenHeight + 100,
                    speed: 500,
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.25, end: 0.3 },
                    alpha: { start: 1, end: 0.5, ease: 'Expo.easeIn' },
                    gravityY: 0,
                    lifespan: 1000,
                });
                this.cameras.main.shake(3000);
                this.time.addEvent({
                    delay: 1000,
                    callback: () =>{
                        this.name = this.quinn;
                    }
                })    
            }
        })
    }

    update(){
        //debugging mode features
        debugUpdate(this);

        this.alphaUpdate();

        if(this.lower == true){
            this.lowerVolume();
        }

        // If back button is chosen
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.cameras.main.fadeOut(2000);
            this.lower = true;
            this.time.addEvent({
                delay: 2000,
                callback: () =>{
                    this.game.sound.stopAll();
                    this.scene.start('menuScene')
                }
            })         
        }

        
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.cameras.main.fadeOut(2000);
            this.time.addEvent({
                delay: 2000,
                callback: () =>{
                    this.scene.start('sourceScene')
                }
            })        
        }
    }
    
    // Un-hides our names
    alphaUpdate(){
        if(this.name == this.introductionText){
            if(this.introductionText.alpha <= 1){
                this.introductionText.alpha += 0.02;
            }
        }
        if(this.name == this.thomas){
            if(this.thomas.alpha <= 1){
                this.thomas.alpha += 0.01;
            }
        }
        if(this.name == this.danny){
            if(this.danny.alpha <= 1){
                this.danny.alpha += 0.01;
            }
        }
        if(this.name == this.jacqueline){
            if(this.jacqueline.alpha <= 1){
                this.jacqueline.alpha += 0.01;
            }
        }
        if(this.name == this.quinn){
            if(this.quinn.alpha <= 1){
                this.quinn.alpha += 0.008;
                this.sources.alpha += 0.008;
            }
            if(this.quinn.alpha >= 0.8){
                this.Emitter.setSpeed(0);
            }
        }
    }

    // Lowers volume upon exit
    lowerVolume() {
        if(this.creditsBG.volume >= 0){
            this.creditsBG.setVolume(this.creditsBG.volume - 0.008);
        }
    }
}