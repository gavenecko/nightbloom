/* Keep the canvas, touch controls and dialogs together in fullscreen. */
let fullscreenBusy=false,fullscreenWasActive=false,fullscreenExitGuard=0;
const fullscreenButton=document.getElementById('fullscreenButton'),fullscreenStatus=document.getElementById('fullscreenStatus');
function nativeGameFullscreen(){return !!(document.fullscreenElement||document.webkitFullscreenElement);}
function expandedGameView(){return document.body.classList.contains('expanded-game');}
function refreshFullscreenButton(){
 const native=nativeGameFullscreen(),expanded=expandedGameView(),active=native||expanded;
 if(fullscreenWasActive&&!active)fullscreenExitGuard=performance.now()+450;
 fullscreenWasActive=active;
 fullscreenButton.textContent=native?'Exit fullscreen':expanded?'Exit expanded view':'Fullscreen';
 fullscreenButton.setAttribute('aria-label',native?'Exit fullscreen':expanded?'Exit expanded view':'Enter fullscreen');
 fullscreenButton.setAttribute('aria-pressed',String(active));fullscreenButton.disabled=fullscreenBusy;
}
async function toggleGameFullscreen(){
 if(fullscreenBusy)return;fullscreenBusy=true;fullscreenStatus.textContent='';
 try{
  if(nativeGameFullscreen()){
   const exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);
  }else if(expandedGameView()){document.body.classList.remove('expanded-game');}
  else{
   const root=document.documentElement,request=root.requestFullscreen||root.webkitRequestFullscreen;
   if(request&&document.fullscreenEnabled!==false){
    try{await request.call(root);}catch(error){
     document.body.classList.add('expanded-game');
     fullscreenStatus.textContent='Expanded view enabled. This browser or game embed does not allow browser fullscreen.';
    }
   }else{
    document.body.classList.add('expanded-game');
    fullscreenStatus.textContent='Expanded view enabled. Your browser bars may remain visible.';
   }
  }
 }catch(error){
  fullscreenStatus.textContent='Fullscreen could not be changed. Try your browser’s fullscreen control.';
 }finally{
  fullscreenBusy=false;refreshFullscreenButton();
  if(typeof clearInputs==='function')clearInputs();if(typeof c!=='undefined')c.focus();
 }
}
function consumeFullscreenEscape(){
 if(nativeGameFullscreen()||expandedGameView()){void toggleGameFullscreen();return true;}
 return performance.now()<fullscreenExitGuard;
}
fullscreenButton.addEventListener('click',()=>{void toggleGameFullscreen();});
document.addEventListener('fullscreenchange',refreshFullscreenButton);
document.addEventListener('webkitfullscreenchange',refreshFullscreenButton);
addEventListener('keydown',event=>{
 if(event.code!=='KeyF'||event.repeat||event.ctrlKey||event.metaKey||event.altKey||window.nightbloomModalOpen||window.nightbloomDebugOpen)return;
 if(event.target.closest?.('input,select,textarea,button,[contenteditable="true"]'))return;
 event.preventDefault();void toggleGameFullscreen();
});
refreshFullscreenButton();
