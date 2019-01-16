var contextItem = {
"id":"ragu",
"title" :"Save To BookMark",
"contexts":["all"]
};
var localStorageUrl = [];
chrome.contextMenus.create(contextItem);
chrome.contextMenus.onClicked.addListener(function(){
chrome.storage.local.get(function(addressBarUrl) {
if(addressBarUrl.url == undefined){
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
var tabURL = tabs[0].url;
localStorageUrl.push(tabURL);
chrome.storage.local.set({'url': localStorageUrl}, function() {
console.log('first' + localStorageUrl);
});
});
}else{
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
var tabURL = tabs[0].url;
localStorageUrl.push(tabURL);
chrome.storage.local.set({'url': localStorageUrl}, function(e) {
});
});
}
console.log(addressBarUrl.url);
});

});
// });



