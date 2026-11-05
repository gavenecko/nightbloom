// Approved Chatterbox recordings. No speech engine or model runs in the browser.
(()=>{
 const ROOT='assets/audio/combat-model-roster-v1/';
 const cast=new Set(['VAMPIRA','NEKOMATA','BANSHEE','MEDUSA','JIANGSHI','YUREI','DULLAHAN','WEREWOLF','MUMMY','WITCH','ARACHNE','LIVING DOLL']);
 const clips=new Map(),cooldowns=new Map();let current=null,enabled=false,pair='',victoryPlayed=false;
 let config={getVolume:()=>0};
 const volume=()=>Math.max(0,Math.min(1,Number(config.getVolume())||0));
 function stop(){if(current){const old=current;current=null;old.audio.pause();old.audio.currentTime=0;}}
 function refreshVolume(){const v=volume();if(!v)stop();else if(current)current.audio.volume=v;}
 function prepare(names){
  const chosen=[...new Set(names.filter(n=>cast.has(n)))].sort(),key=chosen.join('|');if(pair===key)return;
  stop();pair=key;cooldowns.clear();victoryPlayed=false;
  for(const a of clips.values()){a.pause();a.removeAttribute('src');a.load();}clips.clear();
  for(const name of chosen)for(let i=1;i<=4;i++){
   const a=new window.Audio();a.preload='auto';a.src=ROOT+name.toLowerCase().replaceAll(' ','-')+'-'+i+'.mp3';a.load();clips.set(name+':'+i,a);
  }
 }
 function play(name,index,priority,side,cooldown){
  if(!enabled||!volume())return false;
  const a=clips.get(name+':'+index),now=performance.now(),key=(side||name)+':'+(priority===2?'pain':'attack');
  // Drop unloaded cues rather than letting a network delay play stale attacks.
  if(!a||a.readyState<2||a.error)return false;
  if(priority<3&&(now<(cooldowns.get(key)||0)||(current&&current.priority>=priority)))return false;
  stop();const entry={audio:a,priority};current=entry;a.volume=volume();a.currentTime=0;
  a.onended=a.onerror=()=>{if(current===entry)current=null;};
  cooldowns.set(key,now+cooldown);
  try{const pending=a.play();if(pending&&pending.catch)pending.catch(()=>{if(current===entry){a.pause();current=null;}});}catch(e){if(current===entry)current=null;return false;}
  return true;
 }
 function event(type,data={}){
  if(type==='round_start'){stop();cooldowns.clear();victoryPlayed=false;return;}
  if(!enabled)return;
  if(type==='match_end'){
   if(victoryPlayed)return;victoryPlayed=true;stop();play(data.winner,2,3,data.winnerSide,0);return;
  }
  if(victoryPlayed)return;
  if(type==='attack'){
   if(data.move==='super')return; // super_start already supplies this call.
   const special=['specialA','specialB','throw'].includes(data.move);
   play(data.fighter,special?1:3,special?1:0,data.fighterSide,special?2400:1600);
  }else if(type==='super_start')play(data.fighter,1,1,data.fighterSide,2400);
  else if(type==='hit')play(data.defender,4,2,data.defenderSide,1800);
 }
 function update({active,paused=false,fighters=[]}){
  enabled=!!active&&!paused;
  if(active)prepare(fighters);
  if(!enabled)stop();else refreshVolume();
 }
 window.NightbloomCombatVoices={configure(options){config={...config,...options};},update,event,stop,refreshVolume};
})();
