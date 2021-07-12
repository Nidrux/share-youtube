console.log("%cCreated by:\nNidrux", 'color: red; font-weight: bold;');
let {prim, hover} = {
  prim: '#3059e3',
  hover: '#262dbd'
}
function sendToWebhook(webhook, url) {
  chrome.runtime.sendMessage({webhookURL: webhook, youtube: url}, function(response) {
    console.log(response.farewell);
  });
}
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
                chrome.storage.sync.get('dsWebhook', (result) => {
                  if(!result.dsWebhook) {
                    let prompt = window.prompt('Please fill in your discord webhook');
                    console.log(prompt)
                    let check = prompt.indexOf("https://discordapp.com/api/webhooks/");
                    console.log(check)
                    if(check >= -1) {
                      chrome.storage.sync.set({dsWebhook: prompt}, () => console.log("%cWebhook added", 'color: white; font-weight: bold; background-color: black;'))
                      sendToWebhook(prompt);
                    } else {
                      alert('This is not a valid webhook! Try again.')
                    }
                  } else {
                    let url = window.location.href;
                    sendToWebhook(result.dsWebhook, url);
                  }
                })
              })
              button.addEventListener('contextmenu', (e) => {
                popUpReset(document, chrome, prim);
                e.preventDefault();
              })
          } catch (err) {
              console.log(err)
          }
      }
  })();
});


