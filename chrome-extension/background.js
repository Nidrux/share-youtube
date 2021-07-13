chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request);
    if(!request) return;
    if(!request.webhookURL) return;
    let yt = request.youtube;
    let webhookURL = request.webhookURL.webhook;
    await fetch(webhookURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `${yt}`
        })
    });
    sendResponse({farewell: 'succes'});
});