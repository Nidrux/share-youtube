console.log("%cCreated by:\nNidrux", 'color: red; font-weight: bold;');
let {prim, hover} = {
  prim: '#3059e3',
  hover: '#262dbd'
}
function sendToWebhook(webhooks, url) {
  webhooks.forEach(hook => {
    chrome.runtime.sendMessage({webhookURL: hook, youtube: url}, function(response) {
      console.log(response.farewell);
    });
  });
}
chrome.storage.sync.get('hooks', (result) => {
  if(!result.hooks) {
    chrome.storage.sync.set({hooks: []});
  } else {
    return;
  }
});
window.addEventListener('load',  async () => {
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  (async function generateButton() {
      let container = document.getElementById('flex');
      if(!container) {
          await sleep(500)
          generateButton();
      } else {
          try {
              container.style.textAlign = "right"
              container.style.paddingRight = '2%'
              let button = document.createElement('a');
              button.setAttribute('area-label', 'Share to discord');
              button.innerHTML = svgDiscord(prim);
              container.appendChild(button);
              console.log("%cLoaded button", 'color: white; font-weight: bold; background-color: black;');
              let svg = button.children[0]
              let g = svg.children[0]
              button.addEventListener('mouseover', (e) => {
                  g.children[1].setAttribute('fill', hover);
                  button.style.cursor = 'pointer';
              })
              button.addEventListener('mouseout', (e) => {
                  g.children[1].setAttribute('fill', prim);
                  button.style.cursor = 'context-menu';
              })
              button.addEventListener('click', (e) => {
                chrome.storage.sync.get('hooks', (result) => {
                  console.log(result.hooks);
                  if(result.hooks.length <= 0) {
                    addHook(document, chrome);
                  } else {
                    let url = window.location.href;
                    sendToWebhook(result.hooks, url);
                  }
                })
              })
              button.addEventListener('contextmenu', (e) => {
                popUpMain(document, chrome, prim);
                e.preventDefault();
              })
          } catch (err) {
              console.log(err)
          }
      }
  })();
});


