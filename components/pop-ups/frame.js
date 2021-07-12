globalThis.popUpFrame = (document) => {
    /* 
     WRAPPER
    */
    let wrapper = document.createElement('div');
    wrapper.id = 'dsw-share-yt-wrapper';
    wrapper.style.backgroundColor = 'rgba(0,0,0,0.4)';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.position = 'fixed';
    wrapper.style.width = '100%';
    wrapper.style.height = '100vh';
    wrapper.style.zIndex = '100000000000000000'
    /* 
    POP-UP FRAME
    */
    let div = document.createElement('div');
    div.style.position = 'relative';
    div.style.padding = '2%';
    div.style.backgroundColor = '#181818';
    div.style.width = '30%';
    div.style.height = 'auto';
    div.style.borderRadius = '25px';
        /* 
        CLOSE BUTTON
        */
        let close = document.createElement('a');
        close.style.position = 'absolute';
        close.style.right = '15px';
        close.style.top = '15px';
        close.innerHTML = svgClose(prim);
        let svg = close.children[0];
        let g = svg.children[0];
        close.addEventListener('mouseover', (e) => {
            g.children[1].setAttribute('fill', hover);
            close.style.cursor = 'pointer';
        });
        close.addEventListener('mouseout', (e) => {
            g.children[1].setAttribute('fill', prim);
            close.style.cursor = 'context-menu';
        });
        close.addEventListener('click', () => {
            document.body.removeChild(document.getElementById('dsw-share-yt-wrapper'));
        });
        /* 
        CONTENT
        */
        let content = document.createElement('div');
        content.id = 'dsw-share-yt-popup-main';
        /*
        FOOTER
        */
        let footer = document.createElement('div');
        let footerDiscord = document.createElement('a');
        let footerInfo = document.createElement('p');
        footer.style.marginTop = '0.8em';

        footer.appendChild(footerInfo);
        footer.appendChild(footerDiscord);
        footerInfo.innerText = 'Need help?';
        footerInfo.style.color = '#909090';
        footerInfo.style.fontWeight = 'bold';
        footerDiscord.setAttribute('href', 'https://dsc.gg/share-yt');
        footerDiscord.innerText = 'discord';
        footerDiscord.style.textDecoration = 'none';
        footerDiscord.style.color = prim;
        footerDiscord.addEventListener('mouseover', (e) => {
            footerDiscord.style.color = hover;
            footerDiscord.style.cursor = 'pointer';
        });
        footerDiscord.addEventListener('mouseout', (e) => {
            footerDiscord.style.color = prim;
            footerDiscord.style.cursor = 'context-menu';
        });
    /* 
    APPENDS
    */
    div.appendChild(close);
    div.appendChild(content);
    div.appendChild(footer)
    wrapper.appendChild(div);
    document.body.appendChild(wrapper);
}


globalThis.clearFrame = (document) => {
    let div = document.getElementById('dsw-share-yt-popup-main');
    div.innerHTML = '';
}