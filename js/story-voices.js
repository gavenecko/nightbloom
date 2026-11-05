/* Optional Gaven Echoes dialogue reader. No model or remote engine loads until requested. */
(function(global){
 'use strict';
 const assignments={NARRATOR:'af_sarah',VAMPIRA:'bf_alice',NEKOMATA:'af_nova',BANSHEE:'af_aoede',MEDUSA:'bf_isabella',JIANGSHI:'af_kore',YUREI:'af_nicole',DULLAHAN:'bf_lily',WEREWOLF:'af_alloy',MUMMY:'bf_emma',WITCH:'af_jessica',ARACHNE:'af_heart','LIVING DOLL':'af_bella'};
 const overrides={};
 let engine=null,loading=null,ready=false,token=0,busy=false,auto=false,sceneKey='',lines=[],finishCurrent=null;
 let getVolume=()=>1,onBusy=()=>{};
 const el=id=>document.getElementById(id),supported=()=>!!(global.speechSynthesis&&global.SpeechSynthesisUtterance);
 function status(text){el('voiceStatus').textContent=text;}
 function setBusy(value){busy=value;el('voiceRead').disabled=value||!lines.length;el('voiceStop').disabled=!value;onBusy();}
 function stop(){token++;const finish=finishCurrent;finishCurrent=null;engine?.stop();global.speechSynthesis?.cancel();finish?.();setBusy(false);}
 function loadScript(src){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('Voice engine could not load.'))};document.head.appendChild(script);});}
 async function loadNeural(){
  if(ready)return;if(loading)return loading;
  const button=el('voiceLoad');button.disabled=true;status('Downloading neural voices…');
  loading=(async()=>{
   if(!global.GavenVoiceEngine)await loadScript('https://gavenecko.com/voice-engine-v0794.js?v=794');
   if(!global.GavenNeuralVoiceEngine)await loadScript('https://gavenecko.com/neural-voice-engine-v0794.js?v=794');
   engine=new global.GavenNeuralVoiceEngine({allowDeviceFallback:false});
   for(const [name,voice]of Object.entries(assignments))engine.addProfile(name,{name,voice,delivery:'natural',effect:'clean',pitchSemitones:0,speed:1,echo:0,volume:1,...overrides[name]});
   await engine.loadModel('memory',progress=>{if(progress?.progress!=null)status('Downloading neural voices… '+Math.round(progress.progress)+'%');});
   ready=true;button.textContent='Neural voices ready';status('Gaven Echoes neural voices ready.');
  })().catch(()=>{status('Neural download unavailable. Device reading is still available.');button.disabled=false;button.textContent='Retry neural download';}).finally(()=>{loading=null;});
  return loading;
 }
 function deviceLine(line,current){return new Promise((resolve,reject)=>{
  if(!supported())return reject(Error('Device speech is unavailable.'));
  if(current!==token)return resolve();
  const utterance=new global.SpeechSynthesisUtterance(line.text);utterance.lang='en-US';utterance.rate=.98;utterance.volume=Math.max(0,Math.min(1,getVolume()));
  const voices=global.speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));const index=Object.keys(assignments).indexOf(line.speaker);if(voices.length)utterance.voice=voices[Math.max(0,index)%voices.length];
  finishCurrent=resolve;utterance.onend=()=>{if(current===token)finishCurrent=null;resolve()};utterance.onerror=()=>{if(current===token)finishCurrent=null;current!==token?resolve():reject(Error('Speech stopped.'))};global.speechSynthesis.speak(utterance);
 });}
 async function neuralLine(line,current){
  const result=await engine.generate(line.speaker in assignments?line.speaker:'NARRATOR',line.text);
  if(current!==token||!getVolume())return;
  await new Promise((resolve,reject)=>{finishCurrent=resolve;engine.playGenerated(result,{volume:getVolume(),onend:()=>{if(current===token)finishCurrent=null;resolve()}}).catch(reject);});
 }
 async function read(){
  stop();if(!lines.length)return;if(getVolume()<=0){status('Unmute audio to hear the dialog.');return;}
  const current=token,sequence=lines.map(line=>({...line}));setBusy(true);
  try{for(const line of sequence){if(current!==token)break;status((ready?'Neural voice · ':'Device voice · ')+line.speaker);if(ready){try{await neuralLine(line,current)}catch(error){if(current===token)await deviceLine(line,current)}}else await deviceLine(line,current);}
   if(current===token)status('Finished. Continue whenever you are ready.');
  }catch(error){if(current===token)status('Voice playback unavailable. You can still read the dialog.');}
  finally{if(current===token){finishCurrent=null;setBusy(false);}}
 }
 function update(key,nextLines){
  if(busy&&getVolume()<=0){stop();status('Voice stopped while muted.');}
  if(key===sceneKey)return;stop();sceneKey=key;lines=nextLines||[];el('voiceTools').hidden=!lines.length;setBusy(false);
  status(ready?'Neural voices ready.':supported()?'Device reading available. Neural model download is optional.':'Load neural voices to enable dialog reading.');
  if(auto&&lines.length)void read();
 }
 function configure(options={}){
  getVolume=options.getVolume||getVolume;onBusy=options.onBusy||onBusy;
  el('voiceRead').addEventListener('click',()=>void read());el('voiceStop').addEventListener('click',()=>{stop();status('Stopped.');});el('voiceLoad').addEventListener('click',()=>void loadNeural());
  el('voiceAuto').addEventListener('click',()=>{auto=!auto;el('voiceAuto').textContent='Auto-read: '+(auto?'On':'Off');el('voiceAuto').setAttribute('aria-pressed',String(auto));if(auto)void read();else stop();});
  el('voiceImport').addEventListener('click',()=>el('voiceProfileFile').click());
  el('voiceProfileFile').addEventListener('change',async event=>{try{const file=event.target.files?.[0];if(!file)return;if(file.size>1000000)throw Error('Profile file too large.');const count=importProfiles(JSON.parse(await file.text()));status('Imported '+count+' neural voice profiles. Load neural voices to use them.');}catch(error){status('Use a Gaven Echoes voice export with profiles named after the fighters.');}finally{event.target.value='';}});
  global.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 }
 function importProfiles(data){
  if(data?.format!=='gaven-neural-character-voices'||!Array.isArray(data.profiles)||data.profiles.length>1000)throw Error('Invalid voice profile export.');
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');let count=0;const accepted=[];
  for(const profile of data.profiles){const name=Object.keys(assignments).find(name=>normalize(name)===normalize(profile.id)||normalize(name)===normalize(profile.name));if(!name)continue;
   const clean={};for(const field of ['voice','delivery','effect'])if(typeof profile[field]==='string')clean[field]=profile[field].slice(0,80);
   for(const [field,min,max]of [['speed',.5,2],['pitchSemitones',-12,12],['echo',0,.6],['volume',0,1],['filterHz',100,20000]])if(Number.isFinite(profile[field]))clean[field]=Math.max(min,Math.min(max,profile[field]));accepted.push([name,clean]);count++;
  }if(!count)throw Error('No matching fighter names.');stop();for(const [name,clean]of accepted){overrides[name]=clean;if(engine)engine.addProfile(name,{...engine.getProfile(name),...clean});}return count;
 }
 global.NightbloomVoices={configure,update,read,stop,loadNeural,importProfiles,get speaking(){return busy},get ready(){return ready}};
})(window);
