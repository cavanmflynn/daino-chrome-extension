import { Website } from '../../types';
import { addClass, hasClass } from '../helpers';
import { Observer } from '../observer';

export class Twitter implements Website {
  private readonly _tweets = document.querySelectorAll('.tweet');

  constructor() {
    this.attachTipButtons();
    this.watchAndReattach();
  }

  /**
   * Attach the tip button to the DOM
   */
  public attachTipButtons(): void {
    Array.prototype.forEach.call(this._tweets, (el: HTMLElement) => {
      const username = el.getAttribute('data-screen-name');
      if (username) {
        const buttonContainer = el.querySelector('.js-actions');
        if (!hasClass(buttonContainer, 'tip-button-added')) {
          buttonContainer.insertAdjacentHTML(
            'beforeend',
            `
            <div class="ProfileTweet-action ProfileTweet-action--tip">
              <button class="tip-button" data-tip-user="${encodeURI(
                username,
              )}">&nbsp;</button>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                       
            `,
          );
          addClass(buttonContainer, 'tip-button-added');
        }
      }
    });
    chrome.runtime.sendMessage({ message: 'attach_listeners' });
  }

  /**
   * Watch for changes to the tweet feed and reattach buttons where necessary
   */
  public watchAndReattach(): void {
    const target = document.querySelector('.stream-items').children[0];
    const config = {
      childList: true,
      attributes: true,
      subtree: false,
      attributeFilter: ['stream-items'],
    };
    Observer.instance = new MutationObserver(mutations => {
      mutations.forEach(() => {
        this.attachTipButtons();
      });
    });
    Observer.instance.observe(target, config);
  }
}
