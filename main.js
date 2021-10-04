let board1 = document.querySelector('.board1')
let board2 = document.querySelector('.board2')
let boards = document.querySelector('.boards')

// board1.addEventListener('mouseover', ()=>{
//     if (board1.className == 'board1 animated'){
//         board1.style.transform = 'scale(1.6)'
//     }
// })
// board2.addEventListener('mouseover', ()=>{
//     board2.style.transform = 'scale(1.6)'
// })

// console.log(board1.className)

let input = document.querySelector('#inputid')
let setBoard = document.querySelector('.setBoard')

function setPlayerBoard(){
    for(let i=0; i<100; i++){
        let el1 = document.createElement('div')
        el1.classList.add('playerBoard')
        el1.classList.add('dropZone')
            // el1.innerHTML = i+1
            // el1.style.color = 'white'
        el1.setAttribute('data-item', i+1)
        setBoard.appendChild(el1)

    }
}
setPlayerBoard()

function generateBoards(){
    for(let i=0; i<100; i++){
        let el1 = document.createElement('div')
        el1.classList.add('board1-item')
    
        let el2 = document.createElement('div')
        el2.classList.add('board2-item')
    
        board1.appendChild(el1)
        board2.appendChild(el2)
    }
}
generateBoards();

let ships = []

function checkShips(){
    dropZones.forEach(dropZone=>{
        if (dropZone.style.backgroundColor == 'white'){
            if (!(ships.includes(+dropZone.getAttribute('data-item')))){
                ships.push(+dropZone.getAttribute('data-item'))
            }
        }
    })
}


let board1_item = document.querySelectorAll('.board1-item')
let board2_item = document.querySelectorAll('.board2-item')

board2_item.forEach(element=>{
    element.classList.add("b_items_not_animated")
})
board1_item.forEach(element=>{
    element.classList.add("b_items_not_animated")
})


let startButton = document.querySelector('.startButton')
let board_state_trigger = true
let mainSettings = []
let playerName

let diffButton = document.querySelector('.diffButton')
let diffCounter = 1

let plusTimeButton = document.querySelector('.plusTime')
let minusTimeButton = document.querySelector('.minusTime')
let timingCounter = 10


startButton.addEventListener('click', animate_boards);

function main(){
    diffButton.addEventListener('click', ()=>{
        diffCounter++
        if (diffCounter == 1){
            diffButton.innerText = 'Complexity : Low'
        } else if (diffCounter == 2){
            diffButton.innerText = 'Complexity : Medium'
        } else if (diffCounter == 3){
            diffButton.innerText = 'Complexity : High'
            diffCounter = 0
        } 
    })

    input.oninput = ()=>{
        document.querySelector('.inputScreen').innerText = input.value + ' vs AI'
        if (input.value == ''){
            document.querySelector('.inputScreen').innerText = 'Player vs AI'
        }
    }

    document.querySelector('.timing').addEventListener('click', (event)=>{
        if (event.target == plusTimeButton){
            timingCounter += 5
            if (timingCounter >= 60){
                timingCounter = 60
            }
        } else if (event.target == minusTimeButton){
            timingCounter -= 5
            if (timingCounter <= 10){
                timingCounter = 10
            }
        }
        document.querySelector('.time').innerText = timingCounter + 'min'
    })

    startButton.onclick = ()=>{
        console.log('Ships Array' + ships)
        document.querySelector('.headerWindow').classList.add('close')
        document.querySelector('.headerWindow').style.width = '100%'
        document.querySelector('.headerWindow').style.height = '100vh'
        setTimeout(() => {
            document.querySelector('.headerWindow').style.display = 'none'
        }, 1500);
        
        let str = document.querySelector('.diffButton').innerText
        if (str == 'Complexity : Low'){
            mainSettings[1] = 1
        } else if (str == 'Complexity : Medium'){
            mainSettings[1] = 2
        } else if (str == 'Complexity : High'){
            mainSettings[1] = 3
        }
        mainSettings[0] = input.value
        if (input.value == ''){
            mainSettings[0] = 'Player'
        }
        player1.innerText = mainSettings[0] + "'s Turn"
        mainSettings[2] = timingCounter
        
        let CDownID = setInterval(updateCountdown, 1000)
        let time = timingCounter * 60

        function updateCountdown(){
            let minutes = Math.floor(time / 60)
            let seconds = time % 60
            
            if (minutes <= 0 && seconds <= 0){
                pauseButton.onclick = ()=>{}
                pauseButton.style.visibility = 'hidden'
                clearInterval(CDownID)
            }

            minutes = minutes<10 ? '0' + minutes : minutes
            seconds = seconds<10 ? '0' + seconds : seconds
            
            countDownElement.innerHTML = `${minutes} : ${seconds}`
            time--

        }
        pauseButton.onclick = ()=>{
            pauseBTrigger = !pauseBTrigger
            if (pauseBTrigger){ // PAUSE GAME
                clearInterval(CDownID)
            } else { // CONTINUE GAME
                CDownID = setInterval(updateCountdown, 1000)
            }
        }
        console.log(mainSettings)
    }
}

