const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../js/fullscreen.js'),'utf8');
function harness(){
 const classes=new Set(),events={},elements={fullscreenButton:{setAttribute(k,v){this[k]=v},addEventListener(k,v){events['button:'+k]=v}},fullscreenStatus:{}};
 const document={documentElement:{},body:{classList:{contains:k=>classes.has(k),add:k=>classes.add(k),remove:k=>classes.delete(k)}},getElementById:k=>elements[k],addEventListener:(k,v)=>events[k]=v};
 let time=1000;const context={document,window:{},performance:{now:()=>time},addEventListener:(k,v)=>events['window:'+k]=v};vm.createContext(context);vm.runInContext(source,context);
 return {context,document,elements,events,classes,advance:n=>{time+=n},run:code=>vm.runInContext(code,context)};
}
(async()=>{
 const native=harness();let requests=0,exits=0;
 native.document.documentElement.requestFullscreen=async()=>{requests++;native.document.fullscreenElement=native.document.documentElement;native.events.fullscreenchange()};
 native.document.exitFullscreen=async()=>{exits++;native.document.fullscreenElement=null;native.events.fullscreenchange()};
 await native.run('toggleGameFullscreen()');assert.equal(requests,1);assert.equal(native.elements.fullscreenButton.textContent,'Exit fullscreen');assert.equal(native.elements.fullscreenButton['aria-pressed'],'true');
 assert.equal(native.run('consumeFullscreenEscape()'),true);await Promise.resolve();assert.equal(exits,1);assert.equal(native.elements.fullscreenButton.textContent,'Fullscreen');
 assert.equal(native.run('consumeFullscreenEscape()'),true,'Native Escape must not also quit the match');native.advance(451);assert.equal(native.run('consumeFullscreenEscape()'),false);
 const fallback=harness();await fallback.run('toggleGameFullscreen()');assert.ok(fallback.classes.has('expanded-game'));assert.equal(fallback.elements.fullscreenButton.textContent,'Exit expanded view');assert.equal(fallback.run('consumeFullscreenEscape()'),true);assert.ok(!fallback.classes.has('expanded-game'));
 const blocked=harness();blocked.document.documentElement.requestFullscreen=async()=>{throw Error('Blocked iframe')};await blocked.run('toggleGameFullscreen()');assert.ok(blocked.classes.has('expanded-game'));assert.match(blocked.elements.fullscreenStatus.textContent,/embed/);
 const webkit=harness();webkit.document.documentElement.webkitRequestFullscreen=()=>{webkit.document.webkitFullscreenElement=webkit.document.documentElement};webkit.document.webkitExitFullscreen=()=>{webkit.document.webkitFullscreenElement=null};await webkit.run('toggleGameFullscreen()');assert.equal(webkit.elements.fullscreenButton.textContent,'Exit fullscreen');await webkit.run('toggleGameFullscreen()');assert.equal(webkit.document.webkitFullscreenElement,null);
 const denied=harness();denied.document.fullscreenEnabled=false;denied.document.documentElement.requestFullscreen=()=>{throw Error('Must not request')};await denied.run('toggleGameFullscreen()');assert.ok(denied.classes.has('expanded-game'));
 console.log('PASS native enter/exit, Escape guard, unsupported/denied/blocked embed fallback, prefixed Safari API and button state.');
})().catch(error=>{console.error(error);process.exitCode=1});
