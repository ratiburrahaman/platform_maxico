
export class LoadScene extends Phaser.Scene
{

	constructor()
	{
		super('LoadScene')
    }

    preload()
    {

        this.add.text(this.sys.canvas.width / 2, 280, `Loading...`, {
            fontSize: "40px"
        }).setOrigin(0.5);

        this.load.image('bg_1', 'assets/sprites/bg_1.png');
        this.load.image('bg_2', 'assets/sprites/bg_2.jpg');
        this.load.image('bg_3', 'assets/sprites/bg_3.jpg');

        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('star', 'assets/sprites/star.png');
        this.load.image('bomb', 'assets/sprites/bomb.png');
        this.load.image('saw', 'assets/sprites/Saw.png');
        this.load.audio("coinsound", 'assets/sound/coinsound.mp3');
        this.load.audio("bgsound", 'assets/sound/bgsound.mp3');

        this.load.spritesheet('dudu', 
            'assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
	}

    create(){
        this.scene.start("HomeScene");
        // this.scene.start("GameScene");
    }

}