let pauseBTrigger = false

let countDownElement = document.querySelector('.timerdiv .timer')
let pauseButton = document.querySelector('#pauseButton')
let restartButton = document.querySelector('#restartButton')


// 3d animation for boards

function animate_boards(){
    board1.classList.toggle('animated')
    board2.classList.toggle('animated')
    
    board1.classList.toggle('not_animated')
    board2.classList.toggle('not_animated')
    
    board2_item.forEach(element=>{
        element.classList.toggle("b_items_animated")
    })
    board1_item.forEach(element=>{
        element.classList.toggle("b_items_animated")
    })
    
    board2_item.forEach(element=>{
        element.classList.toggle("b_items_not_animated")
    })
    board1_item.forEach(element=>{
        element.classList.toggle("b_items_not_animated")
    })

    document.querySelector('.players').classList.add('players_animated')
    document.querySelector('.players').style.animationDelay = '2s'
}

// DRAG and DROP
let len1Counter = 0
let len2Counter = 0
let len3Counter = 0
let len4Counter = 0

let startIndex, legth
let dragged_element

let dragItems = document.querySelectorAll('.dragItem')
let dropZones = document.querySelectorAll('.dropZone')
let shipDocks = document.querySelectorAll('.shipdock')
let rotateFlag = false

dragItems.forEach(dragItem =>{
    dragItem.addEventListener('dragstart', handlerDragStart)
    dragItem.addEventListener('dragend', handlerDragEnd)
    dragItem.addEventListener('drag', handlerDrag)
    dragItem.addEventListener('dblclick', rotateShip)
})


dropZones.forEach(dropZone =>{
    dropZone.addEventListener('dragenter', handlerDragEnter)
    dropZone.addEventListener('dragleave', handlerDragLeave)
    dropZone.addEventListener('dragover', handlerDragOver)
    dropZone.addEventListener('drop', handlerDrop)
})

let cleanBoardBtn = document.querySelector('.cleanBoard')
cleanBoardBtn.addEventListener('click', ()=>{
    ships.length = 0
    len1Counter = 0
    len2Counter = 0
    len3Counter = 0
    len4Counter = 0

    dropZones.forEach(dropZone=>{
        dropZone.style.border = '1px solid red'
        dropZone.style.backgroundColor = 'blue'
    })
    dragItems.forEach(dragItem=>{
        dragItem.style.display = 'flex'
    })
})


// Drag Functions
function handlerDragStart(){
    length = this.getAttribute('data-length')
    if (length == "1") len1Counter++
    if (length == "2") len2Counter++
    if (length == "3") len3Counter++
    if (length == "4") len4Counter++
    dragged_element = this

}

function handlerDragEnd(){}

function handlerDrag(){}

//Drop Functions 

function handlerDragEnter(event){}

function handlerDragLeave(event){
    event.preventDefault()
    dropZones.forEach(element=>{
        element.style.borderColor = 'red'
    })
}

function handlerDragOver(event){
    event.preventDefault()
    startIndex = this.getAttribute('data-item')
    if (rotateFlag){
        generate_Hdock(startIndex, length)
        // generate_Hdock_circuit(startIndex, length)
    } else {
        generate_dock(startIndex, length)
        // generate_dock_circuit(startIndex, length)
    }
}

function handlerDrop(event){
    event.preventDefault()
    startIndex = this.getAttribute('data-item')
    if (rotateFlag){
        generate_Hship(startIndex, length)
    } else {
        generate_ship(startIndex, length)
    }
    dropZones.forEach(element=>{
        element.style.borderColor = 'red'
    })
    dragItems.forEach(dragItem=>{
        dragItem.parentElement.border = '2px solid blue'
    })
    
    checkShips()

    if (dragged_element.getAttribute('data-length') == '1' && len1Counter == 4){
        dragged_element.style.display = 'none'
    }
    if (dragged_element.getAttribute('data-length') == '2' && len2Counter == 3){
        dragged_element.style.display = 'none'
    }
    if (dragged_element.getAttribute('data-length') == '3' && len3Counter == 2){
        dragged_element.style.display = 'none'
    }
    if (dragged_element.getAttribute('data-length') == '4' && len4Counter == 1){
        dragged_element.style.display = 'none'
    }
}

