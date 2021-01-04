chrome.storage.sync.set({
  quick_enabled: false,
});


chrome.contextMenus.create({
  type: "normal",
  title: "Save Text to flomo(#chrome)",
  id: "flomoText",
  onclick: sendToFlomoWithText,
  contexts: ["selection"],
});

chrome.contextMenus.create({
  type: "normal",
  title: "Save Link to flomo",
  id: "flomoLink",
  onclick: sendToFlomoWithLink,
});


function sendToFlomoWithLink(tab) {
  var url = localStorage.api || "";
  var opt = null;
  var content = "";
  if (url == "") {
    alert("请填写API后才能使用呃~(右键)");
  } else {

    chrome.tabs.getSelected(null, function (tab) {
      var tag = localStorage.tag?localStorage.tag:'#chrome ' 
      content = "#"+ tag + " 标题：" + tab.title + "，来自：" + tab.url;

      var data = {
        content: content,
      };

      sendToFlomo(data, url);
    });
  }
}

function sendToFlomoWithText(info, tab) {
  var url = localStorage.api || "";
  var opt = null;
  var content = "";
  var currentUrl = "";
  if (url == "") {
    alert("请填写API后才能使用呃~(右键)");
  } else {
    chrome.tabs.getSelected(null, function (tab) {
      currentUrl = tab.url;
      var tag = localStorage.tag?localStorage.tag:'#chrome ' 
      content = "#"+tag + " "+ info.selectionText + " 来自：" + currentUrl;
      var data = {
        content: content,
      };

      sendToFlomo(data, url);
    });
  }
}

function sendToFlomo(data, url) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (data) {
      console.log("succes: " + data);
      if (data.code == 0) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    },
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if(message.type=='text'){
    chrome.contextMenus.update("flomoText", {
      title: "Send Text to flomo(#"+localStorage.tag+")“" + message.content + "”",
    });
  }
  chrome.storage.sync.get("quick_enabled", function (obj) {
    var checked = obj.quick_enabled;
    if (checked) {
      chrome.tabs.getSelected(null, function (tab) {
        currentUrl = tab.url;
        content = +localStorage.tag?localStorage.tag:'#chrome ' + " "+ message + " 来自：" + currentUrl;
        var data = {
          content: content,
        };
        var url = localStorage.api || "";
        sendToFlomo(data, url);
      });
    }
  })
  
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log("inputChanged: " + text);
  if (!text) return;
  suggest([
    { content: "#chrome " + text, description: "保存到flomo ===>>>  " + text },
    { content: "flomo", description: "回到flomo https://flomoapp.com/mine" },
  ]);
});

chrome.omnibox.onInputEntered.addListener((text) => {
  console.log("inputEntered: " + text);
  if (!text) return;
  if (text == "flomo") {
    openUrlCurrentTab("https://flomoapp.com/mine");
  } else {
    var data = {
      content: text,
    };
    var url = localStorage.api || "";
    sendToFlomo(data, url);
  }
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}
// 当前标签打开某个链接
function openUrlCurrentTab(url) {
  getCurrentTabId((tabId) => {
    chrome.tabs.update(tabId, { url: url });
  });
}
