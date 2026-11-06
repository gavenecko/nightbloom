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
 const bank=new Map();let current=null,cameraX=480,world=1920,depth=true;
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
 function update({stage,active=false,reducedMotion=false,on=true,cameraLeft=480,width=960,worldWidth=1920}){
  current=load(stage);world=worldWidth;cameraX=active?Math.max(0,Math.min(world-width,cameraLeft)):(world-width)/2;depth=on&&!reducedMotion;
 }
 function floorPlate(item){
  if(item.pavement)return item.pavement;const canvas=document.createElement('canvas');canvas.width=2560;canvas.height=720;
  const ctx=canvas.getContext('2d');ctx.drawImage(item.images.background,0,0,2560,720);ctx.globalCompositeOperation='destination-in';
  const gradient=ctx.createLinearGradient(0,0,0,720);gradient.addColorStop(0,'#fff0');gradient.addColorStop(item.config.floor,'#fff0');gradient.addColorStop(item.config.floor+.015,'#fff');gradient.addColorStop(1,'#fff');ctx.fillStyle=gradient;ctx.fillRect(0,0,2560,720);item.pavement=canvas;return canvas;
 }
 function background(ctx,stage,w,h){
  const item=current;if(item?.name!==stage||!ready(item))return false;
  const travel=cameraX-(world-w)/2;ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(item.images.background,-(world-w)/2-travel*(depth?.35:1),0,world,h);
  ctx.drawImage(floorPlate(item),-cameraX,0,world,h);
  ctx.save();if(item.config.split){ctx.beginPath();ctx.rect(0,0,w,h*(item.config.clip||.78));ctx.clip();}
  ctx.drawImage(item.images.middle,-travel,h*(item.config.offset/540),w,h);ctx.restore();ctx.restore();return true;
 }
 function foreground(ctx,stage,w,h,ground){
  const item=current;if(item?.name!==stage||!ready(item))return false;
  const shift=(cameraX-(world-w)/2)*(depth?1.1:1);ctx.save();ctx.imageSmoothingEnabled=true;ctx.beginPath();ctx.rect(0,ground+15,w,h-ground-15);ctx.clip();
  for(let tile=-1;tile<=1;tile++)ctx.drawImage(item.images.foreground,tile*w-shift,h*((item.config.fgOffset||0)/540),w,h);ctx.restore();return true;
 }
 root.NightbloomStageLayers={update,drawBackground:background,drawForeground:foreground,hasStage:name=>!!configs[name],assets(name){const c=configs[name];return c?{background:base+c.background,props:base+c.middle,original:base+c.original}:null;},get ready(){return ready(current);}};
})(typeof window!=='undefined'?window:globalThis);
