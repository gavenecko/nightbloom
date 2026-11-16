/* Approved Belladonna art, core roster data and presentation. */
const BELLADONNA_DATA={
  "version": 1,
  "status": "audio_and_dialogue_ready_for_fighter_integration",
  "introductions": {
    "VAMPIRA": "Vampira, the Scarlet Crown. Even the oldest hunger must answer the dawn.",
    "NEKOMATA": "Nekomata, the Twin Souls. Two tails, countless tricks, and one path through the haunted night.",
    "BANSHEE": "Banshee, the Silent Requiem. Tonight, the voice that mourns the dead will sing for herself.",
    "MEDUSA": "Medusa, the Stone Garden. Beneath a crown of serpents, an ancient queen refuses to become a memory.",
    "JIANGSHI": "Jiangshi, the Sealed Corpse. The talisman holds, but the Red Moon has given her a new command.",
    "YUREI": "Yurei, the Pale Veil. A woman lost between worlds follows the first promise of morning.",
    "DULLAHAN": "Dullahan, the Last Ride. With her head beneath one arm, she rides to keep an oath older than the road.",
    "WEREWOLF": "Werewolf, the Moonfang. The hunt begins where fear ends, and this night has nowhere left to hide.",
    "MUMMY": "Mummy, the Gilded Curse. An empress awakens, carrying a kingdom of forgotten names beneath her linen.",
    "WITCH": "Witch, the Hex Circle. She has read the ending. Naturally, she intends to rewrite it.",
    "BELLADONNA": "Belladonna, the Nightshade Bloom. Small wings carry a dangerous promise: every flower has its thorns.",
    "ARACHNE": "Arachne, the Silk Widow. Every thread leads somewhere. This time, she will choose where it ends.",
    "LIVING DOLL": "The Living Doll, the Unstrung. The strings have fallen. Her next step will be her own.",
    "NARRATOR": "The Narrator, the Final Chapter. At last, the woman who tells the tale steps into its pages."
  },
  "belladonna": {
    "name": "BELLADONNA",
    "core": true,
    "team": "NIGHTSHADE BLOOM",
    "preFight": "Careful, {opponent}. Every bloom has its thorns.",
    "clearQuote": "The sweetest bloom survives the darkest night.",
    "ending": "Belladonna returns to a garden that has forgotten how to greet the sun. She folds her wings, scatters the last of the Red Moon’s dust, and waits. One violet bell opens. Then another. By morning, the haunted garden is full of living color. Small wings, she decides, can still carry the dawn.",
    "moves": {
      "a": "Fairy Dust",
      "b": "Nightshade Gale",
      "super": "Midnight Bloom"
    },
    "routes": [
      {
        "opponent": "VAMPIRA",
        "stage": "CRIMSON CATHEDRAL",
        "title": "Roses and Nightshade",
        "before": "Belladonna follows a trail of crimson petals into the cathedral. Vampira admires the flower on her cap, then asks whether fairies bleed.",
        "after": "A rose petal settles beside a nightshade bloom. Belladonna leaves before Vampira can decide which scent she prefers."
      },
      {
        "opponent": "NEKOMATA",
        "stage": "MOONLIT SHRINE",
        "title": "A Cat Among the Flowers",
        "before": "Two tails sweep through the shrine garden. Nekomata has been chasing the fairy lights, and Belladonna intends to teach her what happens when she catches one.",
        "after": "Nekomata sneezes a cloud of fairy dust. Belladonna decides that counts as an apology."
      },
      {
        "opponent": "BANSHEE",
        "stage": "FORSAKEN HARBOR",
        "title": "A Song for Small Wings",
        "before": "Banshee sings over the harbor, and the flowers along the shore close their petals. Belladonna has come to ask for a quieter verse.",
        "after": "The harbor song softens. One small violet flower opens beside the water."
      },
      {
        "opponent": "MEDUSA",
        "stage": "CRIMSON CATHEDRAL",
        "title": "The Garden That Never Blooms",
        "before": "Medusa offers Belladonna a place in her stone garden. The fairy prefers gardens that grow, and says so rather more sharply than she should.",
        "after": "A vine curls around a marble pedestal. Medusa watches the first living blossom with an expression Belladonna cannot quite read."
      },
      {
        "opponent": "JIANGSHI",
        "stage": "FORSAKEN HARBOR",
        "title": "Petals on the Paper Seal",
        "before": "A nightshade petal sticks to Jiangshi’s talisman. Belladonna tries to brush it away. Jiangshi mistakes the gesture for an attack.",
        "after": "The paper seal remains intact. Belladonna leaves a flower beside it and keeps her hands to herself."
      },
      {
        "opponent": "YUREI",
        "stage": "CURSED LIBRARY",
        "title": "Flowers Between the Pages",
        "before": "A pressed flower falls from an unopened book. Yurei remembers who placed it there. Belladonna follows the memory into the library’s darkest aisle.",
        "after": "Belladonna returns the flower to its page. For a moment, the woman beside the shelf looks less alone."
      },
      {
        "opponent": "DULLAHAN",
        "stage": "BONEFIELD",
        "title": "The Rider and the Firefly",
        "before": "Dullahan’s head spots a fairy light beside the road. Her body follows the wrong turn. Belladonna would like to explain, but the rider has already lowered her lance.",
        "after": "The head and body agree on the road home. Belladonna lights the first mile with a trail of gold."
      },
      {
        "opponent": "WEREWOLF",
        "stage": "MOONLIT SHRINE",
        "title": "A Scent of Poison Flowers",
        "before": "Werewolf catches the scent of nightshade beneath the moon. Belladonna grows to meet her, smiling as the hunter realizes the little light has teeth of its own.",
        "after": "The hunt ends in a shower of petals. Werewolf shakes the dust from her fur and laughs."
      },
      {
        "opponent": "MUMMY",
        "stage": "BONEFIELD",
        "title": "A Bloom for the Forgotten",
        "before": "Mummy carries the names of a vanished kingdom. Belladonna offers a flower that grows only where a name is remembered. The empress asks her to prove the gift is real.",
        "after": "A violet flower takes root between the old stones. Mummy speaks one forgotten name, and another blossom opens."
      },
      {
        "opponent": "WITCH",
        "stage": "THE NEXT DAWN",
        "title": "Who Owns the Morning",
        "before": "Witch has drawn a circle around the last nightshade flower. Belladonna steps into the dawn to remind her that living things do not belong to the spell that names them.",
        "after": "The circle breaks into harmless sparks. As the Red Moon fades, Belladonna scatters its stolen light across the waking garden."
      }
    ]
  },
  "encounters": {
    "VAMPIRA": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers VAMPIRA a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around VAMPIRA. Belladonna folds her wings and leaves the path to dawn open."
    },
    "NEKOMATA": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers NEKOMATA a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around NEKOMATA. Belladonna folds her wings and leaves the path to dawn open."
    },
    "BANSHEE": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers BANSHEE a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around BANSHEE. Belladonna folds her wings and leaves the path to dawn open."
    },
    "MEDUSA": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers MEDUSA a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around MEDUSA. Belladonna folds her wings and leaves the path to dawn open."
    },
    "JIANGSHI": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers JIANGSHI a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around JIANGSHI. Belladonna folds her wings and leaves the path to dawn open."
    },
    "YUREI": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers YUREI a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around YUREI. Belladonna folds her wings and leaves the path to dawn open."
    },
    "DULLAHAN": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers DULLAHAN a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around DULLAHAN. Belladonna folds her wings and leaves the path to dawn open."
    },
    "WEREWOLF": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers WEREWOLF a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around WEREWOLF. Belladonna folds her wings and leaves the path to dawn open."
    },
    "MUMMY": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers MUMMY a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around MUMMY. Belladonna folds her wings and leaves the path to dawn open."
    },
    "WITCH": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers WITCH a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around WITCH. Belladonna folds her wings and leaves the path to dawn open."
    },
    "ARACHNE": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers ARACHNE a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around ARACHNE. Belladonna folds her wings and leaves the path to dawn open."
    },
    "LIVING DOLL": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers LIVING DOLL a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around LIVING DOLL. Belladonna folds her wings and leaves the path to dawn open."
    },
    "NARRATOR": {
      "opponent": "BELLADONNA",
      "stage": "MOONLIT SHRINE",
      "title": "The Nightshade Bloom",
      "before": "Gold-green lights drift through the shrine garden. Belladonna grows from a spark to a queen and offers NARRATOR a warning: every bloom has its thorns.",
      "after": "The fairy dust settles around NARRATOR. Belladonna folds her wings and leaves the path to dawn open."
    }
  },
  "superNames": {
    "VAMPIRA": "Scarlet Coven",
    "NEKOMATA": "Two Souls",
    "BANSHEE": "Requiem",
    "MEDUSA": "Stone Garden",
    "JIANGSHI": "Eight Seals Broken",
    "YUREI": "Hundred Haunts",
    "DULLAHAN": "Midnight Procession",
    "WEREWOLF": "Blood Moon Frenzy",
    "MUMMY": "Pharaoh’s Binding",
    "WITCH": "Grand Hex",
    "BELLADONNA": "Midnight Bloom",
    "ARACHNE": "Velvet Entombment",
    "LIVING DOLL": "Cut the Strings",
    "NARRATOR": "The Final Chapter"
  }
};
const BELLADONNA_ART={body:new Image(),portrait:new Image()};
BELLADONNA_ART.body.src='assets/fighters/belladonna/body.png';
BELLADONNA_ART.portrait.src='assets/portraits/belladonna.webp';
const BELLADONNA_INFO={color:'#a47bd5',accent:'#c6eb74',team:'NIGHTSHADE BLOOM',quote:'“Every bloom has its thorns.”',effect:'fairyDust'};
const BELLADONNA_ANIMS={airlight:{row:9,frames:[0,1,2,3]},airheavy:{row:9,frames:[4,5,6,7]}};
function bodyAnimationFor(name,action){return (name==='BELLADONNA'&&BELLADONNA_ANIMS[action])||REMADE_ANIMS[BODY_ACTIONS[action]||action]||REMADE_ANIMS.idle;}
function belladonnaPoseScale(action,frame){
 const i=Math.max(0,Math.min(3,frame));
 return action==='intro'?[.18,.42,.72,1][i]:action==='victory'?[1,.72,.4,.2][i]:1;
}
function installBelladonna(){
 const data=BELLADONNA_DATA.belladonna;
 CHAR_INFO.BELLADONNA=BELLADONNA_INFO;
 AI_PROFILES.BELLADONNA={range:145,guard:.95,throw:.8,normal:1,projectile:1.25,jump:1.1,dash:1.1,super:1.1,retreat:1,desc:'fairy dust and petal space control'};
 MOVESETS.BELLADONNA={light:{damage:28,reach:61},heavy:{damage:61,reach:96},specialA:{damage:61,reach:140},specialB:{damage:30,reach:88},super:{damage:132,reach:170},projectile:{damage:24,speed:6.2},trait:'Fairy Dust controls midrange; Nightshade Gale carries petals across the stage'};
 MOVE_NAMES.BELLADONNA=data.moves;ARCHETYPE_LABELS.BELLADONNA='FAIRY / PETAL CONTROL';
 PRE_FIGHT_LINES.BELLADONNA=data.preFight;CLEAR_QUOTES.BELLADONNA=data.clearQuote;ENDINGS.BELLADONNA=data.ending;
 STORY_ROUTES.BELLADONNA=data.routes.map(node=>({...node}));
 for(const [name,node]of Object.entries(BELLADONNA_DATA.encounters)){
  const route=STORY_ROUTES[name];
  if(route&&!route.some(n=>n.opponent==='BELLADONNA'))route.splice(Math.min(2,route.length),0,{...node});
 }
 REMADE_SHEET_FIGHTERS.add('BELLADONNA');FIGHTER_RENDER_TUNE.BELLADONNA={y:0,scale:.702};
 refreshSecretInspector();
}
