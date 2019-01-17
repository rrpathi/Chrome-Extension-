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
		 for(var i = 0; i<a_list.length;i++){
		 	   var content  = a_list[i].textContent || a_list[i].innerText;
		 	   if(content.indexOf(search_input) > -1){
		 	   		a_list[i].style.display = "";
		 	   }else {
		 	   		a_list[i].style.display = "none";
		 	   		
		 	   }
		 }
		 console.log(a_list.length);
	}
} else {  // `DOMContentLoaded` has already fired
  console.log('Not Finished');
}

}

