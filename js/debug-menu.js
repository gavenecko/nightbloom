/* Local developer tools. This client-side password is a convenience gate, not a security boundary. */
(()=>{
 const PASSWORD='Nightbloom!081',BACKUP='nightbloom_debug_progress_backup';
 let authenticated=false,returnFocus=null;
 const style=document.createElement('style');
 style.textContent=`#nbDebug{width:min(640px,94vw);max-height:90dvh;overflow:auto;background:#130e20;color:#f4e9fa;border:2px solid #bc88df;border-radius:12px;padding:24px;font:14px Georgia}#nbDebug::backdrop{background:#000b}#nbDebug h2{margin-top:0;color:#edc67e}#nbDebug p{line-height:1.5}#nbDebug label{display:block;margin:12px 0}#nbDebug input,#nbDebug select,#nbDebug button{font:14px Consolas;padding:9px;background:#271b36;color:#fff;border:1px solid #9575a6;border-radius:5px;max-width:100%}#nbDebug button{cursor:pointer;margin:4px}#nbDebug button:focus-visible{outline:2px solid #6fffe3}#nbDebug .row{display:flex;flex-wrap:wrap;gap:8px}#nbDebug [hidden]{display:none!important}#nbDebugStatus{min-height:2em;color:#80efda}`;
 document.head.append(style);
 const dialog=document.createElement('dialog');dialog.id='nbDebug';dialog.setAttribute('aria-labelledby','nbDebugTitle');
 dialog.innerHTML=`<h2 id="nbDebugTitle">NIGHTBLOOM · Debug menu</h2>
 <form id="nbDebugLogin"><label>Password <input id="nbDebugPassword" type="password" autocomplete="off" required></label><button>Unlock menu</button></form>
 <section id="nbDebugTools" hidden><p>Testing tools affect this browser only. Progress is backed up before your first debug unlock.</p>
 <div class="row"><button data-action="all">Unlock everything</button><button data-action="fighters">Unlock secret fighters</button><button data-action="restore">Restore pre-debug progress</button></div>
 <label>Your fighter <select id="nbDebugFighter"></select></label><label>Opponent <select id="nbDebugOpponent"></select></label><label>Stage <select id="nbDebugStage"></select></label>
 <div class="row"><button data-action="fight">Test fight</button><button data-action="training">Training</button><button data-action="challenger">Test secret challenger</button><button data-action="bonus">Destroy-the-relic bonus</button></div>
 <div class="row"><button data-action="ending">Congratulations / ending</button><button data-action="swimsuit">Bonus Ending</button><button data-action="group">Bonus Group</button><button data-action="gallery">Gallery</button><button data-action="inspector">Sprite inspector</button></div>
 <p>Ending previews do not earn rewards. Unlock everything grants all fighters, endings, Bonus Endings and Bonus Group.</p></section>
 <p id="nbDebugStatus" role="status" aria-live="polite"></p><button id="nbDebugClose">Close</button><button id="nbDebugLock" hidden>Lock menu</button>`;
 document.body.append(dialog);
 const find=id=>dialog.querySelector('#'+id),status=message=>find('nbDebugStatus').textContent=message;
 for(const id of ['nbDebugFighter','nbDebugOpponent'])for(const name of ROSTER)find(id).add(new Option(name,name));
 for(const name of STAGES)find('nbDebugStage').add(new Option(name,name));
 function close(){dialog.close();window.nightbloomDebugOpen=false;clearInputs();returnFocus?.focus();}
 function open(){if(dialog.open)return;returnFocus=document.activeElement;clearInputs();window.nightbloomDebugOpen=true;dialog.showModal();find(authenticated?'nbDebugFighter':'nbDebugPassword').focus();}
 function lock(){authenticated=false;find('nbDebugTools').hidden=true;find('nbDebugLogin').hidden=false;find('nbDebugLock').hidden=true;find('nbDebugPassword').value='';status('Menu locked.');find('nbDebugPassword').focus();}
 function backup(){if(!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,JSON.stringify(PROGRESS));}
 function unlock(all){backup();for(const name of Object.keys(SECRET_CHALLENGES))PROGRESS.secretWins[name]=true;if(all)for(const name of ROSTER){PROGRESS.storyClears[name]=true;PROGRESS.storyReplays[name]=true;}saveProgress();refreshSecretInspector();status(all?'All content unlocked. Open Gallery to view rewards.':'All three secret fighters unlocked.');}
 document.getElementById('debugMenuButton').addEventListener('click',open);
 document.addEventListener('keydown',event=>{if(event.code==='F10'){event.preventDefault();event.stopImmediatePropagation();dialog.open?close():open();return;}if(dialog.open)event.stopImmediatePropagation();},true);
 for(const event of ['pointerdown','click'])dialog.addEventListener(event,e=>e.stopPropagation());
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 find('nbDebugClose').onclick=close;find('nbDebugLock').onclick=lock;
 find('nbDebugLogin').onsubmit=event=>{event.preventDefault();if(find('nbDebugPassword').value!==PASSWORD){status('Incorrect password.');return;}authenticated=true;find('nbDebugPassword').value='';find('nbDebugLogin').hidden=true;find('nbDebugTools').hidden=false;find('nbDebugLock').hidden=false;status('Debug menu unlocked for this page session.');find('nbDebugFighter').focus();};
 dialog.addEventListener('click',event=>{
  const action=event.target.closest('[data-action]')?.dataset.action;if(!action||!authenticated)return;
  try{
   if(action==='all'||action==='fighters'){unlock(action==='all');return;}
   if(action==='restore'){const raw=localStorage.getItem(BACKUP);if(!raw){status('No pre-debug backup exists.');return;}const saved=JSON.parse(raw);if(!saved||!saved.storyClears||!saved.secretWins)throw Error('Invalid progress backup');PROGRESS=saved;saveProgress();refreshSecretInspector();localStorage.removeItem(BACKUP);status('Pre-debug progress restored.');return;}
   const fighter=find('nbDebugFighter').value,opponent=find('nbDebugOpponent').value,stage=find('nbDebugStage').value;
   if(action==='challenger'&&!SECRET_CHALLENGES[opponent]){status('Select Arachne, Living Doll or Narrator as the opponent.');return;}
   close();playerChoice=fighter;enemyChoice=opponent;selectedStage=stage;galleryIndex=ROSTER.indexOf(fighter);galleryArtwork='';newlyUnlocked=[];groupRewardJustUnlocked=false;
   if(action==='gallery'){gameState='gallery';return;}
   if(action==='inspector'){refreshSecretInspector();gameState='atlasInspector';return;}
   if(action==='swimsuit'||action==='group'){galleryArtwork=action;gameState='gallery';return;}
   gameMode='versus';startFight();
   if(action==='training'){training=true;trainingDummyMode=0;trainingSpeed=1;p1.meter=p2.meter=100;return;}
   if(action==='bonus'){ladder=[{opponent,stage}];ladderIndex=0;startRelicBonus();return;}
   if(action==='challenger'){gameMode='story';ladder=[{...SECRET_CHALLENGES[opponent],secret:true}];ladderIndex=0;relicBonusPlayed=true;startRouteFight();return;}
   if(action==='ending'){gameMode='story';storyReward='ending';storyEnding=false;storyLost=false;ladder=[];ladderIndex=0;matchOver=true;roundOver=true;p1Wins=2;p2Wins=0;p1.attack=null;gameState='routeComplete';}
  }catch(error){status('Unable to complete action: '+error.message);}
 });
})();
