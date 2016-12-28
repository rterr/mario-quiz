$(document).ready(function() {
	// initial variables and array shuffle
	var questionCounter = 0;
	var scoreCounter = 0;
	shuffle(questionList);

	//start next question
	 $('span.next-question').click(function() {
	 	//toggle off what was either the start-page or result-page
		$(this).parent('div').toggle();

		//check if questionCounter > 4 (end of game, toggles final result screen)
		if (questionCounter > 4) {
			$('div#result-final').toggle();
		}
		//else continue with displaying next question
		//display current question # to scorebar, display question + options
		else {
			$('span#question-counter-number').text(questionCounter + 1);
	   		$('#question-page h2').text(questionList[questionCounter].question);
	   		//iterate through options 0 - 3 and display text to respective spans
	   		for (var i = 0; i < 5; i++){
	   			var optionId = "span#" + i;
	   			$(optionId).text(questionList[questionCounter].options[i]);
	   		}
		}

	 });

	//user selects an answer
	$('span.answer-option').click(function(event){
		//toggle on result-page (covers question-page)
		$('div#result-page').toggle();
		//display correct answer and trivia for prior question
		$('span#correct-answer').text(questionList[questionCounter].options[questionList[questionCounter].correctAnswer]);
		$('p#trivia-text').text(questionList[questionCounter].trivia);

		//if correct, +1 to score and display positive response
		if (event.target.id === parseInt(questionList[questionCounter].correctAnswer)) {
			scoreCounter++;
			$('#result-page h2').text('You got it!');
		}
		//else, score isn't updated and display negative response
		else {
			$('#result-page h2').text('Incorrect...');
		}
		//display current score to the scorebar
		$('span.score-counter-number').text(scoreCounter);
		//move on to next question
		questionCounter++;
	 });

	//user selects new game
	$('span.new-game').click(function(){
		//reset the questionCounter and scoreCounter, run shuffle(questionList);
		questionCounter = 0;
		scoreCounter = 0;
		shuffle(questionList);
		$('span.score-counter-number').text(scoreCounter);
		//toggle off result-final and toggle on start-page div
		$('div#result-final').toggle();
		$('div#start-page').toggle();
	});

//end
});

//Fisher-Yates shuffle
function shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle
	while (m) {
		// Pick a remaining element
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element
		t = array[m];
		array[m] = array[i];
		array[i] = t;
		}
  	return array;
	}
