import { CardGame4Page } from './app.po';

describe('card-game4 App', function() {
  let page: CardGame4Page;

  beforeEach(() => {
    page = new CardGame4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
