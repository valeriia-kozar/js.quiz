const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


// Переменные игры
let score = 0; //кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// отобразим текущий вопрос
function showQuestion() {
    console.log('showQuestion');

	// по % разраб понимает, что текст будет подменен
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
	headerContainer.innerHTML = title;

	// обходим массив с помощью for of
	// под item у нас будут выводиться элементы массива по очереди 
	// переменная без кавычек пишется
	// ВАРИАНТЫ ОТВЕТОВ
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {

		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`

		const answerHTML = questionTemplate
								.replace('%answer%', answerText)
								.replace('%number%', answerNumber);
		
		// эта строка означает, что каждый раз весь внутр html будет перезаписан, а нам нужно чтобы  добавлялся:
		// listContainer.innerHTML = answerHTML
		// listContainer.innerHTML = listContainer.innerHTML + answerHTML;
		listContainer.innerHTML += answerHTML;
		answerNumber++;

	}

};

function checkAnswer(){
	
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// if (checkedRadio){
	// 	console.log('OK');
	// } else {
	// 	submitBtn.blur();
	// 	return
	// } === 

	// если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checkedRadio.value);

	// если ответил верно, то увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	console.log('score =', score);

	if (questionIndex !== questions.length - 1) {
		console.log('Это НЕ последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		console.log('Это последний вопрос');
		clearPage();
		showResults();
	}

}

function showResults () {
	console.log('start');

	const resultsTemplate =
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`;
	
	let title, message;

	// варианты заголовок и текста
	if (score === questions.length) {
		title = 'Позравляем!';
		message = 'Вы ответили верно на все вопросы!😏';
	} else if (score * 100 / questions.length >= 50) {
		title = 'Неплохой результат';
		message = 'Вы дали более половины правильных ответов😬';
	} else {
		title = 'Стоит постараться 🙄';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	// РЕЗУЛЬТАТ
	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
							.replace('%title%' , title)
							.replace('%message%' , message)
							.replace('%result%' , result)

	headerContainer.innerHTML = finalMessage;

	// меняем кнопку на "играть снова"
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();



};