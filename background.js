	var contextItem = {
		"id":"ragu",
		"title" :"Save To BookMark",
		"contexts":["all"]
	};
	var localStorageUrl = [];
	var localStorageData = {};
	chrome.contextMenus.create(contextItem);
	chrome.contextMenus.onClicked.addListener(function(){
		getUrl();
	});

	function getUrl(){
		// console.log("inside function");
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var tabURL = tabs[0].url;
		var tabTitle = tabs[0].title;
		if(tabURL.indexOf('http') >= 0){
			chrome.storage.local.get(function(addressBarUrl){
				if(addressBarUrl.url == undefined){
					console.log('if');
					var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
					 localStorageData = {'uniqueId':uniqueId,'title': tabTitle,'url' : tabURL};
					localStorageUrl.push(localStorageData);
					chrome.storage.local.set({'url': localStorageUrl}, function() {
						console.log('if condition --- url Added');
					});
				}else{
					localStorageUrl = addressBarUrl.url;
					for(var i = 0;i<localStorageUrl.length;i++){
						if(localStorageUrl[i].url == tabURL){
							var existId = 1;
							break;
						}
					}
					if(existId == '1'){
						console.log('url already added');
					}else{
							var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
					 		localStorageData = {'uniqueId':uniqueId,'title': tabTitle,'url' : tabURL};
							localStorageUrl.push(localStorageData);
							chrome.storage.local.set({'url': localStorageUrl}, function() {
							console.log('else condition --- url Added');
						});

					}
				}
			});
		}else{
			console.log('Its Not A Correct Url');
		}

		});
	}

document.getElementById('link_option_page').addEventListener('click', getUrl);
// window.close();
	// chrome.browserAction.onClicked.addListener(function(tab) {
	// 		getUrl();
	// });