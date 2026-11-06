/* Crimson Cathedral layer test. The fighting floor never follows the parallax camera. */
(function(root){
 'use strict';
 const STAGE='CRIMSON CATHEDRAL',images={},base=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/stages/cathedral-parallax-v1/',document.currentScript.src).href:'assets/stages/cathedral-parallax-v1/';
 let camera=0,selected='',enabled=false,sky=null;
 function preload(){for(const name of ['background','middle','foreground'])if(!images[name]){const im=new Image();images[name]=im;im.src=base+name+'.webp';}}
 const ready=()=>['background','middle','foreground'].every(k=>images[k]?.complete&&images[k].naturalWidth);
 function update({stage,active=false,paused=false,reducedMotion=false,on=true,midpoint=480,width=960,dt=1}){
  if(stage!==selected){camera=0;selected=stage;}
  enabled=stage===STAGE&&on;
  if(!enabled){camera=0;return;}
  preload();
  if(reducedMotion||!active){camera=0;return;}
  if(!paused){const target=Math.max(-1,Math.min(1,(midpoint-width/2)/(width*.30)));camera+=(target-camera)*(1-Math.pow(.9,Math.max(0,Math.min(3,dt))));}
 }
 function skyPlate(){
  if(sky)return sky;
  sky=document.createElement('canvas');sky.width=1280;sky.height=720;
  const c=sky.getContext('2d');c.drawImage(images.background,0,0,1280,720);c.globalCompositeOperation='destination-in';
  const fade=c.createLinearGradient(0,0,0,720);fade.addColorStop(0,'#fff');fade.addColorStop(.57,'#fff');fade.addColorStop(.70,'#fff0');fade.addColorStop(1,'#fff0');c.fillStyle=fade;c.fillRect(0,0,1280,720);c.globalCompositeOperation='source-over';return sky;
 }
 function background(ctx,stage,w,h){
  if(!enabled||stage!==STAGE||!ready())return false;
  ctx.save();ctx.imageSmoothingEnabled=true;
  ctx.drawImage(images.background,0,0,w,h);
  // Overscan conceals the image edges; the feathered overlay leaves the floor fixed.
  ctx.drawImage(skyPlate(),-14-camera*7,-2,w+28,h+2);
  ctx.drawImage(images.middle,-camera*15,0,w,h);ctx.restore();return true;
 }
 function foreground(ctx,stage,w,h,ground){
  if(!enabled||stage!==STAGE||!ready())return false;
  ctx.save();ctx.imageSmoothingEnabled=true;
  // Decorative border stays below the fighters' feet and never covers their bodies.
  ctx.beginPath();ctx.rect(0,ground+15,w,h-ground-15);ctx.clip();
  ctx.drawImage(images.foreground,-camera*25,0,w,h);ctx.restore();return true;
 }
 root.NightbloomStageLayers={update,drawBackground:background,drawForeground:foreground,get ready(){return ready();}};
})(typeof window!=='undefined'?window:globalThis);
