//main.js
//creates the game object, and declairs global variables


//game config
const screenWidth = 1920;
const screenHeight = 1080;

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
            gravity: {y:0},
            debug: true
        }
    },
    backgroundColor: 0xFFFFFF
}
//define the game
let game = new Phaser.Game(config);

//global vars:
debugToggle = true;



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
        console.log('opening cutscene');
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