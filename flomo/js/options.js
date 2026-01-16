(function () {
    var api = localStorage.api || "";
    document.getElementById("api").value = api;
    document.getElementById("save").onclick = function () {
        localStorage.api = document.getElementById("api").value;
        if (localStorage.api) {
            alert("保存成功");
        } else {
            alert("请输入flomo API地址");
        }
    };

    var tag = localStorage.tag || "Edge";
    document.getElementById("tag").value = tag;
    document.getElementById("saveTag").onclick = function () {
        localStorage.tag = document.getElementById("tag").value;
        if (localStorage.tag) {
            alert("保存成功");
        } else {
            alert("请输入默认标签");
        }
    };
    
    var quick = document.querySelector("#quick");
    var checked = localStorage.quick_enabled || false
    quick.checked = checked;
    chrome.storage.sync.get("quick_enabled", function (obj) {
        quick.checked = obj.quick_enabled;
        quick.onchange = function () {
            chrome.storage.sync.set({
                "quick_enabled": quick.checked
            });
        }
    })
})();