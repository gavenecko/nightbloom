let COURSE_STATS=null,LAST_COURSE_STATS=null;
function beginCourseStats(mode,name){
 COURSE_STATS={fighter:name,mode,matches:0,wins:0,losses:0,rounds:0,hits:0,attacks:0,damage:0,damageTaken:0,throws:0,supers:0,counters:0,blocks:0,techs:0,peakCombo:0,finales:0,overkillHits:0,seconds:0,summaryMatches:-1};
}
function recordCourseMatch(stats,winnerSide){
 const course=COURSE_STATS;
 if(!course||course.fighter!==playerChoice||course.mode!==gameMode||!['story','arcade'].includes(gameMode)||stats.courseRecorded)return;
 stats.courseRecorded=true;course.matches++;
 if(winnerSide==='p1')course.wins++;else course.losses++;
 course.rounds+=stats.rounds||0;course.seconds+=stats.duration||0;
 const s=stats.p1;
 for(const key of ['hits','attacks','damage','damageTaken','throws','supers','counters','blocks','techs','finales','overkillHits'])course[key]+=s[key]||0;
 course.peakCombo=Math.max(course.peakCombo,s.peakCombo||0);
}
function maybeShowCourseSummary(){
 const course=COURSE_STATS;
 if(gameState!=='routeComplete'||!course||course.fighter!==playerChoice||course.mode!==gameMode||!course.matches||course.summaryMatches===course.matches)return false;
 course.summaryMatches=course.matches;LAST_COURSE_STATS={...course};
 showCourseSummary(LAST_COURSE_STATS);return true;
}
function showCourseSummary(stats=LAST_COURSE_STATS){
 if(!stats)return;
 const title=document.getElementById('courseSummaryTitle'),body=document.getElementById('courseSummaryRows');
 title.textContent=stats.fighter+' · COURSE STATS';body.replaceChildren();
 const seconds=Math.round(stats.seconds),duration=Math.floor(seconds/60)+'m '+seconds%60+'s';
 const rows=[['Matches won / played',stats.wins+' / '+stats.matches],['Retries / losses',stats.losses],['Total hits',stats.hits],['Highest combo',stats.peakCombo+' hits'],['Damage dealt',Math.round(stats.damage)],['Damage taken',Math.round(stats.damageTaken)],['Attacks / supers',stats.attacks+' / '+stats.supers],['Throw attempts / counters',stats.throws+' / '+stats.counters],['Blocked attacks dealt',stats.blocks],['Haunted Finales',stats.finales],['Overkill hits',stats.overkillHits],['Match time',duration]];
 for(const [label,value]of rows){const term=document.createElement('dt'),description=document.createElement('dd');term.textContent=label;description.textContent=String(value);body.append(term,description);}
 openGameModal(document.getElementById('courseSummary'),()=>{});
}
