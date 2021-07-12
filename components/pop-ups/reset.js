globalThis.popUpReset = async (document, chrome, prim) => {
    popUpFrame(document);
    let main = document.getElementById('dsw-share-yt-popup-main');
    let p = document.createElement('p');
    let a = document.createElement('a');
    await chrome.storage.sync.get(['dsWebhook'], (res) => {
        let webhook = res.dsWebhook;
        console.log(webhook)
        webhook ? a.innerText = 'Click to view' : a.innerText = 'No webhook provided'
        a.addEventListener('click', () => {
            if(!webhook) return;
            window.open(webhook, '_blank');
        })
        a.addEventListener('mouseover', (e) => {
            a.style.cursor = 'pointer';
        });
        a.addEventListener('mouseout', (e) => {
            a.style.cursor = 'context-menu';
        });

    });
    p.innerText = 'Current webhook: ';
    p.style.color = '#909090';
    p.style.fontWeight = 'bold';
    p.appendChild(a);
    main.appendChild(p);
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