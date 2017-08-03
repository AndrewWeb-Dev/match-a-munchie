import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { OptionsComponent } from './options/options.component';

import { CardService } from './card.service';
import { ScoreService } from './score.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

//3rd party modules
import { MaterializeModule } from "../../node_modules/angular2-materialize";

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ScoreboardComponent,
    OptionsComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [
    CardService,
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
