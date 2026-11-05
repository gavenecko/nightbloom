import os,json,time,hashlib,contextlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
os.environ['HF_HOME']=str(ROOT/'work/combat-model-test/model-cache')
os.environ['HF_HUB_DISABLE_XET']='1'
os.environ['HF_HUB_OFFLINE']='1'
os.environ['TRANSFORMERS_OFFLINE']='1'
import torch,soundfile as sf
from chatterbox.tts_turbo import ChatterboxTurboTTS
torch.set_num_threads(4)
out=ROOT/'outputs/combat-model-roster-v1'
spec=json.loads((out/'jobs.json').read_text())
results=json.loads((out/'manifest.json').read_text())['samples'] if (out/'manifest.json').exists() else []
done={s['id'] for s in results}
print('Loading cached Chatterbox Turbo on CPU. No model download.',flush=True)
model=ChatterboxTurboTTS.from_pretrained(device='cpu')
torch.set_default_dtype(torch.float32)
model.s3gen.float();model.t3.float();model.ve.float()
def save():
 data={'model':spec['model'],'version':1,'complete':len(results)==len(spec['samples']),'expected':len(spec['samples']),'references':spec['refs'],'samples':results}
 (out/'manifest.json').write_text(json.dumps(data,indent=2))
for ref in spec['refs']:
 jobs=[s for s in spec['samples'] if s['character']==ref['character'] and s['id'] not in done]
 if not jobs: continue
 if any(not s['reused'] for s in jobs):
  model.prepare_conditionals(str(out/ref['file']),norm_loudness=False)
 for job in jobs:
  if not job['reused']:
   torch.manual_seed(job['seed']);start=time.time()
   with (out/'generation.log').open('a') as log,contextlib.redirect_stderr(log):
    audio=model.generate(job['text'])
   sf.write(str(out/job['file']),audio.squeeze().numpy(),model.sr)
   job.update(seconds=audio.shape[-1]/model.sr,generationSeconds=round(time.time()-start,2))
  job['wavSha256']=hashlib.sha256((out/job['file']).read_bytes()).hexdigest()
  results.append(job);done.add(job['id']);save()
  print(f"{len(results)}/{len(spec['samples'])} {job['id']} {job['seconds']:.2f}s" ,flush=True)
save()
