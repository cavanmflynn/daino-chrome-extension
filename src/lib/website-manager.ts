import { Website } from '../types';
import { Github } from './websites/github';
import { Twitter } from './websites/twitter';

export class WebsiteManager {
  public static activeWebsite: Website;

  /**
   * Initialize a new website if the url matches
   * @param host The current url host name
   */
  public static initWebsiteIfMatching(host: string) {
    switch (host) {
      case 'twitter.com':
        this.activeWebsite = new Twitter();
        break;
      case 'github.com':
        this.activeWebsite = new Github();
        break;
    }
  }
}
