chrome.runtime.onMessage.addListener(request => {
  switch (request.message) {
    case 'attach_listeners':
      {
        chrome.tabs.executeScript(null, { file: 'js/injected.js' });
      }
      break;
    case 'tip_button_clicked':
      {
        const { user } = request;
        const w = 400;
        const h = 600;
        const left = screen.width / 2 - w / 2;
        const top = screen.height / 2 - h / 2;
        chrome.windows.create({
          left,
          top,
          url: `http://172.16.5.192:8080#@${user}`,
          type: 'popup',
          width: w,
          height: h,
        });
      }
      break;
  }
});

chrome.tabs.onUpdated.addListener((_id, changeInfo) => {
  const websiteRegex = [/twitter.com/g, /github.com/g];
  if (changeInfo.url && websiteRegex.some(r => !!changeInfo.url.match(r))) {
    // We're on a supported website, execute a soft reload
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'softreload' });
    });
  }
});
