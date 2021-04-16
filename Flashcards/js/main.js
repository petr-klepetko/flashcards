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

let showQuestion = () => {
    if (answerIsShown) {                    //Answer is shown -> we need to show question
        answer.classList.add('hide');       //hide answer
        QorA.innerText = 'Q';               //set header to Q

        question.classList.remove('hide');  //display the question

        card.classList.remove('answer');
        answerIsShown = false;
    }
}

moveBack.addEventListener('click', () => {
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
});

document.addEventListener('keydown', (event) => {
    console.log(`key=${event.key},code=${event.code}`);
    if (event.code === 'ArrowLeft') {                        //move BACK
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
    }

    if (event.code === 'ArrowRight') {                           //move FORWARD
        readTextFile(filePath, (text) => {
            questions = JSON.parse(text);


            if (currentIndex + 1 < questions.questions.length) {
                currentIndex = currentIndex + 1;

                questionText = questions.questions[currentIndex].question;
                answerText = questions.questions[currentIndex].answer;

                question.innerText = questionText;
                answer.innerText = answerText;

                cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
                showQuestion();
            }

        });
    }
});

moveForward.addEventListener('click', () => {

    readTextFile(filePath, (text) => {
        questions = JSON.parse(text);
        if (currentIndex + 1 < questions.questions.length) {
            currentIndex = currentIndex + 1;

            questionText = questions.questions[currentIndex].question;
            answerText = questions.questions[currentIndex].answer;

            question.innerText = questionText;
            answer.innerText = answerText;

            cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
            showQuestion();
        }

    });

});

turnCard.addEventListener('click', () => {
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

});

card.addEventListener('click', () => {

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

});


document.addEventListener('keydown', (event) => {

    if (event.code === 'Enter' || event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
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

            answerIsShown = true;
            card.classList.add('answer');
            //console.log('Zobrazena odpověď. ');
        }
    }

    if (event.code === 'ArrowRight') {

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

// readTextFile("questions.json", function(text){
//     questions = JSON.parse(text);
//     console.log(questions);
//     console.log(questions.question);
// });

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


initialize();
