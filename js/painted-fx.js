/* Generated painted textures; animation and gameplay clocks remain in combat-fx.js. */
(function(root){
 'use strict';
 const bank=new Map(),listeners=new Set(),api={revision:0};
 const names=['vampira','nekomata','banshee','medusa','jiangshi','yurei','dullahan','werewolf','mummy','witch'];
 const keys=new Set([...names.flatMap(name=>['a','b','super'].map(slot=>name+'-'+slot)),'hit','guard','counter']);
 // Resolve relative to this script so both the game and docs gallery use the same files.
 const base=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/fx/painted-v1/',document.currentScript.src).href:'assets/fx/painted-v1/';
 function image(key){
  if(!keys.has(key))return null;
  if(!bank.has(key)){
   const img=new Image();bank.set(key,img);
   img.onload=()=>{api.revision++;if(root.NightbloomFX?.clearCache)root.NightbloomFX.clearCache();listeners.forEach(fn=>fn());};
   img.src=base+key+'.png';
  }
  return bank.get(key);
 }
 api.draw=function(ctx,key,phase,options={}){
  const img=image(key);if(!img||!img.complete||!img.naturalWidth)return false;
  const t=Math.max(0,Math.min(1,phase)),frame=options.reducedMotion?2:Math.min(3,Math.floor(t*4));
  const envelope=options.projectile?1:Math.min(1,t*8)*Math.min(1,(1-t)*5);
  const size=options.size||(options.projectile?72:key==='guard'?108:key==='hit'?108:key==='counter'?118:key.endsWith('-super')?120:112);
  ctx.save();ctx.globalAlpha*=envelope;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(img,frame*256,0,256,256,-size/2,-size/2,size,size);ctx.restore();return true;
 };
 api.preload=function(name){for(const slot of ['a','b','super'])image(name.toLowerCase()+'-'+slot);for(const key of ['hit','guard','counter'])image(key);};
 api.subscribe=function(fn){listeners.add(fn);return()=>listeners.delete(fn);};
 root.NightbloomPaintedFX=api;
})(typeof globalThis!=='undefined'?globalThis:this);
