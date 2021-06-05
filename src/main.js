//main.js
//creates the game object, and declairs global variables

//screen configs
const screenWidth = 1920;
const screenHeight = 1080;
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;

//global vars:
debugToggle = true;
playerMovementSpeed = 400;
cameraLerp = 0.05; // Lerp is how delayed is the camera following our player, I.E Smoothness
instrctionDelay = 10
let favKeys = '[space]'

//game config
let config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:[Preload,Menu,Cave,Credit,Source,FForest,HEnd,NoBro,Opening,Ravine,SEnd,LForest,noteScene],
    physics:{
        default:'arcade',
        arcade:{
            gravity: {y:1450},
            debug: debugToggle
            
        }
    },
    backgroundColor: 0xFFFFFF
}

//standard text config
let textConfig = {
    fontFamily: 'horror',
    fontSize: '100px',
    color: '#FF0000',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    }
}  

//text for the player
let playerTextConfig = {
    fontFamily: 'player',
    fontSize: '60px',
    color: '#FFFFFF',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    }
}  

//text for the title
let titleTextConfig = {
    fontFamily: 'forest',
    fontSize: '60px',
    color: '#FF0000',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    }
} 

//define the game
let game = new Phaser.Game(config);

//colletable flags
let hasRope = false     //allows exit from ravine
let hasShirt = false    //allows marking of trees
let hasWood = false     //allows full movement speed when combined with hasJacket
let hasJacket = false   //allows full movement speed when combined with hasWood
let hasFlash = false    //allows entering cave when combined with hasBat
let hasBat = false      //allows entering cave when combined with hasFlash
let hasAxe = false      //allows entry to clearing with brother
let hasKey = false      //allows entry to cabin
let hasCrowbar = false  //used to set hasAxe
let hasKnife = false    //? - cosmetic?
let axeWallFlag = true  //is the wall obstructing access to the axe
let keyWallFlag = true  //is the keywall obstructing access to the crowbar

//used for controling where the player will spawn
let playerSpawnx
let playerSpawny = screenHeight -140

let ffTree1Marked = false //are trees marked?
let ffTree2Marked = false //are trees marked?
let lfTree1Marked = false //are trees marked?
let lfTree2Marked = false //are trees marked?
let fallen = false //has the player fallen

//keys for scene navigation
let key1,key2,key3,key4,key5,key6,key7,key8,key9,key0;
let keyDOWN,keyS, keyC, keyESC;
//map
// 1 - menu
// 2 - Opening
// 3 - Ravine
// 4 - FForest
// 5 - Cave
// 6 - LForest
// 7 - NoBro
// 8 - SEnd
// 9 - HEnd
// 0 - Credit

function debugUpdate(scene){
    //debugging mode features
    if(debugToggle){
        //debugging navigaiton checks
        if(Phaser.Input.Keyboard.JustDown(key1)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('menuScene')}
        if(Phaser.Input.Keyboard.JustDown(key2)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('openingScene')}
        if(Phaser.Input.Keyboard.JustDown(key3)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('ravineScene')}
        if(Phaser.Input.Keyboard.JustDown(key4)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('fForestScene')}
        if(Phaser.Input.Keyboard.JustDown(key5)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('caveScene')}
        if(Phaser.Input.Keyboard.JustDown(key6)){scene.game.sound.stopAll(); playerSpawnx = screenWidth; scene.scene.start('lForestScene')}
        if(Phaser.Input.Keyboard.JustDown(key7)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('noBroScene')}
        if(Phaser.Input.Keyboard.JustDown(key8)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('sEndScene')}
        if(Phaser.Input.Keyboard.JustDown(key9)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('hEndScene')}
        if(Phaser.Input.Keyboard.JustDown(key0)){scene.game.sound.stopAll(); playerSpawnx = screenWidth/2; scene.scene.start('creditScene')}
    }
}

function debugCreate(scene){
    if(debugToggle){        
        console.log(scene);
        //debugging navigation keys
        key1 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)        
        key2 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        key3 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
        key4 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
        key5 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        key6 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        key7 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
        key8 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT)
        key9 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)
        key0 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
    }   
}


