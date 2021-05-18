// Ravine.js
// Class for ravine scene
//
// __Functions_Below__
// checkSlidyBlock(): Checks if we are near a slidy block and our action key is pressed


class Ravine extends Phaser.Scene {
    constructor(){
        super('ravineScene')
    }

    preload(){
    }

    create(){
        // Debugging mode features
        debugCreate(this); 

        // Setting up our ground
        this.ground = this.physics.add.sprite(screenCenterX, screenHeight, 'ground').setScale(0.05); // Initialize our ground
        this.ground.setImmovable(true); // Sets ground to immovable
        this.ground.body.allowGravity = false; // So gravity has no effect ground
        this.ground.displayWidth = screenWidth;
        this.ground.setOrigin(0.5,1)

        //object interactions
        this.noInstruct = true
        this.instructDestructor = true

        if(!hasRope){
            this.rope= this.physics.add.sprite(3*screenWidth/4,screenHeight - 100,'rope').setOrigin(0.5,1)
            this.rope.body.allowGravity = false
        }
        if(!hasShirt){
            this.shirt = this.physics.add.sprite(screenWidth/2,screenHeight - 100,'shirt').setOrigin(0.5,1)
            this.shirt.body.allowGravity = false
        }
        if(!hasJacket){
            this.jacket = this.physics.add.sprite(screenWidth/6,screenHeight - 100,'jacket').setOrigin(0.5,1)
            this.jacket.body.allowGravity = false
        }
        if(!hasWood){
            this.wood = this.physics.add.sprite(screenWidth/3,screenHeight - 100,'wood').setOrigin(0.5,1)
            this.wood.body.allowGravity = false
        }        

        this.ropeTree = this.physics.add.sprite(screenWidth,screenHeight,'wipeTree').setOrigin(0.5,1)
        this.ropeTree.body.allowGravity = false

        // Setting up our player and camera to follow player
        this.player = new player(this, screenCenterX, screenCenterY, 'player').setScale(0.15); // Initialize our Player
        this.sceneCamera = this.cameras.main.startFollow(this.player);
        this.sceneCamera.setLerp(cameraLerp,cameraLerp)
        
        this.physics.add.collider(this.player, this.ground); // Collider between ground and player.        

        //collecting the rope
        this.physics.add.overlap(this.player,this.rope,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.rope.x,this.rope.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.rope.destroy()
                hasRope = true
                this.noInstruct = true;
            }
        })

        //collecting the rope
        this.physics.add.overlap(this.player,this.shirt,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.shirt.x,this.shirt.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.shirt.destroy()
                hasShirt = true
                this.noInstruct = true;
            }
        })

        //collecting the rope
        this.physics.add.overlap(this.player,this.wood,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.wood.x,this.wood.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.wood.destroy()
                hasWood = true
                this.noInstruct = true;
            }
        })

        //collecting the rope
        this.physics.add.overlap(this.player,this.jacket,()=>{
            if(this.noInstruct){
                this.instructions = this.add.text(this.jacket.x,this.jacket.y -200,'[space] to pick up',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            if(this.player.actionButton){
                this.instructions.destroy()
                this.jacket.destroy()
                hasJacket = true
                this.noInstruct = true;
            }
        })

        //deal with climbing the tree
        this.physics.add.overlap(this.player,this.ropeTree,()=>{
            if(this.noInstruct && hasRope){
                this.instructions = this.add.text(this.ropeTree.x,this.ropeTree.y -200,'[space] to climb',textConfig).setOrigin(0.5)
                this.noInstruct = false
            } 
            else if (this.noInstruct){
                this.instructions = this.add.text(this.ropeTree.x,this.ropeTree.y -200,'maybe with a rope',textConfig).setOrigin(0.5)
                this.noInstruct = false
            }
            //transition to end scene
            if(this.player.actionButton && hasRope){
                this.screentint =this.add.rectangle(screenWidth,screenHeight,screenWidth,screenHeight,0x000000).setOrigin(1)
                this.screentint.alpha = 0
                this.tweens.add({
                    targets: this.sceneCamera,
                    zoom: 10,
                    duration: 2000,
                    ease: 'linear'                     
                })
                this.tweens.add({
                    targets: this.screentint,
                    alpha: 1,
                    duration: 2000,     
                    ease: 'linear'               
                })
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=> {
                        this.noInstruct = true;
                        this.scene.start('fForestScene')
                    }
                })
            }
        })        


    }

    update(){
        // Debugging mode features
        debugUpdate(this);

        // Update functions for our gameObjects
        this.player.update();

        //remove unused instructions
        if(!this.noInstruct && this.instructDestructor){
            this.instructDestructor = false
            this.time.addEvent({
                delay: instrctionDelay,
                callback: () => {
                    this.noInstruct = true
                    this.instructions.destroy()
                    this.instructDestructor = true
                }
            })
        }

    }
}