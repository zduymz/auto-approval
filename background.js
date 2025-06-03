// background.js
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'closeTab' && sender.tab && sender.tab.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});
