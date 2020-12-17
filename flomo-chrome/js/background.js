chrome.contextMenus.create({
    type: 'normal',
    title: 'Save Text to flomo',
    id: 'flomoText',
    onclick: sendToFlomoWithText,
    contexts: ['selection'],
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Save Link to flomo',
    id: 'flomoLink',
    onclick: sendToFlomoWithLink,
});

function sendToFlomoWithLink(tab) {
    var url = localStorage.api || '';
    var opt = null;
    var content = ""
    var currentUrl = ""
    if (url == '') {
        alert('请填写API后才能使用呃~(右键)')
    } else {
        chrome.tabs.getSelected(null, function(tab) {
            console.log(tab.url);
            currentUrl = tab.url
            content = "#chrome " + "来自：" + currentUrl

            var data = {
                content: content
            }

            sendToFlomo(data, url)
        });
    }
}

function sendToFlomoWithText(info, tab) {
    var url = localStorage.api || '';
    var opt = null;
    var content = ""
    var currentUrl = ""
    if (url == '') {
        alert('请填写API后才能使用呃~(右键)')
    } else {

        chrome.tabs.getSelected(null, function(tab) {
            currentUrl = tab.url
            content = "#chrome " + info.selectionText + "来自：" + currentUrl
            var data = {
                content: content
            }

            sendToFlomo(data, url)
        });

    }

}

function sendToFlomo(data, url) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: function(data) {
            console.log('succes: ' + data);
            if (data.code == 0) {
                alert(data.message)

            } else {

                alert(data.message)
            }

        }
    });
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    chrome.contextMenus.update('flomo', {
        'title': 'Send to flomo“' + message + '”'
    })
});

// chrome.browserAction.onClicked.addListener(function(tab) {
//     if (tab.url.indexOf("http") != -1) {
//         chrome.tabs.executeScript(tab.id, {
//             "file": "popup.js"
//         }, function() {
//             console.log("Script Executed .. ");
//         });
//     }
// });