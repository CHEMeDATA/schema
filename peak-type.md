# peak-types

The peak types refer to the shape of peaks (gaussian, lorentzian, *etc.*).
The peak-norm-equ is a type of peak providing the mathematical expression of the equation of the shapes it describes. The names of the peak-shape and the equation are part of the schema. This manner insures stability for the readers. It allows for the evolution of the schema (addition of new shapes), imposes the writer of data to provide the equation of the shape, without imposing the reader to be able to interpret the equation when reading the data.

The schema checks the name and equation associated. In this way, the readers of data do not need to interpret the equation and simple rely on the name to determine if it can use the data. If the data reader is capable of interpreting the equation on the fly (as typically javascript) it can use the equation directly.

## peak-norm-equ schema

The integral over a peak defined in the equation is 1.0 (as demonstrated by the c program in the src folder - request access if interested) and the line-width has been verified.

```json
peak-norm-equ-schema = 
{
 "$schema": "https://json-schema.org/draft/2020-12/schema",
 "$id": "https://chemedata.github.io/schema/peak-norm-equ.schema.json",
 "title": "peak-norm-equ",
 "description": "Peak defined with an equation string",
 "type": "object",
 "properties": {
  "peak-norm-equ": {
   "type": "object",
   "properties": {
    "name": {
     "type": "string",
     "enum": ["Gaussian shape", "Lorentzian shape"]
    },
    "comment": {
     "type": "string"
    },
    "equation": {
     "type": "string"
    }
   },
   "required": ["equation", "name"],
  "allOf": [
    {
      "if": {
        "properties": {
          "name": { "const": "Gaussian shape" }
        }
      },
      "then": {
        "properties": {
          "equation": { "const": "1 / ((0.42466090014400953434 * FWHM() * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * (0.42466090014400953434 * FWHM) * (0.42466090014400953434 * FWHM)))"}
        }
      }
    },
    {
      "if": {
        "properties": {
          "name": { "const": "Lorentzian shape" }
        }
      },
      "then": {
        "properties": {
          "equation": {
            "const": "(1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)))"}
        }
      }
    }
  ]
  }
 },
 "required": ["peak-norm-equ"]
}
```


# peak-type instances

In all equation, FWHM is the full-width at half maximum amplitude.
## gaussian-peak

```json
gaussian-peak-type = 
{
  "peak-norm-equ": {
    "name": "Gaussian shape",
    "equation": 
      "1 / ((0.42466090014400953434 * FWHM() * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * (0.42466090014400953434 * FWHM) * (0.42466090014400953434 * FWHM)))",
  }
}
```
Note about the equation : sigma is equal to ​FWHM​ / (2 * sqrt( 2 * log(2))) = ​FWHM​ * 0.42466090014400953434"

## lorentzian-peak

```json
lorentzian-peak-type = 
{
  "peak-norm-equ": {
    "name": "Lorentzian shape",
    "equation": 
      "(1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)))"
  }
}
```

ADDINFO ABOUT TOP, check line width...