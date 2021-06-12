class Quiz {
  constructor(){
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
      question.hide();

    //write code to change the background color here
     background("yellow")

    //write code to show a heading for showing the result of Quiz
     textSize(40)
     text("*Result*",500,50)

    //call getContestantInfo( ) here
      Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
      if(allContestants !== undefined){
        var displayAnswer = 280;
         fill("blue")
         textSize(20)
         text("NOTE: contestants who have answered correct are  highlighted with green color!!",140,280)
         fill("black")
         textSize(18)
         text("Correct Answer:2",500,320)
         text("On Multiplication: 1*2*3 = 6",500,340)
         text("On Addition: 1+2+3 = 6",500,360)
       }
  
    //write code to highlight contest who answered correctly
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
          fill("green")
        
          else
            fill("red")
            displayAnswer+=30
          textSize(20)
          text(allContestants[plr].name + ":" + allContestants[plr].answer ,200,displayAnswer)

      }
  }
}
