
function sendSignal() {
    
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
//   });

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(tabs[0].id, { type: 'add_checkboxes' });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('add-checkboxes')
    .addEventListener('click', sendSignal);
});

