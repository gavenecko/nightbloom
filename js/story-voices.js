/* Optional Gaven Echoes dialogue reader. No model or remote engine loads until requested. */
(function(global){
 'use strict';
 const assignments={"VAMPIRA":"bf_alice","NEKOMATA":"af_bella","ARACHNE":"bf_emma","LIVING DOLL":"af_nicole","NARRATOR":"bf_lily","BANSHEE":"bf_isabella","MEDUSA":"af_kore","JIANGSHI":"af_nicole","YUREI":"af_aoede","DULLAHAN":"bf_lily","WEREWOLF":"af_kore","MUMMY":"bf_emma","WITCH":"af_sky"};
 const castProfiles={"VAMPIRA":{"id":"vampira","name":"VAMPIRA","voice":"bf_alice","delivery":"natural","effect":"clean","speed":1,"pitchSemitones":0,"echo":0,"volume":1},"NEKOMATA":{"id":"nekomata","name":"NEKOMATA","voice":"af_bella","delivery":"natural","effect":"clean","speed":1,"pitchSemitones":0,"echo":0,"volume":1},"ARACHNE":{"id":"arachne","name":"ARACHNE","voice":"bf_emma","delivery":"natural","effect":"clean","speed":1,"pitchSemitones":0,"echo":0,"volume":1},"LIVING DOLL":{"id":"living-doll","name":"LIVING DOLL","voice":"af_nicole","delivery":"natural","effect":"clean","speed":1,"pitchSemitones":0,"echo":0,"volume":1},"NARRATOR":{"id":"narrator","name":"NARRATOR","voice":"bf_lily","delivery":"natural","effect":"clean","speed":1,"pitchSemitones":0,"echo":0,"volume":1},"BANSHEE":{"id":"banshee","name":"BANSHEE","voice":"bf_isabella","delivery":"natural","effect":"clean","speed":0.88,"pitchSemitones":0,"echo":0.1,"filterHz":9000,"volume":1},"MEDUSA":{"id":"medusa","name":"MEDUSA","voice":"af_kore","delivery":"natural","effect":"clean","speed":0.92,"pitchSemitones":-1,"echo":0,"filterHz":9000,"volume":1},"JIANGSHI":{"id":"jiangshi","name":"JIANGSHI","voice":"af_nicole","delivery":"natural","effect":"clean","speed":0.86,"pitchSemitones":-0.8,"echo":0,"filterHz":9000,"volume":1},"YUREI":{"id":"yurei","name":"YUREI","voice":"af_aoede","delivery":"natural","effect":"clean","speed":0.96,"pitchSemitones":0.8,"echo":0.1,"filterHz":9000,"volume":1},"DULLAHAN":{"id":"dullahan","name":"DULLAHAN","voice":"bf_lily","delivery":"natural","effect":"clean","speed":0.95,"pitchSemitones":-1.2,"echo":0,"filterHz":9000,"volume":1},"WEREWOLF":{"id":"werewolf","name":"WEREWOLF","voice":"af_kore","delivery":"natural","effect":"clean","speed":0.93,"pitchSemitones":-2,"echo":0,"filterHz":9000,"volume":1},"MUMMY":{"id":"mummy","name":"MUMMY","voice":"bf_emma","delivery":"natural","effect":"clean","speed":0.88,"pitchSemitones":-1,"echo":0,"filterHz":9000,"volume":1},"WITCH":{"id":"witch","name":"WITCH","voice":"af_sky","delivery":"natural","effect":"clean","speed":1.12,"pitchSemitones":0.2,"echo":0,"filterHz":9000,"volume":1}};
 const overrides={};
 let engine=null,loading=null,ready=false,token=0,busy=false,auto=false,sceneKey='',lines=[],finishCurrent=null;
 let recordedLoading=null,recordedData=null,recordedIndex=null,activeAudio=null;
 let getVolume=()=>1,onBusy=()=>{},onAutoChange=setAuto;
 const el=id=>document.getElementById(id),supported=()=>!!(global.speechSynthesis&&global.SpeechSynthesisUtterance);
 function status(text){el('voiceStatus').textContent=text;}
 function setBusy(value){busy=value;el('voiceRead').disabled=value||!lines.length;el('voiceStop').disabled=!value;onBusy();}
 function refreshVolume(){if(activeAudio)activeAudio.volume=Math.max(0,Math.min(1,getVolume()));}
 function syncAutoButton(){el('voiceAuto').textContent='Auto-read: '+(auto?'On':'Off');el('voiceAuto').setAttribute('aria-pressed',String(auto));}
 function setAuto(enabled){auto=enabled;syncAutoButton();if(auto&&lines.length)void read();else stop();}
 function stop(){token++;const finish=finishCurrent;finishCurrent=null;if(activeAudio){activeAudio.onended=activeAudio.onerror=null;activeAudio.pause();activeAudio.removeAttribute('src');activeAudio.load();activeAudio=null;}engine?.stop();global.speechSynthesis?.cancel();finish?.();setBusy(false);}
 async function recordedClip(line){
  if(!global.fetch||!global.Audio)return null;
  if(!recordedLoading)recordedLoading=global.fetch('assets/audio/story-v1/manifest.json?v=4').then(response=>{if(!response.ok)throw Error('Recordings unavailable');return response.json()}).then(data=>{if(!data.complete||!Array.isArray(data.clips))throw Error('Recordings incomplete');recordedData=data;recordedIndex=new Map(data.clips.map(clip=>[JSON.stringify([clip.speaker,clip.text]),clip]));}).catch(()=>{});
  await recordedLoading;
  if(!recordedIndex)return null;
  const profile=recordedData.profiles?.[line.speaker];
  for(const field of ['voice','delivery','effect','speed','pitchSemitones','echo','filterHz'])if(overrides[line.speaker]?.[field]!==undefined&&overrides[line.speaker][field]!==profile?.[field])return null;
  return recordedIndex.get(JSON.stringify([line.speaker,line.text]))||null;
 }
 function recordedLine(clip,current){return new Promise((resolve,reject)=>{
  if(current!==token)return resolve();const player=new global.Audio();activeAudio=player;player.preload='none';player.volume=Math.max(0,Math.min(1,getVolume()));player.src=clip.src;
  finishCurrent=resolve;player.onended=()=>{if(current===token){finishCurrent=null;activeAudio=null;}resolve()};player.onerror=()=>{if(activeAudio===player)activeAudio=null;current===token?reject(Error('Recording could not play.')):resolve()};
  player.play().catch(error=>{if(activeAudio===player)activeAudio=null;reject(error)});
 });}
 function loadScript(src){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('Voice engine could not load.'))};document.head.appendChild(script);});}
 async function loadNeural(){
  if(ready)return;if(loading)return loading;
  const button=el('voiceLoad');button.disabled=true;status('Downloading neural voices…');
  loading=(async()=>{
   if(!global.GavenVoiceEngine)await loadScript('https://gavenecko.com/voice-engine-v0794.js?v=794');
   if(!global.GavenNeuralVoiceEngine)await loadScript('https://gavenecko.com/neural-voice-engine-v0794.js?v=794');
   engine=new global.GavenNeuralVoiceEngine({allowDeviceFallback:false});
   for(const [name,voice]of Object.entries(assignments))engine.addProfile(name,{name,voice,delivery:'natural',effect:'clean',pitchSemitones:0,speed:1,echo:0,volume:1,...castProfiles[name],...overrides[name]});
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
  try{for(const line of sequence){if(current!==token)break;const clip=await recordedClip(line);if(current!==token)break;
   let played=false;if(clip){status('Recorded voice · '+line.speaker);try{await recordedLine(clip,current);played=true}catch(error){/* Retain reading when a recording is unavailable. */}}
   if(current!==token)break;if(!played){status((ready?'Neural voice · ':'Device voice · ')+line.speaker);if(ready){try{await neuralLine(line,current)}catch(error){if(current===token)await deviceLine(line,current)}}else await deviceLine(line,current);}}
   if(current===token)status('Finished. Continue whenever you are ready.');
  }catch(error){if(current===token)status('Voice playback unavailable. You can still read the dialog.');}
  finally{if(current===token){finishCurrent=null;setBusy(false);}}
 }
 function update(key,nextLines){
  if(busy&&getVolume()<=0){stop();status('Voice stopped while muted.');}
  if(key===sceneKey)return;stop();sceneKey=key;lines=nextLines||[];el('voiceTools').hidden=!lines.length;setBusy(false);
  status(auto?'Dialogue auto-play is on.':'Dialogue auto-play is off. Use Read dialog to listen.');
  if(auto&&lines.length)void read();
 }
 function configure(options={}){
  getVolume=options.getVolume||getVolume;onBusy=options.onBusy||onBusy;
  auto=options.auto??auto;onAutoChange=options.onAutoChange||onAutoChange;syncAutoButton();
  el('voiceRead').addEventListener('click',()=>void read());el('voiceStop').addEventListener('click',()=>{stop();status('Stopped.');});el('voiceLoad').addEventListener('click',()=>void loadNeural());
  el('voiceAuto').addEventListener('click',()=>onAutoChange(!auto));
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
 global.NightbloomVoices={configure,update,read,stop,setAuto,refreshVolume,loadNeural,importProfiles,get speaking(){return busy},get ready(){return ready}};
})(window);
