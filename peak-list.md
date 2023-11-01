# peak-lists

We have two types of peak lists:
- list of delta functions originating from spectral simulations.
- list of peak with various shapes for peak-picking of experimental spectra (currently only one type of shape per json)

## peak-list-delta schema

- A peaklist of delta functions with only a position and a factor multiplying the delta function. Used for simulated spectra, description of multiplets, etc.

 f * DELTA(position)

[peaklist-delta.schema.json](https://chemedata.github.io/schema/peaklist-delta.schema.json)

```json
peaklist-delta-schema = 
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://chemedata.github.io/schema/peaklist-delta.schema.json",
  "title": "peaklist-delta",
  "description": "delta function peak",
  "type": "object",
  "properties": {
    "peaklist-delta": {
      "type": "object",
      "properties": {
        "positions": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "factors": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      },
      "required": [
        "positions",
        "factors",
  		"source"
      ]
    }
  },
  "required": [
    "peaklist-delta"
  ]
}
```

Example of peak a list of delta functions:

```json
example-delta_peaklist = 
{
  "peaklist-delta": {
    "source": "here will come the source - possibly a simulator",
    "positions": [
      2.0, 3.0, 4.0
    ],
    "factors": [
      0.25, 0.5, 0.25
    ]
  }
}
```
Requirement: the sum of the factors should be one for one spin (correspond to normlized integral in experimental spectrum)


## peaklist-shape schema
Different shapes are allowed. see [peak-type](peak-type.md)s

```json
peaklist-shape-schema = 
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://chemedata.github.io/schema/peaklist-shape.schema.json",
  "title": "peaklist-shape",
  "description": "various shape peaklist",
  "type": "object",
  "properties": {
    "peaklist-shape": {
      "type": "object",
      "properties": {
        "peak-type": {
          "$ref": "https://chemedata.github.io/schema/peak-norm-equ.schema.json" 
        },
        "source": {
           "type": "string"
        },
        "x": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "y": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "fwhm": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "ID": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "x",
        "y",
  		"fwhm",
      "source",
      "peak-type"
      ]
    }
  },
  "required": [
    "peaklist-shape"
  ]
}
```

```json
example-peaklist-delta = 
{
  "peaklist-shape": {
    "source": "here will come the source - possibly a simulator",
    "x": [
      2.0, 3.0, 4.0
    ],
    "y": [
      0.25, 0.5, 0.25
    ],
    "fwhm": [
      1.0, 1.0, 1.0
    ]
  }
}
```

