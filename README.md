# schema

json-schema for CHEMeDATA

We start with [peak-list](peak-list.md)s

Extract a json out of .md file:
```bash
awk '/example-peaklist = /,/```/{if(!/```/) print}' README.md | tail -n +2 > example-peaklist.json
```