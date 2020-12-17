(function() {
    var api = localStorage.api || '';

    if (api) {
        $('#tip').text('已经配置API，可以愉快的send memo to flomo了')
    } else {
        $('#tip').text('右键flomo icon 选择选项，进入选项页填写flomo API')
    }

    $('.url').text(window.location.href)
})();