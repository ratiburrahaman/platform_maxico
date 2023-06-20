import { getWidth, getHeight, getCenterX, getCenterY, level, option } from "./utils.js";


export class GameScene extends Phaser.Scene
{

	constructor()
	{
		super('GameScene');



	}

    init(){
        this.player = undefined;
        this.cursors = undefined;
        this.starGroup = undefined;
        this.bombGroup = undefined;
        this.score = 0;
        this.scoreText = undefined;
        this.isGameOver = false;
        this.gameOverPanel = undefined;
        this.panelScoreTxt = undefined;
        this.bgSound = undefined;
        this.levelNumber  = option.levelNumber;
        this.levelText = undefined;
    }

	create()
	{

      

        // this.bgSound = this.sound.add("bgsound");
        // this.bgSound.play();

		let bg = this.add.image(getCenterX(this), getCenterY(this), `bg_${option.levelNumber + 1}`);
        bg.displayWidth = getWidth(this);
        bg.displayHeight = getHeight(this);

        this.scoreText = this.add.text(850, 20, `Score: ${this.score}`, {
            fontSize: "30px"
        }).setDepth(40);
        this.levelText = this.add.text(850, 60, `Level: ${this.levelNumber + 1}`, {
            fontSize: "30px"
        }).setDepth(40);

       this.createGameOverPanel();

		
		const platforms = this.createPlatforms();
		this.player = this.createPlayer();

        this.bombGroup = this.add.group();

		this.starGroup = this.add.group();

        this.createStars();
        this.createBombs();

		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.starGroup, platforms);

        this.physics.add.overlap(this.player, this.starGroup, (player, star) =>{
            if(!this.isGameOver){
                star.disableBody(true, true);
                star.body.gameObject.destroy();
                this.scoreText.text = `Score: ${this.score += 1}`;
                this.sound.play("coinsound");
            }
            if(this.starGroup.children.size < 1 && !this.isGameOver){
               //this.createStars();
               if(option.levelNumber < 2){
                 option.levelNumber += 1;
               }else{
                   option.levelNumber = 0;
               }
               this.scene.restart("GameScene");


            }
        });


		this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.bombGroup, (player, bomb)=>{
            this.gameOver();
        });

        this.physics.add.collider(this.starGroup, platforms);


	}


    update(){

        if(this.isGameOver)
         return;

        if(!this.isGameOver){
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-160);
    
                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(160);
    
                this.player.anims.play('right', true);
            }
            else
            {
                this.player.setVelocityX(0);
    
                this.player.anims.play('turn');
            }
    
            if (this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.setVelocityY(-280);
            }
        }

        if(this.input.activePointer.isDown){
            console.log(`${this.input.activePointer.x}:${this.input.activePointer.y}`)
        }

    }




    createStars()
	{
		for(let i = 0; i < 12; i++){
            let star = this.physics.add.sprite((i * 60) + 75, 0, 'star');
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            this.starGroup.add(star);
        }
		
	}

    createPlatforms()
	{
		const platforms = this.physics.add.staticGroup();

		platforms.create(400, 568, 'ground').setScale(4, 2).refreshBody();
	
        for(let i = 0; i < level[this.levelNumber].platform.length; i++){
            let x = level[this.levelNumber].platform[i].x;
            let y = level[this.levelNumber].platform[i].y;
            platforms.create(x, y, 'ground');
        }
		return platforms;
	}

    createBombs(){
        for(let i = 0; i < 3; i++){
            let bomb = this.physics.add.sprite(100, 0, 'bomb');
            bomb.setBounce(1.1);
            bomb.setCollideWorldBounds(true, 1, 1);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    
            this.bombGroup.add(bomb);
        }

        for(let i = 0; i < level[this.levelNumber].saw.length; i++){
            let xpos = level[this.levelNumber].saw[i].x;
            let ypos = level[this.levelNumber].saw[i].y;
            let isMove = level[this.levelNumber].saw[i].isMove;
            let saw = this.physics.add.sprite(xpos, ypos, "saw");
            saw.body.allowGravity = false;
            saw.setScale(0.3);
            this.tweens.add({
                targets: saw,
                angle: 360,
                duration: 2000,
                repeat: -1,
                yoyo: true
            })
            if(isMove){
                this.tweens.add({
                    targets: saw,
                    x: xpos + 200,
                    duration: 3000,
                    repeat: -1,
                    yoyo: true
                })
            }
            this.bombGroup.add(saw);
        }

        


    }

    createPlayer()
	{
		const player = this.physics.add.sprite(60, 300, 'dudu');
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dudu', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dudu', frame: 4 } ],
			frameRate: 20
		});
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dudu', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		return player;
	}

    gameOver(){
        console.log("Game Over");
        this.player.tint = 0xFF0000;
        this.panelScoreTxt.text =  `Score: ${this.score}`;
        this.isGameOver = true;
        this.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.gameOverPanel.visible = true;
            }
        });
    }

    createGameOverPanel(){
        this.gameOverPanel = this.add.container(this.sys.canvas.width / 2, this.sys.canvas.height / 2).setDepth(10);
        let overText = this.add.text(0, -100, `Game Over`, {
            fontSize: "50px"
        }).setDepth(3);
        overText.setOrigin(0.5);

        this.panelScoreTxt = this.add.text(0, 0, `Score: ${this.score}`, {
            fontSize: "30px"
        }).setDepth(3);
        this.panelScoreTxt.setOrigin(0.5);

        let homeBtn = this.add.text(0, 120, `Home`, {
            fontSize: "30px"
        }).setDepth(3);
        homeBtn.setOrigin(0.5);
        homeBtn.setInteractive();
        homeBtn.on("pointerdown", ()=>{
            this.scene.start("HomeScene");
        })

        let RetryBtn = this.add.text(0, 60, `Retry`, {
            fontSize: "30px"
        }).setDepth(3);
        RetryBtn.setOrigin(0.5);

        RetryBtn.setInteractive();
        RetryBtn.on("pointerdown", ()=>{
            this.score = 0;
            this.scoreText.text = `Score: ${this.score}`;
            this.isGameOver = false;
           // this.bgSound.destroy();
            this.scene.restart("GameScene");
        })

        let panelBG = this.add.rectangle(0, 0, this.sys.canvas.width, this.sys.canvas.height, 0x000000);

        this.gameOverPanel.add([panelBG, overText, this.panelScoreTxt, homeBtn, RetryBtn]);

        this.gameOverPanel.visible = false;
    }
}