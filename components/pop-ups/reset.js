globalThis.popUpReset = async (document, chrome, prim) => {
    popUpFrame(document);
    let main = document.getElementById('dsw-share-yt-popup-main');
    let p = document.createElement('p');
    let a = document.createElement('a');
    await chrome.storage.sync.get(['dsWebhook'], (res) => {
        let webhook = res.dsWebhook;
        console.log(webhook)
        if(webhook) {
            a.setAttribute('data-webhook', webhook)
        } else {
            a.setAttribute('data-webhook', 'empty')
        }
    });
    p.innerText = 'Current webhook: ';
    p.style.color = '#909090';
    p.style.fontWeight = 'bold';
    p.appendChild(a);
    main.appendChild(p);

    if(a.dataset.webhook === 'empty') {
        a.innerText = 'No webhook has been provided'
    } else {
        a.innerText = 'Click to view';
        a.setAttribute('href', a.dataset.webhook);
        a.setAttribute('target', '_blank');
    }


    let div = document.createElement('div');
    let trash = document.createElement('a');
    trash.innerHTML = svgTrash(prim);
    let svg = trash.children[0];
    let g = svg.children[0];
    trash.addEventListener('mouseover', (e) => {
        g.children[1].setAttribute('fill', hover);
        trash.style.cursor = 'pointer';
    });
    trash.addEventListener('mouseout', (e) => {
        g.children[1].setAttribute('fill', prim);
        trash.style.cursor = 'context-menu';
    });

    trash.addEventListener('click', (e) => {
        clearFrame(document);
        chrome.storage.sync.remove('dsWebhook', () => {
            let p = document.createElement('p');
            p.innerText = 'You have removed the current webhook!';
            p.style.color = '#909090';
            p.style.fontWeight = 'bold';
            main.appendChild(p);
        })
    })
    div.appendChild(trash);
    main.appendChild(div);
}