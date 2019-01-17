document.addEventListener('DOMContentLoaded', function () {
// 	$("#heading").click(function(){
// 	console.log('Hello World');
// })
  chrome.storage.local.get(function(addressBarUrl) {
  	addressBarUrl.url.forEach(function(element){
	  	$('#url_list').append(`${element}<br />`);

  	});

	});
});


