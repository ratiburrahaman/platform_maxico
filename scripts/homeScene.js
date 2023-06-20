export class HomeScene extends Phaser.Scene
{

	constructor()
	{
		super('HomeScene');
    }

    create(){

        //this.sound.play("bgsound");

        let title = this.add.text(this.sys.canvas.width / 2, 200, `Dreamland`, {
            fontSize: "50px"
        }).setDepth(3).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            scale: 1.08,
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        let playBtn = this.add.text(this.sys.canvas.width / 2, 280, `Play`, {
            fontSize: "40px"
        }).setDepth(3);
        playBtn.setOrigin(0.5);



        playBtn.setInteractive();
        playBtn.on("pointerdown", ()=>{
            this.scene.start("GameScene");
        });

       this.add.text(this.sys.canvas.width / 2, 380, `Left: ← \nRight: →\nJump: ↑`, {
            fontSize: "20px"
        }).setDepth(3).setOrigin(0.5);
    }
}