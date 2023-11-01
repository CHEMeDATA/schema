# scripts

Extract a json out of .md file:

```bash
awk '/peaklist-delta-schema = /,/```/{if(!/```/) print}' peak-list.md | tail -n +2 > peaklist-delta.schema.json
awk '/peaklist-shape-schema = /,/```/{if(!/```/) print}' peak-list.md | tail -n +2 > peaklist-shape.schema.json
awk '/peak-norm-equ-schema = /,/```/{if(!/```/) print}' peak-type.md | tail -n +2 > peak-norm-equ.schema.json
```
