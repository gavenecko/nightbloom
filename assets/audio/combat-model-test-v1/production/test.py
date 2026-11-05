import os,json,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
os.environ['HF_HOME']=str(ROOT/'work/combat-model-test/model-cache')
os.environ['HF_HUB_DISABLE_XET']='1'
import torch,soundfile as sf
from chatterbox.tts_turbo import ChatterboxTurboTTS
torch.set_num_threads(4)
out=ROOT/'outputs/combat-model-test'
print('Loading Chatterbox Turbo on CPU',flush=True)
model=ChatterboxTurboTTS.from_pretrained(device='cpu')
# Keep CPU preprocessing buffers in the same precision as the model weights.
torch.set_default_dtype(torch.float32)
model.s3gen.float()
model.t3.float()
model.ve.float()
jobs={'VAMPIRA':['Taste this!','[chuckle] Too slow.','Hah!','[groan]'], 'NEKOMATA':['Caught you!','[chuckle] Try again!','Nya!','[gasp]']}
results=[]
for ref in json.loads((out/'references.json').read_text()):
 # References were already loudness-normalized during the approved dialog bake.
 # Avoid NumPy 2 promotion to float64 in the package's second normalization.
 model.prepare_conditionals(ref['path'],norm_loudness=False)
 for i,text in enumerate(jobs[ref['character']]):
  name=f"{ref['character'].lower()}-{i+1}.wav"
  torch.manual_seed(42+i)
  start=time.time()
  audio=model.generate(text)
  sf.write(str(out/name),audio.squeeze().numpy(),model.sr)
  results.append({'character':ref['character'],'text':text,'file':name,'seconds':audio.shape[-1]/model.sr,'generationSeconds':round(time.time()-start,2)})
  (out/'manifest.json').write_text(json.dumps({'model':'ResembleAI/chatterbox-turbo','samples':results},indent=2))
  print(name,results[-1],flush=True)
