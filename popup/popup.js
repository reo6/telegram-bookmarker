browser.storage.local.get(['telegram-token', 'telegram-chat-id'], function(result) {
    if (!result['telegram-token'] || !result['telegram-chat-id']) {
        browser.tabs.create({url: browser.runtime.getURL('setup/setup.html')});
        document.body.innerHTML = "Please complete the initial wizard first.";
    } else {
        document.getElementById('saveBookmark').addEventListener('click', function() {
            browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var url = tabs[0].url;
                var title = tabs[0].title;

                var message = title + "\n\n" + url;
                var telegramUrl = `https://api.telegram.org/bot${result['telegram-token']}/sendMessage`;
                var telegramData = `chat_id=${result['telegram-chat-id']}&text=${encodeURIComponent(message)}`;

                fetch(telegramUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: telegramData
                });
            });
        });

        document.getElementById('setupLink').addEventListener('click', function(e) {
            e.preventDefault();
            browser.tabs.create({url: browser.runtime.getURL('setup/setup.html')});
        });

    }
});

