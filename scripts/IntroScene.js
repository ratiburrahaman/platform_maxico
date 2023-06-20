import { tweenToPosition } from './utils.js';

export default class IntroScene extends Phaser.Scene {
  backgroundMusic;
  constructor() {
    super('intro');
  }

  init() {


    this.backgroundMusic = this.sound.add('bg_music');

    this.anims.create({
      key: 'bird_talking',
      delay: 10,
      frames: [
        { key: 'Kea_1_Mouth_opened', duration: 80 },
        { key: 'Kea_1_Mouth_closed', duration: 100 },
        { key: 'Kea_1_Mouth_opened', duration: 80 },
        { key: 'Kea_1_Mouth_closed', duration: 100 },
        { key: 'Kea_1_Mouth_opened', duration: 120 },
        { key: 'Kea_1_Mouth_closed', duration: 90 },
      ],
      frameRate: 8,
      repeat: 8,
    });
  }

  create() {
    console.log('intro');

    window.setTimeout(() => {
      this.backgroundMusic.play();
    }, 500);

    const talkingBird = this.add.sprite(-200, 400, 'Kea_1_Mouth_opened').setScale(0.1);
    talkingBird.setDepth(10);
    talkingBird.play('bird_talking');
    tweenToPosition(this, talkingBird, 1200, '+=0', 12000);

    window.setTimeout(() => {
      this.backgroundMusic.stop();
      this.scene.start('game');
    }, 2000);
  }

  update() {
    // if (this.game.sound.context.state === 'suspended') {
    //   this.game.sound.context.resume();
    // }
  }
}
