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
					chrome.storage.local.set({'url': localStorageUrl}, function() {
						console.log('if condition --- url Added');
					});
				}else{
					localStorageUrl = addressBarUrl.url;
					localStorageUrl.push(tabURL);
					chrome.storage.local.set({'url': localStorageUrl}, function() {
						console.log('New localStorageUrl Updated');
					});	
					console.log(localStorageUrl);
					console.log('else');
				}
			});
		}else{
			console.log('Its Not A Correct Url');
		}

		});
	}