import { Component, OnInit, EventEmitter } from '@angular/core';
import { ScoreService } from '../score.service';
import { CardService } from '../card.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  constructor(private scoreService: ScoreService, private cardService: CardService) {

  }
  
  public gameStarted: boolean = false;
  public gameOver: boolean;
  public gameWon = this.scoreService.gameWon;
  public attributions:boolean = false;

  modalActions = new EventEmitter<string | MaterializeAction>();

  ngOnInit() {
  }

  public triggerAttributions() {
    this.attributions = true;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  public dismissAttributions() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.attributions = false;
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeStartModal() {
    this.startCountdownTimer();
    this.modalActions.emit({action:"modal",params:['close']});
    // this.cardService.processCards();
  }

  restartGame() {
    location.reload();
  }

  //start timer event bound to 'click' in the view
  public startCountdownTimer() {
    this.scoreService.startTimer();
  }
}
