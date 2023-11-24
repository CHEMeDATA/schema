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
 "$id": "https://chemedata.github.io/schema/peak-type/peak-norm-equ.schema.json",
 "title": "peak-norm-equ",
 "description": "Peak defined with an equation string",
 "type": "object",
 "properties": {
  "peak-norm-equ": {
   "type": "object",
   "properties": {
    "name": {
     "type": "string",
     "enum": ["__gaussian__", "__lorentzian__", "__gaussloren__", "__genlor__"]
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
          "name": { "const": "__gaussian__" }
        }
      },
      "then": {
        "properties": {
          "equation": { "const": "__gaussian-peak-type__"}
        }
      }
    },
    {
      "if": {
        "properties": {
          "name": { "const": "__lorentzian__" }
        }
      },
      "then": {
        "properties": {
          "equation": {
            "const": "__lorentzian-peak-type__"}
        }
      }
    },
    {
      "if": {
        "properties": {
          "name": { "const": "__gaussloren__" }
        }
      },
      "then": {
        "properties": {
          "equation": {
            "const": "__gaussloren-peak-type__"}
        }
      }
    },
    {
      "if": {
        "properties": {
          "name": { "const": "__genlor__" }
        }
      },
      "then": {
        "properties": {
          "equation": {
            "const": "__genlor-peak-type__"}
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
  "$schema": "https://chemedata.github.io/schema/peak-type/peak-norm-equ.schema.json",
  "peak-norm-equ": {
    "name": "__gaussian__",
    "equation": 
      "__gaussian-peak-type__"
  }
}
```
Note about the equation : sigma is equal to ​FWHM​ / (2 * sqrt( 2 * log(2))) = ​FWHM​ * 0.42466090014400953434"

## lorentzian-peak

```json
lorentzian-peak-type = 
{
  "$schema": "https://chemedata.github.io/schema/peak-type/peak-norm-equ.schema.json",
  "peak-norm-equ": {
    "name": "__lorentzian__",
    "equation": 
      "__lorentzian-peak-type__"
  }
}
```
## Gaussian/Lorentzian shape

Approx of Vogt function.
Kurtosis = 0; pure Gaussian
Kurtosis = 1; pure Lorentzian
Range of kurtosis (0 to 1)


```json
gaussloren-peak-type = 
{
  "$schema": "https://chemedata.github.io/schema/peak-type/peak-norm-equ.schema.json",
  "peak-norm-equ": {
    "name": "__gaussloren__",
    "equation": 
      "__gaussloren-peak-type__"
  }
}
```

## generalized lorentzian-peak

Kurtosis = 0; pure Lorentzian
Kurtosis = 0.75; top of the shape similar to the one of Gaussian shape
Range of kurtosis (c.a. -1 to 2)
```json
genlor-peak-type = 
{
  "$schema": "https://chemedata.github.io/schema/peak-type/peak-norm-equ.schema.json",
  "peak-norm-equ": {
    "name": "__genlor__",
    "equation": 
      "__genlor-peak-type__"
  }
}
```
## Notes
For all peak the top at the center of the shape is 1.0.
The integral depends on the shape.
