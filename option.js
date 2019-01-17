document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(function(addressBarUrl) {
  	addressBarUrl.url.forEach(function(element,value){
  		var id = document.getElementById("url_list");
  		 var tag = document.createElement('a');
  		 var text = document.createTextNode(element);
  		 tag.setAttribute('href', element);
  		 tag.setAttribute('target','_blank');
  		 tag.appendChild(text);
  		 id.appendChild(tag);
  		 var btn = document.createElement("button");
  		 btn.setAttribute('id',value);
  		 var t = document.createTextNode("Delete");
  		btn.appendChild(t);
  		 id.appendChild(btn);
  		 var newElem = document.createElement("br");
  		 id.appendChild(newElem);
	  	// $('#url_list').append(`<a href="${element}">${element}</a><br />`);
  	});
	});
});

window.onload = function(){ 
if (document.readyState === "complete") {  // Loading hasn't finished yet
	myInput.oninput  = function (){
		var search_input = myInput.value; 
		// console.log(myInput.value);
		 var div = document.getElementById("url_list");
		 var a_list = div.getElementsByTagName("a");
		 var a_button = div.getElementsByTagName("button");
		 for(var i = 0; i<a_list.length;i++){
		 	   var content  = a_list[i].textContent || a_list[i].innerText;
		 	   if(content.indexOf(search_input) > -1){
		 	   		a_list[i].style.display = "";
		 	   		a_button[i].style.display = '';
		 	   }else {
		 	   		a_list[i].style.display = "none";
		 	   		a_button[i].style.display = "none";

		 	   		
		 	   }
		 }
		 console.log(a_list.length);
	}
} else {  // `DOMContentLoaded` has already fired
  console.log('Not Finished');
}

}

document.querySelector('body').addEventListener('click', function(event) {
	var url_id = event.target.id;
	chrome.storage.local.get(function(addressBarUrl) {
		addressBarUrl.url.splice(url_id,1);
		chrome.storage.local.set({'url': addressBarUrl.url}, function() {
							// console.log(localStorageUrl);
						});	
	});
});