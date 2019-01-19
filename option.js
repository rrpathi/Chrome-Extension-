// document.addEventListener('DOMContentLoaded', function () {
//   chrome.storage.local.get(function(addressBarUrl) {
//   	addressBarUrl.url.forEach(function(element,value){
//   		// var id = document.getElementById("url_list");
//   		//  var tag = document.createElement('a');
//   		//  var text = document.createTextNode(element);
//   		//  tag.setAttribute('href', element);
//   		//  tag.setAttribute('target','_blank');
//   		//  tag.appendChild(text);
//   		//  id.appendChild(tag);
//   		//  var btn = document.createElement("button");
//   		//  btn.setAttribute('id',value);
//   		//  var t = document.createTextNode("Delete");
//   		// btn.appendChild(t);
//   		//  id.appendChild(btn);
//   		//  var newElem = document.createElement("br");
//   		//  id.appendChild(newElem);
// 	  	$('#url_list').append(`<a href="${element}">${element}</a><br />`);
//   	});
// 	});

// });
$(document).ready(function(){
	chrome.storage.local.get(function(addressBarUrl){
		addressBarUrl.url.forEach(function(value,key){
	  	$('#myTable').append(`<tr class='singleUrl'><td><a target="_blank" href="${value}">${value}</a></td><td><button class="btn" value="${key}">Delete</button></td></tr>`);
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
			addressBarUrl.url.splice(delete_id,1);
			chrome.storage.local.set({'url': addressBarUrl.url}, function() {
				console.log('deleted ');
			});
		});
	});



});

// window.onload = function(){ 
// if (document.readyState === "complete") {  // Loading hasn't finished yet
// 	myInput.oninput  = function (){
// 		var search_input = myInput.value; 
// 		// console.log(myInput.value);
// 		 var div = document.getElementById("url_list");
// 		 var a_list = div.getElementsByTagName("a");
// 		 var a_button = div.getElementsByTagName("button");
// 		 for(var i = 0; i<a_list.length;i++){
// 		 	   var content  = a_list[i].textContent || a_list[i].innerText;
// 		 	   if(content.indexOf(search_input) > -1){
// 		 	   		a_list[i].style.display = "";
// 		 	   		a_button[i].style.display = '';
// 		 	   }else {
// 		 	   		a_list[i].style.display = "none";
// 		 	   		a_button[i].style.display = "none";

		 	   		
// 		 	   }
// 		 }
// 		 console.log(a_list.length);
// 	}
// } else {  // `DOMContentLoaded` has already fired
//   console.log('Not Finished');
// }

// }

	// document.querySelector('#url_list ').addEventListener('click', function(event) {
	// 	var url_id = event.target.id;
	// 	console.log(url_id);
	// 	if(url_id != ''){
	// 		chrome.storage.local.get(function(addressBarUrl) {	
	// 			addressBarUrl.url.splice(url_id,1);
	// 			chrome.storage.local.set({'url': addressBarUrl.url}, function() {
	// 				chrome.tabs.getSelected(null, function(tab) {
	// 				tabId = tab.id;
	// 				chrome.tabs.reload(tabId);	
	// 				});
	// 			});	
	// 		});
	// 	}
	// });


	// chrome.browserAction.onClicked.addListener(function(tab) {
		// document.querySelector("#link_option_page").addEventListener("click",function(){
		// 	console.log('Hello');
		// })
		// getUrl();
  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
// });