const CONTROLLER_ACTIONS={light:'Light attack',heavy:'Heavy attack',special:'Special A',specialB:'Special B',super:'Super',throw:'Throw / throw escape',guard:'Guard',jump:'Extra jump button',pause:'Pause / resume'};
let CONTROLLER_MAPS={},controllerMapSlot=1,controllerCapture=null,controllerMapDevice='',controllerInputGates={};
try{
 const saved=JSON.parse(localStorage.getItem('nightbloom_controller_maps')||'{}');
 for(const slot of [1,2])if(saved?.[slot]&&typeof saved[slot]==='object'){
  const clean={};for(const action of Object.keys(CONTROLLER_ACTIONS)){const index=saved[slot][action];if(Number.isInteger(index)&&index>=-1&&index<32)clean[action]=index;}
  if(Object.keys(clean).length)CONTROLLER_MAPS[slot]=clean;
 }
}catch(e){}
function defaultControllerMap(){
 return SYSTEM.controls==='ARCADE'&&gameMode!=='local'?
  {light:2,heavy:3,special:0,specialB:7,super:5,throw:1,guard:4,jump:-1,pause:9}:
  {light:0,heavy:1,special:2,specialB:7,super:3,throw:4,guard:5,jump:-1,pause:9};
}
function controllerActionMap(slot){
 const map={...defaultControllerMap(),...CONTROLLER_MAPS[slot]},seen=new Set();
 for(const value of Object.values(map)){
  if(!Number.isInteger(value)||value<-1||value>=32)return defaultControllerMap();
  if(value>=0){if(value>=12&&value<=15||seen.has(value))return defaultControllerMap();seen.add(value);}
 }
 return map;
}
function rawControllerButtonDown(gp,index){return index>=0&&!!(gp?.buttons[index]?.pressed||gp?.buttons[index]?.value>.5);}
function controllerButtonDown(gp,index){
 const on=rawControllerButtonDown(gp,index),gate=controllerInputGates[gp?.index??0];
 if(gate?.has(index)){if(!on)gate.delete(index);return false;}return on;
}
function gateControllerInputs(){
 controllerInputGates={};
 for(const [i,gp]of Array.from(navigator.getGamepads?.()||[]).entries())if(gp)controllerInputGates[gp.index??i]=new Set(gp.buttons.flatMap((button,index)=>rawControllerButtonDown(gp,index)?[index]:[]));
}
function controllerButtonName(index,gp){
 if(index<0)return 'Unassigned';
 const sony=!/xbox|xinput/i.test(gp?.id||'')&&/dualsense|dualshock|playstation|054c|wireless controller/i.test(gp?.id||'');
 const names=sony?['Cross','Circle','Square','Triangle','L1','R1','L2','R2','Create','Options','L3','R3','D-pad Up','D-pad Down','D-pad Left','D-pad Right','PS','Touchpad']:
  ['A','B','X','Y','LB','RB','LT','RT','View','Start','L3','R3','D-pad Up','D-pad Down','D-pad Left','D-pad Right','Home'];
 return names[index]||'Button '+(index+1);
}
function controllerBindingLabel(slot,action){
 const gp=navigator.getGamepads?.()[slot-1];return controllerButtonName(controllerActionMap(slot)[action],gp);
}
function saveControllerMaps(){
 try{localStorage.setItem('nightbloom_controller_maps',JSON.stringify(CONTROLLER_MAPS));return true;}catch(e){return false;}
}
function assignControllerButton(slot,action,index){
 if(!(action in CONTROLLER_ACTIONS)||!Number.isInteger(index)||index<0||index>=32||index>=12&&index<=15)return {ok:false,message:'The D-pad stays assigned to movement. Choose another button.'};
 const map=controllerActionMap(slot),old=map[action],conflict=Object.keys(CONTROLLER_ACTIONS).find(other=>other!==action&&map[other]===index);
 if(conflict)map[conflict]=old;
 map[action]=index;CONTROLLER_MAPS[slot]=map;const saved=saveControllerMaps();
 return {ok:true,conflict,saved};
}
function renderControllerMapping(){
 const gp=navigator.getGamepads?.()[controllerMapSlot-1],rows=document.getElementById('controllerMapRows');
 controllerMapDevice=gp?.id||'';
 document.getElementById('controllerMapPlayer').textContent='Editing Player '+controllerMapSlot+' · switch player';
 document.getElementById('controllerMapDevice').textContent=gp?'Connected: '+gp.id:'No controller detected for Player '+controllerMapSlot+'. Connect it and press a button.';
 rows.replaceChildren();
 for(const [action,label]of Object.entries(CONTROLLER_ACTIONS)){
  const row=document.createElement('div'),name=document.createElement('span'),button=document.createElement('button');
  row.className='controller-map-row';name.textContent=label;button.type='button';button.textContent=controllerBindingLabel(controllerMapSlot,action);
  button.setAttribute('aria-label','Change '+label+' for Player '+controllerMapSlot);
  button.dataset.controllerAction=action;
  button.addEventListener('click',()=>beginControllerCapture(action));row.append(name,button);rows.append(row);
 }
}
function openControllerMapping(){
 controllerCapture=null;controllerMapSlot=1;renderControllerMapping();
 document.getElementById('controllerMapStatus').textContent='Choose an action, then press the controller button you want.';
 openGameModal(document.getElementById('controllerMapping'),()=>{controllerCapture=null;});
}
function beginControllerCapture(action){
 const gp=navigator.getGamepads?.()[controllerMapSlot-1];
 controllerCapture={action,previous:gp?gp.buttons.map((b,i)=>rawControllerButtonDown(gp,i)):[]};
 const button=document.querySelector('[data-controller-action="'+action+'"]');if(button){button.textContent='Press a button…';button.setAttribute('aria-pressed','true');}
 document.getElementById('controllerMapStatus').textContent='Press a button for '+CONTROLLER_ACTIONS[action]+'. Escape cancels.';
}
function pollControllerMapping(){
 const gp=navigator.getGamepads?.()[controllerMapSlot-1],capture=controllerCapture;
 if(!capture){if((gp?.id||'')!==controllerMapDevice)renderControllerMapping();return false;}
 if(!gp)return true;
 const buttons=gp.buttons.map((b,i)=>rawControllerButtonDown(gp,i));
 const index=buttons.findIndex((on,i)=>on&&!capture.previous[i]);capture.previous=buttons;
 if(index<0)return true;
 const result=assignControllerButton(controllerMapSlot,capture.action,index);
 if(!result.ok){document.getElementById('controllerMapStatus').textContent=result.message;return true;}
 controllerCapture=null;renderControllerMapping();
 const swapped=result.conflict?' Swapped with '+CONTROLLER_ACTIONS[result.conflict]+'.':'';
 document.getElementById('controllerMapStatus').textContent=CONTROLLER_ACTIONS[capture.action]+' assigned to '+controllerButtonName(index,gp)+'.'+swapped+(result.saved?' Saved.':' Works now, but browser storage could not save it.');
 document.querySelector('[data-controller-action="'+capture.action+'"]')?.focus();
 // The captured press must not also activate a dialog button or the game.
 modalPad={confirm:!!gp.buttons[0]?.pressed,cancel:!!gp.buttons[1]?.pressed};clearInputs();
 return true;
}
document.getElementById('controllerMapOpen').addEventListener('click',openControllerMapping);
document.getElementById('controllerMapPlayer').addEventListener('click',()=>{controllerCapture=null;controllerMapSlot=controllerMapSlot===1?2:1;renderControllerMapping();});
document.getElementById('controllerMapReset').addEventListener('click',()=>{
 controllerCapture=null;delete CONTROLLER_MAPS[controllerMapSlot];const saved=saveControllerMaps();renderControllerMapping();
 document.getElementById('controllerMapStatus').textContent='Player '+controllerMapSlot+' defaults restored.'+(saved?'':' Browser storage could not save this change.');
});
document.getElementById('controllerMapDone').addEventListener('click',()=>closeGameModal(false));
