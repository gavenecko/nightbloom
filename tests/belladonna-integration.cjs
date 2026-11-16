const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),missing=[],draws=[],storage=new Map(),elements=new Map();
const noop=()=>{},gradient={addColorStop(){}};
const canvas=new Proxy({measureText:t=>({width:String(t).length*7}),createLinearGradient:()=>gradient,createRadialGradient:()=>gradient,drawImage:(...args)=>draws.push(args),getImageData:()=>({data:new Uint8ClampedArray(4)}),canvas:{width:960,height:540}}, {get:(o,k)=>k in o?o[k]:noop});
function element(id){if(elements.has(id))return elements.get(id);const e={id,width:960,height:540,style:{},dataset:{},classList:{add:noop,remove:noop,toggle:noop},children:[],options:[],getContext:()=>canvas,addEventListener:noop,setAttribute:noop,removeAttribute:noop,append:noop,appendChild:noop,add:noop,focus:noop,blur:noop,pause:noop,play:()=>Promise.resolve(),load:noop,querySelector:s=>element(id+s),querySelectorAll:()=>[],getBoundingClientRect:()=>({left:0,top:0,width:960,height:540}),closest:()=>null,contains:()=>false,toDataURL:()=>''};elements.set(id,e);return e;}
class Image{constructor(){this.complete=true;this.naturalWidth=1024;this.naturalHeight=1024;}set src(v){this._src=v;if(v.startsWith('assets/')){const p=path.join(root,v.split('?')[0]);if(!fs.existsSync(p))missing.push(v);else if(p.endsWith('.png')){const b=fs.readFileSync(p);this.naturalWidth=b.readUInt32BE(16);this.naturalHeight=b.readUInt32BE(20);}}}get src(){return this._src;}}
const context={console,Image,performance:{now:()=>1000},document:{getElementById:element,querySelector:s=>element(s),querySelectorAll:()=>[],createElement:t=>element(t+Math.random()),addEventListener:noop,head:element('head'),body:element('body'),documentElement:element('html'),fonts:{ready:Promise.resolve()}},navigator:{getGamepads:()=>[],userAgent:'Test',hardwareConcurrency:4},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},addEventListener:noop,requestAnimationFrame:noop,setTimeout:()=>0,clearTimeout:noop,ResizeObserver:class{observe(){}},Option:class{},URL,innerWidth:960,innerHeight:540,devicePixelRatio:1,matchMedia:()=>({matches:false,addEventListener:noop}),Audio:class{load(){}pause(){}play(){return Promise.resolve()}},assert,fetch:async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,String(url).split('?')[0])))}),crypto:{getRandomValues:a=>a}};
context.window=context;context.globalThis=context;vm.createContext(context);
for(const file of ['painted-fx.js','combat-fx.js','secret-fighters.js','belladonna.js','story-voices.js','combat-voices.js','stage-layer-data.js','stage-layers-all.js','character-introductions.js','nightbloom.js'])vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'),context,{filename:file});
vm.runInContext(`
 assert.equal(ROSTER.length,14);assert.equal(CORE_ROSTER.length,11);assert.equal(CORE_ROSTER.at(-1),'BELLADONNA');assert.ok(isFighterUnlocked('BELLADONNA'));
 assert.deepEqual(Object.keys(SECRET_CHALLENGES),['ARACHNE','LIVING DOLL','NARRATOR']);
 assert.equal(MOVE_NAMES.BELLADONNA.super,'Midnight Bloom');assert.equal(CHAR_INFO.BELLADONNA.accent,'#c6eb74');
 assert.equal(openingShots.length,11);assert.equal(openingShots.at(-1).stage,'MOONLIT SHRINE');assert.equal(openingShots.at(-1).fighter.name,'BELLADONNA');
 assert.equal(openingShots.at(-1).fighter.accent,CHAR_INFO.BELLADONNA.accent);
 for(const name of ROSTER){assert.ok(CHAR_INFO[name]&&AI_PROFILES[name]&&MOVESETS[name]&&MOVE_NAMES[name]);const route=buildLadder('story',name),expected=CORE_ROSTER.filter(n=>n!==name);assert.equal(route.length,expected.length);assert.ok(expected.every(n=>route.some(r=>r.opponent===n)));}
 const bella=makeFighter('BELLADONNA',300,false);assert.equal(bodyCellFor('BELLADONNA').w,256);
 assert.equal(inspectorSpriteInfo('BELLADONNA','airlight').row,9);assert.equal(inspectorSpriteInfo('BELLADONNA','airheavy').frames[0],4);
 for(const action of ['idle','walk','dash','crouch','jump','fall','light','heavy','specialA','specialB','super','throw','hit','block','down','recover','intro','victory','airlight','airheavy'])for(let frame=0;frame<4;frame++)drawF(bella,{action,frame});
 assert.equal(belladonnaPoseScale('intro',0),.18);assert.equal(belladonnaPoseScale('intro',3),1);assert.equal(belladonnaPoseScale('victory',3),.2);
 assert.equal(specialFX('BELLADONNA','specialA'),'fairyDust');assert.equal(specialFX('BELLADONNA','specialB'),'nightshadeGale');
 const moves=pauseMoveRows('BELLADONNA');assert.equal(moves[2][0],'Fairy Dust');assert.equal(moves[3][0],'Nightshade Gale');assert.equal(moves[4][0],'Midnight Bloom');
 p1=bella;p2=makeFighter('VAMPIRA',900,true);roundOver=false;training=true;
 bella.meter=99;doAttack(bella,'super');assert.equal(bella.attack,null);
 bella.meter=100;doAttack(bella,'super');assert.equal(bella.meter,0);assert.equal(bella.attack.type,'super');assert.equal(bella.attack.damage,132);
 bella.attack=null;doAttack(bella,'specialB');projectile(bella);assert.equal(projectiles.at(-1).kind,'nightshadeGale');assert.equal(projectiles.at(-1).damage,24);
 bella.attack=null;doAttack(bella,'specialA');assert.equal(bella.attack.reach,140);bella.attack=null;
 playerChoice='BELLADONNA';gameMode='story';ladder=buildLadder('story',playerChoice);ladderIndex=0;gameState='storyScene';
 const index=new Set(${JSON.stringify(JSON.parse(fs.readFileSync(path.join(root,'assets/audio/story-v1/manifest.json'))).clips.map(c=>JSON.stringify([c.speaker,c.text])))});
 for(const name of ROSTER){playerChoice=name;ladder=buildLadder('story',name);for(ladderIndex=0;ladderIndex<ladder.length;ladderIndex++){for(const line of storyVoiceLines())assert.ok(index.has(JSON.stringify([line.speaker,line.text])),name+': '+line.text);}}
 playerChoice='BELLADONNA';ladder=buildLadder('story',playerChoice);ladderIndex=0;drawStoryScene();
 gameState='title';drawTitleScreen();
 PROGRESS={};repairProgress();for(const name of ROSTER.filter(n=>n!=='BELLADONNA')){PROGRESS.storyClears[name]=true;PROGRESS.storyReplays[name]=true;}assert.equal(groupRewardBikinisRemaining(),1);unlockStoryClear('BELLADONNA');assert.equal(groupRewardBikinisRemaining(),1);unlockStoryClear('BELLADONNA');assert.equal(groupRewardBikinisRemaining(),0);assert.equal(groupRewardJustUnlocked,true);
 assert.ok(storyArtwork('BELLADONNA','group').src.endsWith('beach-party-belladonna.webp'));
 `,context);
assert.deepEqual(missing,[],'Missing initial game art');assert.ok(draws.length>80);
console.log('PASS full game initialization, 11 core/3 secrets, all 14 voiced routes, Belladonna 80 pose draws and air cells, tiny poses, painted keys, opening, title/story render calls and all-14 bonus gate.');
