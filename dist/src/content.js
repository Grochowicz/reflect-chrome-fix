(()=>{var u=class{constructor(t,e,n,o){this.x=this.originalX=t,this.y=this.originalY=e,this.r=n||10,this.element=document.createElementNS("http://www.w3.org/2000/svg","circle"),this.fill=o?"url(#_r_gradient)":"#A6B1CE",this.element.setAttribute("r",this.r.toString()),this.element.setAttribute("style",`fill: ${this.fill};`)}update(t,e,n,o){let s=this.x-t,r=this.y-e,c=Math.atan2(r,s),a=n/Math.sqrt(s*s+r*r);this.x+=Math.cos(c)*a,this.y+=Math.sin(c)*a,this.x+=(this.originalX-this.x)*o,this.y+=(this.originalY-this.y)*o,this.element.setAttribute("cx",this.x.toString()),this.element.setAttribute("cy",this.y.toString())}},h=class{constructor(t){this.config={blur:8,alphaMult:30,alphaAdd:-10,numSeeds:6,childrenPerSeed:4,childrenDistanceRange:125,circleMinRadius:15,circleMaxRadius:75,attraction:.1,repulsion:1e3},this.animate=()=>{requestAnimationFrame(this.animate),this.elements.forEach(n=>{n.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction)})},this.is3D=t,this.svg=document.getElementById("svg"),this.colorMatrixF=document.getElementById("colorMatrixF");let e=document.getElementById("reflect-main");window.addEventListener("resize",this.onResize,!1),e.addEventListener("mousemove",n=>{this.mouseX=n.clientX,this.mouseY=n.clientY},!1),e.addEventListener("mouseleave",this.resetMouse,!1),this.onResize(),this.resetMouse(),this.initElements(),this.colorMatrixF.setAttribute("values",`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${this.config.alphaMult} ${this.config.alphaAdd}`)}random(t,e){return t+Math.random()*(e-t)}randomRange(t,e){return t+(Math.random()*2-1)*e}initElements(){this.elements=[];let t=document.createElementNS("http://www.w3.org/2000/svg","g");this.svg.appendChild(t);for(let e=0;e<this.config.numSeeds;e++){let n=new u(this.random(this.width*.4,this.width),this.randomRange(this.centerY,this.height*.4),this.random(this.config.circleMinRadius,this.config.circleMaxRadius),this.is3D);n.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction),t.appendChild(n.element),this.elements.push(n)}this.elements.forEach(e=>{for(let n=0;n<this.config.childrenPerSeed;n++){let o=new u(this.randomRange(e.x,this.config.childrenDistanceRange),this.randomRange(e.y,this.config.childrenDistanceRange),this.random(this.config.circleMinRadius,this.config.circleMaxRadius),this.is3D);o.update(this.mouseX,this.mouseY,this.config.repulsion,this.config.attraction),t.appendChild(o.element),this.elements.push(o)}})}resetMouse(){this.mouseX=this.centerX,this.mouseY=5*this.centerY}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.centerX=this.width/2,this.centerY=this.height/2}};function m(i,t=!1){if(i[0]===void 0)return"";{let e=i[0].match(t?/^[\w]+:\/{2}([^#?]+)/:/^[\w]+:\/{2}([\w\.:-]+)/);return e==null?"":e[1].replace("www.","")}}function b(i,t){t.parentNode.insertBefore(i,t.nextSibling)}function w(i){let t=document.createElement("div");return t.insertAdjacentHTML("beforeend",i),t}function d(i){return document.getElementById(i)}function l(){return new Promise((i,t)=>{chrome.storage.sync.get(null,e=>{chrome.runtime.lastError!==void 0?t(chrome.runtime.lastError):i(e)})})}function f(i){return new Promise((t,e)=>{chrome.storage.sync.set(i,()=>{chrome.runtime.lastError!==void 0?e(chrome.runtime.lastError):t()})})}function v(i,t,e,n){l().then(o=>{let s=o.intentList,r=new Date;for(let c in s){let a=new Date(c);a<r&&(r=a)}Object.keys(s).length>o.numIntentEntries&&(console.log(`list full, popping ${r.toJSON()}`),delete s[r.toJSON()]),s[t.toJSON()]={intent:i,url:e,accepted:n},f({intentList:s}).then(()=>{console.log(`logged intent "${i}"`)})})}var R=()=>`
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
    `,k=()=>{let i=d("whitelistTime").value,t=d("enableBlobs").checked,e=d("enable3D").checked;f({whitelistTime:i,enableBlobs:t,enable3D:e}).then(()=>{let n=document.getElementById("statusContent");n.textContent="options saved.",setTimeout(()=>{n.textContent=""},1500)})},E=()=>{document.addEventListener("DOMContentLoaded",()=>{l().then(n=>{var o,s;d("whitelistTime").value=n.whitelistTime,d("enableBlobs").checked=(o=n.enableBlobs)!==null&&o!==void 0?o:!0,d("enable3D").checked=(s=n.enable3D)!==null&&s!==void 0?s:!0});let i=document.getElementById("options"),t=document.getElementById("page3button");t.innerText="skip.";let e=w(`
            <div class="text-section">
                <h2>configure.</h2>
                <p>buttons and knobs to customize your reflect experience.</p>
                ${R()}
                <a id="saveButton" class="lt-hover white_button shadow nextPage">save!</a>
            </div>
            `);b(e,i),document.getElementById("saveButton").addEventListener("click",k)})};var S="#576ca8",T="#ff4a47",B="https://getreflect.app/onboarding/",L="http://localhost:1313/onboarding/";D();window.addEventListener("focus",D);function D(){if(window.location.href===B||window.location.href===L){E();return}document.getElementById("reflect-main")||l().then(i=>{if(!i.isEnabled)return;let t=g(),e=m([window.location.href],!0);i.blockedSites.forEach(n=>{(!t.includes(`.${n}`)&&t.includes(n)||e===n)&&!M()&&I()})})}function y(i,t=3e3,e=S){$("#statusContent").css("color",e),$("#statusContent").text(i),$("#statusContent").show().delay(t).fadeOut()}function M(){return["facebook.com/flx","l.facebook.com"].some(t=>window.location.href.includes(t))}function g(){return m([window.location.href])}function I(){l().then(i=>{let t=g();if(t==="")return;let e=i.whitelistedSites;if(!e.hasOwnProperty(t)){p();return}let n=new Date(e[t]),o=new Date;if(o>=n){p();return}let r=n.getTime()-o.getTime();setTimeout(()=>{p()},r)})}function p(){let i=g(),t=chrome.runtime.getURL("res/pages/prompt.html"),e=chrome.runtime.getURL("res/pages/options.html");l().then(n=>{$.get(t,o=>{var s,r;window.stop(),$("html").html(o),_(i),$("#linkToOptions").attr("href",e),(!((s=n.enableBlobs)!==null&&s!==void 0)||s)&&new h((r=n.enable3D)!==null&&r!==void 0?r:!0).animate();let c=document.getElementById("customMessageContent");c.textContent=n.customMessage||"hey! what are you here for?"})})}function _(i){let t=document.forms.namedItem("inputForm"),e=document.getElementById("submitButton");t?.addEventListener("submit",n=>{n.preventDefault(),e?.setAttribute("disabled","disabled");let o=n.target,r=new FormData(o).get("intent").toString();F(r,i)})}function F(i,t){let e=chrome.runtime.connect({name:"intentStatus"});e.postMessage({intent:i,url:window.location.href}),e.onMessage.addListener(n=>{switch(n.status){case"ok":l().then(c=>{let a=c.whitelistTime;y(`got it! ${a} minutes starting now.`,3e3,S),location.reload()});break;case"too_short":x("your response is a little short. be more specific!");break;case"invalid":x("that doesn't seem to be productive. try being more specific.");break}let o=document.getElementById("submitButton");o?.removeAttribute("disabled");let s=n.status==="ok"?"yes":"no";v(i,new Date,t,s),e.disconnect()})}function x(i){$("#inputFields").effect("shake",{times:3,distance:5}),y(i,3e3,T),$("#textbox").val("")}})();
