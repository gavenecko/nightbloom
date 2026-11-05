const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const out=path.resolve('outputs/combat-model-test');fs.mkdirSync(out,{recursive:true});
const ff=path.resolve('work/audio-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v9.0.2.exe');
const manifest=require('../../outputs/prerecorded-voices-v2/manifest.json');const refs=[];
for(const name of ['VAMPIRA','NEKOMATA']){
 const clips=manifest.clips.filter(c=>c.speaker===name).slice(0,3);
 const args=clips.flatMap(c=>['-i',path.resolve('work/nightbloom',c.src)]);
 const target=path.join(out,name.toLowerCase()+'-reference.wav');
 execFileSync(ff,['-v','error','-y',...args,'-filter_complex',clips.map((_,i)=>`[${i}:a]`).join('')+`concat=n=${clips.length}:v=0:a=1[a]`,'-map','[a]','-t','12','-ar','24000','-ac','1',target]);
 refs.push({character:name,path:target,sources:clips.map(c=>({src:c.src,text:c.text}))});
}
fs.writeFileSync(path.join(out,'references.json'),JSON.stringify(refs,null,2));console.log('Prepared two approved voice references.');
