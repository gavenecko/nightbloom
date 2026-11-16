const vm=require('node:vm'),context=require('./belladonna-integration.cjs');
vm.runInContext(`
 for(const name of ROSTER){
  playerChoice=name;enemyChoice=name==='VAMPIRA'?'BELLADONNA':'VAMPIRA';gameMode='story';training=false;
  p1=makeFighter(playerChoice,300,false);p2=makeFighter(enemyChoice,420,true);roundOver=false;matchOver=false;p1Wins=0;p2Wins=0;gameState='fight';HAUNTED_FINALE=null;
  resetMatchStats();p1.attack={type:'super',start:18,active:12,end:32,frame:20};p2.hp=0;
  assert.equal(tryStartHauntedFinale(p1,p2),false,'First round must use normal KO');
  p1Wins=1;p1.combo=1;p1.peakCombo=1;emit('hit',{attacker:p1.name,defender:p2.name,damage:50});
  assert.equal(tryStartHauntedFinale(p1,p2),true);
  for(let i=0;i<107;i++){assert.equal(updateHauntedFinale(1),false);assert.equal(p2.hp,0);assert.equal(p1Wins,1);}
  assert.equal(updateHauntedFinale(1),true);assert.equal(MATCH_STATS.p1.hits,36);assert.equal(MATCH_STATS.p1.overkillHits,35);assert.equal(p1.peakCombo,36);assert.equal(MATCH_STATS.p1.damage,50);
  finishCombatRound(false);assert.equal(p1Wins,2);assert.equal(roundOver,true);
 }
 training=true;roundOver=false;gameState='fight';p2.hp=0;p1.attack={type:'super'};assert.equal(tryStartHauntedFinale(p1,p2),false);training=false;
 p2.hp=10;assert.equal(tryStartHauntedFinale(p1,p2),false);p2.hp=0;p1.attack.type='heavy';assert.equal(tryStartHauntedFinale(p1,p2),false);
 playerChoice='BELLADONNA';enemyChoice='VAMPIRA';p1=makeFighter(playerChoice,300,false);p2=makeFighter(enemyChoice,380,true);clearInputs();
 p1Wins=1;p2Wins=0;roundOver=false;matchOver=false;roundIntro=0;HAUNTED_FINALE=null;resetMatchStats();p1.meter=100;p2.hp=20;
 doAttack(p1,'super');p1.attack.frame=p1.attack.start-1;updateF(p1,p2,1);
 assert.ok(HAUNTED_FINALE,'Real lethal super contact must start Finale');assert.equal(p1.combo,1);assert.equal(p1Wins,1);
 updateHauntedFinale(108);assert.equal(MATCH_STATS.p1.hits,36);assert.equal(p1.combo,36);assert.equal(p2.hp,0);
 beginCourseStats('story',playerChoice);gameMode='story';
 for(const side of ['p1','p2','p1']){const stats={p1:{...emptyFighterStats(playerChoice),hits:12,damage:100,damageTaken:30,peakCombo:8,supers:1},rounds:2,duration:30};recordCourseMatch(stats,side);recordCourseMatch(stats,side);}
 assert.equal(COURSE_STATS.matches,3);assert.equal(COURSE_STATS.wins,2);assert.equal(COURSE_STATS.losses,1);assert.equal(COURSE_STATS.hits,36);assert.equal(COURSE_STATS.damage,300);assert.equal(COURSE_STATS.seconds,90);
 gameState='routeComplete';assert.equal(maybeShowCourseSummary(),true);assert.equal(window.nightbloomModalOpen,true);closeGameModal(false);assert.equal(maybeShowCourseSummary(),false);
 gameState='fight';paused=false;requestTitleExit();assert.equal(window.nightbloomModalOpen,true);assert.equal(gameState,'fight');closeGameModal(false);assert.equal(gameState,'fight');assert.equal(paused,false);
 requestTitleExit();closeGameModal(true);assert.equal(gameState,'title');assert.equal(window.nightbloomModalOpen,false);
 assert.deepEqual(touchDirectionKeys(0,0,40),[]);assert.deepEqual(touchDirectionKeys(30,-30,40),['KeyD','KeyW']);
 touchSources.set('one',new Set(['KeyD']));syncTouchInputs();assert.equal(keys.KeyD,true);assert.equal(pressed.KeyD,1);
 touchSources.set('two',new Set(['KeyJ']));syncTouchInputs();assert.equal(keys.KeyD,true);assert.equal(keys.KeyJ,true);
 gamepad();assert.equal(keys.KeyD,true,'Controller polling must preserve held touch movement');assert.equal(keys.KeyJ,true);
 touchSources.delete('one');syncTouchInputs();assert.equal(keys.KeyD,false);assert.equal(keys.KeyJ,true);
 releaseTouchControls();assert.equal(keys.KeyJ,false);assert.equal(touchSources.size,0);
 kbKeys.KeyD=true;touchSources.set('one',new Set(['KeyD']));syncTouchInputs();releaseTouchControls();assert.equal(keys.KeyD,true);kbKeys.KeyD=false;clearInputs();
 touchMode='ON';touchView='';gameState='fight';updateTouchPresentation();assert.equal(document.getElementById('touchControls').hidden,false);
 touchMode='OFF';touchView='';updateTouchPresentation();assert.equal(document.getElementById('touchControls').hidden,true);
 `,context);
console.log('PASS 14 Finale hit counts and delayed KOs, training/nonlethal/normal guards, aggregate stats, one-time summary, cancel/confirm quit, joystick diagonals/deadzone/multitouch/release and touch selection.');
