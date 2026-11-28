(()=>{var m=class{constructor(t,e,i,o){this.x=this.originalX=t,this.y=this.originalY=e,this.r=i||10,this.element=document.createElementNS("http://www.w3.org/2000/svg","circle"),this.fill=o?"url(#_r_gradient)":"#A6B1CE",this.element.setAttribute("r",this.r.toString()),this.element.setAttribute("style",`fill: ${this.fill};`)}update(t,e,i,o){let s=this.x-t,r=this.y-e,c=Math.atan2(r,s),a=i/Math.sqrt(s*s+r*r);this.x+=Math.cos(c)*a,this.y+=Math.sin(c)*a,this.x+=(this.originalX-this.x)*o,this.y+=(this.originalY-this.y)*o,this.element.setAttribute("cx",this.x.toString()),this.element.setAttribute("cy",this.y.toString())}},h=class{constructor(t){this.config={blur:8,alphaMult:30,alphaAdd:-10,numSeeds:6,childrenPerSeed:4,childrenDistanceRange:125,circleMinRadius:15,circleMaxRadius:75,attraction:.1,repulsion:1e3},this.animate=()=>{requestAnimationFrame(this.animate),this.elements.forEach(i=>{i.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction)})},this.is3D=t,this.svg=document.getElementById("svg"),this.colorMatrixF=document.getElementById("colorMatrixF");let e=document.getElementById("reflect-main");window.addEventListener("resize",this.onResize,!1),e.addEventListener("mousemove",i=>{this.mouseX=i.clientX,this.mouseY=i.clientY},!1),e.addEventListener("mouseleave",this.resetMouse,!1),this.onResize(),this.resetMouse(),this.initElements(),this.colorMatrixF.setAttribute("values",`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${this.config.alphaMult} ${this.config.alphaAdd}`)}random(t,e){return t+Math.random()*(e-t)}randomRange(t,e){return t+(Math.random()*2-1)*e}initElements(){this.elements=[];let t=document.createElementNS("http://www.w3.org/2000/svg","g");this.svg.appendChild(t);for(let e=0;e<this.config.numSeeds;e++){let i=new m(this.random(this.width*.4,this.width),this.randomRange(this.centerY,this.height*.4),this.random(this.config.circleMinRadius,this.config.circleMaxRadius),this.is3D);i.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction),t.appendChild(i.element),this.elements.push(i)}this.elements.forEach(e=>{for(let i=0;i<this.config.childrenPerSeed;i++){let o=new m(this.randomRange(e.x,this.config.childrenDistanceRange),this.randomRange(e.y,this.config.childrenDistanceRange),this.random(this.config.circleMinRadius,this.config.circleMaxRadius),this.is3D);o.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction),t.appendChild(o.element),this.elements.push(o)}})}resetMouse(){this.mouseX=this.centerX,this.mouseY=5*this.centerY}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.centerX=this.width/2,this.centerY=this.height/2}};function u(n,t=!1){if(n===void 0)return"";{let e=n.match(t?/^[\w]+:\/{2}([^#?]+)/:/^[\w]+:\/{2}([\w\.:-]+)/);return e==null?"":e[1].replace("www.","")}}function g(n,t){t.parentNode.insertBefore(n,t.nextSibling)}function b(n){let t=document.createElement("div");return t.insertAdjacentHTML("beforeend",n),t}function d(n){return document.getElementById(n)}function l(){return new Promise((n,t)=>{chrome.storage.sync.get(null,e=>{chrome.runtime.lastError!==void 0?t(chrome.runtime.lastError):n(e)})})}function f(n){return new Promise((t,e)=>{chrome.storage.sync.set(n,()=>{chrome.runtime.lastError!==void 0?e(chrome.runtime.lastError):t()})})}function w(n,t,e,i){l().then(o=>{let s=o.intentList,r=new Date;for(let c in s){let a=new Date(c);a<r&&(r=a)}Object.keys(s).length>o.numIntentEntries&&(console.log(`list full, popping ${r.toJSON()}`),delete s[r.toJSON()]),s[t.toJSON()]={intent:n,url:e,accepted:i},f({intentList:s}).then(()=>{console.log(`logged intent "${n}"`)})})}var k=()=>`
    <table class="options_panel">
        <tr>
            <td style="width:60%">
                <h3 class="setting">enable blobs.</h3>
                <p class="subtext">whether to render the interactive blobs on the block page.</p>
            </td>
            <td>
                <input class='toggle' id='enableBlobs' type='checkbox'>
                <label class='toggle-button' for='enableBlobs'></label>
            </td>
        </tr>
        <tr>
            <td>
                <h3 class="setting">enable 3D.</h3>
                <p class="subtext">whether to enable the 3D-like effect on the blobs on the block page.</p>
            </td>
            <td>
                <input class='toggle' id='enable3D' type='checkbox'>
                <label class='toggle-button' for='enable3D'></label>
            </td>
        </tr>
        <tr>
            <td>
                <h3 class="setting">whitelist time.</h3>
                <p class="subtext">time allowed on a website after successful intent (minutes).</p>
            </td>
            <td>
                <input id="whitelistTime" type="number" min="0">
            </td>
        </tr>
    </table>
    <p id="statusMessage">
        <span id="statusContent"></span>
        <span>&nbsp;</span>
    </p>
    `,B=()=>{let n=d("whitelistTime").value,t=d("enableBlobs").checked,e=d("enable3D").checked;f({whitelistTime:n,enableBlobs:t,enable3D:e}).then(()=>{let i=document.getElementById("statusContent");i.textContent="options saved.",setTimeout(()=>{i.textContent=""},1500)})},v=()=>{document.addEventListener("DOMContentLoaded",()=>{l().then(i=>{var o,s;d("whitelistTime").value=i.whitelistTime,d("enableBlobs").checked=(o=i.enableBlobs)!==null&&o!==void 0?o:!0,d("enable3D").checked=(s=i.enable3D)!==null&&s!==void 0?s:!0});let n=document.getElementById("options"),t=document.getElementById("page3button");t.innerText="skip.";let e=b(`
            <div class="text-section">
                <h2>configure.</h2>
                <p>buttons and knobs to customize your reflect experience.</p>
                ${k()}
                <a id="saveButton" class="lt-hover white_button shadow nextPage">save!</a>
            </div>
            `);g(e,n),document.getElementById("saveButton").addEventListener("click",B)})};function L(n){return["facebook.com/flx","l.facebook.com"].some(e=>n.includes(e))}function E(n,t){let e=u(n,!1),i=u(n,!0);return(!e.includes(`.${t}`)&&e==t||i===t)&&!L(n)}var S="#576ca8",T="#ff4a47",M="https://getreflect.app/onboarding/",I="http://localhost:1313/onboarding/";D();window.addEventListener("focus",D);function D(){if(window.location.href===M||window.location.href===I){v();return}document.getElementById("reflect-main")||l().then(n=>{n.isEnabled&&n.blockedSites.forEach(t=>{E(window.location.href,t)&&_()})})}function y(n,t=3e3,e=S){$("#statusContent").css("color",e),$("#statusContent").text(n),$("#statusContent").show().delay(t).fadeOut()}function R(){return u(window.location.href)}function _(){l().then(n=>{let t=R();if(t==="")return;let e=n.whitelistedSites;if(!e.hasOwnProperty(t)){p();return}let i=new Date(e[t]),o=new Date;if(o>=i){p();return}let r=i.getTime()-o.getTime();setTimeout(()=>{p()},r)})}function p(){let n=R(),t=chrome.runtime.getURL("res/pages/prompt.html"),e=chrome.runtime.getURL("res/pages/options.html");l().then(i=>{$.get(t,o=>{var s,r;window.stop(),$("html").html(o),F(n),$("#linkToOptions").attr("href",e),(!((s=i.enableBlobs)!==null&&s!==void 0)||s)&&new h((r=i.enable3D)!==null&&r!==void 0?r:!0).animate();let c=document.getElementById("customMessageContent");c.textContent=i.customMessage||"hey! what are you here for?"})})}function F(n){let t=document.forms.namedItem("inputForm"),e=document.getElementById("submitButton");t?.addEventListener("submit",i=>{i.preventDefault(),e?.setAttribute("disabled","disabled");let o=i.target,r=new FormData(o).get("intent").toString();A(r,n)})}function A(n,t){let e=chrome.runtime.connect({name:"intentStatus"});e.postMessage({intent:n,url:window.location.href}),e.onMessage.addListener(i=>{switch(i.status){case"ok":l().then(c=>{let a=c.whitelistTime;y(`got it! ${a} minutes starting now.`,3e3,S),location.reload()});break;case"too_short":x("your response is a little short. be more specific!");break;case"invalid":x("that doesn't seem to be productive. try being more specific.");break}let o=document.getElementById("submitButton");o?.removeAttribute("disabled");let s=i.status==="ok"?"yes":"no";w(n,new Date,t,s),e.disconnect()})}function x(n){$("#inputFields").effect("shake",{times:3,distance:5}),y(n,3e3,T),$("#textbox").val("")}})();
