	var contextItem = {
		"id":"ragu",
		"title" :"Save To BookMark",
		"contexts":["all"]
	};
	let getUrl = {
		"active":true,
		currentWindow:true
	}
	var localStorageUrl = [];
	chrome.contextMenus.create(contextItem);
	chrome.contextMenus.onClicked.addListener(function(){
	chrome.storage.local.get(function(addressBarUrl) {
	if(addressBarUrl.url == undefined){
		console.log('if');
		chrome.tabs.query(getUrl, function(tabs) {
			var tabURL = tabs[0].url;
			localStorageUrl.push(tabURL);
			chrome.storage.local.set({'url': localStorageUrl}, function() {
				console.log('first' + localStorageUrl);
				// localStorageUrl.push(tabURL);
				// console.log(localStorageUrl);
			});
		});
	}else{
		console.log('else ');
		console.log(localStorageUrl);
		chrome.tabs.query(getUrl, function(tabs) {
			console.log(tabs);
		var newtabURL = tabs[0].url;
		console.log(newtabURL);
		// var currentUrl = localStorageUrl.push(newtabURL);
		// console.log(currentUrl);
		// chrome.storage.local.set({'url': currentUrl}, function(e) {
		// 	console.log('xdvxcvxcvxcv' + e);
		// });
	});
	}
	});
	});