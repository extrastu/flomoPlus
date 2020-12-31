window.onload = function () {
  var objImg = new Image();
  objImg.src = "https://flomoapp.com/images/logo-192x192.png";
  objImg.alt = "send Text to flomo";
  objImg.title = "将选中的文字发送到flomo";
  objImg.style.display = "none";
  objImg.style.position = "absolute";
  objImg.style.cursor = "pointer";
  objImg.style.zIndex = "9999999999";
  objImg.style.width = "25px";
  objImg.style.height = "25px";
  objImg.style.borderRadius = "5px";
  objImg.style.border = "1px solid lightgray";
  document.body.appendChild(objImg);

  function selectText() {
    if (document.selection) {
      //For ie
      return document.selection.createRange().text;
    } else {
      return window.getSelection().toString();
    }
  }
  document.onmouseup = function (ev) {
    var ev = ev || window.event,
      left = ev.clientX,
      top = ev.clientY;

    chrome.storage.sync.get("quick_enabled", function (obj) {
      var checked = obj.quick_enabled;
      if (checked) {
        setTimeout(function () {
          if (selectText().length > 0) {
            setTimeout(function () {
              objImg.style.display = "block";
              objImg.style.left = left + "px";
              objImg.style.top = top + "px";
            }, 100);
          }
        }, 200);
      }
    });
  };
  objImg.onclick = function (ev) {
    var text = selectText();
    chrome.runtime.sendMessage(text);
  };
  //鼠标松开会触发document的mouseup事件/冒泡
  objImg.onmouseup = function (ev) {
    var ev = ev || window.event;
    ev.cancelBubble = true;
  };
  document.onclick = function (ev) {
    objImg.style.display = "none";
  };
};
