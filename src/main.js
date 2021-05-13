//main.js
//creates the game object, and declairs global variables


//screen configs
const screenWidth = 1920;
const screenHeight = 1080;
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;

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
            gravity: {y:700},
            debug: true
        }
    },
    backgroundColor: 0xFFFFFF
}

//standard text config
let textConfig = {
    fontFamily: 'Courier',
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

//global vars:
debugToggle = true;
playerMovementSpeed = 200;
cameraLerp = 0.05; // Lerp is how delayed is the camera following our player, I.E Smoothness

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

//keys for scene navigation
let key1,key2,key3,key4,key5,key6,key7,key8,key9,key0;
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
