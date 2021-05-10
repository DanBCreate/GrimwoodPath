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
    Physics:{
        default:'arcade',
        arcade:{
            gravity: {y:10},
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
