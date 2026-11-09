/* Secret fighter definitions and Story challengers. */
const SECRET_CHALLENGES={
 ARACHNE:{opponent:'ARACHNE',stage:'CURSED LIBRARY',title:'The Silk Widow',before:'A silver thread crosses the road home. Arachne steps from the dark and offers one last duel.'},
 'LIVING DOLL':{opponent:'LIVING DOLL',stage:'CURSED LIBRARY',title:'The Unstrung',before:'The Living Doll pulls free of the last thread. Her first choice is to challenge the one who freed her.'},
 NARRATOR:{opponent:'NARRATOR',stage:'THE NEXT DAWN',title:'The Final Chapter',before:'The Narrator shuts her book and steps into the dawn. There is room for one more fight in the margins.'}
};
const SECRET_ART={};
for(const [name,bodyKey,portraitKey] of [['ARACHNE','arachne-v10-r2','arachne-v2'],['LIVING DOLL','living-doll-v10','living-doll-v10'],['NARRATOR','narrator','narrator']]){
 const body=new Image(),portrait=new Image();body.src='assets/fighters/secrets/'+bodyKey+'.png';portrait.src='assets/portraits/secrets/'+portraitKey+'.png';SECRET_ART[name]={body,portrait};
}
const narratorPageBurst=new Image();
narratorPageBurst.src='assets/fx/narrator-page-burst.webp';
function installSecretFighters(){
 Object.assign(CHAR_INFO,{
  NARRATOR:{color:'#d8afd8',accent:'#eabf75',team:'FINAL CHAPTER',quote:'“Do mind the margins, darling.”',effect:'pageCast'},
  ARACHNE:{color:'#d6bddb',accent:'#d697ea',team:'THE SILK WIDOW',quote:'“Every road ends in my web.”',effect:'silkLash'},
  'LIVING DOLL':{color:'#f0eee4',accent:'#91d9c0',team:'THE UNSTRUNG',quote:'“I have cut the strings. Have you?”',effect:'porcelainStrike'}
 });
 Object.assign(AI_PROFILES,{
  NARRATOR:{range:152,guard:1.1,throw:.95,normal:1,projectile:1.1,jump:.9,dash:1,super:1.1,retreat:.85,desc:'grimoire midrange duelist'},
  ARACHNE:{range:160,guard:1.05,throw:.9,normal:1.02,projectile:1.2,jump:1.1,dash:.9,super:1.1,retreat:1.05,desc:'silk midrange controller'},
  'LIVING DOLL':{range:130,guard:1.15,throw:1.05,normal:1.15,projectile:.9,jump:.7,dash:.85,super:1.1,retreat:.65,desc:'armored porcelain duelist'}
 });
 Object.assign(MOVESETS,{
  NARRATOR:{light:{damage:29,reach:60},heavy:{damage:66,reach:103},specialA:{damage:66,reach:143},specialB:{damage:34,reach:93},super:{damage:134,reach:165},projectile:{damage:25,speed:6},trait:'Page Cast controls midrange; Bookmark Ward grants brief armor'},
  ARACHNE:{light:{damage:30,reach:62},heavy:{damage:64,reach:102},specialA:{damage:66,reach:144},specialB:{damage:34,reach:92},super:{damage:132,reach:166},projectile:{damage:24,speed:5.8},trait:'Silk Lash reach + Widow Web slows movement'},
  'LIVING DOLL':{light:{damage:32,reach:60},heavy:{damage:68,reach:98},specialA:{damage:64,reach:118},specialB:{damage:37,reach:98},super:{damage:134,reach:158},projectile:{damage:27,speed:7.1},trait:'Porcelain Strike armor + Needle and Thread'}
 });
 Object.assign(MOVE_NAMES,{
  NARRATOR:{a:'Page Cast',b:'Bookmark Ward',super:'The Final Chapter'},
  ARACHNE:{a:'Silk Lash',b:'Widow Web',super:'Velvet Entombment'},
  'LIVING DOLL':{a:'Porcelain Strike',b:'Needle and Thread',super:'Cut the Strings'}
 });
 Object.assign(ARCHETYPE_LABELS,{ARACHNE:'SILK / SPACE CONTROL','LIVING DOLL':'ARMOR / MIDRANGE'});
 ARCHETYPE_LABELS.NARRATOR='GRIMOIRE / MIDRANGE';
 Object.assign(ENDINGS,{
  NARRATOR:'The Narrator closes her book on the last page. She leaves the margin blank. What happens after dawn belongs to the queens.',
  ARACHNE:'Arachne gathers the last thread of the Red Moon. Beneath the library she finds a porcelain woman suspended by silver strings. For the first time, the widow makes a web to set someone free. One strand snaps. Then another. The doll opens her eyes.',
  'LIVING DOLL':'At dawn, the Living Doll reaches for strings that are no longer there. Her maker is gone, her porcelain is cracked, and her next step belongs entirely to her. She leaves a silver needle on the library steps. Arachne will understand.'
 });
 Object.assign(PRE_FIGHT_LINES,{ARACHNE:'Struggle if you like, {opponent}. The silk remembers.','LIVING DOLL':'Watch closely, {opponent}. Nobody is moving me.',NARRATOR:'Do mind the margins, darling. They are there for your protection.'});
 const chapters=[
  ['VAMPIRA','CRIMSON CATHEDRAL','The First Thread'],['NEKOMATA','MOONLIT SHRINE','Tangled Shadows'],
  ['BANSHEE','FORSAKEN HARBOR','A Thread of Song'],['MEDUSA','CRIMSON CATHEDRAL','Eyes in the Dark'],
  ['JIANGSHI','FORSAKEN HARBOR','The Paper Knot'],['YUREI','CURSED LIBRARY','The Unseen Seam'],
  ['DULLAHAN','BONEFIELD','The Severed Road'],['WEREWOLF','MOONLIT SHRINE','Claws Against Silk'],
  ['MUMMY','BONEFIELD','Linen and Silver'],['WITCH','CURSED LIBRARY','The Maker’s Secret']
 ];
 STORY_ROUTES.ARACHNE=chapters.map(([opponent,stage,title],i)=>({opponent,stage,title,
  before:i===9?'Witch guards a locked chamber beneath the library. Behind its door, silver strings tremble around a porcelain prisoner. Arachne demands the key.':`A silver thread leads Arachne to ${opponent}. Each guardian holds a knot in the spell binding a stranger beneath the library.`,
  after:i===9?'The grimoire falls open. Arachne descends the stairs, carrying a blade fine enough to cut a curse.':`Another knot loosens. Beyond ${opponent}, Arachne follows the trembling thread toward the library.`}));
 STORY_ROUTES['LIVING DOLL']=chapters.slice().reverse().map(([opponent,stage],i)=>({opponent,stage,title:i===0?'The Empty Workshop':i===9?'A Step of Her Own':'Lessons in Freedom',
  before:i===0?'The Living Doll returns to the workshop. Witch insists a creation must obey its maker. The doll closes the door behind her.':`${opponent} waits on the road to dawn. The Living Doll chooses to face her, with no hand pulling the strings.`,
  after:i===9?'The horizon brightens. For the first time, she walks without listening for a command.':`A crack remains in the porcelain. The Living Doll leaves it there. It is proof the choice was hers.`}));
 for(const name of Object.keys(SECRET_ART)){REMADE_SHEET_FIGHTERS.add(name);FIGHTER_RENDER_TUNE[name]={y:0,scale:1};}
 STORY_ROUTES.NARRATOR=chapters.map(([opponent,stage],i)=>({opponent,stage,title:i===9?'The Last Page':'Between the Lines',
  before:`The Narrator turns to the chapter about ${opponent}. This time, she steps into the story.`,
  after:i===9?'The final page is hers to write.':`The ink dries beside ${opponent}’s name, and the Narrator turns the page.`}));
 refreshSecretInspector();
}
