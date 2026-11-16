const vm=require('node:vm'),context=require('./belladonna-integration.cjs');
vm.runInContext(`
 SYSTEM.controls='CLASSIC';gameMode='versus';
 assert.equal(mapInputCode('KeyO'),'TouchSpecialB');
 assert.match(pauseMoveRows('BELLADONNA')[3][1],/^O or QCF/);
 assert.match(pauseMoveRows('BELLADONNA')[6][0],/backward movement does not block/);
 SYSTEM.controls='ARCADE';
 assert.equal(mapInputCode('KeyH'),'TouchSpecialB');
 assert.match(pauseMoveRows('BELLADONNA')[3][1],/^H or QCF/);
 gameMode='local';
 assert.equal(P2_KEYMAP.Numpad6,'TouchSpecialB');
 assert.match(pauseMoveRows('BELLADONNA',2)[3][1],/^Num 6 or QCF/);
 assert.equal(CONTROL_PRESETS.CLASSIC.KeyO,'TouchSpecialB');
`,context);
console.log('PASS direct Special B keys for Classic, Arcade and local P2, matching move lists and explicit guard instructions.');
