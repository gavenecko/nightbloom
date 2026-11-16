const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'js/story-voices.js'),'utf8'),secret=fs.readFileSync(path.join(root,'js/secret-fighters.js'),'utf8'),manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/story-v1/manifest.json'),'utf8'));
const definitions={};vm.createContext(definitions);vm.runInContext(secret.slice(secret.indexOf('const SECRET_CHALLENGES='),secret.indexOf('const SECRET_ART='))+'globalThis.challenges=SECRET_CHALLENGES;',definitions);
for(const challenge of Object.values(definitions.challenges)){
 const clip=manifest.clips.find(c=>c.speaker==='NARRATOR'&&c.text===challenge.before);assert.ok(clip,'Missing challenger narration');assert.ok(fs.statSync(path.join(root,clip.src)).size>0);assert.equal(manifest.profiles.NARRATOR.voice,'bf_lily');
}
const elements=new Map(),played=[];let deviceCalls=0,failPlayback=false;
const element=id=>{if(!elements.has(id))elements.set(id,{textContent:'',setAttribute(){},addEventListener(){}});return elements.get(id)};
const window={fetch:async()=>({ok:true,json:async()=>manifest}),addEventListener(){},speechSynthesis:{cancel(){},speak(){deviceCalls++}},SpeechSynthesisUtterance:class{},Audio:class{play(){played.push(this.src);if(failPlayback)return Promise.reject(Error('Network failure'));setImmediate(()=>this.onended?.());return Promise.resolve()}pause(){}load(){}removeAttribute(){}}};
const context={window,document:{getElementById:element,addEventListener(){}}};vm.createContext(context);vm.runInContext(source,context);
(async()=>{
 const api=window.NightbloomVoices;api.configure({auto:false,getVolume:()=>.74});
 api.update('challenger',[{speaker:'NARRATOR',text:definitions.challenges.ARACHNE.before}]);await api.read();assert.equal(played.length,1);assert.match(played[0],/narrator-/);assert.equal(api.speaking,false);
 api.update('missing',[{speaker:'NARRATOR',text:'Unrecorded line'},{speaker:'NARRATOR',text:definitions.challenges.NARRATOR.before}]);await api.read();assert.equal(played.length,2);assert.equal(deviceCalls,0);assert.match(element('voiceStatus').textContent,/unavailable/);
 failPlayback=true;api.update('failed',[{speaker:'NARRATOR',text:definitions.challenges.ARACHNE.before}]);await api.read();assert.equal(deviceCalls,0);assert.equal(api.speaking,false);
 const calls=[],canvas={globalAlpha:1,save(){},restore(){},translate(){}};
 const fx={NightbloomPaintedFX:{draw:(c,key)=>{calls.push(key);return false}}};fx.globalThis=fx;vm.createContext(fx);vm.runInContext(fs.readFileSync(path.join(root,'js/combat-fx.js'),'utf8'),fx);
 fx.NightbloomFX.status(canvas,{name:'JIANGSHI',x:200,y:430,armor:10},0,{reducedMotion:true});assert.deepEqual(calls,['jiangshi-a']);
 // No procedural Canvas methods exist in this mock: unloaded painted spells must not fall through to placeholder geometry.
 fx.NightbloomFX.draw(canvas,'seal',.5,{profile:fx.NightbloomFX.profiles.JIANGSHI});assert.equal(calls.at(-1),'jiangshi-a');
 console.log('PASS three approved challenger recordings, recorded narration playback, no device fallback on missing/failed clips, Jiangshi painted armor and no spell placeholder while loading');
})().catch(error=>{console.error(error);process.exitCode=1});
