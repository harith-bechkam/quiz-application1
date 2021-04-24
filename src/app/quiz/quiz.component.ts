import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QuizService } from "../services/quiz.service";
//import { Option, Question QuizConfig } from "../models/index";

import { Option, Question, Quiz, QuizConfig } from "../models/index";
import { StorageService } from "../services/storage.service";





@Component(
  {
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
  providers: [QuizService]
}
)

export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = "quiz";
  quizName: string;
  config: QuizConfig={

    duration: 300, //for time running

  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;startTime: Date;
  endTime: Date;
  Time = "00:00";
  duration = "";

  constructor(private quizService: QuizService, private _router: Router,private _store: StorageService) {}

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }



  loadQuiz(quizName: string) {
    let getQuestion=this.quizService.get(quizName);
    this.quiz=new Quiz(getQuestion);
    this.pager.count=this.quiz.questions.length;
    this.startTime=new Date();
    this.Time="00:00";
    this.timer=setInterval(() => 
    {
      this.tick();
    }, 1000);
    this.duration=this.parseTime(this.config.duration);
    this.mode="quiz";
  }


  tick() {
    const now=new Date();
    const diff=(now.getTime()-this.startTime.getTime())/1000;
    if (diff>=this.config.duration)
     {
      this.onSubmit();
    }
    this.Time=this.parseTime(diff);
  
  }

  parseTime(totalSeconds:number)
   {
    let mins:string | number =Math.floor(totalSeconds/60);
//let secs: string=duration+Math.round(Time%60);
    let secs:string | number=Math.round(totalSeconds%60);
    
    mins=((mins<10) ?
          "0" : "") + mins;
    secs=((secs<10) ? 
                  "0" : "") + secs;


    return `${mins}:${secs}`;
  }

  get que() {
    return this.quiz.questions
      ? 
      this.quiz.questions.slice
  (
          this.pager.index,
          this.pager.index+this.pager.size
        )
      : [];
  }

  onSelect(question:Question,option:Option)
  {
    if(question.questionTypeId===1)
     {
      question.options.forEach(x => 
      {
        if (x.id !== option.id) {x.selected = false;}
      }
      );
    }

    if(this.config.autoMove)
     {
      this.goTo(this.pager.index+1);
    }
  }

  goTo(index:number){
    if(  (index>=0) &&  (index<this.pager.count)  ) 
    {
 
      this.pager.index=index;
      this.mode="quiz";
    }
  }

  isAnswered(question:Question) 
  {
    return question.options.find(x => x.selected) ? 
                                    "answered":"not answered";
  }

  isCorrect(question:Question) 
  {
    return question.options.every(x =>x.selected=== x.isAnswer)
      ? "correct":"wrong";
  }




  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x =>
      answers.push({
        quizId: this.quiz.id,
        questionId: x.id,
        answered: x.answered
      })
    );

    //answers contains questionId and the users answer.
    this.mode = "result";
  }
 
}