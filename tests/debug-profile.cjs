const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'js/nightbloom.js'),'utf8');
const elements=new Map();function element(){return {hidden:false,value:'',listeners:{},add(){},setAttribute(){},append(){},focus(){},addEventListener(n,f){this.listeners[n]=f},querySelector(s){if(!elements.has(s))elements.set(s,element());return elements.get(s)},showModal(){this.open=true},close(){this.open=false}}}
const dialog=element(),button=element(),store=new Map(),earned={version:1,storyClears:{VAMPIRA:true},storyReplays:{},secretWins:{},arcadeBest:{VAMPIRA_NORMAL:100}};
const context={console,window:{},document:{head:element(),body:element(),createElement:t=>t==='dialog'?dialog:element(),getElementById:()=>button,addEventListener(){},activeElement:button},Option:function(){},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},ROSTER:['VAMPIRA','ARACHNE','LIVING DOLL','NARRATOR'],STAGES:['MOONLIT SHRINE'],DIFFICULTY_ORDER:['NORMAL'],SECRET_CHALLENGES:{ARACHNE:{},'LIVING DOLL':{},NARRATOR:{}},PROGRESS:JSON.parse(JSON.stringify(earned)),clearInputs(){},refreshSecretInspector(){}};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('function progressStorageKey(){'),source.indexOf('function resetProgressSafe(){'))+source.slice(source.indexOf('function repairProgress(){'),source.indexOf('\nrepairProgress();',source.indexOf('function saveProgress(){'))),context);
vm.runInContext('saveProgress()',context);const original=store.get('nightbloom_progress');
vm.runInContext(fs.readFileSync(path.join(root,'js/debug-menu.js'),'utf8'),context);
const action=name=>dialog.listeners.click({target:{closest:()=>({dataset:{action:name}})}});
action('all');assert.equal(store.get('nightbloom_test_progress'),undefined);
dialog.querySelector('#nbDebugPassword').value='wrong';elements.get('#nbDebugLogin').onsubmit({preventDefault(){}});action('all');assert.equal(store.get('nightbloom_test_progress'),undefined);
dialog.querySelector('#nbDebugPassword').value='Nightbloom!081';elements.get('#nbDebugLogin').onsubmit({preventDefault(){}});
action('all');assert.equal(context.window.nightbloomTestProfile,true);assert.equal(Object.keys(context.PROGRESS.storyReplays).length,4);assert.equal(store.get('nightbloom_progress'),original);
context.PROGRESS.arcadeBest.VAMPIRA_NORMAL=900;vm.runInContext('saveProgress()',context);assert.equal(store.get('nightbloom_progress'),original);
action('restore');assert.equal(context.window.nightbloomTestProfile,false);assert.equal(JSON.stringify(context.PROGRESS),original);assert.equal(context.gameState,'title');
action('all');assert.equal(context.PROGRESS.arcadeBest.VAMPIRA_NORMAL,900);action('restore');assert.equal(store.get('nightbloom_progress'),original);
store.set('nightbloom_debug_progress_backup',original);context.PROGRESS.storyReplays.VAMPIRA=true;action('restore');assert.equal(store.has('nightbloom_debug_progress_backup'),false);assert.equal(store.get('nightbloom_progress'),original);
console.log('PASS debug password gate, isolated unlocks and scores, return/resume test save, legacy backup recovery');
