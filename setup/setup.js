browser.storage.local.get(['telegram-token', 'telegram-chat-id'], function(result) {
    if (result['telegram-token']) {
        document.getElementById('telegram-token').value = result['telegram-token'];
    }
    if (result['telegram-chat-id']) {
        document.getElementById('telegram-chat-id').value = result['telegram-chat-id'];
    }
});

document.getElementById('save').addEventListener('click', function() {
    var token = document.getElementById('telegram-token').value;
    var chatId = document.getElementById('telegram-chat-id').value;

    browser.storage.local.set({
        'telegram-token': token,
        'telegram-chat-id': chatId
    });

    document.getElementById('successText').classList.remove('hidden');
});