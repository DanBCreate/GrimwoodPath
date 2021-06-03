class Source extends Phaser.Scene {
    constructor(){
        super('sourceScene')
    }
    create(){
        //debugging mode features
        debugCreate(this);   

        // Background of sources page
        this.back = this.add.sprite(2000,500,'ravineBG').setOrigin(0.5,0.5).setScale(1.1)

        // Setting up our back key to go back to menu
       keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
       this.backText = this.add.text(screenWidth - 110, 30, 'Menu [ESC]', textConfig).setOrigin(0.5);
       this.backText.setFontSize('30px');

       // Listing our Sources
       key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
       key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
       this.introductionText = this.add.text(screenCenterX, 80, 'Assets, Sources, and Libraries:', titleTextConfig).setOrigin(0.5);
       this.introductionText.setFontSize('100px');
       this.sourcesTextOne = this.add.text(screenCenterX, 510, 'Created on Phaser 3.54.0 Game Engine\n\nPlayer Font: https://www.fontsquirrel.com/fonts/bilbo\nTitle Font: https://www.dafont.com/forestside.font\nChild Giggle: https://freesound.org/people/RaspberryTickle/sounds/203230/ - ChildGiggle.wav\nCar Engine Loop: https://freesound.org/people/soundjoao/sounds/325810/\nNight Drive Loop: https://freesound.org/people/lionROAR0905/sounds/518312/\nStone Footstep: https://freesound.org/people/Natty23/sounds/348355/\nGrass Footstep: https://freesound.org/people/GiocoSound/sounds/421129/\nItem Pickup: https://freesound.org/people/jomse/sounds/428663/\nRavine Water: https://freesound.org/people/Klangkobold/sounds/443061/\nRavine Bat: https://freesound.org/people/Sedi/sounds/71168/\n Ravine Rocks: https://freesound.org/people/150134/sounds/327085/\nRavine Ambience: https://freesound.org/people/szegvari/sounds/571360/\nCrickets: https://freesound.org/people/Defelozedd94/sounds/522298/\nBush Rustle: https://freesound.org/people/egomassive/sounds/536767/\n Cutscene Roar: https://freesound.org/people/Robson220pl/sounds/497056/\nCutscene Spook: https://freesound.org/people/Audio_Dread/sounds/528482/\nThump: https://freesound.org/people/LittleLuigi/sounds/364790/\n', textConfig).setOrigin(0.5);
       this.sourcesTextOne.setFontSize('35px');
       this.pageText = this.add.text(screenCenterX, screenHeight - 100, 'Press [1] for Page One (or) Press [2] for Page Two', titleTextConfig).setOrigin(0.5);
       this.pageText.setFontSize('100px');
       this.sourcesTextTwo = this.add.text(screenCenterX, 530, 'First Forest Owl: https://freesound.org/people/Breviceps/sounds/465697/\nFirst Forest Crickets: https://freesound.org/people/rhapsodize/sounds/171823/\nFirst Forest Wind: https://freesound.org/people/Cinetony/sounds/563571/\nFirst Forest Air1: https://freesound.org/people/hykenfreak/sounds/331620/\nFirst Forest Air2: https://freesound.org/people/HorrorAudio/sounds/431979/\nFirst Forest Coyote: https://freesound.org/people/rogerforeman/sounds/68067/\nFirst Forest Tree Creak: https://freesound.org/people/Department64/sounds/95262/\nFirst Forest Ominous: https://freesound.org/people/-Hero_of_the_Winds-/sounds/221876/\nFirst Forest Drone: https://freesound.org/people/waxsocks/sounds/500375/\nCave Screams: https://freesound.org/people/Trebblofang/sounds/176930/\nCave Moan: https://freesound.org/people/qubodup/sounds/442956/\nCae Ambience: https://freesound.org/people/LittleRobotSoundFactory/sounds/270387/\nCave Strings: https://freesound.org/people/TravieDoodle/sounds/569184/\nSecond Forest Crow: https://freesound.org/people/richwise/sounds/521018/\nSecond Forest Wind: https://freesound.org/people/tim.kahn/sounds/329560/\nSecond Forest Violins: https://freesound.org/people/lennyboy/sounds/244417/\nSecond Forest Rise: https://freesound.org/people/Kastenfrosch/sounds/162472/\nSecond Forest Groan: https://freesound.org/people/missozzy/sounds/169984/\nSecond Forest Leaves: https://freesound.org/people/DSOADigital/sounds/362253/\nSecond Forest Tree Shake: https://freesound.org/people/zepurple/sounds/540278/\n', textConfig).setOrigin(0.5);
       this.sourcesTextTwo.alpha = 0;
       this.sourcesTextTwo.setFontSize('35px');
    }

    update(){
        // If back button is chosen
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(key1)){
            this.sourcesTextTwo.alpha = 0;
            this.sourcesTextOne.alpha = 1;
        }
        if(Phaser.Input.Keyboard.JustDown(key2)){
            this.sourcesTextOne.alpha = 0;
            this.sourcesTextTwo.alpha = 1;
        }
    }
}