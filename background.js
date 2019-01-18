	var contextItem = {
		"id":"ragu",
		"title" :"Save To BookMark",
		"contexts":["all"]
	};
	var localStorageUrl = [];
	chrome.contextMenus.create(contextItem);
	chrome.contextMenus.onClicked.addListener(function(){
		getUrl();
	});

	function getUrl(){
		// console.log("inside function");
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var tabURL = tabs[0].url;
		if(tabURL.indexOf('http') >= 0){
			chrome.storage.local.get(function(addressBarUrl){
				if(addressBarUrl.url == undefined){
					localStorageUrl.push(tabURL);
					chrome.storage.local.set({'url': localStorageUrl}, function() {
						console.log('if condition --- url Added');
					});
				}else{
					localStorageUrl = addressBarUrl.url;
					if(localStorageUrl.indexOf(tabURL) >= 0){
						console.log('Url Already Exist');
					}else{
						localStorageUrl.push(tabURL);
						chrome.storage.local.set({'url': localStorageUrl}, function() {
							console.log(localStorageUrl);
						});	
					}
				}
			});
		}else{
			console.log('Its Not A Correct Url');
		}

		});
	}

// 	chrome.browserAction.onClicked.addListener(function(tab) {
// 		// document.querySelector("#link_option_page").addEventListener("click",function(){
// 		// 	console.log('Hello');
// 		// })
// 		// getUrl();
//   // var action_url = "javascript:window.print();";
//   // chrome.tabs.update(tab.id, {url: action_url});
// });


// document.addEventListener('DOMContentLoaded', function () {
// 		chrome.browserAction.onClicked.addListener(function(tab) {
// 			console.log('i am in');
// 		// document.querySelector("#link_option_page").addEventListener("click",function(){
// 		// 	console.log('Hello');
// 		// })
// 		// getUrl();
// });
// });
chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});