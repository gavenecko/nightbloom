const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/super-calls-v1/manifest.json')));
const plan=JSON.parse(fs.readFileSync(path.join(root,'docs/BELLADONNA_DIALOGUE_PLAN.json'))),played=[];
let time=100000,volume=.6;
class Audio{constructor(){this.readyState=2;this.currentTime=0;this.error=null;}load(){}removeAttribute(){}pause(){}play(){played.push({src:this.src,volume:this.volume});return Promise.resolve();}}
const window={Audio},context={window,performance:{now:()=>time}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'js/combat-voices.js'),'utf8'),context);
const api=window.NightbloomCombatVoices;api.configure({getVolume:()=>volume});
for(const [name,superName]of Object.entries(plan.superNames)){
 const s=manifest.samples.find(s=>s.character===name&&s.id.endsWith('-super'));assert.equal(s.text,superName+'!');assert.ok(fs.statSync(path.join(root,s.src)).size>0);
 api.update({active:true,fighters:[name,'VAMPIRA']});api.event('round_start');
 const before=played.length;api.event('attack',{fighter:name,move:'specialA'});assert.equal(played.length,before+1);
 api.event('super_start',{fighter:name});assert.equal(played.at(-1).src,s.src);const after=played.length;
 api.event('attack',{fighter:name,move:'super'});api.event('hit',{defender:name});assert.equal(played.length,after,'Super must play once and survive pain');
 api.event('match_end',{winner:name});assert.equal(played.length,after+1);api.event('match_end',{winner:name});assert.equal(played.length,after+1);
 api.update({active:true,paused:true,fighters:[name]});api.event('super_start',{fighter:name});assert.equal(played.length,after+1);
 time+=10000;
}
volume=0;api.update({active:true,fighters:['VAMPIRA']});const before=played.length;api.event('super_start',{fighter:'VAMPIRA'});assert.equal(played.length,before);
volume=.6;api.update({active:true,fighters:['VAMPIRA']});api.event('round_start');api.event('super_start',{fighter:'VAMPIRA'});assert.equal(played.at(-1).volume,.6);
console.log('PASS 14 exact super names, all assets, single cue, priority over pain, victory, pause and volume.');
