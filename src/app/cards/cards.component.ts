import { Component, OnInit, EventEmitter } from '@angular/core';
import { Card } from '../classes/card';
import { CardService } from '../card.service';
import { ScoreService } from '../score.service';
import { MaterializeAction } from 'angular2-materialize';

declare var Materialize:any;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private cardService: CardService, private scoreService: ScoreService) { }

  public cards: Card[];
  public isGameOver: boolean;

  ngOnInit() {
    this.getCards();
    this.scoreService.timeChanged.subscribe(() => {
      if (this.scoreService.timeRemaining === 0) {
        this.isGameOver = true;
        this.modalActions.emit({action:"modal",params:['open']});
      }
    });
  }

  public modalActions = new EventEmitter<string | MaterializeAction>();


  public flippedCards: number[] = [];

  public openWinnerModal() {
      this.modalActions.emit({action:"modal",params:['open']});
  }
  
  public resetGame() {
    this.getCards();
    this.scoreService.resetCards(this.cards);
    this.scoreService.matchingCards = 0;
    this.scoreService.startTimer();
    this.modalActions.emit({action:"modal",params:['close']});
    this.isGameOver = false;
  }

  public checkflippedCards(cardSet: number[], cards: any[]) {
    //if two cards are flipped preform the following
    //check wether the card numbers match
    if (cardSet.length === 2 && cardSet[0] == cardSet[1]) {
      //if two cards match, go through the cards and change both of the matched cards statuses to true
      //update the number of matching cards by +1
      Materialize.toast(`You found a match! Mmmmmm!`, 2000 , "");
      this.scoreService.matchingCards++;
      //if matching cards hits 16, all sets are found, so game is over
      if (this.scoreService.matchingCards === 16) {
        this.scoreService.getScore(this.scoreService.matchingCards);
        this.openWinnerModal();
      }
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].cardNumber === cardSet[0]) {
          this.cards[i].matched = true;
        }
      }
      cardSet.splice(0, 2);
    } else if (cardSet.length === 2 && cardSet[0] != cardSet[1]) {
      //return cards to unflipped status 
      setTimeout(() => {
        this.cards.forEach((card) => {
          if (card.matched === false) {
            card.selected = false;
          }
        });
      }, 400)

      //empty flipped card set
      cardSet.splice(0, 2);
    }
  }


  public cardCheck(index) {
    let selectedCard = this.cards[index];
    //If the card selected is not a matched card
    if (selectedCard.matched === false && selectedCard.selected === false && this.flippedCards.length !== 2) {
      //change card flipped status to true
      selectedCard.selected = true;
      //add card into the flipped cards group
      this.flippedCards.push(selectedCard.cardNumber);
      this.checkflippedCards(this.flippedCards, this.cards);
    }
    //check if the number of matching cards has reached the maximum of 32
    //if the number of matching cards has reached 32, game over
  }

  public shuffle(a): any[] {
    var currentIndex = a.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }

    return a;
  }

  public getCards() {
    //get the cards using the card service
    this.cardService.getCards().then(cards => {
      //assign to class property
      this.cards = cards;
      /*duplicate the array...objects are passed by reference, not value. create a new object then concat it to avoid multiple objects
       in the array having the same reference */

      //new cards array by changing our existing cards array into a string, then parsing it into a completely new obj
      let newCards = JSON.parse(JSON.stringify(this.cards));
      //create a completely new array of cards with duplicates of elements by concatinating our new cards array to our old one and storing in a variable called newCardsArray
      let newCardsArray = this.cards.concat(newCards);
      //assign the newly created array with unique references for each element to our classes cards property
      this.cards = newCardsArray;
      //shuffle the array
      this.cards = this.shuffle(this.cards);
    });
  }


}
