

function createQuiz() {
  event.preventDefault();
  var username = localStorage.getItem("username");
  console.log(username);
  var quizname = document.getElementById("quizName").value;
  var question = [];
  var answer = [];
  var result = [];
  var question_name = "question_";
  for(var i = 1; i <= 10; i++){
    var question_real_name = question_name + i.toString();
    question.push(document.getElementById(question_real_name).value);
    console.log(question.length);
  }
  for(var i = 1; i <= 40; i++){
    var answer_real_name = "answer" + i.toString();
    answer.push(document.getElementById(answer_real_name).value);
    console.log(answer.length);
  }
  for(var i = 1; i <= 4; i++){
    var result_real_name = "result_" + i.toString();
    result.push(document.getElementById(answer_real_name).value);
    console.log(result.length);
  }
  dpd.quiz.post({"username":username,"quizName":quizname,
   "questions":question, "answers":answer, "results":result}
  , function(result, err) {
    if(err) return console.log(err);
    else{
      console.log(result, result.id);
      location.href = "homepage.html";
    }
  });

}
