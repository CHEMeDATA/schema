import {
	createNewTypeSchema,
	deriveSchema,
	createInstance,
} from "./createSchemaSomeInstances.js";

import { processSchemas, loadSchemas } from "./resolveSchemas.js";

import { generateIndexPage , mainGeneration} from "./generateHtmlForSchema.js";

import { runElevators } from "./makeElevators.js";

import fs from "fs";
import path from "path";
import {
	schemaDir,
	instanceDir,
	htmlDir,
	location,
	derivationsFile,
	schemaResolved,
	src_objects,
} from "./config.js";

// Example usage createNewTypeSchema
// for type float and double will be replaced with numbers in schema
/*
type: "baseType",
						htmlID: "tubeDiameter_mm",
						baseType: "float",
						comment: "Enter a value in mm",
						defaultValue: 5.5,
						randomFrom: 1,
						randomTo: 10,
						show: true,
*/

console.log("\n****** Create the schema for the objects in v1/schema\n");

fs.rmSync(schemaDir, { recursive: true, force: true });
fs.mkdirSync(schemaDir, { recursive: true });

if (fs.existsSync(derivationsFile)) {
	fs.unlinkSync(derivationsFile);
}

createNewTypeSchema("obj1", [
	{ name: "name", required: true, array: false, type: "string" },
	{ name: "age", required: false, array: false, type: "integer" },
]);

createNewTypeSchema("obj2", [
	{ name: "name", required: true, array: false, type: "string" },
	{ name: "age", required: true, array: false, type: "integer" },
]);

deriveSchema("obj1", "obj1size", [
	{
		name: "size",
		mandatory: true,
		type: "float",
		userRequest: "Enter a value in m (default 1.91m)",
		defaultValue: 1.91,
		randomFrom: 1.4,
		randomTo: 2.1,
		show: true,
	},
]);

createNewTypeSchema("groupObject1", [
	{ name: "members", required: true, array: true, type: "object", ref: "obj1" },
]);

createNewTypeSchema("sample", [
	{
		name: "origin",
		required: false,
		array: false,
		type: "object",
		ref: "sample",
	},
	// { name: "dateSHoulsBeHereNotSUre", required: false, array: false, type: "string"}
]);

deriveSchema("sample", "liquidSample", [
	{
		name: "volume_L",
		mandatory: true,
		type: "float",
		userRequest: "Enter a value in L (default 500 ul)",
		defaultValue: 500e-6,
		randomFrom: 1,
		randomTo: 10,
		show: true,
	},
]);

deriveSchema("liquidSample", "NMRliquidSample", [
	{
		name: "tubeDiameter_mm",
		mandatory: true,
		type: "float",
		userRequest: "Enter a value in mm",
		defaultValue: 5.5,
		randomFrom: 1,
		randomTo: 10,
		show: true,
	},
]);

createNewTypeSchema("pairObj1", [
	{
		name: "object1",
		required: true,
		array: false,
		type: "object",
		ref: "obj1",
	},
	{
		name: "object2",
		required: true,
		array: false,
		type: "object",
		ref: "obj2",
	},
	// { name: "dateSHoulsBeHereNotSUre", required: false, array: false, type: "string"}
]);

createNewTypeSchema("nmrSpectrumObject", [
	{
		name: "values",
		required: true,
		array: true,
		type: "double",
	},
	{
		name: "firstPoint",
		required: true,
		array: false,
		type: "double",
	},
	{
		name: "lastPoint",
		required: true,
		array: false,
		type: "double",
	},
	// { name: "dateSHoulsBeHereNotSUre", required: false, array: false, type: "string"}
]);

// Quote the key in strings in put of createInstance ....
createInstance("miniSpectrum", "nmrSpectrumObject", {
	values: [
		0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 2,
		10, 2, 0, 0, 0, 0, 0,
	],
	firstPoint: 8.0,
	lastPoint: -1.0,
});

createInstance(
	"miniSpectrum2",
	"nmrSpectrumObject",
	`{
    "values": [
        0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1.8, 8, 1.8, 0, 0, 0, 0, 0
    ],
    "firstPoint": 8.0,
    "lastPoint": 0.0
}`
);

createNewTypeSchema("setSpectra", [
	{
		name: "members",
		required: true,
		array: true,
		type: "object",
		ref: "nmrSpectrumObject",
	},
]);

// With _INSERT_FILE  it will insert the content of a file ("theFileName" = for  _INSERT_FILE-theFileName )
// Quote the key in strings....
createInstance(
	"twoSpectra",
	"setSpectra",
	`{
	"members": [_INSERT_FILE-miniSpectrum2, _INSERT_FILE-miniSpectrum]
	}`
);

console.log(
	"\n****** In v1/schemaResolved, write a copy of each schema but removed all 'allOf' and explicit '$refs' except if recursive\n"
);

fs.rmSync(schemaResolved, { recursive: true, force: true });
fs.mkdirSync(schemaResolved, { recursive: true });

processSchemas();

fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(location, { recursive: true });
fs.mkdirSync(instanceDir, { recursive: true });
// Ensure the HTML output directory exists
if (!fs.existsSync(htmlDir)) {
	fs.mkdirSync(htmlDir, { recursive: true });
}

const schemaList = mainGeneration()
generateIndexPage(schemaList);
runElevators();

fs.mkdirSync(src_objects, { recursive: true });
