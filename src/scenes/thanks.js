//creates text overlay that doesn't care about camera pan and zoom of parent scene
class thanks extends Phaser.Scene {
    constructor(){
        super('thanksScene')
    }
    create(){
        this.add.text(screenWidth/2,screenHeight/2,'Thanks For Playing',textConfig).setOrigin(0.5)

        this.blanker = this.add.sprite(screenWidth/2,screenHeight/2,'ground').setOrigin(0.5)
        this.blanker.displayWidth = screenWidth*2
        this.blanker.displayHeight = screenHeight*2
        this.blanker.alpha = 0
        this.blanker.depth = 200

        this.time.addEvent({
            delay: 1000,
            callback: () =>{
                this.tweens.add({
                    targets: this.blanker,
                    alpha: 1,
                    duration:1000,
                })
                        
            }
        })
        this.time.addEvent({
            delay: 2000,
            callback: () =>{
                this.scene.start('creditScene')                        
            }
        })
    }
}