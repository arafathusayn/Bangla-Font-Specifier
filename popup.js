var saveButton = document.getElementById('saveButton');
var customSaveButton = document.getElementById('customSaveButton');
var selection = document.getElementById('selection');
var customFont = document.getElementById('customFont');

chrome.storage.local.get('banglaFont', function (items) {
    var matched = false;
    var opts = selection.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == items.banglaFont) {
            selection.selectedIndex = j;
            matched = true;
            break;
        }
    }
    if (!matched) {
        selection.style.color = 'dimgrey';
        if (items.banglaFont) {
            customFont.value = items.banglaFont;
        }
    }
});

saveButton.addEventListener('click', function(e) {
    e.preventDefault();
    chrome.storage.local.set({ banglaFont: selection.value }, function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) { 
            chrome.tabs.executeScript(tabArray[0].id, { file: 'content.js' }, function() {
                close();
            });
        });
    });
});

customSaveButton.addEventListener('click', function (e) {
    e.preventDefault();
    chrome.storage.local.set({ banglaFont: customFont.value }, function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
            chrome.tabs.executeScript(tabArray[0].id, { file: 'content.js' }, function () {
                close();
            });
        });
    });
});