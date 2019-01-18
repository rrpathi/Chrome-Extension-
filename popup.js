function hello() {
	alert('js file Include');
  // chrome.tabs.executeScript({
  //   file: 'alert.js'
  // }); 
}

document.getElementById('link_option_page').addEventListener('click', hello);