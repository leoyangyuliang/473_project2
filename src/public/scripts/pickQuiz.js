dpd.quiz.get(function (result, err) {
  if(err) return console.log(err);
  console.log(result.length);
  for(var i = 0; i < result.length; i++){
    console.log(result[i].quizName);
    var b = document.createElement('button');
    b.setAttribute("value", result[i].quizName);
    b.setAttribute("class", "btn");
    b.setAttribute("style", "font-size: 30px");
    b.innerHTML = result[i].quizName;
    b.setAttribute("onclick","pickQuiz(value)");
    b.setAttribute("name", result[i].username);
    var a  = document.getElementById("btnGang");
    a.appendChild(b);
  }
});

function pickQuiz(value,username)
{
    event.preventDefault();
    localStorage.setItem("quizname", value);
    location.href = "takeQuiz.html";
}
