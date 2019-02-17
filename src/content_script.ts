import { Observer, ready, WebsiteManager } from './lib';

ready(() => {
  WebsiteManager.initWebsiteIfMatching(location.host);
});

chrome.runtime.onMessage.addListener(request => {
  switch (request.message) {
    case 'softreload':
      {
        // Reset observer
        Observer.instance.disconnect();
        WebsiteManager.initWebsiteIfMatching(location.host);
      }
      break;
  }
});
