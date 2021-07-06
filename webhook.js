chrome.browserAction.onClicked.addListener(async function(tab) {
    let { title, url } = tab;
    let webhookURL = '';
    if(!url.includes('youtube.com/watch?')) return;
    await fetch(webhookURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `Title: ${title}\n${url}`
        })
    })
    alert(`Added ${title} | with url: ${url}`)
});