const tipButtons = document.getElementsByClassName('tip-button');

for (let i = 0; i < tipButtons.length; i++) {
  tipButtons[i].addEventListener('click', () => {
    const user = decodeURI(tipButtons[i].getAttribute('data-tip-user'));
    chrome.runtime.sendMessage({
      user,
      website: location.host,
      message: 'tip_button_clicked',
    });
  });
}
