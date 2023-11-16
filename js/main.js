// loader

function loader() {
  const loader = document.querySelector('#loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('preloader-hidden');
    }, 1500)
  });
};

loader();

// 3D scroll

let zSpasing = -1000; // Расстояние по оси Z
let lastPos = zSpasing / 5; // Стартовая позиция 
let $frames = document.getElementsByClassName('frame'); // Добавление "главная слоя", важно использовать его как массив
let frames = Array.from($frames); // Преобразование в массив
let zVals = [];

window.onscroll = function () { // Функция когда происходит скролл на странице

  let top = document.documentElement.scrollTop; // Расстояние сверху до текущей позиции
  let delta = lastPos - top; // Вычисление последней позиции

  lastPos = top; // Обновление последней позиции

  frames.forEach(function (n, i) { // Проход по всем фреймам при скролле, n - текущий обрабатываемый элемент, i - его индекс
    zVals.push((i * zSpasing) + zSpasing) // Добавление обновленных значений
    zVals[i] += delta * -5.5; // Прибавляем  дельту умноженную на -5 это скорость пролистывания
    let frame = frames[i]; // Объявление обновленной ппеременной
    let transform = `translateZ(${zVals[i]}px)`; // Добавляем translateZ со значением дельты
    let opacity = zVals[i] < Math.abs(zSpasing) / 1.8 ? 1 : 0; // Добавляем opasity, что если положительная стартовая позиция больше чем фрейм, то 1 иначе 0; чем больше (1.5) тем раньше будет применяться opasity 

    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`); // Задаем атрибут каждому фрейму
  })
}

window.scrollTo(0, 1);

// Audio

let audioplay = document.querySelector('.audioplay');
let audioBtn = document.querySelector('.audioplay__btn');
let audio = document.querySelector('.audioplay__audio');

audioplay.addEventListener('click', e => {
  audioplay.classList.toggle('paused');
  audio.paused ? audio.play() : audio.pause();
})

window.onfocus = function () {
  audioplay.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function () {
  audio.pause()
}


// CURSOR


let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree

document.addEventListener('DOMContentLoaded', () => {


  const body = document.querySelector('body')

  cx = window.innerWidth / 2
  cy = window.innerHeight / 2

  body.addEventListener('mousemove', e => {

    clientX = e.pageX
    clientY = e.pageY

    request = requestAnimationFrame(updateMe)

    mouseCoords(e)
    cursor.classList.remove('hidden')
    follower.classList.remove('hidden')

  })

  function updateMe() {

    dx = clientX - cx
    dy = clientY - cy
    tiltx = dy / cy
    tilty = dx / cx
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
    degree = radius * 12
    gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })

  }

  const cursor = document.getElementById('cursor'),
    follower = document.getElementById('aura'),
    links = document.getElementById('links');

  mouseX = 0, mouseY = 0, posX = 0, posY = 0

  function mouseCoords(e) {

    mouseX = e.pageX
    mouseY = e.pageY

  }

  gsap.to({}, .01, {

    repeat: -1,

    onRepeat: () => {

      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5

      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      })

      gsap.set(follower, {
        css: {
          left: posX - 24,
          top: posY - 24
        }
      })

    }

  })

  links.addEventListener('mouseover', () => {
    cursor.classList.add('active')
    follower.classList.add('active')
  })

  links.addEventListener('mouseout', () => {
    cursor.classList.remove('active')
    follower.classList.remove('active')
  })


  body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden')
    follower.classList.add('hidden')
  })

})
