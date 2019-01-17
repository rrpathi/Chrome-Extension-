document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(function(addressBarUrl) {
  	addressBarUrl.url.forEach(function(element,value){
	  	$('#url_list').append(`<a href="${element}">${element}</a><br />`);
  	});
	});
});


