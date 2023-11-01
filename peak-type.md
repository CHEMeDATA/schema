
# peak-types

The peak-norm-equ is a type of peak with a schema to facilitate addition of new shapes.
Currently we have Gaussian and Lorentzian shapes (see instances below).

## peak-norm-equ schema

The integral over a peak defined in the equation is 1.0.
The width is given by the FWHM parameter.

- A type of peak for which the equation is part of the schema and normalized. This allows easy implementation of conversion of this type of peaks in to spectra.

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
     "type": "string"
    },
    "comment": {
     "type": "string"
    },
    "equation": {
     "type": "string"
    }
   },
   "required": ["equation", "name"]
  }
 },
 "required": ["peak-norm-equ"]
}
```


# peak-type instances

```json
gaussian-peak-type = 
{
  "peak-norm-equ": {
    "name": "Gaussian shape",
    "equation": 
      "1 / ((0.42466090014400953434 * FWHM() * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * (0.42466090014400953434 * FWHM) * (0.42466090014400953434 * FWHM)))",
   "comment": "sigma is equal to ​FWHM​ / (2 * sqrt( 2 * log(2))) = ​FWHM​ * 0.42466090014400953434 "
  }
}
```

```json
lorentzian-peak-type = 
{
  "peak-norm-equ": {
    "name": "Lorentzian shape",
    "equation": 
      "(1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)))",
   "comment": " "
  }
}
```

ADDINFO ABOUT TOP, check line width...