function RLWipe(scene,duration,texture,delay = 0){
    scene.time.addEvent({
        delay: delay,
        callback:() =>{
            scene.wipetree = new SlidySprite(scene,screenWidth,0,texture).setOrigin(0);
            scene.trailTree = new SlidySprite(scene,screenWidth*2,0,texture).setOrigin(0);
            scene.wipetree.depth = 100
            scene.trailTree.depth = 100
            scene.add.existing(scene.wipetree);
            scene.add.existing(scene.trailTree);
            scene.wipebox = scene.add.rectangle(screenWidth+scene.trailTree.width/2,0,screenWidth,screenHeight,0x000000).setOrigin(0)
            scene.wipebox.depth = 200
            scene.wipetree.slide(-screenWidth-scene.wipetree.width,0,duration)
            scene.trailTree.slide(0-scene.trailTree.width,0,duration)
            scene.tweens.add({
                targets: scene.wipebox,
                x: -screenWidth -scene.trailTree.width/2,
                ease: 'Linear',
                duration: duration
            })
            //garbage collection
            scene.time.addEvent({
                delay: duration,
                callback: () =>{
                    scene.wipetree.destroy()
                    scene.trailTree.destroy()
                    scene.wipebox.destroy()
                }
            })
    }
})
}

function LRWipe(scene,duration,texture,delay = 0){
    scene.time.addEvent({
        delay: delay,
        callback:() =>{
            scene.wipetree = new SlidySprite(scene,0,0,texture).setOrigin(1,0);
            scene.trailTree = new SlidySprite(scene,-screenWidth,0,texture).setOrigin(1,0);
            scene.wipetree.depth = 100
            scene.trailTree.depth = 100
            scene.add.existing(scene.wipetree);
            scene.add.existing(scene.trailTree);
            scene.wipebox = scene.add.rectangle(-screenWidth-scene.wipetree.width/2,0,screenWidth,screenHeight,0x000000).setOrigin(0)
            scene.wipebox.depth = 200
            scene.wipetree.slide(screenWidth*2 +scene.wipetree.width,0,duration)
            scene.trailTree.slide(screenWidth+ scene.trailTree.width,0,duration)
            scene.tweens.add({
                targets: scene.wipebox,
                x: screenWidth + scene.wipetree.width/2,
                ease: 'Linear',
                duration: duration
            })
            //garbage collection
            scene.time.addEvent({
                delay: duration,
                callback: () =>{
                    scene.wipetree.destroy()
                    scene.trailTree.destroy()
                    scene.wipebox.destroy()
                }
            })
        }
    })
}

//collectables!!!
let sfxCollect = {
    volume: 1.5,
    loop: false
} 

