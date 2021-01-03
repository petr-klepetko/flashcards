const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const saveButton = document.querySelector('#save');

let cardNumber = document.querySelector('#cardNumber');
let moveForward = document.querySelector('#forward');
let moveBack = document.querySelector('#back');

console.log(moveBack);

let filePath = "../questions/questions.json";
let currentIndex = 0;

let questionText = 'Otázka';
let answerText = 'Odpověď';

moveBack.addEventListener('click', () => { //BACK
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
        readTextFile(filePath, (text) => {
            questions = JSON.parse(text);
            questionText = questions.questions[currentIndex].question;
            answerText = questions.questions[currentIndex].answer;

            question.value = questionText;
            answer.value = answerText;

            cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
            //showQuestion();
        });
    }
});

moveForward.addEventListener('click', () => { //FORWARD

    readTextFile(filePath, (text) => {
        questions = JSON.parse(text);
        if (currentIndex + 1 < questions.questions.length) {
            currentIndex = currentIndex + 1;

            questionText = questions.questions[currentIndex].question;
            answerText = questions.questions[currentIndex].answer;

            question.value = questionText;
            answer.value = answerText;

            cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
            //showQuestion();
        }
        else if (currentIndex + 1 === questions.questions.length) {
            questionText = 'Otázka';
            answerText = 'Odpověď';

            question.value = questionText;
            answer.value = answerText;
            
            cardNumber.innerText = 'Nová otázka';

            saveButton.classList.remove('hide');
            
        }

    });

});

saveButton.addEventListener('click', () => {
    readTextFile(filePath, (text) => {
        questions = JSON.parse(text);
        let nextIndex = questions.questions.length;
        questions.questions[nextIndex].question.value = question.value;
        questions.questions[nextIndex].answer.value = answer.value;
    });
});

document.addEventListener('keydown', (event) => {
    //console.log(`key=${event.key},code=${event.code}`);
    if (event.code === 'ArrowLeft') {                        //move BACK
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;
            readTextFile(filePath, (text) => {
                questions = JSON.parse(text);
                questionText = questions.questions[currentIndex].question;
                answerText = questions.questions[currentIndex].answer;

                question.value = questionText;
                answer.value = answerText;

                cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
                //showQuestion();
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

                question.value = questionText;
                answer.value = answerText;

                cardNumber.innerText = parseInt(currentIndex + 1) + '/' + questions.questions.length;
                //showQuestion();
            }

        });
    }
});

document.addEventListener('keydown', (event) => {   //prevent default

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
    readTextFile(filePath, (text) => {
        questions = JSON.parse(text);
        questionText = questions.questions[0].question;
        answerText = questions.questions[0].answer;

        question.value = questionText;
        answer.value = answerText;

        cardNumber.innerText = '1/' + questions.questions.length;
        h1.innerText = questions.name;
    });
};


initialize();


