(function() {
    var api = localStorage.api || '';
    document.getElementById('api').value = api;
    document.getElementById('save').onclick = function() {
        localStorage.api = document.getElementById('api').value;
        if (localStorage.api) {
            // alert('保存成功');
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'logo.png',
                title: '保存成功',
                message: '保存API成功！'
            });
        } else {
            alert('请输入flomo API地址');
        }
    }
})();