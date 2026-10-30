/* NIGHTBLOOM's shared Canvas effects. Rendering only: no combat state or randomness. */
(function(root){
 'use strict';
 const TAU=Math.PI*2,clamp=v=>Math.max(0,Math.min(1,v));
 const profiles={
  VAMPIRA:{color:'#ff3c79',light:'#ffdce8',a:'bloodClaw',b:'crimsonShot',motif:'blood'},
  NEKOMATA:{color:'#cf78ff',light:'#ffe4ff',a:'tailSlash',b:'spiritPaw',motif:'paw'},
  BANSHEE:{color:'#67ffe0',light:'#e2fff7',a:'wail',b:'soulDrift',motif:'soul'},
  MEDUSA:{color:'#b6f36c',light:'#f0ffbc',a:'serpent',b:'petrify',motif:'serpent'},
  JIANGSHI:{color:'#ffcd6b',light:'#fff3c3',a:'seal',b:'talisman',motif:'seal'},
  YUREI:{color:'#83cfff',light:'#e3f6ff',a:'graveReach',b:'lanternCurse',motif:'lantern'},
  DULLAHAN:{color:'#56edbd',light:'#dbfff1',a:'blackRide',b:'headToss',motif:'blade'},
  WEREWOLF:{color:'#a8caff',light:'#f1f8ff',a:'moonClaw',b:'howlWave',motif:'moon'},
  MUMMY:{color:'#55e5c6',light:'#ffe6a3',a:'bandageLash',b:'scarabCurse',motif:'scarab'},
  WITCH:{color:'#cd88ff',light:'#ffe2ff',a:'moonSigil',b:'hexBolt',motif:'star'}
 };
 const byKind={};Object.values(profiles).forEach(p=>{byKind[p.a]=p;byKind[p.b]=p;});
 function line(c,color,width,build,glow=false){
  c.beginPath();build(c);c.lineCap='round';c.lineJoin='round';
  c.strokeStyle='#110d23';c.lineWidth=width+2;c.stroke();
  c.strokeStyle=color;c.lineWidth=width;if(glow){c.shadowColor=color;c.shadowBlur=7;}c.stroke();c.shadowBlur=0;
 }
 function ring(c,color,r,start=0,end=TAU,width=2,scaleY=1){line(c,color,width,p=>p.ellipse(0,0,r,r*scaleY,0,start,end));}
 function star(c,color,r,n=5,rotation=-Math.PI/2){
  line(c,color,1.6,p=>{for(let i=0;i<=n;i++){const a=rotation+i*TAU*2/n;const px=Math.cos(a)*r,py=Math.sin(a)*r;i?p.lineTo(px,py):p.moveTo(px,py);}});
 }
 function diamond(c,color,px,py,r){c.fillStyle=color;c.beginPath();c.moveTo(px,py-r);c.lineTo(px+r*.55,py);c.lineTo(px,py+r);c.lineTo(px-r*.55,py);c.closePath();c.fill();}
 function crescent(c,color,r,angle=0){c.save();c.rotate(angle);line(c,color,3,p=>{p.moveTo(-r*.6,-r);p.quadraticCurveTo(r*1.2,0,-r*.6,r);p.quadraticCurveTo(r*.35,0,-r*.6,-r);});c.restore();}
 function scarab(c,p,r=12){
  c.fillStyle=p.color;c.strokeStyle='#112d33';c.lineWidth=2;c.beginPath();c.ellipse(0,0,r*.55,r*.8,0,0,TAU);c.fill();c.stroke();
  line(c,p.light,1.5,q=>{q.moveTo(0,-r*.7);q.lineTo(0,r*.7);for(const d of [-1,1])for(let i=0;i<3;i++){q.moveTo(d*r*.4,(i-1)*r*.4);q.lineTo(d*r*(1.0+i*.12),(i-1)*r*.7);}});
  c.fillStyle=p.light;c.beginPath();c.arc(0,-r*.9,r*.24,0,TAU);c.fill();
 }
 function rune(c,p,motif,r=17){
  if(motif==='star'){star(c,p.color,r);ring(c,p.light,r+4,0,TAU,1);}
  else if(motif==='scarab')scarab(c,p,r*.65);
  else if(motif==='paw'){
   c.fillStyle=p.light;c.beginPath();c.ellipse(0,6,r*.48,r*.32,0,0,TAU);c.fill();
   for(let i=0;i<3;i++){c.beginPath();c.ellipse((i-1)*r*.55,-r*.35,r*.2,r*.28,(i-1)*.25,0,TAU);c.fill();}
  }else if(motif==='moon')crescent(c,p.light,r,.25);
  else if(motif==='lantern'){
   line(c,p.color,2,q=>{q.moveTo(-r*.5,-r*.6);q.lineTo(r*.5,-r*.6);q.lineTo(r*.65,r*.45);q.lineTo(0,r*.8);q.lineTo(-r*.65,r*.45);q.closePath();q.moveTo(-r*.3,-r*.6);q.quadraticCurveTo(0,-r*1.3,r*.3,-r*.6);});
   diamond(c,p.light,0,0,r*.55);
  }else if(motif==='seal'){
   c.fillStyle='#fff0b8';c.fillRect(-r*.5,-r,r,r*2);line(c,'#aa294c',2,q=>{q.moveTo(-r*.3,-r*.6);q.lineTo(r*.3,-r*.6);q.moveTo(0,-r*.8);q.lineTo(0,r*.65);q.moveTo(-r*.35,0);q.lineTo(r*.35,0);q.moveTo(-r*.3,r*.4);q.lineTo(r*.3,r*.65);});
  }else if(motif==='soul'){
   line(c,p.color,3,q=>{q.moveTo(0,-r);q.bezierCurveTo(-r*1.2,-r*.5,-r*.6,r*.8,r*.4,r);q.bezierCurveTo(-r*.2,r*.2,r*.9,-r*.3,0,-r);});diamond(c,p.light,0,-r*.2,r*.3);
  }else if(motif==='serpent'){
   line(c,p.color,4,q=>{q.moveTo(-r*.7,r);q.bezierCurveTo(r*1.4,r*.3,-r*1.2,-r*.4,r*.5,-r);});diamond(c,p.light,r*.5,-r,r*.3);
  }else if(motif==='blade'){
   line(c,p.light,3,q=>{q.moveTo(-r*.7,r*.7);q.lineTo(r*.7,-r*.7);q.moveTo(-r*.5,0);q.lineTo(0,r*.5);});
  }else{
   for(let i=0;i<3;i++)line(c,p.light,2,q=>{q.moveTo(-r+i*r*.5,r*.5);q.quadraticCurveTo(-r*.3+i*r*.5,-r*.3,i*r*.5,-r);});
  }
 }
 function draw(c,kind,phase=0,options={}){
  const p=options.profile||byKind[kind]||profiles.WITCH,col=options.color||p.color,t=clamp(phase),low=options.quality==='LOW'||options.quality==='OFF'||!!options.reducedMotion,still=!!options.reducedMotion;
  const impact=['hit','impact','guard','counter'].includes(kind),travel=!!options.projectile;
  const envelope=travel?1:Math.min(1,t*7)*Math.min(1,(1-t)*4);
  if(envelope<=0)return;c.save();c.globalAlpha*=envelope;
  const age=still?.35:t;
  if(impact){
   if(kind==='guard'){
    ring(c,'#8be8ff',14+age*20,-1.25,1.25,4);ring(c,'#e0fbff',10+age*16,-1.15,1.15,1.5);
    for(let i=0;i<3;i++)diamond(c,'#e0fbff',Math.cos((i-1)*.75)*(16+age*20),Math.sin((i-1)*.75)*(16+age*20),2);
   }else{
    const count=low?5:9,r=(kind==='counter'?42:34)*(1-age*.3);
    for(let i=0;i<count;i++){const a=i*TAU/count+.24,len=r*(i%2?.55:1);line(c,col,2.6,q=>{q.moveTo(Math.cos(a)*6,Math.sin(a)*6);q.lineTo(Math.cos(a)*len,Math.sin(a)*len);});}
    c.save();c.rotate(.65);c.fillStyle='#fff8dd';c.fillRect(-3,-11,6,22);c.fillRect(-11,-3,22,6);c.restore();
    if(kind==='counter'){c.save();c.rotate(Math.PI/4);line(c,'#ffdf9b',2,q=>q.rect(-20,-20,40,40));c.restore();}
   }
   c.restore();return;
  }
  if(kind==='super'){
   ring(c,col,26+age*20,0,TAU,2,1);c.save();c.rotate(still?0:age*.6);rune(c,p,p.motif,23);c.restore();
   if(!low)for(let i=0;i<6;i++){const a=i*TAU/6;diamond(c,p.light,Math.cos(a)*44,Math.sin(a)*44,3);}
   c.restore();return;
  }
  if(kind==='shadow'||kind==='dash'||kind==='headToss'){
   for(let i=0;i<(low?2:4);i++)line(c,col,1.8,q=>{q.moveTo(-42+i*7,-8+i*5);q.lineTo(14-i*5,-8+i*5);});c.restore();return;
  }
  if(travel){
   if(!low){const halo=c.createRadialGradient(0,0,2,0,0,31);halo.addColorStop(0,col+'75');halo.addColorStop(1,col+'00');c.fillStyle=halo;c.fillRect(-32,-32,64,64);}
   if(options.quality!=='OFF')for(let i=0;i<(low?2:4);i++){c.save();c.globalAlpha*=.48*(1-i/5);line(c,col,3.5-i*.5,q=>{q.moveTo(-15-i*9,Math.sin(age*TAU+i)*6);q.lineTo(-30-i*7,Math.sin(age*TAU+i+1)*8);});c.restore();}
   if(p.motif==='blood'){
    c.fillStyle=col;c.beginPath();c.moveTo(25,0);c.bezierCurveTo(6,-24,-9,-15,-26,-7);c.lineTo(-13,0);c.lineTo(-28,10);c.bezierCurveTo(-6,13,11,22,25,0);c.fill();
    line(c,p.light,3,q=>{q.moveTo(-9,-5);q.quadraticCurveTo(10,-12,19,0);q.quadraticCurveTo(6,10,-5,6);});diamond(c,'#fff4ec',13,0,6);
   }else if(p.motif==='paw'){
    c.fillStyle=col+'80';c.beginPath();c.moveTo(-29,14);c.quadraticCurveTo(-1,-4,-10,-28);c.quadraticCurveTo(23,-16,22,4);c.quadraticCurveTo(12,26,-29,14);c.fill();rune(c,p,'paw',18);
   }else if(p.motif==='soul'){
    line(c,col,7,q=>{q.moveTo(-28,10);q.bezierCurveTo(8,25,23,-8,2,-18);});rune(c,p,'soul',18);diamond(c,'#ffffff',4,-4,4);
   }else if(p.motif==='serpent'){
    c.fillStyle=col;c.beginPath();c.moveTo(29,0);c.lineTo(4,-17);c.lineTo(-17,-11);c.lineTo(-7,0);c.lineTo(-19,12);c.lineTo(4,17);c.closePath();c.fill();
    line(c,p.light,2,q=>{q.moveTo(-10,0);q.lineTo(24,0);q.moveTo(2,-12);q.lineTo(9,-5);});diamond(c,'#143b2a',13,-4,2.5);
   }else if(p.motif==='moon'){
    crescent(c,p.light,23,-Math.PI/2);for(let i=0;i<3;i++)line(c,col,2,q=>{q.moveTo(-29,-10+i*10);q.lineTo(-8,-12+i*10);});
   }else if(p.motif==='scarab'){
    c.fillStyle=p.light;for(const d of [-1,1]){c.beginPath();c.moveTo(0,-3);c.quadraticCurveTo(d*14,-22,d*26,-9);c.quadraticCurveTo(d*20,6,d*5,8);c.closePath();c.fill();}
    scarab(c,p,14);ring(c,p.light,22,-.75,.75,1.5);
   }else if(p.motif==='star'){
    c.fillStyle=col+'90';c.beginPath();c.moveTo(25,0);c.lineTo(-5,-20);c.lineTo(-24,-10);c.lineTo(-13,0);c.lineTo(-24,12);c.lineTo(-5,20);c.closePath();c.fill();rune(c,p,'star',14);diamond(c,p.light,0,0,6);
   }else{rune(c,p,p.motif,19);if(p.motif==='lantern')line(c,p.light,2,q=>{q.moveTo(-14,12);q.quadraticCurveTo(-32,5,-29,-8);});}
   c.restore();return;
  }
  switch(kind){
   case 'bloodClaw':case 'moonClaw':case 'tailSlash':case 'light':case 'heavy':{
   const count=kind==='light'?1:kind==='tailSlash'||low?2:3;
    for(let i=0;i<count;i++)line(c,i===1?p.light:col,kind==='heavy'?4:2.8,q=>{q.moveTo(-30+i*7,26-i*9);q.quadraticCurveTo(3+i*8,-34+age*8,39+i*2,-24+i*11);},!low);
    if(kind==='tailSlash'){c.save();c.translate(25,0);rune(c,p,'paw',12);c.restore();}break;
   }
   case 'wail':case 'howlWave':{
    for(let i=0;i<(low?2:3);i++){c.save();c.translate(-22+i*15+age*10,0);ring(c,i===0?p.light:col,20+i*9,-1.1,1.1,3,.95);c.restore();}break;
   }
   case 'serpent':{
    for(let i=0;i<2;i++)line(c,i?p.light:col,i?2:5,q=>{q.moveTo(-42,18-i*11);q.bezierCurveTo(-14,-37+age*10,8,30,39,-14+i*4);});
    c.fillStyle=col;c.beginPath();c.moveTo(48,-14);c.lineTo(34,-24);c.lineTo(33,-8);c.closePath();c.fill();diamond(c,'#132b24',39,-17,1.7);break;
   }
   case 'petrify':{
    for(let i=0;i<5;i++)diamond(c,i%2?col:p.light,(i-2)*16,Math.sin(i*2+age)*15,8+i%2*3);break;
   }
   case 'bandageLash':{
    for(let i=0;i<2;i++)line(c,i?'#d7b86e':'#fff0cf',i?1.5:7,q=>{q.moveTo(-42,14+i*6);q.bezierCurveTo(-14,-36,17,28,46,-12+age*10);});
    for(let i=0;i<5;i++)line(c,'#bba883',.8,q=>{const px=-30+i*15;q.moveTo(px,-2+Math.sin(i)*4);q.lineTo(px+3,3+Math.sin(i)*4);});break;
   }
   case 'blackRide':{
    line(c,p.light,5,q=>{q.moveTo(-44,16);q.lineTo(43,0);q.lineTo(29,-5);});line(c,col,2,q=>{q.moveTo(-39,24);q.lineTo(37,9);});break;
   }
   case 'graveReach':{
    for(let i=0;i<3;i++)line(c,i===1?p.light:col,3,q=>{q.moveTo(-34,20-i*8);q.bezierCurveTo(-14,2-i*9,10,14-i*10,35,-12-i*9);q.lineTo(40,-19-i*9);q.moveTo(35,-12-i*9);q.lineTo(46,-14-i*9);});break;
   }
   default:{
    ring(c,col,24+age*12,-Math.PI*.85,Math.PI*.85,2);c.save();c.translate(9,0);c.rotate(still?0:Math.sin(age*3)*.1);rune(c,p,p.motif,17);c.restore();
   }
  }
  if(!low)for(let i=0;i<4;i++)diamond(c,i%2?col:p.light,-32+i*21,Math.sin(i*2.3+age*3)*31,1.7);
  c.restore();
 }
 const cache=new Map();
 function atlas(name,options={}){
  const key=name+'|'+options.quality+'|'+options.reducedMotion;if(cache.has(key))return cache.get(key);
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1440;const c=canvas.getContext('2d'),p=profiles[name]||profiles.WITCH;
  const actions=[['dash',1,0],['light',3,0],['heavy',3,4],['specialA',4,0],['specialB',4,4],['super',5,0],['hit',6,0],['guard',6,4]];
  for(const[action,row,col]of actions)for(let i=0;i<4;i++){
   const kind=action==='specialA'?p.a:action==='specialB'?p.b:action;
   if(options.quality==='OFF'&&action==='dash')continue;
   c.save();c.beginPath();c.rect((col+i)*128+8,row*160+8,112,144);c.clip();c.translate((col+i)*128+64,row*160+78);
   if(['specialA','specialB','light','heavy'].includes(action))c.globalAlpha=[.18,.42,1,.55][i];
   draw(c,kind,[.06,.35,.64,.93][i],{...options,profile:p});c.restore();
  }
  Object.assign(canvas,{complete:true,naturalWidth:canvas.width,naturalHeight:canvas.height});if(cache.size>=2)cache.delete(cache.keys().next().value);cache.set(key,canvas);return canvas;
 }
 function projectile(c,q,time,options={}){
  const p=profiles[q.owner.name]||profiles.WITCH;c.save();c.translate(Math.round(q.x),Math.round(q.y));if(q.vx<0)c.scale(-1,1);
  if(q.head){if(options.quality!=='OFF'){c.save();c.globalAlpha=.55;draw(c,'shadow',.45,{...options,profile:p});c.restore();}}
  else draw(c,q.kind,(time/26)%1,{...options,profile:p,projectile:true});c.restore();
 }
 function status(c,f,time,options={}){
  const still=options.reducedMotion;c.save();c.translate(f.x,f.y);
  if(f.curseStacks>0){for(let i=0;i<f.curseStacks;i++){c.save();c.translate((i-(f.curseStacks-1)/2)*14,-145);scarab(c,profiles.MUMMY,5);c.restore();}}
  if(f.stoneSlow>0){for(let i=0;i<4;i++)diamond(c,i%2?'#e4ffc4':'#a4d471',-24+i*16,-6-(i%2)*9,4);}
  if(f.name==='WEREWOLF'&&f.rage>=50){c.save();c.translate(0,-3);c.globalAlpha=f.rage>=90?.8:.45;ring(c,profiles.WEREWOLF.color,25+(still?0:Math.sin(time/12)*2),0,TAU,2,.23);c.restore();}
  if(f.armor>0){c.save();c.translate(19,-80);ring(c,profiles.JIANGSHI.color,22,-1.4,1.4,2,.9);c.restore();}
  c.restore();
 }
 root.NightbloomFX={profiles,draw,atlas,projectile,status};
})(typeof globalThis!=='undefined'?globalThis:this);