function rotateShip(){ 
    rotateFlag = !rotateFlag
    rotationState.innerText = rotationState.innerText == 'Direction: Vertical' ? 'Direction: Horizontal' : "Direction: Vertical"
    if (this.border !== '1px solid red'){// making Horizintal
        this.parentElement.style.border = '2px solid red'
        setTimeout(()=>{ // making Vertical
            this.parentElement.style.border = '2px solid blue'
        }, 3000)
    }
}

function generate_dock(index, length){
    index = +index-1
    length = +length

    if (index + (10*(length-1)) <= 100){
        let n = 0
        while(n < length){
            dropZones[index].style.borderColor = 'white'
            index = index + 10
            n++
        }
    }
}

function generate_ship(index, length){
    index = +index-1
    length = +length

    if (index + (10*(length-1)) <= 100){
        let n = 0
        while(n < length){
            dropZones[index].style.backgroundColor = 'white'
            index = index + 10
            n++
        }
    }
}

function generate_Hship(index, length){
    index = +index-1
    length = +length

    if (index%10 + length <= 10){
        let n = 0
        while(n < length){
            dropZones[index].style.backgroundColor = 'white'
            index = index + 1
            n++
        }
    }
}

function generate_Hdock(index, length){
    index = +index-1
    length = +length

    if (index%10 + length <= 10){
        let n = 0
        while(n < length){
            dropZones[index].style.borderColor = 'white'
            index = index + 1
            n++
        }
    }
}

function generate_Hdock_circuit(index, length){}
function generate_Hship_circuit(index, length){}

function generate_ship_circuit(index, length){}
function generate_dock_circuit(index, length){}


main()

restartButton.onclick = ()=>{
    window.location.reload() // reloading page
}

let heading = document.querySelector('.boardSetting p')
heading.innerHTML = heading.textContent.replace(/\S/g, "<div>$&</div>")

let rotationState = document.querySelector('.dock p')


// Game Already Started

let player1 = document.querySelector('.player1')
let AI = document.querySelector('.AI')

let playing = 'pl'

board1_item.forEach(item=>{
    item.removeEventListener('click', sequence)
    item.style.cursor = 'not-allowed'
    item.style.opacity = '0.3'
})
board2_item.forEach(item=>{
    item.addEventListener('click', sequence)
    item.style.cursor = 'default'
    item.style.opacity = '1'
}) 

player1.style.opacity = '1' 
AI.style.opacity = '0.3'

let shots1 = document.querySelector('.shots1')
let shots2 = document.querySelector('.shots2')
let destroyed1 = document.querySelector('.destroyed1')
let destroyed2 = document.querySelector('.destroyed2')

let shotsCounter1 = 0
let shotsCounter2 = 0
let destroyedShipsCounter1 = 0
let destroyedShipsCounter2 = 0

function sequence(){
    playing = playing == 'pl' ? 'ai' : 'pl'
    console.log(playing)

    // որպեսզի այս ֆունկցիայի ներսում աշխատեցվի նավերի կրակելու անիմացիան 
    // ապա հարկավոր է անիմացիային չվերաբերվող ամբողջ կոդը դնել setTimeout-ի մեջ
    // որպեսզի այդքանը կատարվի միայն անիմացիայի ավարտից հետո
    
    if (playing == 'pl'){
        // անիմացիա
        setTimeout(()=>{
            shotsCounter2++
            shots2.innerText = `All Shots Count: ${shotsCounter2}`

            board1_item.forEach(item=>{
                item.removeEventListener('click', sequence)
                item.style.cursor = 'not-allowed'
                item.style.opacity = '0.3'
            })
            board2_item.forEach(item=>{
                item.addEventListener('click', sequence)
                item.style.cursor = 'default'
                item.style.opacity = '1'
            }) 
            
            player1.style.opacity = '1' 
            AI.style.opacity = '0.3'
        }, 2000) // 2վրկ․ հետո
    }
    else { // playing == 'ai'

        // անիմացիա
        setTimeout(()=>{
            shotsCounter1++
            shots1.innerText = `All Shots Count: ${shotsCounter1}`

            board1_item.forEach(item=>{
                item.addEventListener('click', sequence)
                item.style.cursor = 'default'
                item.style.opacity = '1'
            })
            board2_item.forEach(item=>{
                item.removeEventListener('click', sequence)
                item.style.cursor = 'not-allowed'
                item.style.opacity = '0.3'
            })
            
            AI.style.opacity = '1'
            player1.style.opacity = '0.3'
        }, 2000) // 2վրկ․ հետո
    }
}

//this is a new line
