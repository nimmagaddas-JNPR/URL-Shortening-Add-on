function shorten(request, sender, sendResponse) {
  removeEverything();
  display(request.output);
  browser.runtime.onMessage.removeListener(shorten);
}

function display(name){
var para = document.createElement("P");                       
var t = document.createTextNode(name);       
para.appendChild(t);                                          
document.body.appendChild(para); 
}

function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

browser.runtime.onMessage.addListener(shorten);