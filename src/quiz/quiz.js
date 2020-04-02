var quiz = {
    title: 'My quiz',
    questions: [
      {
        text: "Question 1",
        responses: [
          {text: 'Wrong, too bad.'}, 
          {text: 'Right!', correct: true}, 
        ]
      }, {
        text: "Question 2",
        responses: [
          {text: 'Right answer', correct: true}, 
          {text: 'Wrong answer'}, 
        ]
      } 
    ]
  };

  exports.quiz = quiz;