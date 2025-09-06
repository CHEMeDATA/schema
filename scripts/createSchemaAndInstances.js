import fs from "fs";

import {
	createNewTypeSchema,
	deriveSchema,
	createInstance,
} from "../src/createSchemaSomeInstances.js";

import { derivationsFile } from "./config.js";

export function createSchemaAndInstances() {
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
	console.log("\n****** Create the schema for the objects in v1/schema\n");

	// this list the list of derived classes
	if (fs.existsSync(derivationsFile)) {
		fs.unlinkSync(derivationsFile); // delete
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
		{
			name: "members",
			required: true,
			array: true,
			type: "object",
			ref: "obj1",
		},
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
		{
			name: "frequency",
			required: true,
			array: false,
			type: "double",
		},
		// { name: "dateSHoulsBeHereNotSUre", required: false, array: false, type: "string"}
	]);

	createInstance("miniSpectrum", "nmrSpectrumObject", {
		values: [
			0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 2,
			10, 2, 0, 0, 0, 0, 0,
		],
		firstPoint: 8.0,
		lastPoint: -1.0,
		frequency: 400.0
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
	"lastPoint": 0.0,
	"frequency": 400.0
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
	// Quote the key in strings because they are json, not javaScript code
	createInstance(
		"twoSpectra",
		"setSpectra",
		`{
	"members": [_INSERT_FILE-miniSpectrum2__, _INSERT_FILE-miniSpectrum__]
	}`
	);

	createNewTypeSchema("jGraphObject", [
		{
			name: "dummy",
			required: false,
			array: false,
			type: "string",
		},
	]);

	createInstance(
		"myFirstJgraphObject",
		"jGraphObject",
		`{
	"jsonSpectrum": _INSERT_FILE-01_assigned_Set.spectra__,  
	"jsonMolecule": _INSERT_FILE-01_assigned_molecule__, 
	"jsonDataInitial": _INSERT_FILE-01_assigned_Set.spinFitResult__
	}`
	);
}
