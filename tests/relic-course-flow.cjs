const vm=require('node:vm'),context=require('./belladonna-integration.cjs');
vm.runInContext(`
 function enterFrontend(){for(const k of Object.keys(pressed))delete pressed[k];pressed.Enter=1;handleFrontend();for(const k of Object.keys(pressed))delete pressed[k];}
 for(const mode of ['story','arcade'])for(const name of ROSTER){
  playerChoice=name;beginRoute(mode);const length=ladder.length,half=Math.ceil(length/2);let bonuses=0;
  for(let win=1;win<=length;win++){
   if(gameState==='storyScene'&&storyAfterText)enterFrontend();
   if(gameState!=='fight')enterFrontend();
   assert.equal(gameState,'fight',mode+' '+name+' before match '+win);
   matchOver=true;routeHandled=false;p1Wins=2;p2Wins=0;advanceRoute();
   if(win===half){
    assert.equal(gameState,'relicBonus','Bonus must be queued directly after halfway win: '+mode+' '+name);
    assert.equal(ladderIndex,win);assert.equal(relicBonus.phase,'ready');assert.equal(relicBonus.time,900);assert.equal(p1.meter,100);bonuses++;
    const score=routeScore;enterFrontend();assert.equal(relicBonus.phase,'active');damageRelic(RELIC_MAX_HP);assert.equal(relicBonus.phase,'done');assert.equal(routeScore-score,mode==='arcade'?1500:0);enterFrontend();
    assert.equal(gameState,mode==='story'?'storyScene':'arcadeResult');assert.equal(ladderIndex,win);
   }else assert.notEqual(gameState,'relicBonus');
  }
  assert.equal(bonuses,1);
 }
 playerChoice='VAMPIRA';beginRoute('story');ladderIndex=4;startRouteFight();
 matchOver=true;routeHandled=false;p1Wins=0;p2Wins=2;advanceRoute();assert.equal(gameState,'continueScreen');assert.equal(relicBonusPlayed,false);
 enterFrontend();assert.equal(gameState,'fight');assert.equal(ladderIndex,4);
 matchOver=true;routeHandled=false;p1Wins=2;p2Wins=0;advanceRoute();assert.equal(gameState,'relicBonus');
 enterFrontend();relicBonus.time=1;updateRelicBonus(1);assert.equal(relicBonus.phase,'done');assert.ok(relicBonus.hp>0);enterFrontend();
 assert.equal(gameState,'storyScene');assert.equal(ladderIndex,5);assert.equal(shouldStartRelicBonus(),false);
 enterFrontend();enterFrontend();assert.equal(gameState,'fight');assert.equal(ladderIndex,5);
 beginRoute('story');assert.equal(relicBonusPlayed,false);
 `,context);
console.log('PASS 28 course flows, halfway win, ready/start/destroy/resume, score, exactly once, loss/retry, timeout and new-course reset.');
