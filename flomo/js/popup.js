(function() {
    document.addEventListener('DOMContentLoaded', function() {
        for (const anchor of document.getElementsByTagName('a')) {
            anchor.onclick = () => {
                chrome.tabs.create({ active: true, url: anchor.href });
            };
        };
    });
    
})();