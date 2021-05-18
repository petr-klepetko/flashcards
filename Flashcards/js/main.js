const turnCard = document.querySelector('#turnCard');
const QorA = document.querySelector('#QorA');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const card = document.querySelector('#card');
const h1 = document.querySelector('#h1');
const backToSelection = document.querySelector('#backToSelection');


let cardNumber = document.querySelector('#cardNumber');
let moveForward = document.querySelector('#forward');
let moveBack = document.querySelector('#back');



let filePath = "../questions/questions.json";
let currentIndex = 0;

let questionText = 'Otázka';
let answerText = 'Odpověď';

let answerIsShown = false;

var questions;

function showQuestion() {
    if (answerIsShown) {                    //Answer is shown -> we need to show question
        answer.classList.add('hide');       //hide answer
        QorA.innerText = 'Q';               //set header to Q

        question.classList.remove('hide');  //display the question

        card.classList.remove('answer');
        answerIsShown = false;
    }
}

function moveOneBack() {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
        readTextFile(filePath, (text) => {
            questions = JSON.parse(text);
            questionText = questions.questions[currentIndex].question;
            answerText = questions.questions[currentIndex].answer;

            question.innerText = questionText;
            answer.innerText = answerText;

            cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
            showQuestion();
        });
    }
};

function moveOneForward() {
    if (currentIndex + 1 < questions.questions.length) {
        currentIndex = currentIndex + 1;
        readTextFile(filePath, (text) => {
            questions = JSON.parse(text);
            questionText = questions.questions[currentIndex].question;
            answerText = questions.questions[currentIndex].answer;

            question.innerText = questionText;
            answer.innerText = answerText;

            cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
            showQuestion();
        });
    }
};

function turnCardFunction() {
    //console.log('Clicknuto. ');
    if (answerIsShown) {                    //Answer is shown -> we need to show question
        answer.classList.add('hide');       //hide answer
        QorA.innerText = 'Q';               //set header to Q

        question.classList.remove('hide');  //display the question

        answerIsShown = false;
        card.classList.remove('answer');
        //console.log(answerText);
    }
    else {
        question.classList.add('hide');     //hide question
        QorA.innerText = 'A';               //set heading to A - answer

        answer.classList.remove('hide');    //display the answer

        card.classList.add('answer');
        answerIsShown = true;
        //console.log('Zobrazena odpověď. ');
    }
};

moveBack.addEventListener('click', moveOneBack, false);

moveForward.addEventListener('click', moveOneForward);

turnCard.addEventListener('click', turnCardFunction);

card.addEventListener('click', turnCardFunction);

document.addEventListener('keydown', (event) => {
    console.log(`key=${event.key},code=${event.code}`);
    if (event.code === 'ArrowLeft') {                        //move BACK
        moveOneBack();
    }

    if (event.code === 'ArrowRight') {                           //move FORWARD
        moveOneForward();
    }

    if (event.code === 'Enter' || event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        turnCardFunction();
    }

    if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        event.preventDefault();
    }
});

const setTexts = (qText, aText) => {
    question.innerText = qText;
    answer.innerText = aText;
};

let readTextFile = (file, callback) => {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

const initialize = () => {
    /** Get status info, which includes:
     *      - path to file WITHOUT the name
     *      - filename
     *      - 
     */
    readTextFile('./status.json', (status) => {
        // console.log(status);
        status = JSON.parse(status);
        filePath = status['path-to-file'] + status['current-file'];
        // console.log(status['current-file']);
        // console.log(status['path-to-file']);
        console.log(filePath);
        console.log('initializing');

        /** Get questions */
        readTextFile(filePath, (text) => {
            questions = JSON.parse(text);
            questionText = questions.questions[0].question;
            answerText = questions.questions[0].answer;

            question.innerText = questionText;
            answer.innerText = answerText;

            cardNumber.innerText = '1/' + questions.questions.length;
            h1.innerText = questions.name;
        });
    });

};

/** 
 * Swiping 
 */

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            console.log('You swiped left. ');
            moveOneForward();
        } else {
            /* right swipe */
            console.log('You swiped right. ');
            moveOneBack();
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            console.log('You swiped up. ');
        } else {
            /* down swipe */
            console.log('You swiped down. ');
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

console.log('ahoj');
initialize();
