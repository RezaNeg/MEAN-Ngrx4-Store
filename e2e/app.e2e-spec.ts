import { HSMReduxStorePage } from './app.po';

describe('hsm-redux-store App', () => {
  let page: HSMReduxStorePage;

  beforeEach(() => {
    page = new HSMReduxStorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
