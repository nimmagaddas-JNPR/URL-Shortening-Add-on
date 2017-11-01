var urlToCode = {}, codeToUrl = {};

document.addEventListener("click", (e)=>{
    var link = e.target.textContent;
    browser.tabs.executeScript({ 
      file: "/content_scripts/addon.js" 
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {msg: 'Message sent!'});
    });
});

browser.runtime.onMessage.addListener(encode);

function encode(pageURL) {
  
  // check if miniurl already exists 
    while (urlToCode[pageURL] === undefined) {
        let code = getRandomCode(6);
        if (codeToUrl[code] === undefined) {
            codeToUrl[code] = pageURL;
            urlToCode[pageURL] = code;
        }
    }
    const shortURL = `http://miniurl.com/${urlToCode[pageURL]}`;
    document.getElementById("output").innerHTML = shortURL.link(pageURL);
}

// generate 6 random digit code
function getRandomCode(len) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let results = '';
    for (let i = 0; i < len; i++) {
        results += alphabet[Math.floor(Math.random() * 62)];
    }
    return results;
}
