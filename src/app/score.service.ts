import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { CardsComponent } from './cards/cards.component';

@Injectable()
export class ScoreService {

  constructor() { }

  public score: number;
  public timeRemaining: number;
  public timeChanged: EventEmitter<any> = new EventEmitter();
  public minutesRemaining: string = '3';
  public secondsRemaining: string = '00';
  public timer: any;
  public gameWon: boolean;
  public matchingCards: number = 0;

  public resetCards(cards) {
      cards.forEach((card)=> {
        card.matched = false;
        card.selected = false; 
      });
  }

  

  public startTimer() {
    //reset the initial value
    this.timeRemaining = 180
    
    //call the tick method
    this.tick();
  }

  public tick() {
    //decrease tune remaining by '1'
    this.timeRemaining--;
    this.timeChanged.emit(this.timeRemaining);
    //local variable store integer minutes remaining
    let rawMinutesRemaining = Math.floor( this.timeRemaining / 60);
    //turn it into a string assign to class property
    this.minutesRemaining = rawMinutesRemaining.toString();
    //local variable store integer seconds remaining
    let rawSecondsRemaining = this.timeRemaining - rawMinutesRemaining * 60;
    //pretty print it into a string and assign to class property
    this.secondsRemaining = this.prettyPrintSeconds(rawSecondsRemaining, '0', 2);
    console.log(this.minutesRemaining + ':' + this.secondsRemaining);
    //check if there is time left
    if (this.timeRemaining !== 0) {
      //if so, call 'tick' again after one second
       this.timer = setTimeout(() => { this.tick(); }, 1000)
    }
  }
  
  public prettyPrintSeconds (seconds:number, pad:string, length:number) {
    return (new Array(length+1).join(pad)+seconds).slice(-length);
  }

  public getScore(cards){
    let finalscore:number;
    let timeBonus:number;
    this.gameWon = true;
    // if clock is not at zero, set it to zero (stop time)
    if (this.timeRemaining !== 0) {
      timeBonus = this.timeRemaining;
      this.stopTimer();
    }
    // score is equal time remaining plus the number of cards found * 20
    finalscore = timeBonus + cards * 20;
    this.score = finalscore;
  }

  public stopTimer() {
      clearTimeout(this.timer)
  }


}
