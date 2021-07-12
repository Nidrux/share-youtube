console.log("%cCreated by:\nNidrux", 'color: red; font-weight: bold;');


function sendToWebhook(webhook) {
  chrome.runtime.sendMessage({webhookURL: webhook}, function(response) {
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
              button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="24" height="24" viewBox="0 0 172 172" style=" fill:#909090;">
                  <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#909090">
                          <path d="M150.5,164.83333l-31.37567,-24.40967l2.709,10.07633h-86c-7.91917,0 -14.33333,-6.41417 -14.33333,-14.33333v-100.33333c0,-7.91917 6.41417,-14.33333 14.33333,-14.33333h100.33333c7.91917,0 14.33333,6.41417 14.33333,14.33333zM116.745,61.41833c0,0 -8.815,-6.80833 -19.20667,-7.59667l-2.15,4.37167c-3.225,-0.57333 -6.52167,-1.00333 -9.38833,-1.00333c-2.93833,0 -6.30667,0.43 -9.38833,1.00333l-2.15,-4.37167c-10.89333,1.075 -19.20667,7.59667 -19.20667,7.59667c0,0 -9.81833,14.19 -11.46667,41.85333c9.89,11.32333 24.94,11.395 24.94,11.395l3.08167,-4.15667c-3.15333,-1.075 -5.87667,-2.50833 -8.67167,-4.65833l0.645,-1.72c5.16,2.365 11.825,3.79833 22.21667,3.79833c10.39167,0 17.05667,-1.43333 22.21667,-3.79833l0.645,1.72c-2.795,2.15 -5.51833,3.58333 -8.67167,4.65833l3.08167,4.15667c0,0 15.05,-0.07167 24.94,-11.395c-1.64833,-27.66333 -11.46667,-41.85333 -11.46667,-41.85333zM71.66667,95.89c-3.72667,0 -6.73667,-3.79833 -6.73667,-8.45667c0,-4.65833 3.01,-8.45667 6.73667,-8.45667c3.72667,0 6.73667,3.79833 6.73667,8.45667c0,4.65833 -3.01,8.45667 -6.73667,8.45667zM100.33333,95.89c-3.72667,0 -6.73667,-3.79833 -6.73667,-8.45667c0,-4.65833 3.01,-8.45667 6.73667,-8.45667c3.72667,0 6.73667,3.79833 6.73667,8.45667c0,4.65833 -3.01,8.45667 -6.73667,8.45667z"></path>
                      </g>
                  </g>
              </svg>`
              container.appendChild(button);
              console.log("%cLoaded button", 'color: white; font-weight: bold; background-color: black;');
              let svg = button.children[0]
              let g = svg.children[0]
              button.addEventListener('mouseover', (e) => {
                  g.children[1].setAttribute('fill', '#5ad157');
                  button.style.cursor = 'pointer';
              })
              button.addEventListener('mouseout', (e) => {
                  g.children[1].setAttribute('fill', '#909090');
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
                    sendToWebhook(result.dsWebhook);
                  }
                })
              })
              button.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                console.log('right clicked');
              })
          } catch (err) {
              console.log(err)
          }
      }
  })();
});


