# Full cast combat voice auditions

48 clips for 12 fighters using Chatterbox Turbo and approved Kokoro dialogue references. The first eight clips are copied unchanged from the two-fighter test.

Scripts are archived here for provenance; run their originals from the project workspace under work/combat-model-test. Preparation reads the approved profiles and story audio. roster.py uses the existing model cache offline and resumes from its manifest. Packaging validates decoded audio and preserves the first eight MP3 files.

Environment: Python 3.14; chatterbox-tts 0.1.7; torch 2.15.0 CPU; transformers 5.2.0; resemble-perth 1.1.0 from upstream commit ff1c8ac55a976971245cdd53c18d6131ca00d993. Four CPU threads, seeds 42–45. References are already normalized, so norm_loudness=False avoids NumPy precision promotion. No extra speed or pitch change is applied to Chatterbox output.

The browser requests audio only after Play. Files use mono 24 kHz 48 kbps MP3. These auditions are not installed in gameplay.
