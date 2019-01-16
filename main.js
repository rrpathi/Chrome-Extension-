document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(function(addressBarUrl) {
console.log(addressBarUrl.url);
});
});