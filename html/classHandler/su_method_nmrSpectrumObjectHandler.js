nmrSpectrumObject_DataExport(targetObjType, dataObj = {}) {
	const myName = "nmrSpectrumObject_DataExport"; // don't automatize in case 'use strict'
	if (targetObjType == "info") {
		return {
			uniqueHTMLcode: myName,
			elevatorMethod: myName,
			"creatorParam": {
					"editor": "djeanner",
					"version": "1",
					"source": "MnovaJson",
					"id": "none"
				},
			"object": "nmrSpectrumObject",
			"objectObj": "NMRspectrumObject",
			"type": "export",
			"title": "Mnova json spectrum",
			"outputComponents": [
				{
					"objDataField" : ["firstPoint", "values"],
					"label": "NMR file (.json)",
					"type": "json",
					"type comment" :"json binary txt"
				}
			]
		};
	}
	
	let trueReturnedObjetWireFirst = {};
	if (Array.isArray(targetObjType) && targetObjType.length === 0) {
		console.log("Array is empty");
		trueReturnedObjetWireFirst["selectorOfComponents"] = "all";
	}	else {
		trueReturnedObjetWireFirst["selectorOfComponents"] = "not all";
	}

	const outputFields = dataObj.outputComponents[0].objDataField;
	outputFields.forEach(fieldName => {
		trueReturnedObjetWireFirst[fieldName] = this.obj[fieldName];
	});

	// optional escape sourceObj // cancels action 
	if ( 
		false
	) {
		const errorMessage = "Failed because ...";
		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = errorMessage;
		return;
	}

	// here create object from this
	const thenmrSpectrumObject = new NMRspectrumObject([], this.obj);
	const param = {
		creatorParam : dataObj.creatorParam,
		targetObjType:targetObjType,
		outputFields:outputFields
		};
	const returedExport = thenmrSpectrumObject._saveExportedData(param);
	return returedExport;
}