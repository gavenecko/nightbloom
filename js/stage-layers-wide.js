/* Double-width Cathedral: world floor, slower distant scenery, faster foreground. */
(function(root){
 'use strict';
 const stage='CRIMSON CATHEDRAL',images={};
 const base=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/stages/',document.currentScript.src).href:'assets/stages/';
 let enabled=false,cameraX=480,world=1920,depth=true;
 const ready=()=>['background','middle','foreground'].every(k=>images[k]?.complete&&images[k].naturalWidth);
 function preload(){for(const name of ['background','middle','foreground'])if(!images[name]){const im=new Image();images[name]=im;im.src=base+(name==='background'?'cathedral-wide-v1/background.webp':'cathedral-parallax-v1/'+name+'.webp');}}
 function update({stage:choice,active=false,paused=false,reducedMotion=false,on=true,cameraLeft=480,width:w=960,worldWidth=1920}){
  enabled=choice===stage;if(!enabled)return;
  preload();world=worldWidth;cameraX=active?Math.max(0,Math.min(world-w,cameraLeft)):(world-w)/2;depth=on&&!reducedMotion;
 }
 function background(ctx,choice,w,h){
  if(!enabled||choice!==stage||!ready())return false;
  const center=(world-w)/2,travel=cameraX-center,far=depth?.35:1;
  ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  // One opaque scenery image: never blend shifted copies of walls or railings.
  ctx.drawImage(images.background,-center-travel*far,0,world,h);
  // Only pavement is sampled here; architecture ends above this boundary.
  const floorY=h*.75;
  ctx.save();ctx.beginPath();ctx.rect(0,floorY,w,h-floorY);ctx.clip();
  ctx.drawImage(images.background,-cameraX,0,world,h);ctx.restore();
  // These are grounded props, not distant scenery. Their bases follow the floor.
  ctx.drawImage(images.middle,-travel,h*(24/540),w,h);ctx.restore();return true;
 }
 function foreground(ctx,choice,w,h,ground){
  if(!enabled||choice!==stage||!ready())return false;
  const travel=cameraX-(world-w)/2,shift=travel*(depth?1.1:1);
  ctx.save();ctx.imageSmoothingEnabled=true;ctx.beginPath();ctx.rect(0,ground+15,w,h-ground-15);ctx.clip();
  // Reuse transparent border props at native scale; no stretching of the artwork.
  for(let tile=-1;tile<=1;tile++)ctx.drawImage(images.foreground,tile*w-shift,0,w,h);
  ctx.restore();return true;
 }
 root.NightbloomStageLayers={update,drawBackground:background,drawForeground:foreground,get ready(){return ready();}};
})(typeof window!=='undefined'?window:globalThis);