function collect(scene,item,key){
    scene.physics.add.overlap(scene.player,item,()=>{
        if(scene.noInstruct){
            scene.instructions = scene.add.text(item.x,item.y -200,favKeys +' to pick up',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.instructions.depth = 400
            scene.noInstruct = false
        } 
        if(scene.player.actionButton){
            scene.collectingSFX = scene.sound.add('item');
            scene.collectingSFX.play(sfxCollect);
            scene.instructions.alpha = 0;
            item.destroy()
            //I wish pass by referance was a thing
            //set the appropreate flag
            if(key === 'knife'){hasKnife = true}
            else if(key === 'shirt'){hasShirt = true}
            else if(key === 'key'){hasKey = true}
            else if(key === 'jacket'){hasJacket = true; if(hasWood){scene.player.think('Much better, I can Jump now!')}}
            else if(key === 'rope'){hasRope = true}
            else if(key === 'wood'){hasWood = true; if(hasJacket){scene.player.think('Much better, I can Jump now!')}}
            else if(key === 'crowbar'){hasCrowbar = true}
            else if(key === 'axe'){hasAxe = true}
            else if(key === 'bat'){hasBat = true}
            else if(key === 'flash'){hasFlash = true}
            else{console.log('Invalid Key')}
            scene.noInstruct = true;
        }
    })
}

//creates scene transistions
//valid flags: cave tree clearing car mtree1 mtree2
function leave(scene,entrance,type,destination){
    scene.physics.add.overlap(scene.player,entrance,()=>{
        //flag used to know if a player is allowed to enter
        let happy = false

        //if cave
        if(scene.noInstruct && hasFlash && hasBat && type === 'cave'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,"hold "+favKeys +' to enter',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
            if(destination === 'fForestScene'){playerSpawnx = screenWidth}
            if(destination === 'lForestScene'){playerSpawnx = 7000}
            if(destination === 'caveScene'){
                if(scene.sceneKey==='fForestScene'){playerSpawnx = 325}
                if(scene.sceneKey==='lForestScene'){playerSpawnx = 7280;playerSpawny = -1400;console.log(playerSpawny)}
            }
        } 
        else if (scene.noInstruct && type === 'cave'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,'It\'s dark in there',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        }

        //if tree
        if(scene.noInstruct && hasRope && type === 'tree'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -350,"hold "+favKeys +' to climb',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
        } 
        else if (scene.noInstruct && type === 'tree'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -350,'maybe with a rope',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        }

        //if clearing
        if(!scene.sfxActive && type === 'clearing'){
            scene.giggle.play(scene.sfxConfig) 
            scene.sfxActive = true;
        }
        if(scene.noInstruct && hasAxe && type === 'clearing'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,"hold "+favKeys +' to enter',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
        } 
        else if (scene.noInstruct && type === 'clearing'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,'It\'s too dense',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        }

        //if car
        if(scene.noInstruct && type === 'car'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -200,"hold "+favKeys +' to flee in terror',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
        } 

        //if Markedtree1
        if(scene.noInstruct && type === 'mtree1' && ffTree1Marked && lfTree1Marked){
            scene.instructions = scene.add.text(entrance.x,entrance.y-200,'hold '+favKeys+' to follow the mark',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
            if(destination === 'fForestScene'){playerSpawnx = 4000}
            if(destination === 'lForestScene'){playerSpawnx = 11200}
        }
        //if markedtree2
        if(scene.noInstruct && type === 'mtree2' && ffTree2Marked && lfTree2Marked){
            scene.instructions = scene.add.text(entrance.x,entrance.y-200,'hold '+favKeys+' to follow the mark',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
            if(destination === 'fForestScene'){playerSpawnx = 1000}
            if(destination === 'lForestScene'){playerSpawnx = 8300}
        }


        //transition to scene
        if(scene.player.actionButton && happy){
            scene.screentint = scene.add.rectangle(screenWidth/2,screenHeight,14400,screenHeight,0x000000).setOrigin(0.5,1)
            scene.screentint.alpha = 0
            scene.tweens.add({
                targets: scene.sceneCamera,
                zoom: 10,
                duration: 1000,
                ease: 'linear'                     
            })
            scene.tweens.add({
                targets: scene.screentint,
                alpha: 1,
                duration: 1000,     
                ease: 'linear'               
            })
            scene.time.addEvent({
                delay: 1000,
                callback: ()=> {
                    scene.noInstruct = true;
                    game.sound.stopAll();
                    scene.scene.start(destination)
                }
            })
        }
    })
}

function markTree(scene,tree,flag){
    scene.physics.add.overlap(scene.player,tree,()=>{
        if(flag === 'ff2'){tempbool = ffTree2Marked}
        else if(flag === 'ff1'){tempbool = ffTree1Marked}
        else if(flag === 'lf1'){tempbool = lfTree1Marked}
        else if(flag === 'lf2'){tempbool = lfTree2Marked}
        else{console.log('invalid flag');tempbool=true}

        if(scene.noInstruct && hasShirt && !tempbool){
            scene.instructions = scene.add.text(tree.x,tree.y -600,favKeys +' to mark that you visited here',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        } 
        if(scene.player.actionButton && hasShirt){
            tree.anims.play('mkTree')
            scene.time.addEvent({
                delay:500,
                callback: () => {
                    if(flag === 'ff2'){ffTree2Marked = true}
                    else if(flag === 'ff1'){ffTree1Marked = true}
                    else if(flag === 'lf1'){lfTree1Marked = true}
                    else if(flag === 'lf2'){lfTree2Marked = true}
                }
            })
        }
    })
}


function genInventory(scene) {
    invAxe = scene.add.sprite(screenWidth/4,screenHeight/16,'axe');
    invAxe.displayWidth = screenWidth/16;
    invAxe.scaleY = invAxe.scaleX;
    invAxe.alpha = 0;
    invAxe.setScrollFactor(0);
    invBat = scene.add.sprite(screenWidth/4 + screenWidth/16,screenHeight/16,'bat');
    invBat.displayWidth = screenWidth/16;
    invBat.scaleY = invBat.scaleX;
    invBat.alpha = 0;
    invBat.setScrollFactor(0);
    invBar = scene.add.sprite(screenWidth/4 + 2*screenWidth/16,screenHeight/16,'bar');
    invBar.displayWidth = screenWidth/16;
    invBar.scaleY = invBar.scaleX;
    invBar.alpha = 0;
    invBar.setScrollFactor(0);
    invJacket = scene.add.sprite(screenWidth/4 + 3*screenWidth/16,screenHeight/16,'jacket');
    invJacket.displayWidth = screenWidth/16;
    invJacket.scaleY = invJacket.scaleX;
    invJacket.alpha = 0;
    invJacket.setScrollFactor(0);
    invKey = scene.add.sprite(screenWidth/4 + 4*screenWidth/16,screenHeight/16,'key');
    invKey.displayWidth = screenWidth/16;
    invKey.scaleY = invKey.scaleX;
    invKey.alpha = 0;
    invKey.setScrollFactor(0);
    invKnife = scene.add.sprite(screenWidth/4 + 5*screenWidth/16,screenHeight/16,'knife');
    invKnife.displayWidth = screenWidth/16;
    invKnife.scaleY = invKnife.scaleX;
    invKnife.alpha = 0;
    invKnife.setScrollFactor(0);
    invLight = scene.add.sprite(screenWidth/4 + 6*screenWidth/16,screenHeight/16,'light');
    invLight.displayWidth = screenWidth/16;
    invLight.scaleY = invLight.scaleX;
    invLight.alpha = 0;
    invLight.setScrollFactor(0);
    invRope = scene.add.sprite(screenWidth/4 + 7*screenWidth/16,screenHeight/16,'rope');
    invRope.displayWidth = screenWidth/16;
    invRope.scaleY = invRope.scaleX;
    invRope.alpha = 0;
    invRope.setScrollFactor(0);
    invShirt = scene.add.sprite(screenWidth/4 + 8*screenWidth/16,screenHeight/16,'shirt');
    invShirt.displayWidth = screenWidth/16;
    invShirt.scaleY = invShirt.scaleX;
    invShirt.alpha = 0;
    invShirt.setScrollFactor(0);
    invWood = scene.add.sprite(screenWidth/4 + 9*screenWidth/16,screenHeight/16,'wood');
    invWood.displayWidth = screenWidth/16;
    invWood.scaleY = invWood.scaleX;
    invWood.alpha = 0;
    invWood.setScrollFactor(0);
}

function update_inv() {
    if (hasAxe) {
        invAxe.alpha = 255;
    }
    if (hasBat) {
        invBat.alpha = 255;
    }
    if (hasCrowbar){
        invBar.alpha = 255;
    }
    if (hasJacket) {
        invJacket.alpha = 255;
    }
    if (hasKey) {
        invKey.alpha = 255;
    }
    if (hasKnife) {
        invKnife.alpha = 255;
    }
    if (hasFlash) {
        invLight.alpha = 255;
    }
    if (hasRope) {
        invRope.alpha = 255;
    }
    if (hasShirt) {
        invShirt.alpha = 255;
    }
    if (hasWood) {
        invWood.alpha = 255;
    }
}