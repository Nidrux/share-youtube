globalThis.popUpMain = async (document, chrome, prim) => {
    popUpFrame(document);
    let main = document.getElementById('dsw-share-yt-popup-main'); // CONTENT DIV INSIDE OF FRAME
    /*
    HOOKS SECTION
    */
    let sectionHooks = document.createElement('div');
    sectionHooks.id = 'dsw-share-yt-hooks-wrapper';

    let h3 = document.createElement('h3');
    h3.innerText = 'Current webhooks:';
    h3.style.color = '#909090';
    h3.style.fontWeight = 'bold';

    sectionHooks.appendChild(h3)


    main.appendChild(sectionHooks);
    /*
    INPUT SECTION
    */
    let sectionInput = document.createElement('div');
    sectionInput.id = 'dsw-share-yt-input-wrapper';

    h3 = document.createElement('h3');
    h3.innerText = 'Add a webhook:';
    h3.style.color = '#909090';
    h3.style.fontWeight = 'bold';

    sectionHooks.appendChild(h3)
    main.appendChild(sectionInput);
}


globalThis.addHook = (document, chrome) => {
    popUpFrame(document);
    let main = document.getElementById('dsw-share-yt-popup-main'); // CONTENT DIV INSIDE OF FRAME
    let sectionInput = document.createElement('div');
    sectionInput.id = 'dsw-share-yt-input-wrapper';

    let h3 = document.createElement('h3');
    h3.innerText = 'ADD A WEBHOOK:';
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Paste your webhook here...');

    sectionInput.appendChild(h3)
    sectionInput.appendChild(input);
    main.appendChild(sectionInput);
    // let check = prompt.indexOf("https://discordapp.com/api/webhooks/");
    //                 console.log(check)
    //                 if(check >= -1) {
    //                   chrome.storage.sync.set({dsWebhook: prompt}, () => console.log("%cWebhook added", 'color: white; font-weight: bold; background-color: black;'))
    //                   sendToWebhook(prompt);
    //                 } else {
    //                   alert('This is not a valid webhook! Try again.')
    //                 }
}