globalThis.generateButton = (document, container) => {
    let button = document.createElement('a');
    button.setAttribute('area-label', 'Share to discord');
    button.innerHTML = svgDiscord(prim);
    button.id = 'dsw-share-yt-button'
    container.appendChild(button);
}