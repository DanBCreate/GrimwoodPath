//note.js
//call note(this,'your message\nhere') to create a popup note

class noteScene extends Phaser.Scene{
    constructor(){
        super('noteScene')
    }
    
    create(){
        this.add.sprite(screenCenterX,screenCenterY,'page').setOrigin(0.5).setScale(3) //replace with paper asset once avalible
        this.add.text(screenCenterX,screenCenterY,noteText,monsterTextConfig).setOrigin(0.5) //main body of the scene
        this.add.text(screenWidth - 380,screenHeight - 50,favKeys+' finish reading',textConfig).setOrigin(1)//instructions for retruning to the game

        //keys for returning to the game
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS)||Phaser.Input.Keyboard.JustDown(keyDOWN)){
            noteSceneName.scene.resume()//resume the previous
            //stop this scene
            this.scene.stop('noteScene')
            keyS = noteSceneName.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//reset the keys
            keyDOWN = noteSceneName.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);//reset the keys
        }
    }
}

var noteSceneName
var noteText
function note(scene,text){
    noteSceneName = scene
    scene.scene.launch('noteScene')
    scene.scene.pause(noteSceneName)
    noteText = text;
}