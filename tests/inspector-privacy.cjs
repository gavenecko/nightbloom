const vm=require('node:vm'),context=require('./belladonna-integration.cjs');
vm.runInContext(`
 assert.equal(MAIN_MENU.includes('ATLAS INSPECTOR'),false);
 const earned=JSON.stringify(PROGRESS);
 window.nightbloomCanInspect=undefined;gameState='atlasInspector';drawAtlasInspector();assert.equal(gameState,'title');
 gameState='atlasInspector';handleFrontend();assert.equal(gameState,'title');
 window.nightbloomCanInspect=()=>false;gameState='atlasInspector';drawAtlasInspector();assert.equal(gameState,'title');
 window.nightbloomCanInspect=()=>true;gameState='atlasInspector';drawAtlasInspector();assert.equal(gameState,'atlasInspector');
 assert.equal(INSPECTOR_FIGHTERS.length,14);assert.equal(JSON.stringify(PROGRESS),earned);
 `,context);
console.log('PASS no public inspector menu, denied render/input without debug authorization, authorized all-roster inspection, no earned unlock changes.');
