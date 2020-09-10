const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'),
      audio = document.createElement('embed');

audio.src = 'audio.mp3';
audio.type = 'audio/mp3';
audio.style.cssText= `position:absolute; top:-1000px`;

car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 2
}

//подчситывает сколько элементов влезет в экран в зависимости от высоты элемента(линии/машинки)
function getQuentityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1
}

/*start.onClick = function(){
    start.classList.add('hide');
};*/

function startGame(){
    start.classList.add('hide');

    for (let i = 0; i<getQuentityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        //расстояние мжду линиями будет 50px
        line.style.top = (i*100) + 'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }

    for (let i=0; i< getQuentityElements(100*settings.traffic); i++) {
        const enemy = document.createElement('div'),
              randomEnemy = Math.floor(Math.random()*7)+1;
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i+1);
        enemy.style.left = (Math.random()*(gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/enemy${randomEnemy}.png) center /  cover no-repeat`;
        gameArea.appendChild(enemy);
    }

    settings.start = true;
    gameArea.appendChild(car);
    gameArea.appendChild(audio);
    //offsetLeft показывает расстояние слева
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += settings.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight){
            line.y=-100;
        }
    })
}

function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemy){
        enemy.y += settings.speed /2;
        enemy.style.top = enemy.y + 'px';

        if(enemy.y >= document.documentElement.clientHeight){
            enemy.y=-100 * settings.traffic;
            enemy.style.left = (Math.random()*(gameArea.offsetWidth - 50)) + 'px'
        }
    })
}

function playGame(){
    console.log('Play game!');
    if (settings.start === true){
        moveRoad();
        moveEnemy();
        //чтобы машинка не уезжала за края родительского контейнера необхюсоблю условие settings.x>0
        if (keys.ArrowLeft && settings.x>0) {
            //расстояние слева будет уменьшаться
            //вместо простого инкрементаб уыеливаем скорость передвижения следю образом
            settings.x-=settings.speed;
        }
        if (keys.ArrowRight && settings.x<(gameArea.offsetWidth-car.offsetWidth)) {
            //расстояние слева будет увеличиваться
            settings.x+=settings.speed;
        }
        if (keys.ArrowDown && settings.y<(gameArea.offsetHeight-car.offsetHeight)) {
            //расстояние слева будет увеличиваться
            settings.y+=settings.speed;
        }
        if (keys.ArrowUp && settings.y>0) {
            //расстояние слева будет увеличиваться
            settings.y-=settings.speed;
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        //функция запускает сама себя, рекурсия
        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
}

function stopRun(event){
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
}


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
