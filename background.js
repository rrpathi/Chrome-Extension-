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
		console.log("inside function");
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var tabURL = tabs[0].url;
		if(tabURL.indexOf('http') >= 0){
			chrome.storage.local.get(function(addressBarUrl){
				if(addressBarUrl.url == undefined){
					localStorageUrl.push(tabURL);
					console.log('if');
				}else{
					localStorageUrl = addressBarUrl.url;
					localStorageUrl.push(tabURL);
					console.log(localStorageUrl);
					console.log('else');
				}
			});
		}else{
			console.log('Its Not A Correct Url');
		}

		});
	}