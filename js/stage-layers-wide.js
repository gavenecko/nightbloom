/* Double-width Cathedral: world floor, slower distant scenery, faster foreground. */
(function(root){
 'use strict';
 const stage='CRIMSON CATHEDRAL',images={};
 const base=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/stages/',document.currentScript.src).href:'assets/stages/';
 let enabled=false,cameraX=480,width=960,world=1920,depth=true,upper=null;
 const ready=()=>['background','middle','foreground'].every(k=>images[k]?.complete&&images[k].naturalWidth);
 function preload(){for(const name of ['background','middle','foreground'])if(!images[name]){const im=new Image();images[name]=im;im.src=base+(name==='background'?'cathedral-wide-v1/background.webp':'cathedral-parallax-v1/'+name+'.webp');}}
 function update({stage:choice,active=false,paused=false,reducedMotion=false,on=true,cameraLeft=480,width:w=960,worldWidth=1920}){
  enabled=choice===stage;if(!enabled)return;
  preload();width=w;world=worldWidth;cameraX=active?Math.max(0,Math.min(world-w,cameraLeft)):(world-w)/2;depth=on&&!reducedMotion;
 }
 function upperPlate(){
  if(upper)return upper;upper=document.createElement('canvas');upper.width=2560;upper.height=720;
  const c=upper.getContext('2d');c.drawImage(images.background,0,0,2560,720);c.globalCompositeOperation='destination-in';
  const g=c.createLinearGradient(0,0,0,720);g.addColorStop(0,'#fff');g.addColorStop(.55,'#fff');g.addColorStop(.70,'#fff0');g.addColorStop(1,'#fff0');c.fillStyle=g;c.fillRect(0,0,2560,720);c.globalCompositeOperation='source-over';return upper;
 }
 function background(ctx,choice,w,h){
  if(!enabled||choice!==stage||!ready())return false;
  const center=(world-w)/2,travel=cameraX-center,far=depth?.35:1,mid=depth?.72:1;
  ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  // The floor moves exactly with world coordinates, matching the fighters' feet.
  ctx.drawImage(images.background,-cameraX,0,world,h);
  ctx.drawImage(upperPlate(),-center-travel*far,0,world,h);
  ctx.drawImage(images.middle,-travel*mid,0,w,h);ctx.restore();return true;
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
