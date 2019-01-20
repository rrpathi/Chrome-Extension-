$(document).ready(function(){
	chrome.storage.local.get(function(addressBarUrl){
		addressBarUrl.url.forEach(function(value,key){
	  	$('#myTable').append(`<tr class='singleUrl'><td><a target="_blank" href="${value['url']}">${value['title']}</a></td><td><button class="btn" value="${value['uniqueId']}">Delete</button></td></tr>`);
		});
	});
	$("#myInput").on('keyup',function(){
		var inputValue = $(this).val().toLowerCase();
		$("#myTable tr").filter(function() {
      	$(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1)
   		 });
	});
	$("body").on('click','.btn',function(){
		var delete_id = this.value;
		$(this).closest('.singleUrl').remove();
		console.log(this.value);
		chrome.storage.local.get(function(addressBarUrl) {
		var delete_key =  addressBarUrl.url.findIndex(function(url){
		 	return url.uniqueId == delete_id;

		 })
			addressBarUrl.url.splice(delete_key,1);
			chrome.storage.local.set({'url': addressBarUrl.url}, function() {
				console.log('deleted ');
			});
		});
	});



});



	// chrome.browserAction.onClicked.addListener(function(tab) {
	// 	document.querySelector("#link_option_page").addEventListener("click",function(){
	// 		getUrl();
	// 	})
	// });