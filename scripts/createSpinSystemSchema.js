import fs from "fs";

import {
	createNewTypeSchema,
	deriveSchema,
	createInstance,
	setFieldTrue,
} from "../src/createSchemaSomeInstances.js";

export function createSpinSystemSchema() {
	console.log(
		"\n****** Create the schema for the objects in v1/schema createSpinSystemSchema\n"
	);
	console.log(
		"\n****** Create the schema for the objects in v1/schema createSpinSystemSchema\n"
	);

createNewTypeSchema("intPair", [
		{
			name: "first",
			required: true,
			array: false,
			type: "integer",
		},
		{
			name: "second",
			required: true,
			array: false,
			type: "integer",
		},
]);

	createInstance(
		"aIntPair",
		"intPair",
		`{
	"first": 1,
	"second": 2
}`
	);

	createNewTypeSchema("tensor", [
		{
			name: "xx",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "xy",
			required: true,
			array: false,
			type: "double",
		},
		{
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
		},
		{
			name: "yy",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "yz",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "zx",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "zy",
			required: true,
			array: false,
			type: "double",
		},
		{
			name: "zz",
			required: true,
			array: false,
			type: "double",
		},
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
		},
		{
			name: "zz",
			required: true,
			array: false,
			type: "double",
		},
	]);

	const atomicPropertySpin = [
		{
			name: "molAtomIndicesFull",
			required: false,
			array: true,
			type: "integer",
		},
		{
			name: "molAtomIndices",
			required: false,
			array: true,
			type: "integer",
		},
		{
			name: "spinSystemIndices",
			required: false,
			array: true,
			type: "integer",
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
			type: "object",
			ref: "tensor",
		},
		{
			name: "diagTensorValues",
			required: false,
			array: false,
			type: "object",
			ref: "diagTensor",
		},
		{
			name: "diagTensorRotationMatrix",
			required: false,
			array: false,
			type: "object",
			ref: "tensor",
		},
		{
			name: "labelVarSet",
			required: false,
			array: false,
			type: "string",
		},
	];

	createNewTypeSchema("atomicPropertySpin", atomicPropertySpin);

	const atomicPropertySpinCSA = setFieldTrue(
		atomicPropertySpin,
		"diagTensorValues"
	);

	createNewTypeSchema("atomicPropertySpin_CSA", atomicPropertySpinCSA);

	const atomicPropertySpinLiquid = setFieldTrue(atomicPropertySpin, "value");

	createNewTypeSchema("atomicPropertySpin_Liquid", atomicPropertySpinLiquid);

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

	const also_Range_and_Match_schema = false;
	if (also_Range_and_Match_schema) {
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
				type: "object",
				ref: "qualityClass",
				show: true,
			},
			{
				name: "satisfactory",
				mandatory: true,
				type: "bool",
				userRequest:
					"Is the match with the experimental spectrum satisfactory ?",
				defaultValue: 10,
				randomFrom: 1,
				randomTo: 10,
				show: true,
			},
			{
				name: "stepNumber",
				mandatory: false,
				type: "integer",
				userRequest: "Step number in parameter optimization",
				defaultValue: 1,
				show: true,
			},
		]);
	} // also_Range_and_Match_schema

	createNewTypeSchema("atomicPropertySpinInteraction", [
		{
			name: "molAtomIndicesFull",
			required: false,
			array: true,
			type: "object",
			ref: "intPair",
		},
		{
			name: "molAtomIndices",
			required: false,
			array: true,
			type: "object",
			ref: "intPair",
		},
		{
			name: "spinSystemIndices",
			required: false,
			array: true,
			type: "object",
			ref: "intPair",
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
			type: "object",
			ref: "tensor",
		},
		{
			name: "diagTensorValues",
			required: false,
			array: false,
			type: "object",
			ref: "diagTensor",
		},
		{
			name: "diagTensorRotationMatrix",
			required: false,
			array: false,
			type: "object",
			ref: "tensor",
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
			type: "integer",
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
	if (also_Range_and_Match_schema) {
		deriveSchema(
			"atomicPropertySpinInteraction",
			"atomicPropertySpinInteractionPredRange",
			[
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
			]
		);
		deriveSchema(
			"atomicPropertySpinInteraction",
			"atomicPropertySpinInteractionMatch",
			[
				{
					name: "curQuality",
					mandatory: false,
					type: "object",
					ref: "qualityClass",
					show: true,
				},
				{
					name: "satisfactory",
					mandatory: true,
					type: "bool",
					userRequest:
						"Is the match with the experimental spectrum satisfactory ?",
					defaultValue: 10,
					randomFrom: 1,
					randomTo: 10,
					show: true,
				},
				{
					name: "stepNumber",
					mandatory: false,
					type: "integer",
					userRequest: "Step number in parameter optimization",
					defaultValue: 1,
					show: true,
				},
			]
		);
	} // also_Range_and_Match_schema

	// Three NMRspinSystems
createNewTypeSchema("NMRspinSystemModel", [
		{
			name: "spins",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpin",
		},
		{
			name: "interactions",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpinInteraction",
		},
		// from specrum ? Experimental...
		//is complete (as from calculations?)
		//HashNetwork
		//lineshapeVariables
		//quantityVariables
	]);
	createNewTypeSchema("NMRspinSystemModel_CSA", [
		{
			name: "spins",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpin_CSA",
		},
		{
			name: "interactions",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpinInteraction",
		},
		// from specrum ? Experimental...
		//is complete (as from calculations?)
		//HashNetwork
		//lineshapeVariables
		//quantityVariables
	]);
	createNewTypeSchema("liquidStatesNMRproperties", [
		{
			name: "spins",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpin_Liquid",
		},
		{
			name: "interactions",
			required: false,
			array: true,
			type: "object",
			ref: "atomicPropertySpinInteraction",
		},
		// from specrum ? Experimental...
		//is complete (as from calculations?)
		//HashNetwork
		//lineshapeVariables
		//quantityVariables
	]);
	createInstance("aCSAdiagTensor", "diagTensor", {
		xx: 120,
		yy: 87,
		zz: 51,
	});

	createInstance(
		"aCSAatomicPropertySpin",
		"atomicPropertySpin_CSA",
		`{
	"typeVariableString" : "ChemicalShift",
	"diagTensorValues": _INSERT_FILE-aCSAdiagTensor__
}`
	);

	createInstance(
		"aCSA_NMRspinSystemModel",
		"NMRspinSystemModel_CSA",
		`{
	"spins": [
		_INSERT_FILE-aCSAatomicPropertySpin__
	]
}`
	);
}
