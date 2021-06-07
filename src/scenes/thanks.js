
class thanks extends Phaser.Scene {
    constructor(){
        super('thanksScene')
    }
    create(){
        this.intro = this.add.text(screenWidth/2,screenHeight/2 - 200,'Thank You For Playing',textConfig).setOrigin(0.5)
        this.intro.alpha = 0;
        this.fadeIntro = false;
        this.title = this.add.text(screenWidth/2,screenHeight/2,'Grimwood Path',titleTextConfig).setOrigin(0.5)
        this.title.setFontSize('300px');
        this.title.alpha = 0;
        this.fadeTitle = false;

        this.blanker = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blanker.displayWidth = screenWidth*2
        this.blanker.displayHeight = screenHeight*2
        this.blanker.alpha = 0
        this.blanker.depth = 200

        this.time.addEvent({
            delay: 300,
            callback: () =>{
                this.fadeIntro = true;     
            }
        })

        this.time.addEvent({
            delay: 1000,
            callback: () =>{
                this.fadeTitle = true;     
            }
        })

        this.time.addEvent({
            delay: 4000,
            callback: () =>{
                this.tweens.add({
                    targets: this.blanker,
                    alpha: 1,
                    duration:1000,
                })
                        
            }
        })
        this.time.addEvent({
            delay: 6000,
            callback: () =>{
                this.scene.start('creditScene')                        
            }
        })
    }

    update(){
        if(this.fadeIntro == true){
            this.intro.alpha += 0.05;
        }
        if(this.fadeTitle == true){
            if(this.title.alpha <= 1){
                this.title.alpha += 0.005;
            }
        }
    }
}