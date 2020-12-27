class GGU {
    constructor() {
        this.width = window.innerWidth;
        const stageDiv = document.getElementById('stage');
        this.stageWidth = stageDiv.offsetWidth - 4;
        this.gameObjects = {};
        this.tweens = {};
        this.gameState = {};
        this.createGameLayer = this.createGameLayer.bind(this);
        this.createRestartLayer = this.createRestartLayer.bind(this);
        this.checkIfHit = this.checkIfHit.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
        this.updateScore = this.updateScore.bind(this);

        const stage = new Konva.Stage({
            container: 'stage',
            width: this.width,
            height: 300
        });

        this.stage = stage;

        this.createRestartLayer();
        this.createGameLayer();
        this.setEventListeners();

        this.stage.add(this.restartLayer, this.gameLayer);

        this.gameObjects.restartImg.start();

        this.restartLayer.moveToTop();

        this.gameObjects.GGU.start();

        const userid = window.prompt('id를 입력해주세요');
        this.gameState.userid = userid;
    }

    createRestartLayer() {
        const restartLayer = new Konva.Layer();

        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: 300,
            fill: '#e0dbdb',
            stroke: '#e0dbdb',
            strokeWidth: 1,
            opacity: 0.3
        })

        // background.name('background');
        this.gameObjects.background = background;

        const iconAnimations = {
            'still': [
                0, 0, 50, 50
            ]
        }
        
        const restartIcon = new Image();
        restartIcon.src = '/play.png';
        
        const restartImg = new Konva.Sprite({
            x: this.width / 2 - 25,
            y: 125,
            width: 50,
            height: 50,
            image: restartIcon,
            animations: iconAnimations,
            animation: 'still',
            opacity: 0.7,
        });

        // restartImg.name('restartImg');
        this.gameObjects.restartImg = restartImg;

        restartLayer.add(background);
        restartLayer.add(restartImg);

        this.restartLayer = restartLayer;

        // this.stage.add(restartLayer);
    }

    createGameLayer() {
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

        // GGU.name('GGU');
        this.gameObjects.GGU = GGU;

        // 배경 생성 
        const gameBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: 300,
            stroke: 'white',
            strokeWidth: 0,
        });

        this.gameObjects.gameBackground = gameBackground;

        // 땅 사각형 생성 
        const groundRect = new Konva.Rect({
            x: 0,
            y: 290,
            width: this.stageWidth,
            height: 10,
            fill: 'brown',
            stroke: 'brown',
            strokeWidth: 2,
        });

        this.gameObjects.groundRect = groundRect;

        const littleBar = new Konva.Rect({
            x: this.stageWidth,
            y: 244,
            width: 30,
            height: 50,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 0,
            cornerRadius: 3,
        });

        this.gameObjects.littleBar = littleBar;

        const bigBar = new Konva.Rect({
            x: this.stageWidth,
            y: 220,
            width: 20,
            height: 70,
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 0,
        })

        this.gameObjects.bigBar = bigBar;

        const airHighBar = new Konva.Rect({
            x: this.stageWidth,
            y: 150,
            width: 30,
            height: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 0,
        });

        this.gameObjects.airHighBar = airHighBar;

        const airLowBar = new Konva.Rect({
            x: this.stageWidth,
            y: 250,
            width: 30,
            height: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 0,
        });

        this.gameObjects.airLowBar = airLowBar;

        gameLayer.add(airLowBar);
        gameLayer.add(airHighBar);
        gameLayer.add(littleBar);
        gameLayer.add(bigBar);

        const littlebarmove = new Konva.Tween({
            node: littleBar,
            x: 0,
            y: 250,
            duration: 2,
            easing: Konva.Easings.Linear,
            onFinish: () => {
                this.gameObjects.littleBar.hide();
                // littleBar.remove();
                this.tweens.littlebarmove.reset();
                setTimeout(() => {
                    this.gameObjects.littleBar.show();
                    if(this.gameState.isPlaying) {
                        this.tweens.littlebarmove.play();
                    }
                }, 900);
            }
        })

        const timeText = new Konva.Text({
            x: 5,
            y: 5,
            text: '0',
            fontSize: 20,
        });

        // timeText.name('timeText');
        this.gameObjects.timeText = timeText;
        
        const bigbarmove = new Konva.Tween({
            node: bigBar,
            x: 0,
            y: 220,
            duration: 1.5,
            easing: Konva.Easings.EaseIn,
            onFinish: () => {
                this.gameObjects.bigBar.hide();
                // littleBar.remove();
                this.tweens.bigbarmove.reset();
                setTimeout(() => {
                    this.gameObjects.bigBar.show();
                    if(this.gameState.isPlaying) {
                        this.tweens.bigbarmove.play();
                    }
                }, 1000);
            }
        });

        const airhighbarmove = new Konva.Tween({
            node: airHighBar,
            x: 0,
            y: 290,
            duration: 3,
            easing: Konva.Easings.StrongEaseInOut,
            onFinish: () => {
                this.gameObjects.airHighBar.hide();
                // littleBar.remove();
                this.tweens.airhighbarmove.reset();
                setTimeout(() => {
                    this.gameObjects.airHighBar.show();
                    if(this.gameState.isPlaying) {
                        this.tweens.airhighbarmove.play();
                    }
                }, 1000);
            }
        });
        
        const airlowbarmove = new Konva.Tween({
            node: airLowBar,
            x: 0,
            y: 220,
            duration: 2,
            easing: Konva.Easings.BounceEaseIn,
            onFinish: () => {
                this.gameObjects.airLowBar.hide();
                // littleBar.remove();
                this.tweens.airlowbarmove.reset();
                setTimeout(() => {
                    this.gameObjects.airLowBar.show();
                    if(this.gameState.isPlaying) {
                        this.tweens.airlowbarmove.play();
                    }
                }, 1000);
            }
        });

        this.tweens.airhighbarmove = airhighbarmove;
        this.tweens.airlowbarmove = airlowbarmove;
        this.tweens.littlebarmove = littlebarmove;
        this.tweens.bigbarmove = bigbarmove;
        
        gameLayer.add(gameBackground);
        gameLayer.add(timeText);
        gameLayer.add(groundRect);
        gameLayer.add(GGU);

        this.restartLayer.moveToTop();

        // 꾸 점프 애니메이션 
        const GGU_JUMP = new Konva.Tween({
            node: GGU,
            x: 50,
            y: 170,
            duration: 0.5,
            rotation: Math.PI / 6,
            easing: Konva.Easings.EaseOut
        });

        this.tweens.GGU_JUMP = GGU_JUMP;
        this.gameLayer = gameLayer;

        // this.stage.add(gameLayer);
    }

    checkIfHit(r1, r2) {
        return !(
            r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y
          );
    }

    setEventListeners() {
        
        this.gameLayer.on('start', () => {
            
            this.gameState.isPlaying = true;

            setTimeout(() => {
                if (this.gameState.isPlaying) {
                    this.tweens.bigbarmove.play();
                }
            }, 500);
            setTimeout(() => {
                if (this.gameState.isPlaying) {
                    this.tweens.airhighbarmove.play();
                }
            }, 5000);
            setTimeout(() => {
                if (this.gameState.isPlaying) {
                    this.tweens.airlowbarmove.play();
                }
            }, 7000);
            
            this.tweens.littlebarmove.play();
            this.gameState.time = 0;
        
            const textId = setInterval(() => {
                this.gameState.time += 1;
                this.gameObjects.timeText.text(String(this.gameState.time));
                // timeText.draw();
            }, 1000);
        
            // 충돌 검사 
            const collideId = setInterval(() => {
                this.gameLayer.children.each((group) => {
                  // 자신은 검사하지 않음 
                  if (group === this.gameObjects.GGU || group === this.gameObjects.groundRect || group === this.gameObjects.gameBackground) {
                    return;
                  }
        
                  if (this.checkIfHit(group.getClientRect(), this.gameObjects.GGU.getClientRect())) {
                    this.gameState.isPlaying = false;
                    // 부딪힘 -> 애니메이션 모두 멈추고 재시작 레이어 띄움
                    // console.log(group.getClientRect());
                    // console.log(this.gameObjects.GGU.getClientRect());
                    console.log('hit!!!');
                    // 꾸 멈춤
                    this.tweens.GGU_JUMP.finish();

                    // 점수 기록
                    this.gameState.score = this.gameState.time;
                    this.updateScore();

                    // 모든 tween 멈춤
                    for (let tween of Object.values(this.tweens)) {
                        tween.pause();
                        tween.reset();
                        // for (let tween of Object.values(this.tweens)) {
                        //     tween.reset();
                        // }
                        this.gameState.time = 0;
                        this.gameObjects.timeText.text(String(0));
                    }

                    // setTimeout(() => {
                    //     for (let tween of Object.values(this.tweens)) {
                    //         tween.reset();
                    //     }
                    //     this.gameState.time = 0;
                    //     this.gameObjects.timeText.text(String(0));
                    // }, 30);

                    // time interval clear
                    clearInterval(this.gameState.textId);
                    // check interval clear
                    clearInterval(this.gameState.collideId);
                    // restart layer show
                    this.restartLayer.moveToTop();
                    this.restartLayer.show();
                  } 
                  else {
                    // 부딪히지 않음 -> 아무것도 안함
                    // 부딪히지 않고 끝에 도달하면 처음으로 돌림 혹은 숨김
                  }
                  // do not need to call layer.draw() here
                  // because it will be called by dragmove action
                });
            }, 1);
        
            this.gameState.textId = textId;
            this.gameState.collideId = collideId;
        });
        
        this.gameLayer.on('click tap', () => {
            // ggu jump up 
            console.log('game layer clicked');
            setTimeout(() => this.tweens.GGU_JUMP.reverse(), 500);
            this.tweens.GGU_JUMP.play();
        })
        
        this.gameObjects.background.on('click tap', () => {
            // 레이어 숨기고 다른 레이어 출현 
            console.log('restart layer hide');
            this.restartLayer.hide();
            this.gameLayer.moveToTop();
            this.gameLayer.fire('start');
        })
        
        this.gameObjects.restartImg.on('click tap', () => {
            // 레이어 숨기고 다른 레이어 출현 
            console.log('restart layer hide');
            this.restartLayer.hide();
            this.gameLayer.moveToTop();
            this.gameLayer.fire('start');
        })
    }

    updateScore() {
        const updateapi = `/updatescore/${this.gameState.userid}/${this.gameState.score}`;

        fetch(updateapi, {
            method: 'POST',
        })
        .then(res => {
            console.log(res.body);
        })
        .catch(err => console.warn(err));
    }
}

// initialize
new GGU();