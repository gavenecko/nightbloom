const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'js/nightbloom.js'),'utf8');
const part=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b,source.indexOf(a)));
const draws=[],ctx={assert,console,ground:430,training:false,p2:null,shake:0,superCine:0,superOwner:null,SYSTEM:{reducedMotion:false,particles:'NORMAL'},clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),arenaWidth:()=>1920,toward:f=>f.flip?-1:1,spawnFX(){},emit(){},pressedFor:()=>false,fxRenderOptions:()=>({}),x:{save(){},restore(){},translate(){},scale(){}},NightbloomPaintedFX:{draw:(c,key,phase,options)=>draws.push({key,phase,options})}};
vm.createContext(ctx);vm.runInContext(part('function fighter(','let p1,p2;')+part('function clearThrowPair(','function techThrow(')+part('function updateF(','function pxrect(X,Y')+part('function drawLargePaintedSuper(','function drawF('),ctx);
// Exercise the real release and movement functions, including normal hit friction.
vm.runInContext(`
 for(const name of ['VAMPIRA','BANSHEE'])for(const dir of [-1,1]){
  const attacker=fighter('VAMPIRA',960,false,'',''),victim=fighter(name,1000,false,'','');
  attacker.throwTarget=victim;attacker.throwDirection=dir;attacker.throwHold=0;victim.thrownBy=attacker;
  updateThrowHold(attacker,1);assert.equal(victim.thrownBy,null);assert.equal(attacker.throwTarget,null);
  const origin=victim.x;let frames=0;
  while(victim.air&&frames++<120)updateF(victim,attacker,1);
  const distance=(victim.x-origin)*dir;assert.ok(distance>=300&&distance<700,'throw distance '+distance);assert.ok(frames<120);assert.equal(victim.throwFlight,false);assert.equal(victim.state,'down');console.log(name+' '+(dir>0?'forward':'back')+' throw: '+Math.round(distance)+'px');
 }
 const wallAttacker=fighter('VAMPIRA',1800,false,'',''),wallVictim=fighter('VAMPIRA',1840,false,'','');wallAttacker.throwTarget=wallVictim;wallAttacker.throwDirection=1;wallAttacker.throwHold=0;updateThrowHold(wallAttacker,1);let n=0;while(wallVictim.air&&n++<120)updateF(wallVictim,wallAttacker,1);assert.equal(wallVictim.x,1875);assert.equal(wallVictim.air,false);
`,ctx);
const names=['vampira','nekomata','banshee','medusa','jiangshi','yurei','dullahan','werewolf','mummy','witch','belladonna','arachne','living-doll','narrator'];
for(const slug of names){assert.ok(fs.statSync(path.join(root,'assets/fx/painted-v1',slug+'-super.png')).size>0);ctx.f={name:slug.toUpperCase().replaceAll('-',' '),x:400,y:430,flip:false,attack:{frame:30,start:18,active:12,end:32}};vm.runInContext('drawLargePaintedSuper(f)',ctx);assert.equal(draws.at(-1).key,slug+'-super');assert.equal(draws.at(-1).options.size,420);}
ctx.SYSTEM.reducedMotion=true;ctx.SYSTEM.particles='OFF';vm.runInContext('drawLargePaintedSuper(f,2)',ctx);assert.equal(draws.at(-1).options.size,350);
console.log('PASS all 14 painted super keys, unclipped sizing, reduced-motion/particles-off rendering and wall-bounded throw landings');
