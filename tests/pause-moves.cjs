const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'js/nightbloom.js'),'utf8'),secret=fs.readFileSync(path.join(root,'js/secret-fighters.js'),'utf8');
const names=source.slice(source.indexOf('const MOVE_NAMES='),source.indexOf('function drawMoveList('));
const extra=secret.slice(secret.indexOf(' Object.assign(MOVE_NAMES,'),secret.indexOf(' Object.assign(ARCHETYPE_LABELS,'));
const rows=source.slice(source.indexOf('function pauseMoveRows('),source.indexOf('function drawPauseIndicator('));
const context={assert,SYSTEM:{controls:'CLASSIC'},gameMode:'versus'};vm.createContext(context);vm.runInContext(names+extra+rows,context);
vm.runInContext(String.raw`
 for(const name of Object.keys(MOVE_NAMES)){
  const rows=pauseMoveRows(name);assert.equal(rows.length,8);
  assert.equal(rows[2][0],MOVE_NAMES[name].a);assert.equal(rows[3][0],MOVE_NAMES[name].b);assert.equal(rows[4][0],MOVE_NAMES[name].super);
  assert.match(rows[4][1],/100 meter/);assert.match(rows[3][1],/QCF/);
 }
 assert.match(pauseMoveRows('VAMPIRA')[0][1],/^J \/ Pad A/);
 SYSTEM.controls='ARCADE';assert.match(pauseMoveRows('VAMPIRA')[0][1],/^Z \/ Pad X/);assert.match(pauseMoveRows('VAMPIRA')[4][1],/^V \/ Pad RB/);
 gameMode='local';assert.match(pauseMoveRows('VAMPIRA',1)[0][1],/^J \/ Pad A/);assert.match(pauseMoveRows('VAMPIRA',2)[0][1],/^Num 1 \/ Pad A/);assert.match(pauseMoveRows('VAMPIRA',2)[4][1],/^Num 4 \/ Pad Y/);
`,context);
console.log('PASS all 13 character move names, meter requirement, Classic/Arcade controls and local P2 bindings');
