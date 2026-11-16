let gameModal=null,gameModalClose=null,modalMusicDuck=1,modalPad={};
const touchKeys={},touchSources=new Map();
function openGameModal(dialog,onClose){
 if(gameModal)return;
 clearInputs();NightbloomCombatVoices?.stop();NightbloomVoices?.stop();
 gameModal=dialog;gameModalClose=onClose;window.nightbloomModalOpen=true;
 modalMusicDuck=musicDuck;musicDuck=.2;applyAudioLevels();modalPad={};
 const pad=navigator.getGamepads?.()[0];if(pad)modalPad={confirm:!!pad.buttons[0]?.pressed,cancel:!!pad.buttons[1]?.pressed};
 dialog.showModal();dialog.querySelector('button')?.focus();
}
function closeGameModal(confirmed=false){
 if(!gameModal)return;
 const dialog=gameModal,callback=gameModalClose;gameModal=null;gameModalClose=null;
 dialog.close();window.nightbloomModalOpen=false;clearInputs();if(typeof gateControllerInputs==='function')gateControllerInputs();musicDuck=modalMusicDuck;applyAudioLevels();
 callback?.(confirmed);contextHelpKey='';c.focus();
}
function requestTitleExit(){
 openGameModal(document.getElementById('quitConfirm'),confirmed=>{
  if(!confirmed)return;
  HAUNTED_FINALE=null;relicBonus=null;paused=false;focusPaused=false;storyLost=false;storyEnding=false;
  gameState='title';charSelectPhase='p1';menuIndex=ROSTER.indexOf(playerChoice);musicDuck=1;applyAudioLevels();
 });
}
function pollGameModal(){
 if(gameModal?.id==='controllerMapping'&&pollControllerMapping())return;
 const gp=navigator.getGamepads?.()[0];if(!gp)return;
 const next={confirm:!!gp.buttons[0]?.pressed,cancel:!!gp.buttons[1]?.pressed,left:gp.axes[0]<-.5||!!gp.buttons[14]?.pressed,right:gp.axes[0]>.5||!!gp.buttons[15]?.pressed,up:gp.axes[1]<-.5||!!gp.buttons[12]?.pressed,down:gp.axes[1]>.5||!!gp.buttons[13]?.pressed};
 if(next.cancel&&!modalPad.cancel){closeGameModal(false);return;}
 if(next.confirm&&!modalPad.confirm){document.activeElement?.click();modalPad=next;return;}
 if((next.left&&!modalPad.left)||(next.right&&!modalPad.right)||(next.up&&!modalPad.up)||(next.down&&!modalPad.down)){
  const buttons=[...gameModal.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);
  buttons[(i+(next.right||next.down?1:-1)+buttons.length)%buttons.length]?.focus();
 }
 modalPad=next;
}
for(const id of ['quitConfirm','courseSummary','controllerMapping']){
 const dialog=document.getElementById(id);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeGameModal(false);});
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();const buttons=[...dialog.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);
   buttons[(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length]?.focus();
  }
 });
}
document.getElementById('quitCancel').addEventListener('click',()=>closeGameModal(false));
document.getElementById('quitAccept').addEventListener('click',()=>closeGameModal(true));
document.getElementById('courseSummaryContinue').addEventListener('click',()=>closeGameModal(false));
document.getElementById('courseSummaryOpen').addEventListener('click',()=>showCourseSummary());

function touchDirectionKeys(dx,dy,radius){
 const dead=radius*.24,out=[];
 if(dx<-dead)out.push('KeyA');if(dx>dead)out.push('KeyD');
 if(dy<-dead)out.push('KeyW');if(dy>dead)out.push('KeyS');return out;
}
function syncTouchInputs(){
 const next=new Set([...touchSources.values()].flatMap(set=>[...set]));
 for(const key of new Set([...Object.keys(touchKeys),...next])){
  const on=next.has(key);if(on&&!touchKeys[key]&&!keys[key])pressed[key]=1;
  touchKeys[key]=on;keys[key]=on||!!kbKeys[key]||!!padKeys[key];
 }
}
function releaseTouchControls(){
 touchSources.clear();
 for(const key of Object.keys(touchKeys)){touchKeys[key]=false;keys[key]=!!kbKeys[key]||!!padKeys[key];}
 const knob=document.getElementById('touchKnob');if(knob)knob.style.transform='translate(-50%,-50%)';
}
let touchMode='AUTO',touchView='';
try{const saved=localStorage.getItem('nightbloom_touch');if(['AUTO','ON','OFF'].includes(saved))touchMode=saved;}catch(e){}
const touchModeSelect=document.getElementById('touchMode');touchModeSelect.value=touchMode;
touchModeSelect.addEventListener('change',()=>{
 touchMode=touchModeSelect.value;try{localStorage.setItem('nightbloom_touch',touchMode)}catch(e){}
 touchView='';releaseTouchControls();updateTouchPresentation();
});
function updateTouchPresentation(){
 const enabled=touchMode==='ON'||touchMode==='AUTO'&&(window.matchMedia?.('(pointer: coarse)').matches||navigator.maxTouchPoints>0);
 document.body.classList.toggle('touch-layout',!!enabled);
 const combat=gameState==='fight'||gameState==='relicBonus',view=[enabled,combat,!!gameModal].join('|');
 if(view===touchView)return;touchView=view;
 const root=document.getElementById('touchControls');root.hidden=!enabled||!!gameModal;
 document.getElementById('touchAttacks').hidden=!combat;
 document.documentElement.style.setProperty('--touch-space',enabled&&!gameModal?(combat?'160px':'100px'):'0px');
 if(!enabled||gameModal)releaseTouchControls();
}
const stick=document.getElementById('touchStick');
function moveStick(event){
 const rect=stick.getBoundingClientRect(),radius=rect.width*.4;
 let dx=event.clientX-rect.left-rect.width/2,dy=event.clientY-rect.top-rect.height/2,length=Math.hypot(dx,dy);
 if(length>radius){dx*=radius/length;dy*=radius/length;}
 touchSources.set('stick:'+event.pointerId,new Set(touchDirectionKeys(dx,dy,radius)));syncTouchInputs();
 document.getElementById('touchKnob').style.transform='translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px))';
}
let stickPointer=null;
stick.addEventListener('pointerdown',event=>{
 if(stickPointer!==null)return;event.preventDefault();stickPointer=event.pointerId;stick.setPointerCapture(event.pointerId);c.focus();moveStick(event);
});
stick.addEventListener('pointermove',event=>{if(event.pointerId===stickPointer){event.preventDefault();moveStick(event);}});
function releasePointer(event){
 touchSources.delete('button:'+event.pointerId);touchSources.delete('stick:'+event.pointerId);
 if(event.pointerId===stickPointer){stickPointer=null;document.getElementById('touchKnob').style.transform='translate(-50%,-50%)';}
 syncTouchInputs();
}
for(const button of document.querySelectorAll('[data-touch-key]')){
 button.addEventListener('pointerdown',event=>{
  event.preventDefault();button.setPointerCapture(event.pointerId);c.focus();
  touchSources.set('button:'+event.pointerId,new Set([button.dataset.touchKey]));syncTouchInputs();
 });
 button.addEventListener('pointerup',releasePointer);button.addEventListener('pointercancel',releasePointer);button.addEventListener('lostpointercapture',releasePointer);
}
stick.addEventListener('pointerup',releasePointer);stick.addEventListener('pointercancel',releasePointer);stick.addEventListener('lostpointercapture',releasePointer);
addEventListener('blur',()=>{stickPointer=null;releaseTouchControls();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stickPointer=null;releaseTouchControls();}});
