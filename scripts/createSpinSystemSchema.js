import fs from "fs";

import {
	createNewTypeSchema,
	deriveSchema,
	createInstance,
} from "../src/createSchemaSomeInstances.js";

import { derivationsFile } from "./config.js";

export function createSpinSystemSchema() {
	

	console.log("\n****** Create the schema for the objects in v1/schema createSpinSystemSchema\n");
	console.log("\n****** Create the schema for the objects in v1/schema createSpinSystemSchema\n");


createNewTypeSchema("tensor", [
		{
			name: "xx",
			required: true,
			array: false,
			type: "double",
		},{
			name: "xy",
			required: true,
			array: false,
			type: "double",
		},{
			name: "xz",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "yx",
			required: true,
			array: false,
			type: "double",
		},{
			name: "yy",
			required: true,
			array: false,
			type: "double",
		},{
			name: "yz",
			required: true,
			array: false,
			type: "double",
		},{
			name: "zx",
			required: true,
			array: false,
			type: "double",
		},{
			name: "zy",
			required: true,
			array: false,
			type: "double",
		},{
			name: "zz",
			required: true,
			array: false,
			type: "double",
		}
	]);


createNewTypeSchema("diagTensor", [
		{
			name: "xx",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "yy",
			required: true,
			array: false,
			type: "double",
		},{
			name: "zz",
			required: true,
			array: false,
			type: "double",
		}
	]);



createNewTypeSchema("atomicPropertySpin", [
		{
			name: "molAtomIndicesFull",
			required: false,
			array: true,
			type: "int",
		},
		{
			name: "molAtomIndices",
			required: false,
			array: true,
			type: "int",
		},
		{
			name: "spinSystemIndices",
			required: false,
			array: true,
			type: "int",
		},
		{
			name: "typeVariableString",
			required: true,
			array: false,
			type: "string",
		},
		{
			name: "value",
			required: false,
			array: false,
			type: "double",
		},
		{
			name: "tensorValues",
			required: false,
			array: false,
			type: "tensor",
		},
		{
			name: "diagTensorValues",
			required: false,
			array: false,
			type: "diagTensor",
		},
		{
			name: "labelVarSet",
			required: false,
			array: false,
			type: "string",
		},
		

	]);



/*
const spins = [
	{
		molAtomIndicesFull: [3],
		molAtomIndices: [3],
		spinSystemIndices: [0],
		typeVariableEnum: 1, // removed
		typeVariableString: "ChemicalShift",
		checked: false,
		value: 5.14081674,
			lowerBound: 5.13390885,
			upperBound: 5.14790521,
				curQuality: curQuality,
				satisfactory: false,
		labelVarSet: "δ(3)",
				stepNumber: 2,
	},
];
*/

	deriveSchema("atomicPropertySpin", "atomicPropertySpinPredRange", [
		{
			name: "lowerBound",
			mandatory: true,
			type: "float",
			userRequest: "Enter a minimal value",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
		{
			name: "upperBound",
			mandatory: true,
			type: "float",
			userRequest: "Enter a minimal value",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
	]);
	deriveSchema("atomicPropertySpin", "atomicPropertySpinMatch", [
		{
			name: "curQuality",
			mandatory: false,
			type: "qualityClass",
			show: true,
		},
		{
			name: "satisfactory",
			mandatory: true,
			type: "bool",
			userRequest: "Is the match with the experimental spectrum satisfactory ?",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
		{
			name: "stepNumber",
			mandatory: false,
			type: "int",
			userRequest: "Step number in parameter optimization",
			defaultValue: 1,
			show: true,
		},
	]);

createNewTypeSchema("atomicPropertySpinInteraction", [
		{
			name: "molAtomIndicesFull",
			required: false,
			array: true,
			type: "intPairs",
		},
		{
			name: "molAtomIndices",
			required: false,
			array: true,
			type: "intPairs",
		},
		{
			name: "spinSystemIndices",
			required: false,
			array: true,
			type: "intPairs",
		},
		{
			name: "typeVariableString",
			required: true,
			array: false,
			type: "string",
		},
		{
			name: "value",
			required: false,
			array: false,
			type: "double",
		},
		{
			name: "tensorValues",
			required: false,
			array: false,
			type: "tensor",
		},
		{
			name: "diagTensorValues",
			required: false,
			array: false,
			type: "diagTensor",
		},
		{
			name: "labelVarSet",
			required: false,
			array: false,
			type: "string",
		},
		{
			name: "numberBonds",
			required: false,
			array: false,
			type: "int",
		},
		{
			name: "numberBondslabelVarSet",
			required: false,
			array: false,
			type: "string",
		},

	]);

	/*
const interactions = [
	{
			satisfactory: true,
		labelVarSet: "J(3-5)",
			stepNumber: 2,
		molAtomIndices: [[3, 5]],
		spinSystemIndices: [[0, 2]],
		typeVariableEnum: 2, // removed
		typeVariableString: "Jcoupling",
		checked: false,
		value: 7.00171663,
		lowerBound: 1.01921316,
		upperBound: 7.34793247,
		numberBonds: 3,
		numberBondslabelVarSet: "3J(3-5)",
	},
];

	*/



	deriveSchema("atomicPropertySpinInteraction", "atomicPropertySpinInteractionPredRange", [
		{
			name: "lowerBound",
			mandatory: true,
			type: "float",
			userRequest: "Enter a minimal value",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
		{
			name: "upperBound",
			mandatory: true,
			type: "float",
			userRequest: "Enter a minimal value",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
	]);
	deriveSchema("atomicPropertySpinInteraction", "atomicPropertySpinInteractionMatch", [
		{
			name: "curQuality",
			mandatory: false,
			type: "qualityClass",
			show: true,
		},
		{
			name: "satisfactory",
			mandatory: true,
			type: "bool",
			userRequest: "Is the match with the experimental spectrum satisfactory ?",
			defaultValue: 10,
			randomFrom: 1,
			randomTo: 10,
			show: true,
		},
		{
			name: "stepNumber",
			mandatory: false,
			type: "int",
			userRequest: "Step number in parameter optimization",
			defaultValue: 1,
			show: true,
		},
	]);

createNewTypeSchema("NMRspinSystemModel", [{
			name: "spins",
			required: false,
			array: true,
			type: "atomicPropertySpin",
		},
		{
			name: "interactions",
			required: false,
			array: true,
			type: "atomicPropertySpinInteraction",
		},
		// from specrum ? Experimental...
		//is complete (as from calculations?)
		//HashNetwork
		//lineshapeVariables
		//quantityVariables
])

createInstance("aCSAdiagTensor", "diagTensor", {
		xx: 120,
		yy: 87,
		zz: 51
	});

createInstance(
		"aCSAatomicPropertySpin",
		"atomicPropertySpin",
		`{"typeVariableString" : "ChemicalShift",
	"tensorValues": _INSERT_FILE-aCSAdiagTensor__
	}`
	);

createInstance(
		"CSA_NMRspinSystemModel",
		"NMRspinSystemModel",
		`{
	"spins": [
	_INSERT_FILE-aCSAatomicPropertySpin__
	]
	}`
	);


}
