const width = window.innerWidth;
const stageDiv = document.getElementById('stage');
const stageWidth = stageDiv.offsetWidth - 4;

const tweens = {};
const gameState = {};

const stage = new Konva.Stage({
    container: 'stage',
    width: width,
    height: 300
});

const restartLayer = new Konva.Layer();

const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: 300,
    fill: '#e0dbdb',
    stroke: '#e0dbdb',
    strokeWidth: 1,
    opacity: 0.3
})

const iconAnimations = {
    'still': [
        0, 0, 50, 50
    ]
}

const restartIcon = new Image();
restartIcon.src = '/play.png';

const restartImg = new Konva.Sprite({
    x: width / 2 - 25,
    y: 125,
    width: 50,
    height: 50,
    image: restartIcon,
    animations: iconAnimations,
    animation: 'still',
    opacity: 0.7,
});

const gameLayer = new Konva.Layer();
const gguImg = new Image();
gguImg.src = '/newggu.png';

const gguAnimations = {
    'still': [
        0, 0, 30, 30
    ]
}

// 꾸꾸 생성
const GGU = new Konva.Sprite({
    x: 50,
    y: 264,
    width: 30,
    height: 30,
    image: gguImg,
    animations: gguAnimations,
    animation: "still",
    // hitFunc: ctx => {
    //     ctx.fillStyle = '#420';
    //     ctx.beginPath();
    //     ctx.rect(50, 250, 50, 50);
    //     ctx.fill();
    // }
});

// 배경 생성 
const gameBackground = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: 300,
    stroke: 'white',
    strokeWidth: 0,
});

// 땅 사각형 생성 
const groundRect = new Konva.Rect({
    x: 0,
    y: 290,
    width: stageWidth,
    height: 10,
    fill: 'brown',
    stroke: 'brown',
    strokeWidth: 2,
});

const littleBar = new Konva.Rect({
    x: stageWidth - 100,
    y: 244,
    width: 30,
    height: 50,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 0,
    cornerRadius: 3
});

// const bigBar = new Konva.Rect({
//     x: stageWidth - 200,
//     y: 230,
//     width: 20,
//     height: 70,
//     fill: 'blue',
//     stroke: 'blue',
//     strokeWidth: 0
// })

gameLayer.add(littleBar);
// gameLayer.add(bigBar);

const littlebarmove = new Konva.Tween({
    node: littleBar,
    x: 0,
    y: 250,
    duration: 2,
    easing: Konva.Easings.Linear,
    onFinish: () => {
        littleBar.hide();
        // littleBar.remove();
        tweens.littlebarmove.reset();
        setTimeout(() => {
            littleBar.show();
            tweens.littlebarmove.play();
        }, 1000);
    }
});

const timeText = new Konva.Text({
    x: 5,
    y: 5,
    text: '0',
    fontSize: 20,
});

// // const bigBarmove = new Konva.Tween({
// //     node: bigBar,
// //     x: 0,
// //     y: 230,
// //     duration: 8,
// //     easing: Konva.Easings.EaseIn,
// //     onFinish: () => this.reset()
// // })

// // let tweens = [];
// // tweens.push(littlebarmove);

tweens.littlebarmove = littlebarmove;
gameLayer.add(gameBackground);
gameLayer.add(timeText);
gameLayer.add(groundRect);
gameLayer.add(GGU);
restartLayer.add(background);
restartLayer.add(restartImg);
stage.add(restartLayer, gameLayer);
// gameLayer.hide();
restartImg.start();

restartLayer.moveToTop();

// 꾸 점프 애니메이션 
const GGU_JUMP = new Konva.Tween({
    node: GGU,
    x: 50,
    y: 170,
    duration: 0.5,
    rotation: Math.PI / 6,
    easing: Konva.Easings.EaseOut
});

tweens.GGU_JUMP = GGU_JUMP;

const checkIfHit = (r1, r2) => {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
      );
};

// gameLayer.toggleHitCanvas();
// stage.listening(true);
// gameBackground.on('click tap', (e) => {
//         console.log('game background clicked');
//         setTimeout(() => GGU_JUMP.reverse(), 500);
//         GGU_JUMP.play();
// });

// bigBarmove.play();

GGU.start();

gameLayer.on('start', () => {
    
    littlebarmove.play();
    gameState.time = 0;

    const textId = setInterval(() => {
        gameState.time += 1;
        timeText.text(String(gameState.time));
        // timeText.draw();
    }, 1000);

    // 충돌 검사 
    const collideId = setInterval(() => {
        gameLayer.children.each((group) => {
          // 자신은 검사하지 않음 
          if (group === GGU || group === groundRect || group === gameBackground) {
            return;
          }

          if (checkIfHit(group.getClientRect(), GGU.getClientRect())) {
            // 부딪힘 -> 애니메이션 모두 멈추고 재시작 레이어 띄움
            console.log(group.getClientRect());
            console.log(GGU.getClientRect());
            console.log('hit!!!');
            // 꾸 멈춤
            GGU_JUMP.finish();
            // 모든 tween 멈춤
            for (let tween of Object.values(tweens)) {
                tween.pause();
            }
            setTimeout(() => {
                for (let tween of Object.values(tweens)) {
                    tween.reset();
                }
                gameState.time = 0;
                timeText.setAttr('text', String(0));
            }, 30);
            // time interval clear
            clearInterval(gameState.textId);
            // check interval clear
            clearInterval(gameState.collideId);
            // restart layer show
            restartLayer.moveToTop();
            restartLayer.show();
          } 
          else {
            // 부딪히지 않음 -> 아무것도 안함
            // 부딪히지 않고 끝에 도달하면 처음으로 돌림 혹은 숨김
          }
          // do not need to call layer.draw() here
          // because it will be called by dragmove action
        });
    }, 1);

    gameState.textId = textId;
    gameState.collideId = collideId;
});

gameLayer.on('click tap', () => {
    // ggu jump up 
    console.log('game layer clicked');
    setTimeout(() => GGU_JUMP.reverse(), 500);
    GGU_JUMP.play();
})

background.on('click tap', () => {
    // 레이어 숨기고 다른 레이어 출현 
    console.log('restart layer hide');
    restartLayer.hide();
    gameLayer.moveToTop();
    gameLayer.fire('start');
})

restartImg.on('click tap', () => {
    // 레이어 숨기고 다른 레이어 출현 
    console.log('restart layer hide');
    restartLayer.hide();
    gameLayer.moveToTop();
    gameLayer.fire('start');
})