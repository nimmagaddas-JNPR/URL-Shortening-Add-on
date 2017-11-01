function shorten(request, sender, sendResponse) {
  display(document.URL);
  browser.runtime.onMessage.removeListener(shorten);
}

function display(pageURL) {
  browser.runtime.sendMessage(pageURL);
}

browser.runtime.onMessage.addListener(shorten);