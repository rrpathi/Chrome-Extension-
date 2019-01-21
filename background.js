	var contextItem = {
		"id":"bookmark_extension",
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
		var websiteContent = {};
		var listOfWebsiteContent = [];
		// console.log("inside function");
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var tabURL = tabs[0].url;
		var url = "https://api.microlink.io/";
		var params = "url="+tabURL;
		var http = new XMLHttpRequest();
		http.open("GET", url+"?"+params, true);
		http.onload = function() {
		    // console.log(http.responseText);
		    var httpResponseJson = http.responseText;
		   	httpResponseJson = JSON.parse(httpResponseJson);
		    if(httpResponseJson['status'] == 'success'){
		    	// var des = httpResponseJson['data']['description'];
		    	var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
		    	websiteContent = {'uniqueId':uniqueId,'site_url':tabURL,'url_title':httpResponseJson['data']['title'],'img_url':httpResponseJson['data']['image']['url'],'description':httpResponseJson['data']['description'],'logo_url':httpResponseJson['data']['logo']['url']};
		    	console.log(websiteContent);
				chrome.storage.local.get('localStorageData', function(data) {
					if (typeof data.localStorageData === 'undefined') {
						listOfWebsiteContent.push(websiteContent);
						chrome.storage.local.set({'localStorageData': listOfWebsiteContent}, function() {
							console.log('if condition --- url Added');
						});
					} else {
						listOfWebsiteContent = data.localStorageData;
						listOfWebsiteContent.push(websiteContent);
						chrome.storage.local.set({'localStorageData': listOfWebsiteContent}, function() {
							console.log('else condition --- url Added');
						});
					// if not set then set it 
					}
				});
		    }
		};
		http.send();
	// 	var tabURL = tabs[0].url;
	// 	var tabTitle = tabs[0].title;
	// 	var apiUrl = "https://api.microlink.io/";
	// 	var params = 'url='+`${tabURL}`;
	// 	var http = new XMLHttpRequest();
	// 	http.open("GET", apiUrl+"?"+params, true);
	// 	http.onreadystatechange = function()
	// 	{
 //    		if(http.readyState == 4 && http.status == 200) {
 //        	alert(http.responseText);
 //    	}
	// }
	// 	http.send();
		// if(tabURL.indexOf('http') >= 0){
		// 	chrome.storage.local.get(function(addressBarUrl){
		// 		if(addressBarUrl.url == undefined){
		// 			console.log('if');
		// 			var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
		// 			 localStorageData = {'uniqueId':uniqueId,'title': tabTitle,'url' : tabURL};
		// 			localStorageUrl.push(localStorageData);
		// 			chrome.storage.local.set({'url': localStorageUrl}, function() {
		// 				console.log('if condition --- url Added');
		// 			});
		// 		}else{
		// 			localStorageUrl = addressBarUrl.url;
		// 			for(var i = 0;i<localStorageUrl.length;i++){
		// 				if(localStorageUrl[i].url == tabURL){
		// 					var existId = 1;
		// 					break;
		// 				}
		// 			}
		// 			if(existId == '1'){
		// 				console.log('url already added');
		// 			}else{
		// 					var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
		// 			 		localStorageData = {'uniqueId':uniqueId,'title': tabTitle,'url' : tabURL};
		// 					localStorageUrl.push(localStorageData);
		// 					chrome.storage.local.set({'url': localStorageUrl}, function() {
		// 					console.log('else condition --- url Added');
		// 				});

		// 			}
		// 		}
		// 	});
		// }else{
		// 	console.log('Its Not A Correct Url');
		// }

		});
	}

document.getElementById('link_option_page').addEventListener('click', getUrl);




// window.close();
	// chrome.browserAction.onClicked.addListener(function(tab) {
	// 		getUrl();
	// });