const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const out=path.resolve('outputs/combat-model-test'),ff=path.resolve('work/audio-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v9.0.2.exe');
const m=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'))),old=require('../../outputs/combat-voice-auditions-v1/manifest.json');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
for(const s of m.samples){
 s.mp3=s.file.replace('.wav','.mp3');
 execFileSync(ff,['-v','error','-y','-i',path.join(out,s.file),'-af','loudnorm=I=-18:TP=-1.5:LRA=7','-ar','24000','-ac','1','-c:a','libmp3lame','-b:a','48k',path.join(out,s.mp3)]);
 const pcm=execFileSync(ff,['-v','error','-i',path.join(out,s.mp3),'-f','f32le','-ac','1','-ar','24000','pipe:1']);let sum=0,peak=0;
 for(let i=0;i<pcm.length;i+=4){const v=pcm.readFloatLE(i);if(!Number.isFinite(v))throw Error('Invalid audio');sum+=v*v;peak=Math.max(peak,Math.abs(v));}
 s.duration=pcm.length/4/24000;s.rmsDb=20*Math.log10(Math.sqrt(sum/(pcm.length/4)));s.peak=peak;s.bytes=fs.statSync(path.join(out,s.mp3)).size;
 if(s.duration<.1||s.duration>30||s.rmsDb<-60)throw Error('Empty or overlong sample '+s.file);
}
const sections=['VAMPIRA','NEKOMATA'].map(name=>{
 const previous=old.samples.find(s=>s.character===name&&s.text===(name==='VAMPIRA'?'Taste this!':'Nya!'));
 const previousName=name.toLowerCase()+'-previous-kokoro.mp3';fs.copyFileSync(path.resolve('work/nightbloom/docs',previous.src),path.join(out,previousName));
 return `<section><h2>${name}</h2><p>Approved voice reference</p><audio controls preload="none" src="${name.toLowerCase()}-reference.wav"></audio><p>Previous Kokoro: ${esc(previous.text)}</p><audio controls preload="none" src="${previousName}"></audio>`+m.samples.filter(s=>s.character===name).map(s=>`<p>Chatterbox: ${esc(s.text)} (${s.duration.toFixed(2)}s)</p><audio controls preload="none" src="${s.mp3}"></audio>`).join('')+'</section>';
}).join('');
fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>NIGHTBLOOM voice model comparison</title><style>body{background:#17121d;color:#eee;font:18px system-ui;max-width:900px;margin:32px auto;padding:16px}section{padding:24px;background:#292032;margin:24px 0;border-radius:12px}audio{width:100%;max-width:550px}p{margin-bottom:8px}</style><h1>Combat voice model comparison</h1><p>Chatterbox Turbo using the approved Kokoro dialogue as reference. Experimental samples: listen for voice similarity, natural delivery, and usable nonverbal sounds. Tags are requests to the model, not proof of the sound produced. These are not installed in gameplay.</p>${sections}<script>document.addEventListener('play',e=>{for(const a of document.querySelectorAll('audio'))if(a!==e.target)a.pause()},true)</script></html>`);
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(m,null,2));
console.log(JSON.stringify({samples:m.samples.length,totalMp3Bytes:m.samples.reduce((n,s)=>n+s.bytes,0),checks:m.samples.map(s=>({file:s.mp3,duration:s.duration,rmsDb:s.rmsDb}))}));
