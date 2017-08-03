import { Injectable } from '@angular/core';

import { Card } from './classes/card';
import { CARDS } from './mock-data/cards';

@Injectable()
export class CardService {

  constructor() { }

  getCards(): Promise<Card[]> {
    return Promise.resolve(CARDS);
  }

}
