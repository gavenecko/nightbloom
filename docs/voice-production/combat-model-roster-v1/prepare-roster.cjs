const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve('.'),out=path.resolve('outputs/combat-model-roster-v1');fs.mkdirSync(out,{recursive:true});
const ff=path.resolve('work/audio-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v9.0.2.exe');
const dialog=require('../../outputs/prerecorded-voices-v2/manifest.json');
const profiles=require('../nightbloom/docs/APPROVED_VOICE_PROFILES.json').profiles.filter(p=>p.name!=='NARRATOR');
const prompts={
 VAMPIRA:['Taste this!','[chuckle] Too slow.','Hah!','[groan]'],
 NEKOMATA:['Caught you!','[chuckle] Try again!','Nya!','[gasp]'],
 BANSHEE:['Hear my sorrow!','[sigh] Your end approaches.','Haa!','[groan]'],
 MEDUSA:['Stay still!','[chuckle] Do not look away.','Hah!','[gasp]'],
 JIANGSHI:['Strike!','Your time has passed.','Hup!','[groan]'],
 YUREI:['Begone!','[sigh] You cannot escape.','Haa!','[gasp]'],
 DULLAHAN:['Yield!','Your reckoning is here.','Hah!','[groan]'],
 WEREWOLF:['My prey!','[chuckle] Run while you can.','Rah!','[groan]'],
 MUMMY:['Be still!','[sigh] You disturb my rest.','Hah!','[groan]'],
 WITCH:['Hex!','[chuckle] A little bad luck!','Hah!','[gasp]'],
 ARACHNE:['Caught you!','[chuckle] Such a tangled web.','Hah!','[groan]'],
 'LIVING DOLL':['Cut!','[chuckle] Shall we play?','Hup!','[gasp]']
};
const original=JSON.parse(fs.readFileSync('outputs/combat-model-test/manifest.json'));
const originalRefs=JSON.parse(fs.readFileSync('outputs/combat-model-test/references.json'));
const refs=[],samples=[];
for(const p of profiles){
 const wav=p.id+'-reference.wav';let clips;
 if(['VAMPIRA','NEKOMATA'].includes(p.name)){
  const ref=originalRefs.find(r=>r.character===p.name);clips=ref.sources;
  fs.copyFileSync(path.resolve('outputs/combat-model-test',wav),path.join(out,wav));
 }else{
  clips=dialog.clips.filter(c=>c.speaker===p.name).slice(0,3);
  const args=clips.flatMap(c=>['-i',path.resolve('work/nightbloom',c.src)]);
  execFileSync(ff,['-v','error','-y',...args,'-filter_complex',clips.map((_,i)=>`[${i}:a]`).join('')+`concat=n=${clips.length}:v=0:a=1[a]`,'-map','[a]','-t','12','-ar','24000','-ac','1',path.join(out,wav)]);
 }
 const pcm=execFileSync(ff,['-v','error','-i',path.join(out,wav),'-ac','1','-ar','24000','-f','f32le','pipe:1'],{maxBuffer:8*1024*1024});
 if(pcm.length/4/24000<=5)throw Error('Reference too short '+p.name);
 refs.push({character:p.name,profile:p,file:wav,duration:pcm.length/4/24000,sources:clips.map(c=>({src:c.src,text:c.text}))});
 prompts[p.name].forEach((text,i)=>{
  const file=p.id+'-'+(i+1)+'.wav',prior=original.samples.find(s=>s.character===p.name&&s.text===text);
  if(prior)fs.copyFileSync(path.resolve('outputs/combat-model-test',prior.file),path.join(out,file));
  samples.push({character:p.name,id:p.id+'-'+(i+1),text,file,kind:['Attack line','Character line','Exertion test','Pain / reaction test'][i],seed:42+i,reused:!!prior,...(prior?{seconds:prior.seconds,generationSeconds:prior.generationSeconds}:{} )});
 });
}
fs.writeFileSync(path.join(out,'jobs.json'),JSON.stringify({model:'ResembleAI/chatterbox-turbo',version:1,refs,samples},null,2));
console.log(JSON.stringify({fighters:refs.length,total:samples.length,reused:samples.filter(s=>s.reused).length,new:samples.filter(s=>!s.reused).length}));
