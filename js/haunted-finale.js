/* A lethal, match-point super becomes a 36-hit overkill presentation. */
let HAUNTED_FINALE=null;
function tryStartHauntedFinale(attacker,defender){
 if(HAUNTED_FINALE||training||gameState!=='fight'||roundOver||defender.hp>0||attacker.hp<=0||attacker.attack?.type!=='super')return false;
 const wins=attacker===p1?p1Wins:p2Wins;
 if(wins!==winsNeeded()-1)return false;
 clearThrowPair(attacker);clearThrowPair(defender);
 HAUNTED_FINALE={attacker,defender,clock:0,hits:1,duration:108};
 attacker.vx=attacker.vy=defender.vx=defender.vy=0;attacker.air=false;attacker.y=ground;
 defender.attack=null;defender.hitstun=999;defender.state='hit';defender.air=true;defender.y=ground-18;
 attacker.combo=Math.max(1,attacker.combo);attacker.comboT=180;
 projectiles=[];witchSigils=[];hitstop=0;superCine=0;superOwner=null;
 emit('finale_start',{fighter:attacker.name,fighterSide:attacker===p1?'p1':'p2'});
 return true;
}
function updateHauntedFinale(dt){
 const f=HAUNTED_FINALE;if(!f)return false;
 f.clock+=dt;
 while(f.hits<36&&f.clock>=f.hits*2.5){
  f.hits++;const a=f.attacker,d=f.defender;
  a.combo++;a.peakCombo=Math.max(a.peakCombo||0,a.combo);matchPeakCombo=Math.max(matchPeakCombo,a.combo);
  d.y=ground-22+(SYSTEM.reducedMotion?0:Math.sin(f.hits*2)*7);
  spawnFX('hit',d.x+Math.sin(f.hits*2.3)*22,d.y-60+Math.cos(f.hits)*24,false,.9,a.accent);
  emit('finale_hit',{attacker:a.name,defender:d.name,defenderSide:d===p1?'p1':'p2',move:'finale',damage:0});
  sweep(400+(f.hits%3)*70,160,.018,'triangle',.035);
  if(!SYSTEM.reducedMotion&&SYSTEM.shake)shake=Math.max(shake,2);
 }
 if(f.clock<f.duration)return false;
 f.attacker.attack=null;f.defender.y=ground;f.defender.air=false;f.defender.hitstun=0;f.defender.state='down';
 HAUNTED_FINALE=null;return true;
}
function drawHauntedFinale(){
 const f=HAUNTED_FINALE;if(!f)return;
 const phase=(f.clock%20)/20;
 x.save();x.translate(f.defender.x-stageCameraX,f.defender.y-85);
 NightbloomPaintedFX.draw(x,f.attacker.name.toLowerCase().replaceAll(' ','-')+'-super',SYSTEM.reducedMotion?.6:phase,{...fxRenderOptions(),projectile:true,size:SYSTEM.reducedMotion?220:300});
 if(SYSTEM.reducedMotion||SYSTEM.particles==='OFF')NightbloomPaintedFX.draw(x,'hit',.6,{...fxRenderOptions(),size:78});
 x.restore();
 roundRect(W/2-174,102,348,72,8,'#130b20ed',f.attacker.accent,2);
 x.textAlign='center';x.fillStyle='#ffe4a5';x.font='bold 20px Georgia';x.fillText('HAUNTED FINALE',W/2,128);
 x.fillStyle='#fff';x.font='bold 23px Consolas';x.fillText(f.hits+' / 36 HITS',W/2,158);
}
