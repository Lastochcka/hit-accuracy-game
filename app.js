//qS помогаетп получать из дом-дерево//
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = [ '#F9ED69', '#B83B5E', '#F08A5D', '#3FC1C9', '#00B8A9']
//let- создание переменной, "="- установка значения по умолчанию
let time = 0
let score = 0



//addEL - прослушка события, (event) - этим мы получили объект
startBtn.addEventListener('click', (event) => {
    //отмена поведения по умолчанию, в адрессной строке перестал добавляться "#" после нажатия на "начать игру"
    event.preventDefault()
    //массиву sqreens с 1 слайда добавляем класс up
    screens[0].classList.add('up')
})


//концепт делегирование событий
timeList.addEventListener('click', event => {
    //target- эл. по которому кликнули, contains- проверка класса у эл.
    if (event.target.classList.contains('time-btn')) {
        time = parseInt((event.target.getAttribute('data-time')))
        screens[1].classList.add('up')
        startGame()
    }
})

//счет очков в игре
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    //Задаю тармер в 1 сек. (1000 миллисекунд)
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

//изменение времени
function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    //parentNode, чтобы не высвечивался родитель с дерева документа HTML
    //вместо remove можно: classList.add('hide')
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Cчет: <span class="primary">${score} </span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    //диструктуризация
    const {width, height} =board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`

    board.append(circle)

    //зададим смену цвета кружочка при генерации
    circle.style.background = getRandomColor()
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() *(max-min) + min)
}