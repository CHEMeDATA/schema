# scripts

Extract a json out of .md file:

```bash
awk '/peaklist-delta-schema = /,/```/{if(!/```/) print}' peak-list.md | tail -n +2 > peaklist-delta.schema.json
```
