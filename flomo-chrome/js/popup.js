(function() {
    var api = localStorage.api || '';

    if (api) {
        $('#tip').text('已经配置API，可以愉快的send memo to flomo了')
    } else {
        $('#tip').text('右键flomo icon 选择选项，进入选项页填写flomo API')
    }


    document.addEventListener('DOMContentLoaded', function() {
        for (const anchor of document.getElementsByTagName('a')) {
            anchor.onclick = () => {
                chrome.tabs.create({ active: true, url: anchor.href });
            };
        };
    });
})();