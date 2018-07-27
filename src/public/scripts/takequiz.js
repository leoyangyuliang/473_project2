
var quizname = localStorage.getItem("quizname");
var question_name = "question_";
var query = {"quizName":quizname};
console.log(quizname);
dpd.quiz.get(query, function (result) {
    console.log(result);
  for(var i = 1; i <= 10; i++){
    document.getElementById(question_name + i.toString()).innerHTML = "Question "+ i +": " + result[0].questions[i-1];
  }
  for(var i = 1; i <= 40; i++){
    document.getElementById("answer" + i.toString()).innerHTML = result[0].answers[i-1];
  }
});


function calculateResult(){
  var a;
  var b;
  var c;
  var d;

  

}
