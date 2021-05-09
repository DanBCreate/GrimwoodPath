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
    }
}
//define the game
let game = new Phaser.Game(config);

//global vars:
