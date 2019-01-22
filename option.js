$(document).ready(function(){
	chrome.storage.local.get('localStorageData', function(data) {
		data.localStorageData.forEach(function(value,key){
	  	$('#myTable').append(`<tr class='singleUrl'>
	  		<td style ="width:80%">
		  		<a target="_blank" href="${value['site_url']}">${value['site_url']}</a>
		  		<div  style="margin-left:15px;">
				  		<p style="color:#0b4c8c;font-size:20px;font-weight: 700;">${value['url_title']}</p>
				  		<p>${value['description']}</p >
			  			<img src="${value['img_url']}" height="60px" width="60px">
		  		</div>
	  		</td>
	  		<td ><button class="btn" value="${value['uniqueId']}">Delete</button></td></tr>`);
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
		console.log(delete_id);
		$(this).closest('.singleUrl').remove();
		console.log(this.value);
		chrome.storage.local.get('localStorageData',function(addressBarUrl) {
		var delete_key =  addressBarUrl.localStorageData.findIndex(function(url){
		 	return url.uniqueId == delete_id;

		 })
			addressBarUrl.localStorageData.splice(delete_key,1);
			chrome.storage.local.set({'localStorageData': addressBarUrl.localStorageData}, function() {
				console.log('deleted ');
			});
		});
	});

});


// chrome.windows.onFocusChanged.addListener(function() 
// {

// 	alert('Hello');
//     // chrome.tabs.getCurrent(function(ctab)
//     // {

    	
//     //     // chrome.tabs.executeScript(ctab.id, { file: "inject.js" });
//     // });
// });
