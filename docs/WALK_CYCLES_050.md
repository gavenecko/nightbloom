# Walk cycle refinement — 0.50

Vampira V14 and Nekomata V11 replace only the four walking cells (row 0, columns 4–7). The revised poses use a wider stride and obvious lifted boots with bent knees. Original outfits, two-leg anatomy, camera, 192px cells, baseline 184 and 8px transparent gutters are preserved.

Both fighters play their four walking frames at 8fps instead of 12fps so the passing steps read more clearly. Movement speed, combat timing and all other fighters are unchanged. Atlas Inspector retains its adjustable playback speed.

Packing verified all eight new source silhouettes avoid their canvas edges, every new cell has an exactly transparent 8px border, and all 68 non-walking cells per fighter are pixel-identical to the previously approved atlas. Existing temporary hit/knockdown holds are unchanged. All eight walking slots use distinct newly generated images; no walking holds or costume substitutions were added.

Generated with the built-in image tool; exact accepted prompts and cell bounds are in the `vampira-v14-walk` and `nekomata-v11-walk` manifests. The previous atlases remain in the repository.
