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
instrctionDelay = 500
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
    scene:[Menu,Cave,Credit,FForest,HEnd,NoBro,Opening,Ravine,SEnd,LForest],
    physics:{
        default:'arcade',
        arcade:{
            gravity: {y:1300},
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
let fromRavine = true   //controls where the player spawns in fForest

let ffTree1Marked = false //are trees marked?
let ffTree2Marked = false //are trees marked?
let lfTree1Marked = false //are trees marked?
let lfTree2Marked = false //are trees marked?

//keys for scene navigation
let key1,key2,key3,key4,key5,key6,key7,key8,key9,key0;
let keyDOWN,keyS;
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
        if(Phaser.Input.Keyboard.JustDown(key1)){scene.scene.start('menuScene')}
        if(Phaser.Input.Keyboard.JustDown(key2)){scene.scene.start('openingScene')}
        if(Phaser.Input.Keyboard.JustDown(key3)){scene.scene.start('ravineScene')}
        if(Phaser.Input.Keyboard.JustDown(key4)){scene.scene.start('fForestScene')}
        if(Phaser.Input.Keyboard.JustDown(key5)){scene.scene.start('caveScene')}
        if(Phaser.Input.Keyboard.JustDown(key6)){scene.scene.start('lForestScene')}
        if(Phaser.Input.Keyboard.JustDown(key7)){scene.scene.start('noBroScene')}
        if(Phaser.Input.Keyboard.JustDown(key8)){scene.scene.start('sEndScene')}
        if(Phaser.Input.Keyboard.JustDown(key9)){scene.scene.start('hEndScene')}
        if(Phaser.Input.Keyboard.JustDown(key0)){scene.scene.start('creditScene')}
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
            scene.add.existing(scene.wipetree);
            scene.add.existing(scene.trailTree);
            scene.wipebox = scene.add.rectangle(screenWidth+scene.trailTree.width/2,0,screenWidth,screenHeight,0x000000).setOrigin(0)
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
            scene.add.existing(scene.wipetree);
            scene.add.existing(scene.trailTree);
            scene.wipebox = scene.add.rectangle(-screenWidth-scene.wipetree.width/2,0,screenWidth,screenHeight,0x000000).setOrigin(0)
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
function collect(scene,item,key){
    scene.physics.add.overlap(scene.player,item,()=>{
        if(scene.noInstruct){
            scene.instructions = scene.add.text(item.x,item.y -400,favKeys +' to pick up',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        } 
        if(scene.player.actionButton){
            scene.instructions.alpha = 0;
            item.destroy()
            //I wish pass by referance was a thing
            //set the appropreate flag
            if(key === 'knife'){hasKnife = true}
            else if(key === 'shirt'){hasShirt = true}
            else if(key === 'key'){hasKey = true}
            else if(key === 'jacket'){hasJacket = true}
            else if(key === 'rope'){hasRope = true}
            else if(key === 'wood'){hasWood = true}
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
function leave(scene,entrance,type,destination){
    scene.physics.add.overlap(scene.player,entrance,()=>{
        //flag used to know if a player is allowed to enter
        let happy = false

        //if cave
        if(scene.noInstruct && hasFlash && hasBat && type === 'cave'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,favKeys +' to enter',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
        } 
        else if (scene.noInstruct && type === 'cave'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,'It\'s dark in there',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        }

        //if tree
        if(scene.noInstruct && hasRope && type === 'tree'){
            scene.instructions = scene.add.text(entrance.x,entrance.y -350,favKeys +' to climb',textConfig).setOrigin(0.5)
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
            scene.instructions = scene.add.text(entrance.x,entrance.y -400,favKeys +' to enter',textConfig).setOrigin(0.5)
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
            scene.instructions = scene.add.text(entrance.x,entrance.y -200,favKeys +' to flee in terror',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
            happy = true
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
            scene.instructions = scene.add.text(tree.x,tree.y -600,favKeys +' to mark',textConfig).setOrigin(0.5)
            scene.instructions.setFontSize('40px')
            scene.noInstruct = false
        } 
        if(scene.player.actionButton && hasShirt){
            tree.anims.play('mkTree')
            if(flag === 'ff2'){ffTree2Marked = true}
            else if(flag === 'ff1'){ffTree1Marked = true}
            else if(flag === 'lf1'){lfTree1Marked = true}
            else if(flag === 'lf2'){lfTree2Marked = true}
        }
    })
}
