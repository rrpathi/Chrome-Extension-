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
		// http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		http.onload = function() {
		    // console.log(http.responseText);
		    var httpResponseJson = http.responseText;
		   	httpResponseJson = JSON.parse(httpResponseJson);
		    if(httpResponseJson['status'] == 'success'){
		    	// var des = httpResponseJson['data']['description'];
		    	var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
		    	var validateImageUrl;
		    	if(httpResponseJson['data']['image'] == null){
		    		validateImageUrl = httpResponseJson['data']['logo']['url']
		    	}else{
		    		validateImageUrl = httpResponseJson['data']['image']['url'];
		    	}

		    	websiteContent = {'uniqueId':uniqueId,'site_url':tabURL,'url_title':httpResponseJson['data']['title'],'img_url':validateImageUrl,'description':httpResponseJson['data']['description'],'logo_url':httpResponseJson['data']['logo']['url']};
		    	console.log(websiteContent);
				chrome.storage.local.get('localStorageData', function(data) {
					if (typeof data.localStorageData === 'undefined') {
						listOfWebsiteContent.push(websiteContent);
						chrome.storage.local.set({'localStorageData': listOfWebsiteContent}, function() {
							console.log('if condition --- url Added');
						});
					} else {
						localStorageUrl = data.localStorageData;
						for(var i = 0;i<localStorageUrl.length;i++){
							if(localStorageUrl[i].site_url == tabURL){
								var existId = 1;
								break;
							}
						}
						if(existId == '1'){
							console.log('url already added');
						}else{
							listOfWebsiteContent = data.localStorageData;
							listOfWebsiteContent.push(websiteContent);
							chrome.storage.local.set({'localStorageData': listOfWebsiteContent}, function() {
								console.log('else condition --- url Added');
							});
						}
					}
				});
		    }
		};
			http.send();
		});
	}

chrome.browserAction.setPopup({popup: 'welcome.html'});

document.getElementById('link_option_page').addEventListener('click', browserActionHandler);

function browserActionHandler(){
	getUrl();
}



// window.close();
	// chrome.browserAction.onClicked.addListener(function(tab) {
	// 		getUrl();
	// });