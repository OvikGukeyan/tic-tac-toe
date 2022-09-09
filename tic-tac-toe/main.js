const area = document.getElementById('area');
let move = 0;
let result = '';
const xWon = document.getElementById('won-wraper')
const oWon = document.getElementById('lose-wraper')
const tied = document.getElementById('tied-wraper')
const contentWrapper = document.getElementById('content');
const modalResult = document.getElementById('modal-result-wraper');
const overlay = document.getElementById('overlay');
const btnClose = document.getElementById('btn-cloce');
const restart = document.getElementById('restart')
const boxes = document.getElementsByClassName('box');
const xCount = document.getElementById('x-count');
const oCount = document.getElementById('o-count');
const tiedCount = document.getElementById('ties-count');
let xScore = 0;
let oScore = 0;
let tiedScore = 0;
const X = '<img src="./assets/icon-x.svg" alt="">'
const O = '<img src="./assets/icon-o.svg" alt="">'
//click event 


area.addEventListener('click', e => {
    if(e.target.className === 'box') {
        if(move % 2 === 0 && e.target.innerHTML === ''){
            e.target.innerHTML = X
            move++;
            check();
//CPU ON
            if(result === ''){
                setTimeout(cpu, 500);
            }
        }else if(move % 2 !== 0 && e.target.innerHTML === ''){
            e.target.innerHTML = O;
            move++;
            check();
        }
    }
    
});



// function random choice
const randChoice = () => {
    const cpuChoice = Math.floor(Math.random() * 8);
    if(boxes[cpuChoice].innerHTML === ''){
        boxes[cpuChoice].innerHTML = O
        move++;
        check();
    }else{
        randChoice()
    }

}


// function cpu choice


const cpu = () =>{


    const winArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(i=0; i < winArr.length; i++){
        if(boxes[winArr[i][0]].innerHTML === '' && boxes[winArr[i][1]].innerHTML === O && boxes[winArr[i][2]].innerHTML === O){
            boxes[winArr[i][0]].innerHTML = O;
            move++;
            check();
            return console.log('ok11')
        }else if(boxes[winArr[i][0]].innerHTML === O && boxes[winArr[i][1]].innerHTML === '' && boxes[winArr[i][2]].innerHTML === O){
            boxes[winArr[i][1]].innerHTML = O;
            move++;
            check();
            return console.log('ok12')
        }else if(boxes[winArr[i][0]].innerHTML === O && boxes[winArr[i][1]].innerHTML === O && boxes[winArr[i][2]].innerHTML === ''){
            boxes[winArr[i][2]].innerHTML = O;
            move++;
            check();
            return console.log('ok12')
        }    
    }    

    for(i=0; i < winArr.length; i++){
        if(boxes[winArr[i][0]].innerHTML === '' && boxes[winArr[i][1]].innerHTML === X && boxes[winArr[i][2]].innerHTML === X){
            boxes[winArr[i][0]].innerHTML = O;
            move++;
            check();
            return console.log('ok1')
        }else if(boxes[winArr[i][0]].innerHTML === X && boxes[winArr[i][1]].innerHTML === '' && boxes[winArr[i][2]].innerHTML === X){
            boxes[winArr[i][1]].innerHTML = O;
            move++;
            check();
            return console.log('ok2')
        }else if(boxes[winArr[i][0]].innerHTML === X && boxes[winArr[i][1]].innerHTML === X && boxes[winArr[i][2]].innerHTML === ''){
            boxes[winArr[i][2]].innerHTML = O;
            move++;
            check();
            return console.log('ok3')
        }
        
        
    };

    randChoice();
    
}


// checking function

const check = () => {
    
    const winArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(i=0; i < winArr.length; i++){
        if(boxes[winArr[i][0]].innerHTML === X && boxes[winArr[i][1]].innerHTML === X && boxes[winArr[i][2]].innerHTML === X){
            result = 'X win';
            xScore++;
            xCount.innerHTML = xScore;
            rendResult(result);
        }else if(boxes[winArr[i][0]].innerHTML === O && boxes[winArr[i][1]].innerHTML === O && boxes[winArr[i][2]].innerHTML === O){
            result = 'O win';
            oScore++;
            oCount.innerHTML = oScore;

            rendResult(result);
        }
    }

    if(move === 9 && result === ''){
       result = 'DRAW';
       tiedScore++;
       tiedCount.innerHTML = tiedScore;
       rendResult(result);
    }
};


//function results on

const rendResult = result => {
    if(result === 'X win'){
        xWon.style.display = 'block';
        oWon.style.display = 'none';
        tied.style.display = 'none'
    }else if(result === 'O win'){
        oWon.style.display = 'block';
        xWon.style.display = 'none';
        tied.style.display = 'none'
    }else if(result === 'DRAW'){
        tied.style.display = 'block'
        xWon.style.display = 'none';
        oWon.style.display = 'none';

    }
    modalResult.style.display = 'block';

};


//function results off

const closeModal = () =>{
    modalResult.style.display = 'none';
    for(let i = 0; i < boxes.length; i++){
        boxes[i].innerHTML = ''
    };
    result = '';
    move = 0;
};


// close events
restart.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);