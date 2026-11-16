const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/story-v1/manifest.json')));
const plan=JSON.parse(fs.readFileSync(path.join(root,'docs/BELLADONNA_DIALOGUE_PLAN.json'))),keys=new Set(manifest.clips.map(c=>JSON.stringify([c.speaker,c.text])));
assert.equal(manifest.clips.length,495);assert.equal(keys.size,495);assert.equal(manifest.profiles.BELLADONNA.voice,'bf_isabella');assert.equal(manifest.profiles.BELLADONNA.speed,.98);
for(const c of manifest.clips){assert.equal(fs.statSync(path.join(root,c.src)).size,c.bytes);assert.ok(c.duration>0);}
const source=fs.readFileSync(path.join(root,'js/nightbloom.js'),'utf8'),context={window:{NightbloomIntroductions:plan.introductions},playerChoice:'VAMPIRA',ladderIndex:0};
vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function storyBeforeText('),source.indexOf('function storyVoiceLines(')),context);
const openingClips=manifest.clips.filter(c=>c.speaker==='NARRATOR'&&Object.values(plan.introductions).some(t=>c.text.startsWith(t+' ')));
assert.equal(openingClips.length,14);
for(const [name,intro]of Object.entries(plan.introductions)){context.playerChoice=name;const clip=openingClips.find(c=>c.text.startsWith(intro+' '));context.node={before:clip.text.slice(intro.length+1)};assert.equal(vm.runInContext('storyBeforeText(node)',context),clip.text);context.ladderIndex=1;assert.equal(vm.runInContext('storyBeforeText(node)',context),context.node.before);context.ladderIndex=0;context.node.secret=true;assert.equal(vm.runInContext('storyBeforeText(node)',context),context.node.before);}
for(const opponent of Object.keys(plan.introductions).filter(n=>n!=='BELLADONNA')){assert.ok(keys.has(JSON.stringify(['BELLADONNA',plan.belladonna.preFight.replace('{opponent}',opponent)])));}
assert.ok(keys.has(JSON.stringify(['NARRATOR',plan.belladonna.ending])));
console.log('PASS 495 recordings, approved Belladonna B voice, 14 visible/spoken opening matches, later/secret chapters unchanged, Belladonna rival and ending coverage.');
