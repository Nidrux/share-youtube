chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request)
    console.log(sender)

    let { url } = sender;
    let webhookURL = request.webhookURL;
    if(!url.includes('youtube.com/watch?')) return;
    await fetch(webhookURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `${url}`
        })
    })  


    }
);