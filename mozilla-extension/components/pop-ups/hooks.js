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
    let ul = document.createElement('ul');
    function hookList() {
        chrome.storage.sync.get('hooks', (results) => {
            let hooks = results.hooks
            ul.innerHTML = '';
            hooks.forEach(async (hook, i) => {
                let { webhook } = hook;
                console.log(webhook);
                const res = await fetch(webhook, {method: 'get'});
                let { name, channel_id } = await res.json();
                let li = document.createElement('li');
                let p = document.createElement('p');
                p.innerText = `Name: ${name} | ID: ${channel_id}`;
                let trash = document.createElement('a');
                trash.innerHTML = svgTrash(prim);
                trash.classList.add('dsw-share-yt-trash'); 
                trash.addEventListener('click', () => {
                    console.log(hook)
                    let index = hooks.indexOf(hook);
                    console.log(index)
                    if (index > -1) {
                    hooks.splice(index, 1);
                    }
                    console.log(hooks);
                    chrome.storage.sync.set({hooks: hooks}, () => {
                        hookList();
                    })
                })
                li.appendChild(p)
                li.appendChild(trash)
                ul.appendChild(li);
            })
        })
    }
    hookList()
    sectionHooks.appendChild(h3)
    sectionHooks.appendChild(ul)
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
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Paste your webhook here...');
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', '✚')
    sectionInput.appendChild(h3)
    sectionInput.appendChild(input);
    sectionInput.appendChild(submit);
    main.appendChild(sectionInput);
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let value = input.value;
        if(!value) {
            input.setAttribute('placeholder', 'No webhook provided! Try again...');
        } else {
            let regx = /^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$/g
            let check = regx.test(value);
            if(!check) {
                input.value = '';
                input.setAttribute('placeholder', 'No valid webhook was provided! Try again...');
            } else {
                chrome.storage.sync.get('hooks', (results) => {
                    console.log(results.hooks);
                    results.hooks.push({webhook: value});
                    console.log(results.hooks);
                    chrome.storage.sync.set({hooks: results.hooks}, () => {
                        console.log('Updated hooks');
                        hookList()
                    })
                })
            }
        }
    })
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
    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', '✚')
    let p = document.createElement('p');
    p.innerHTML = `Why do I need to provide a discord webhook? No webhook could be found in the storage so this is probably your first time using this extension! Provide a webhook to enable the extension to send the youtube video to this webhook. You can add multiple webhooks by right clicking the discord icon! ** KEEP DISCORD WEBHOOKS PRIVATE`
    sectionInput.appendChild(h3)
    sectionInput.appendChild(input);
    sectionInput.appendChild(submit);
    sectionInput.appendChild(p);
    main.appendChild(sectionInput);
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let value = input.value;
        if(!value) {
            input.setAttribute('placeholder', 'No webhook provided! Try again...');
        } else {
            let regx = /^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$/g
            let check = regx.test(value);
            if(!check) {
                input.value = '';
                input.setAttribute('placeholder', 'No valid webhook was provided! Try again...');
            } else {
                chrome.storage.sync.get('hooks', (results) => {
                    console.log(results.hooks);
                    results.hooks.push({webhook: value});
                    console.log(results.hooks);
                    chrome.storage.sync.set({hooks: results.hooks}, () => {
                        console.log('Updated hooks');
                        clearFrame(document);
                        let h3 = document.createElement('h3');
                        let p = document.createElement('p');
                        h3.innerText = `Your first webhook has been added!`
                        p.innerText = `View your active webhooks by right clicking the icon or start sending youtube videos by left clicking the icon! Have fun sharing...`
                        main.appendChild(h3);
                        main.appendChild(p);
                    })
                })
            }
        }
    })
}