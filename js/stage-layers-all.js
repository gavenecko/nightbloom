/* Grounded props and world floor share the camera; only distant scenery slides. */
(function(root){
 'use strict';
 const base=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/stages/',document.currentScript.src).href:'assets/stages/';
 const configs={
  'CRIMSON CATHEDRAL':{id:'cathedral',background:'cathedral-wide-v1/background.webp',middle:'cathedral-parallax-v1/middle.webp',foreground:'cathedral-parallax-v1/foreground.webp',original:'cathedral-parallax-v1/original.webp',offset:24,floor:.75,split:false},
  'MOONLIT SHRINE':{id:'moonlit-shrine'},'FORSAKEN HARBOR':{id:'forsaken-harbor'},'CURSED LIBRARY':{id:'cursed-library'},'BONEFIELD':{id:'bonefield'},'THE NEXT DAWN':{id:'next-dawn'}
 };
 for(const c of Object.values(configs))if(c.split!==false){const folder='roster-wide-v1/'+c.id+'/';Object.assign(c,{background:folder+'background.webp',middle:folder+'props.webp',foreground:folder+'props.webp',original:folder+'original.webp',offset:5,floor:.75,split:true});}
 for(const [name,c] of Object.entries(configs))Object.assign(c,root.NightbloomStageLayerData?.[name]||{});
 // Coordinates follow the painted streams on the 1920 × 540 Shrine backdrop.
 const shrineWater=[
  {top:122,bottom:177,lanes:[792,796,801],drift:2},
  {top:224,bottom:256,lanes:[925,930,934],drift:1},
  {top:275,bottom:322,lanes:[747,751,755],drift:3,foam:[754,325]},
  {top:285,bottom:305,lanes:[785,794,805,815,825,834],drift:1},
  {top:309,bottom:337,lanes:[794,801,807,815,822,831],drift:-3,foam:[813,341]}
 ];
 // Backdrop and floor cels use the 1920px plate. Prop cels use the 960px plate.
 // Lamps are [x, y, radius, phase]. Wisps and water glints are [x, y, width].
 const ambience={
  cathedral:{
   lamps:[[214,192,13,0],[657,224,12,2],[676,228,10,0],[1565,199,13,1],[1728,229,10,3]],
   propLamps:[[120,197,11,0],[158,218,8,1],[26,312,9,3],[69,339,7,2],[155,339,8,0],[753,235,10,2],[895,211,13,1],[936,331,9,3]],
   frontLamps:[[26,456,10,0],[94,491,9,2],[883,499,9,1],[938,433,11,3]],
   reflections:[139,220,361,494,654,755,1053,1287,1451,1552,1631,1723,1855],
   reflectionColor:'255,105,140',
   sparks:[[213,193],[661,226],[751,272],[1328,245],[1566,199],[1727,231]],
   sparkColor:'255,127,72'
  },
  'moonlit-shrine':{
   lamps:[[650,82,7,0],[778,101,8,2],[742,223,9,1],[788,248,5,3],[858,247,5,0],[1170,245,7,2],[1202,257,7,0],[1326,243,6,1],[1386,215,6,3]],
   propLamps:[[114,264,15,0],[178,311,10,2],[782,311,10,1],[846,264,15,3]],
   wisps:[[462,373,92],[644,347,72],[856,362,94],[970,386,74],[1370,368,93],[1495,387,80]],
   wispColor:'152,183,255',
   reflections:[100,306,550,811,1119,1258,1374,1616,1821],
   reflectionColor:'255,145,128'
  },
  'forsaken-harbor':{
   lamps:[[273,71,10,0],[267,241,15,2],[408,187,9,1],[702,148,8,3],[1340,228,12,0],[1540,133,13,2],[1800,293,12,1]],
   propLamps:[[109,277,13,2],[140,267,10,0],[874,307,13,1],[854,398,12,3]],
   waterGlints:[[192,363,62],[410,376,80],[645,382,95],[852,386,76],[1140,382,84],[1450,373,86],[1680,381,72]],
   reflections:[73,197,353,591,1025,1336,1447,1785,1849],
   reflectionColor:'255,156,104',
   sparks:[[268,237],[411,184],[703,149],[1339,224],[1540,129],[1801,291]],
   sparkColor:'255,182,104'
  },
  'cursed-library':{
   lamps:[[120,33,12,1],[471,176,12,3],[571,272,12,2],[1182,91,11,0],[1476,267,12,2],[1807,36,12,3]],
   propLamps:[[28,174,10,1],[24,279,12,3],[65,282,8,0],[812,311,10,2],[903,270,9,0],[934,168,11,1]],
   blueFlames:[[136,164,0],[826,161,2]],
   sparks:[[126,329],[599,170],[783,15],[1103,207],[1319,290],[1802,325]],
   sparkColor:'113,212,255',
   frontLamps:[[72,468,10,0],[87,493,8,2],[900,485,10,1],[928,456,10,3]]
  },
  bonefield:{
   eclipse:true,
   propLamps:[[21,301,11,1],[61,349,8,3],[75,342,8,0],[855,267,10,2],[936,295,10,0]],
   wisps:[[299,378,116],[459,392,96],[705,372,111],[950,391,116],[1262,370,110],[1530,389,105],[1714,369,84]],
   wispColor:'210,146,255',
   reflections:[416,624,890,1086,1158,1453,1708],
   reflectionColor:'219,131,248',
   sparks:[[320,342],[570,323],[806,362],[1066,344],[1381,325],[1632,344]],
   sparkColor:'235,155,255'
  },
  'next-dawn':{
   propLamps:[[43,255,15,1],[900,261,16,3]],
   wisps:[[237,374,91],[508,369,104],[744,370,98],[971,362,99],[1161,317,104],[1354,353,119],[1547,386,110],[1762,368,91]],
   wispColor:'255,161,166',
   reflections:[83,403,525,712,1049,1134,1300,1321,1350,1482,1777,1867],
   reflectionColor:'255,185,130',
   sparks:[[184,305],[430,323],[709,315],[945,356],[1236,326],[1462,360],[1737,351]],
   sparkColor:'255,191,125'
  }
 };
 const lampGlow=[.12,.37,.22,.52];
 const bank=new Map();let current=null,cameraX=480,world=1920,depth=true,stageCel=null;
 function load(name){
  const config=configs[name];if(!config)return null;
  if(bank.has(name)){const item=bank.get(name);bank.delete(name);bank.set(name,item);return item;}
  const item={name,config,images:{},pavement:null};
  for(const key of ['background','middle','foreground']){
   if(key==='foreground'&&config.middle===config.foreground){item.images[key]=item.images.middle;continue;}
   const image=new Image();item.images[key]=image;image.src=base+config[key];
  }
  bank.set(name,item);while(bank.size>3)bank.delete(bank.keys().next().value);return item;
 }
 const ready=item=>!!item&&['background','middle','foreground'].every(k=>item.images[k]?.complete&&item.images[k].naturalWidth);
 function update({stage,active=false,reducedMotion=false,on=true,cameraLeft=480,width=960,worldWidth=1920,worldClock=0}){
  current=load(stage);world=worldWidth;cameraX=active?Math.max(0,Math.min(world-width,cameraLeft)):(world-width)/2;depth=on&&!reducedMotion;
  stageCel=active&&!reducedMotion?Math.floor(worldClock/8)%4:null;
 }
 function floorPlate(item){
  if(item.pavement)return item.pavement;const canvas=document.createElement('canvas');canvas.width=2560;canvas.height=720;
  const ctx=canvas.getContext('2d');ctx.drawImage(item.images.background,0,0,2560,720);ctx.globalCompositeOperation='destination-in';
  const gradient=ctx.createLinearGradient(0,0,0,720);gradient.addColorStop(0,'#fff0');gradient.addColorStop(item.config.floor,'#fff0');gradient.addColorStop(item.config.floor+.015,'#fff');gradient.addColorStop(1,'#fff');ctx.fillStyle=gradient;ctx.fillRect(0,0,2560,720);item.pavement=canvas;return canvas;
 }
 function drawShrineWater(ctx,cel){
  for(const {top,bottom,lanes,drift,foam} of shrineWater){
   for(const [lane,startX] of lanes.entries()){
    // Each of the four cels advances these highlights a quarter of their spacing.
    const phase=(cel*4+lane*5)%16;
    for(let y=top+phase;y+4<bottom;y+=16){
     const px=startX+Math.round(drift*(y-top)/(bottom-top));
     ctx.fillStyle='rgba(125,176,254,.24)';ctx.fillRect(px,y+1,2,5);
     ctx.fillStyle='rgba(207,230,255,.48)';ctx.fillRect(px,y,1,3);
    }
   }
   if(foam){
    const [px,py]=foam,spread=4+cel*3;
    ctx.fillStyle='rgba(149,190,255,.25)';ctx.fillRect(px-spread,py,spread*2,2);
    ctx.fillStyle='rgba(207,230,255,.36)';ctx.fillRect(px-spread+2,py-1,3,1);ctx.fillRect(px+spread-4,py+2,4,1);
   }
  }
 }
 function drawLamps(ctx,lamps,cel){
  for(const [px,py,radius,phase] of lamps){
   const brightness=lampGlow[(cel+phase)%lampGlow.length];
   const glow=ctx.createRadialGradient(px,py,0,px,py,radius);
   glow.addColorStop(0,'rgba(255,210,133,'+brightness+')');
   glow.addColorStop(.4,'rgba(255,124,64,'+brightness*.48+')');
   glow.addColorStop(1,'rgba(255,87,44,0)');
   ctx.fillStyle=glow;ctx.fillRect(px-radius,py-radius,radius*2,radius*2);
  }
 }
 function drawReflections(ctx,columns,color,cel){
  for(const [i,px] of columns.entries()){
   const phase=(cel+i)%4;
   for(let band=0;band<6;band++){
    const y=421+band*18+(phase+band)%4*2;
    const width=6+(phase+band*2)%4*3;
    const drift=(band*3+phase)%7-3;
    const alpha=lampGlow[(phase+band)%4]*(.45+band*.05);
    ctx.fillStyle='rgba('+color+','+alpha+')';
    ctx.fillRect(px+drift-width/2,y,width,1+(band>=3));
   }
  }
 }
 function drawWisps(ctx,wisps,color,cel){
  for(const [i,[px,py,width]] of wisps.entries()){
   const frame=(cel+i)%4,dx=frame*14,alpha=[.03,.12,.17,.08][frame];
   const glow=ctx.createRadialGradient(0,0,0,0,0,1);
   glow.addColorStop(0,'rgba('+color+','+alpha+')');
   glow.addColorStop(1,'rgba('+color+',0)');
   ctx.save();ctx.translate(px+dx,py-(frame%2)*3);ctx.scale(width/2,9+i%4);
   ctx.fillStyle=glow;ctx.fillRect(-1,-1,2,2);ctx.restore();
  }
 }
 function drawWaterGlints(ctx,glints,cel){
  for(const [i,[px,py,width]] of glints.entries()){
   const phase=(cel+i)%4;
   ctx.fillStyle='rgba(97,191,255,.43)';
   ctx.fillRect(px-width*.35+phase*9,py,width*.34,2);
   ctx.fillStyle='rgba(157,220,255,.40)';
   ctx.fillRect(px+width*.2-phase*8,py+3+phase*2,width*.21,1);
  }
 }
 function drawBlueFlames(ctx,flames,cel){
  for(const [px,py,phase] of flames){
   const frame=(cel+phase)%4,lean=[-7,2,7,-2][frame],rise=[12,23,15,20][frame];
   ctx.fillStyle='rgba(62,128,255,.65)';
   ctx.beginPath();ctx.moveTo(px-7,py);ctx.lineTo(px-4,py-6);ctx.lineTo(px+lean,py-rise);
   ctx.lineTo(px+5,py-5);ctx.lineTo(px+7,py);ctx.fill();
   ctx.fillStyle='rgba(155,231,255,.66)';
   ctx.fillRect(px-2,py-4,4,4);ctx.fillRect(px+Math.sign(lean),py-7,2,3);
  }
 }
 function drawSparks(ctx,anchors,color,cel){
  for(const [i,[px,py]] of anchors.entries()){
   for(let j=0;j<3;j++){
    const frame=(cel+i+j)%4,dx=(j-1)*11+frame*(i%2?4:-4),dy=6+frame*8+j*6;
    ctx.fillStyle='rgba('+color+','+[.45,.80,.60,.30][frame]+')';
    ctx.fillRect(px+dx,py-dy,j===0?3:2,j===0?4:2);
    if(j===0)ctx.fillRect(px+dx+1,py-dy+4,1,3);
   }
  }
 }
 function drawEclipse(ctx,cel){
  const glow=ctx.createRadialGradient(1112,62,46,1112,62,91);
  glow.addColorStop(0,'rgba(255,74,169,0)');
  glow.addColorStop(.35,'rgba(255,74,169,'+lampGlow[cel]*.44+')');
  glow.addColorStop(1,'rgba(255,74,169,0)');
  ctx.fillStyle=glow;ctx.fillRect(1021,0,182,153);
 }
 function background(ctx,stage,w,h){
  const item=current;if(item?.name!==stage||!ready(item))return false;
  const travel=cameraX-(world-w)/2;ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  const backdropLeft=-(world-w)/2-travel*(depth?.35:1);
  ctx.drawImage(item.images.background,backdropLeft,0,world,h);
  const scene=stageCel===null?null:ambience[item.config.id];
  if(scene){
   ctx.save();ctx.translate(backdropLeft,0);ctx.scale(world/1920,h/540);
   if(item.config.id==='moonlit-shrine')drawShrineWater(ctx,stageCel);
   if(scene.lamps)drawLamps(ctx,scene.lamps,stageCel);
   if(scene.wisps)drawWisps(ctx,scene.wisps,scene.wispColor,stageCel);
   if(scene.waterGlints)drawWaterGlints(ctx,scene.waterGlints,stageCel);
   if(scene.eclipse)drawEclipse(ctx,stageCel);
   if(scene.sparks)drawSparks(ctx,scene.sparks,scene.sparkColor,stageCel);
   ctx.restore();
  }
  ctx.drawImage(floorPlate(item),-cameraX,0,world,h);
  if(scene?.reflections){
   ctx.save();ctx.translate(-cameraX,0);ctx.scale(world/1920,h/540);
   drawReflections(ctx,scene.reflections,scene.reflectionColor,stageCel);ctx.restore();
  }
  const {groundDrop=0,footprints=[]}=item.config;
  for(const [center,radius] of footprints){
   ctx.save();ctx.translate(w*center-travel,h*((405+groundDrop)/540));ctx.scale(w*radius,h*(6/540));
   const shade=ctx.createRadialGradient(0,0,0,0,0,1);shade.addColorStop(0,'rgba(9,5,16,.57)');shade.addColorStop(1,'rgba(9,5,16,0)');ctx.fillStyle=shade;ctx.fillRect(-1,-1,2,2);ctx.restore();
  }
  ctx.save();if(item.config.split){ctx.beginPath();ctx.rect(0,0,w,h*((item.config.clip||.78)+groundDrop/540));ctx.clip();}
  const middleTop=h*((item.config.offset+groundDrop)/540);
  ctx.drawImage(item.images.middle,-travel,middleTop,w,h);
  if(scene?.propLamps){
   ctx.translate(-travel,middleTop);ctx.scale(w/960,h/540);
   drawLamps(ctx,scene.propLamps,stageCel);
   if(scene.blueFlames)drawBlueFlames(ctx,scene.blueFlames,stageCel);
  }
  ctx.restore();ctx.restore();return true;
 }
 function foreground(ctx,stage,w,h,ground){
  const item=current;if(item?.name!==stage||!ready(item))return false;
  const shift=(cameraX-(world-w)/2)*(depth?1.1:1);ctx.save();ctx.imageSmoothingEnabled=true;ctx.beginPath();ctx.rect(0,ground+15,w,h-ground-15);ctx.clip();
  const top=h*((item.config.fgOffset||0)/540),lamps=ambience[item.config.id]?.frontLamps;
  for(let tile=-1;tile<=1;tile++){
   const left=tile*w-shift;
   ctx.drawImage(item.images.foreground,left,top,w,h);
   if(stageCel!==null&&lamps){
    ctx.save();ctx.translate(left,top);ctx.scale(w/960,h/540);
    drawLamps(ctx,lamps,stageCel);ctx.restore();
   }
  }
  ctx.restore();return true;
 }
 root.NightbloomStageLayers={update,drawBackground:background,drawForeground:foreground,hasStage:name=>!!configs[name],assets(name){const c=configs[name];return c?{background:base+c.background,props:base+c.middle,original:base+c.original}:null;},get ready(){return ready(current);}};
})(typeof window!=='undefined'?window:globalThis);
