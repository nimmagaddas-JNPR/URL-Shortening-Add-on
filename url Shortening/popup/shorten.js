
//  function makeShort(){
//     var long = document.getElementById("url-field").value;
//     var res = long.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//     if(res==null){
//       document.getElementById("output").innerHTML= "Not Valid URL"
//     }
//     else{
//       var short = encode(long);
//       var output = short.link(long);
//       document.getElementById("output").innerHTML = output;
//     }
// }

document.addEventListener("click", (e)=>{
    var link = e.target.textContent;
    var resultURL = browser.extension.getURL("link");
    browser.tabs.executeScript({ 
      file: "/content_scripts/addon.js" 
    });
});

var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(
          tab.id,
          tab.url,
          {output: resultURL});
  });

var urlToCode = {}, codeToUrl = {};
// generate 6 random digit code
function getRandomCode(len) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let results = '';
    for (let i = 0; i < len; i++) {
        results += alphabet[Math.floor(Math.random() * 62)];
    }
    return results;
}

var encode = function(longUrl) {
    //check if miniurl already exists 
    while (urlToCode[longUrl] === undefined) {
        let code = getRandomCode(6);
        if (codeToUrl[code] === undefined) {
            codeToUrl[code] = longUrl;
            urlToCode[longUrl] = code;
        }
    }
    return "http://miniurl.com/" + urlToCode[longUrl];
};

var lng = window.location.href;
var short = encode(lng);
      var output = short.link(lng);
      document.getElementById("output").innerHTML = output;


 
 
