export function getCenterX(scene){
  return scene.sys.canvas.width / 2;
}

export function getCenterY(scene){
  return scene.sys.canvas.height / 2;
}

export function getWidth(scene){
  return scene.sys.canvas.width;
}

export function getHeight(scene){
  return scene.sys.canvas.height;
}

export let level = [
  {
  platform: [
    {
      x: 600, y: 400
    },
    {
      x: 50, y: 250
    },
    {
      x: 750, y: 220
    }
    ,
    {
      x: 365, y: 95
    }
  ],
  saw: [
    {
      x: 160,
      y: 390,
      isMove: false
    },
    {
      x: 435,
      y: 390,
      isMove: true
    },
    {
      x: 330,
      y: 50,
      isMove: true
    }
  ]
 },
 {
  platform: [
    {
      x: 450, y: 500
    },
    {
      x: 600, y: 400
    },
    {
      x: 50, y: 250
    },
    {
      x: 550, y: 220
    }
    ,
    {
      x: 665, y: 95
    }
  ],
  saw: [
    {
      x: 325,
      y: 245,
      isMove: false
    },
    {
      x: 635,
      y: 390,
      isMove: true
    },
    {
      x: 300,
      y: 50,
      isMove: true
    }
  ]
 },
 {
  platform: [
    {
      x: 750, y: 500
    },
    {
      x: 600, y: 400
    },
    {
      x: 900, y: 140
    },
    {
      x: 550, y: 220
    }
    ,
    {
      x: 265, y: 95
    }
  ],
   saw: [
    {
      x: 325,
      y: 245,
      isMove: true
    },
    {
      x: 655,
      y: 390,
      isMove: true
    },
    {
      x: 575,
      y: 100,
      isMove: true
    }
  ]
 }
]


export let option = {
  levelNumber: 0
}