// This file was automatically generated. Do not edit manually.
import { processJSONData } from '../src/htmlScripts.js';
  
/// AUTOMATIC viewer IMPORT INSERTION WILL BE MADE HERE
import { ControlSliders } from "../src_objects/controlSliders.js";
import { SsSpectrum } from "../src_objects/ssSpectrum.js";
import { csa2xyNMR } from "../src_objects/csa2xyNMR.js";

/// AUTOMATIC IMPORT INSERTION WILL BE MADE HERE
// redundant import { csa2xyNMR } from "../src_objects/csa2xyNMR.js";
import { NMRspinSystemModel_CSA } from "../src_objects/NMRspinSystemModel_CSA.js";




export class NMRspinSystemModel_CSAHandler {
	constructor(obj = {}) {
		this.obj = obj;
		this.verbose = true;
		this.verboseStartingString = "NMRspinSystemModel_CSAHandler";
	}

	#makeListMethods(suffix = "") {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(
        (name) =>
          typeof this[name] === "function" &&
          name !== "constructor" &&
          (suffix === "" || name.endsWith(suffix))
      );
  	}
	// called by htmlScript.ps
	showAllOptionsInHTML(container) {
		if (this.verbose)
			console.log(this.verboseStartingString + "starts showAllOptionsInHTML");
		container.innerHTML = ""; // Clear existing content before adding new elements

		const methodsVA = this.#makeListMethods("_AdditionalViewer");
		methodsVA.forEach((method) => {
			console.log(`Calling: ${method}`);
			this[method]();
		});

		const testAdditionalFrames = false;
		if (testAdditionalFrames) this.#showUpdateWithButton();
		if (testAdditionalFrames) this.#showUpdateNoButton();

		const methodsUpdater = this.#listNonStaticMethods("_showUpdateNoButton"); // get all elevator methods
		methodsUpdater.forEach((method) => {
			if (this.verbose) console.log("showAllOptionsInHTML _showUpdateNoButton method", method.info)
			this.#showDataUpdater(method.info); // Call for each elevator
		});

		const methods = this.#listNonStaticMethods("_DataEnrichment"); // get all elevator methods
		methods.forEach((method) => {
			if (this.verbose) console.log("showAllOptionsInHTML _DataEnrichment method", method.info)
			this.#showDataEnrichmentMethods(method.info); // Call for each elevator
		});

		const exporters = this.#listNonStaticMethods("_DataExport"); // get all elevator methods
		exporters.forEach((method) => {
			if (this.verbose) console.log("showAllOptionsInHTML _DataExport method", method.info)
			this.#showDataExportMethods(method.info); // Call for each elevator
		});
		
		if (testAdditionalFrames) this.#showViewer();
	}

	#listNonStaticMethods(include) {
		const prototype = Object.getPrototypeOf(this);
		// if (this.verbose) console.log(this.verboseStartingString + `#listNonStaticMethods Class: ${this.constructor.name}`);
		// if (this.verbose) console.log(this.verboseStartingString + #listNonStaticMethods Instance Methods:");
		const methodNames = Object.getOwnPropertyNames(prototype).filter(
			(prop) => typeof prototype[prop] === "function" && prop !== "constructor"
		);

		const results = [];

		methodNames.forEach((methodName) => {
			if (methodName.includes(include)) {
				const method = prototype[methodName];
				const result = method.call(this, "info"); // Call the method with "info"
				results.push({ method: methodName, info: result });
			}
			// console.log(`#listNonStaticMethods - ${methodName}`);
			// console.log(`#listNonStaticMethods - Parameter count: ${prototype[methodName].length}`);
		});

		return results;
	}

	#getDefaultValue(targetObj, htmlID) {
		const item = targetObj.arrayOfItems.find((item) => item.htmlID === htmlID);
		return item ? item.defaultValue : {}; // Return undefined if not found
	}

	#getValOrDefault(dataObj, input) {
		const content1 = document.getElementById(
			`${input}${dataObj.uniqueHTMLcode}`
		).dataset.content;
		return content1
			? JSON.parse(content1)
			: this.#getDefaultValue(dataObj, input); // here add default value
	}

	updateContent(data) {
		this.obj = data;
	}


	#showUpdateWithButton() {
		const container = document.getElementById("dynamicContent");
		const frame = document.createElement("div");
		frame.className = "frame blue-frame";
		frame.innerHTML = `<h4>Data Update</h4>
          <p>Current age: <span id="ageDisplay">${this.obj.age}</span></p>
          <input type="number" id="ageInput" value="${this.obj.age}" />
          <button id="updateButton">Update</button>`;
		container.appendChild(frame);

		document.getElementById("updateButton").addEventListener("click", () => {
			const inputVal = document.getElementById("ageInput").value;
			const newAge = parseInt(inputVal, 10);
			if (!isNaN(newAge)) {
				this.obj.age = newAge; // Update the object's age
				document.getElementById("ageDisplay").textContent = inputVal; // Update display
				const validationMessage = document.getElementById("validationMessage");        

				processJSONData(this.obj, this, validationMessage); // Trigger processing

				const editor = document.getElementById("jsonEditor");
				editor.value = JSON.stringify(this.obj, null, 4);
			}
		});
	}

	#showUpdateNoButton() {
		const container = document.getElementById("dynamicContent");
		const frame = document.createElement("div");
		frame.className = "frame blue-frame";
		frame.innerHTML = `<h4>Data Update</h4>
        <p>Current age: <span id="ageDisplay2">${this.obj.age}</span></p>
        <input type="number" id="ageInput2" value="${this.obj.age}" />`;
		container.appendChild(frame);

		const ageInput = document.getElementById("ageInput2");
		const ageDisplay = document.getElementById("ageDisplay2");
		const editor = document.getElementById("jsonEditor");
		const validationMessage = document.getElementById("validationMessage");

		ageInput.addEventListener("input", () => {
			const inputVal = ageInput.value;
			const newAge = parseInt(inputVal, 10);
			if (!isNaN(newAge)) {
				this.obj.age = newAge; // Update or create age
				document.getElementById("ageDisplay").textContent = inputVal; // Update display
				const validationMessage = document.getElementById("validationMessage");    

				processJSONData(this.obj, this, validationMessage); // Trigger processing

				const editor = document.getElementById("jsonEditor");
				editor.value = JSON.stringify(this.obj, null, 4);
			}
		});
	}

	async loadSchemaPOO(input) {
		const response = await fetch(input);
		if (!response.ok) {
			throw new Error(`Failed to load schema: ${response.status}`);
		}
		const schema = await response.json();
		return schema;
	}
	

	default_showUpdateNoButton(param, dataObj = {}) {
		const myName = "default_showUpdateNoButton"; // dont automatize in case use strict
		const validationMessage = document.getElementById("validationMessage");    
   // not working
	//	this.loadSchemaPOO(this.obj.$schema).then((schema) => {
	//	    console.log("Schema content:", schema);

 	
		const info = {
	            uniqueHTMLcode: myName,
	            elevatorMethod: myName,
	            arrayOfItems: [
	                {
		            type: "baseType",
		            htmlID: "tubeDiameter_mm",
		            baseType: "float",
		            comment: "ZZZZZ Enter a value in mm",
		            defaultValue: 5.5,
		            randomFrom: 1,
		            randomTo: 10,
		            show: true
        			},
					{
						type: "file",
						htmlID: "additionalObject",
						comment: "Select JSON File 2",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "extraString",
						baseType: "string",
						comment:
							"Enter an string - this dummy test, not required by schema",
						defaultValue: "This is default",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "extraDummyParam",
						baseType: "int",
						comment:
							"Enter an Integer - this dummy test, not required by schema",
						defaultValue: 10,
						show: true,
					}
            ],
        };
		if (param == "info") {
			return info
		}

		info.arrayOfItems.forEach((item) => {
	    const el = document.getElementById(item.htmlID+myName);
	    if (!el) return; 
	    let value = el.value;

	    // Convert based on baseType
	    switch (item.baseType) {
	        case "float":
	        case "double":
	            value = parseFloat(value);
	            if (isNaN(value)) value = null;
	            break;
	        case "int":
	            value = parseInt(value, 10);
	            if (isNaN(value)) value = null;
	            break;
	        case "string":
	            value = String(value);
	            break;
	        default:
	            console.warn(`Unknown baseType "${item.baseType}" for ${item.htmlID}`);
	            break;
	    }

	    // Set as field of this.obj using htmlID as key
	    this.obj[item.htmlID] = value;
	});

	//	document.getElementById("ageDisplay").textContent = inputVal; // Update display

	processJSONData(this.obj, this, validationMessage); // Trigger processing
	const editor = document.getElementById("jsonEditor");
	editor.value = JSON.stringify(this.obj, null, 4);

	}

	other_showUpdateNoButton(param, dataObj = {}) {
		const myName = "other_showUpdateNoButton"; // dont automatize in case use strict
		const info = {
	            sourceObjType: "liquidSample",
	            targetObjType: "NMRliquidSample",
	            uniqueHTMLcode: myName,
	            elevatorMethod: myName,
	            arrayOfItems: [
	                {
		            type: "baseType",
		            htmlID: "tubeDiameter_mm",
		            baseType: "float",
		            comment: "Enter a value in mm",
		            defaultValue: 5.5,
		            randomFrom: 1,
		            randomTo: 10,
		            show: true
        			},
					{
						type: "file",
						htmlID: "additionalObject",
						comment: "Select JSON File 2",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "extraString",
						baseType: "string",
						comment:
							"Enter an string - this dummy test, not required by schema",
						defaultValue: "This is default",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "extraDummyParam",
						baseType: "int",
						comment:
							"Enter an Integer - this dummy test, not required by schema",
						defaultValue: 10,
						show: true,
					}
            ],
        };
		if (param == "info") {
			return info
		}

		info.arrayOfItems.forEach((item) => {
	    const el = document.getElementById(item.htmlID+myName);
	    if (!el) return; 
	    let value = el.value;

	    // Convert based on baseType
	    switch (item.baseType) {
	        case "float":
	        case "double":
	            value = parseFloat(value);
	            if (isNaN(value)) value = null;
	            break;
	        case "int":
	            value = parseInt(value, 10);
	            if (isNaN(value)) value = null;
	            break;
	        case "string":
	            value = String(value);
	            break;
	        default:
	            console.warn(`Unknown baseType "${item.baseType}" for ${item.htmlID}`);
	            break;
	    }

	    // Set as field of this.obj using htmlID as key
	    this.obj[item.htmlID] = value;
	});

		//	document.getElementById("ageDisplay").textContent = inputVal; // Update display
			const validationMessage = document.getElementById("validationMessage");        

			processJSONData(this.obj, this, validationMessage); // Trigger processing

			const editor = document.getElementById("jsonEditor");
			editor.value = JSON.stringify(this.obj, null, 4);
	}

	#generateTableOfInputForExport(frame, dataObj, title) {
		console.log("LLOOGG Table ",dataObj);
		const dataArray = dataObj.outputComponents;
		frame.innerHTML = `<h4>${title}</h4>`;

		const table = document.createElement("table");
		table.style.borderCollapse = "collapse";
		table.style.width = "100%";

		dataArray.forEach((item) => {

			const row = document.createElement("tr");

			// First column: Comment
			const commentCell = document.createElement("td");
			commentCell.textContent = item.label;
			commentCell.style.border = "1px solid black";
			commentCell.style.padding = "5px";
			row.appendChild(commentCell);

			// Second column: Save-as box (for saving files instead of loading)
			const inputCell = document.createElement("td");
			inputCell.style.border = "1px solid black";
			inputCell.style.padding = "5px";

			let inputElement;

			inputElement = document.createElement("button");
			inputElement.textContent = "Save " + item.defaultFileName + " ...";
			inputElement.id = item.htmlID + dataObj.uniqueHTMLcode;

			// Add file saving logic depending on the file type
			
			inputElement.addEventListener("click", () => {
				// Find method to generate export methos

				const methodName = dataObj.elevatorMethod; // "combineFiles"; // Dynamic method name
				if (typeof this[methodName] !== "function") {
						console.error(`Method "${methodName}" does not exist.`);
				}
				
				// Call adder of content
				dataObj.item = item;
				const dataExport = this[methodName]([], dataObj);


				let blob;
				let fileName = item.defaultFileName || "Output";

				if (item.type === "binary") {
					blob = new Blob([dataExport], { type: "application/octet-stream" });
					fileName += ".bin";
				} else if (item.type === "json") {
					blob = new Blob([JSON.stringify(dataExport, null, 2)], { type: "application/json" });
					fileName += ".json";
				} else if (item.type === "txt") {
					blob = new Blob([JSON.stringify(dataExport, null, 2)], { type: "text/plain" });
					fileName += ".txt";
				} else {
					alert("Unsupported file type!");
					return;
				}

			    // Create download link and trigger download
				const a = document.createElement("a");
				a.href = URL.createObjectURL(blob);
				a.download = fileName;
				a.click();
				URL.revokeObjectURL(a.href);
			});

			if (inputElement) {
				inputCell.appendChild(inputElement);
			}
			row.appendChild(inputCell);
			table.appendChild(row);
		});
		frame.appendChild(table);
	}

	#generateTableOfInputForEnrichment(frame, dataObj, title) {
		const dataArray = dataObj.arrayOfItems;
		frame.innerHTML =  `<h4>${title}</h4>`;
		const table = document.createElement("table");
		table.style.borderCollapse = "collapse";
		table.style.width = "100%";

		dataArray.forEach((item) => {
			if (!item.show) return; // Skip hidden rows

			const row = document.createElement("tr");

			// First column: Comment
			const commentCell = document.createElement("td");
			commentCell.textContent = item.comment;
			commentCell.style.border = "1px solid black";
			commentCell.style.padding = "5px";
			row.appendChild(commentCell);

			// Second column: Input field (either file or user input)
			const inputCell = document.createElement("td");
			inputCell.style.border = "1px solid black";
			inputCell.style.padding = "5px";

			let inputElement;
			if (item.type === "file") {
				inputElement = document.createElement("input");
				inputElement.type = "file";
				inputElement.id = item.htmlID + dataObj.uniqueHTMLcode;
				inputElement.accept = "application/json";
			} else if (item.type === "baseType") {
				inputElement = document.createElement("input");
				inputElement.id = item.htmlID + dataObj.uniqueHTMLcode;

				// Set the correct input type based on baseType
				if (item.baseType === "int") {
					inputElement.type = "number";
					inputElement.step = "1"; // Only integers
				} else if (item.baseType === "float") {
					inputElement.type = "number";
					inputElement.step = "any"; // Allow floating point numbers
				} else if (item.baseType === "string") {
					inputElement.type = "text";
				}
			}
			if (inputElement) {
				inputCell.appendChild(inputElement);
			}
			row.appendChild(inputCell);
			table.appendChild(row);
		});
		frame.appendChild(table);
	}
 
	#addFileInputListeners(dataObj, loadFileCallback, handleInputChange) {
		const dataArray = dataObj.arrayOfItems;
		dataArray.forEach((item) => {
			const inputElement = document.getElementById(
				item.htmlID + dataObj.uniqueHTMLcode
			);
			if (!inputElement) return;
			if (item.type === "file") {
				// Add event listener for file inputs
				inputElement.addEventListener("change", loadFileCallback);
			} else if (item.type === "baseType") {
				// Add event listener for text/number inputs
				inputElement.addEventListener("input", handleInputChange);
			}
		});
	}

	#updateValuesInputDataEnrichment(dataObj) {
		console.log("inputElement Warning: REMOVED EFFECT OF updateValuesInputDataEnrichment. Seems uselsss")
		return;
		dataObj.arrayOfItems.forEach((item) => {
			const inputElement = document.getElementById(
				`${item.htmlID}${dataObj.uniqueHTMLcode}`
			);
			if (inputElement) {
				// Check if this.obj has a property matching item.htmlID
				if (this.obj.hasOwnProperty(item.htmlID)) {
					console.log ("inputElement", inputElement)
					console.log ("item.htmlID", item.htmlID)
					console.log ("this.obj", this.obj)
					inputElement.value = this.obj[item.htmlID]; // Use the object's value
					console.log ("alive1")

					inputElement.style.color = "blue"; // Change text color
					// inputElement.style.backgroundColor = "#e0f7fa"; // Light blue background
					console.log ("alive2")

				} else if (item.defaultValue !== undefined) {
					inputElement.value = item.defaultValue; // Fallback to defaultValue
					inputElement.style.color = "black"; // Default text color
					//inputElement.style.backgroundColor = "#f0f0f0"; // Light gray background
				}
			}
		});
		console.log ("alive3")
	}

	#showDataEnrichmentMethods(dataObj) {
		const container = document.getElementById("dynamicContent");
		const targetObjType = {
			objName : dataObj.targetObjType, 
			creatorParam: dataObj.creatorParam,
			inCaseDelete : dataObj
		};
		// Create the container for the file input and input
		const frame = document.createElement("div");
		frame.className = "frame red-frame";

		this.#generateTableOfInputForEnrichment(frame, dataObj, "Object Creation");

		frame.innerHTML += `          <button id="mergeButton${dataObj.uniqueHTMLcode}">Create ${dataObj.targetObjType}</button>`;
		frame.innerHTML += `          <pre id="mergeOutput${dataObj.uniqueHTMLcode}"></pre>`;

		container.appendChild(frame);

		this.#addFileInputListeners(
			dataObj,
			this.#loadFile,
			this.#handleInputChange
		);

		this.#updateValuesInputDataEnrichment(dataObj);

		document
			.getElementById(`mergeButton${dataObj.uniqueHTMLcode}`)
			.addEventListener("click", () => {
				const methodName = dataObj.elevatorMethod; // "combineFiles"; // Dynamic method name
				if (typeof this[methodName] === "function") {
					this[methodName](targetObjType, dataObj);
				} else {
					console.error(`Method "${methodName}" does not exist.`);
				}
			});
	}

	#showDataExportMethods(dataObj) {
		console.log("LLOOKK showDataExportMethods ",dataObj);

		const container = document.getElementById("dynamicContent");
		const targetObjType = dataObj.targetObjType;

		// Create the container for the file input and input
		const frame = document.createElement("div");
		frame.className = "frame green-frame";

		this.#generateTableOfInputForExport(frame, dataObj, `Export to ${dataObj.title}`);

		container.appendChild(frame);

		this.#updateValuesInputDataEnrichment(dataObj);

	}

	#showDataUpdater(dataObj) {
		const container = document.getElementById("dynamicContent");
		const targetObjType = dataObj.targetObjType;

		// Create the container for the file input and input
		const frame = document.createElement("div");
		frame.className = "frame blue-frame";

		this.#generateTableOfInputForEnrichment(frame, dataObj, "Data Enrichement");

		frame.innerHTML += `          <button id="updateButton2${dataObj.uniqueHTMLcode}">Update</button>`;
		frame.innerHTML += `          <pre id="mergeOutput${dataObj.uniqueHTMLcode}"></pre>`;

		container.appendChild(frame);

		this.#addFileInputListeners(
			dataObj,
			this.#loadFile,
			this.#handleInputChange
		);

		this.#updateValuesInputDataEnrichment(dataObj);

		document
			.getElementById(`updateButton2${dataObj.uniqueHTMLcode}`)
			.addEventListener("click", () => {
				console.log("dataObj",dataObj)
				const methodName = dataObj.elevatorMethod; // "combineFiles"; // Dynamic method name
				if (typeof this[methodName] === "function") {
					this[methodName](targetObjType, dataObj);
				} else {
					console.error(`Method "${methodName}" does not exist.`);
				}
			});
	}

	async #loadFile(event) {
		const file = event.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = function (e) {
			event.target.dataset.content = e.target.result;
		};
		reader.readAsText(file);
	}

	async #handleInputChange(event) {
		event.target.dataset.content = event.target.value;
	}

	#showViewer() {
		const container = document.getElementById("dynamicContent");
		const frame = document.createElement("div");
		frame.className = "frame green-frame";
		frame.innerHTML = `<svg width="200" height="200"></svg>`;
		container.appendChild(frame);

		const svg = d3.select(frame).select("svg");
		svg
			.append("circle")
			.attr("cx", 100)
			.attr("cy", 100)
			.attr("r", this.obj.age)
			.style("fill", "green");
	}

/// AUTOMATIC METHOD INSERTION WILL BE MADE HERE

// Bridge generated by makeFormForReaders.js
// include..... repository: solidStateNMRCSA-reader
// include..... jsLibrary: [object Object],[object Object],[object Object],[object Object]
// work on object:NMRspinSystemModel_CSA (object == className)
// Auto-generated supplement file for className:NMRspinSystemModel_CSA to objectTarget: NMRspectrumObject
NMRspectrumObject_DataEnrichment(targetObjType, dataObj = {}) {
	const myName = "NMRspectrumObject_DataEnrichment"; // don't automatize in case 'use strict'
	if (targetObjType == "info") {
		return {
			targetObjType: "NMRspectrumObject",
			uniqueHTMLcode: myName,
			elevatorMethod: myName,
			creatorParam: {"editor":"djeanner","version":"1","source":"solidStateNMRCSA","id":"none"},
			arrayOfItems: [
				{
					type: "file",
					htmlID: "jsonSpectrum",
					comment: "NMR file (.json) - testing needing input file to complement one object towards another",
					show: true
				},
{
					type: "baseType",
					htmlID: "origin",
					baseType: "string",
					comment: "origin",
					defaultValue: "Insert here the source of the data",
					randomFrom: undefined,
					randomTo: undefined,
					show: true
				},
{
					type: "baseType",
					htmlID: "frequency",
					baseType: "double",
					comment: "Larmor frequency",
					defaultValue: 500,
					randomFrom: 100,
					randomTo: 500,
					show: true
				}
			],
		};
	}


	// Handle fields dynamically
	var newFields = {};
	const jsonSpectrum = this.#getValOrDefault(dataObj, "jsonSpectrum");
	if (jsonSpectrum !== undefined) newFields["jsonSpectrum"] = jsonSpectrum;
	

	const origin = this.#getValOrDefault(dataObj, "origin");
	if (origin !== undefined) newFields["origin"] = origin;
	

	const frequency = this.#getValOrDefault(dataObj, "frequency");
	if (frequency !== undefined) newFields["frequency"] = frequency;
	
	
	// optional escape 
	if ( 
		(false)
	) {
		const errorMessage = "Failed because of missing input1";
		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = errorMessage;
		return;
	}

	console.log("del dataObj", dataObj)
	console.log("del this", this)
	const creatorParam = dataObj.creatorParam; 

	const theNMRspinSystemModel_CSA = new NMRspinSystemModel_CSA([], this.obj);
	console.log("7777")
	console.log("7777 creatorParam", creatorParam)

//	const targetData = {content :theNMRspinSystemModel_CSA.data};

	
// const newFields = {frequencyDummyWiredREPLACE: 500.0};
	const param = {
		//dataObj : dataObj,
		//objDataField: dataObj.item.objDataField,
		creatorParam : creatorParam,
		object: "nmrSpectrumObject", // NMRspectrumObject
		//objectObj: dataObj.objectObj,
        newFields
		};
		const toto = "nmrSpectrumObject";
	var targetObj = theNMRspinSystemModel_CSA._saveExportedData(param);
	  
	targetObj["$schema"] = `https://chemedata.github.io/schema/v1/schema/${toto}.json`;

//
	//const targetObj = new NMRspectrumObject([], targetData);
	console.log("del targetObject", targetObj)

//
	const targetContent = {content : targetObj};
	const encodedContent1 = JSON.stringify(targetContent);

	const linkUrl = `${toto}.html#data=${encodedContent1}`;
		console.log("del encodedContent1", encodedContent1)

	console.log("del linkUrl", linkUrl)

//  http://127.0.0.1:5504/html/html/%5Bobject%20Object%5D.html#storageKey=data_1758177371899_235705

//  http://127.0.0.1:5504/html/[object%20Object].html#data={%22firstPoint%22:2.2318793402777777,%22lastPoint% .....

// wrong  http://127.0.0.1:5504/html/nmrSpectrumObject.html#data={%22firstPoint%22:2.6782552083333333,%22lastPoint%22:1.1287760416666666,%22values%22:[0,0.11
// OK     http://127.0.0.1:5504/html/obj1size.html#data={%22content%22:{%22$schema%22:%22https://chemedata.github.io/schema/v1/schema/obj1size.json%22,%22name%22:%22Alice%22,%22size%22:2}}
// new    http://127.0.0.1:5504/html/nmrSpectrumObject.html#data={content%20:%20{%22firstPoint%22:2.2318793402777777,%22lastPoint%22:0.9406467013888888,%22values%22:[0,0.11003533537898744,0.26684998188699993,0.2744447972093309,0.2741574347019195,0.2755018387522016,0.27653727361134117,0.27786385161536076,0.27848250099590843,0.27988570928573603,0.2807481672082628,0.28211952533040724,0.2827762024743216,0.2841797598770686,0.28525142158780775,0.28677871397563387,0.2874264631952558,0.2888505543981279,0.29010424017906183,0.2912677271025521,0.2923290133476257,0.29406372989927015,0.2946388295718601,0.2965789820466722,0.29734317745481215,0.29910027129309513,0.3000978188855307,0.3017321612153734,0.30291131990296494,0.30446455734116684,0.305712593453271,0.3073693854468209,0.30858984163829256,0.31033931459699354,0.31154725807053696,0.3134823952402387,0.3145344470228467,0.31672325730323786,0.3177052608558109,0.3199176277433122,0.3210854828357696,0.3231168048722403,0.32466727069446016,0.3265082240104675,0.32833087444305414,0.33004102110862726,0.3319107719830104,0.333927035331726,0.335582822561264,0.33800032734870905,0.3394377614770616,0.3419201459203447,0.34377328838620863,0.34597147788320265,0.3481725794928414,0.3503417713301522,0.352489377771105,0.3551630888666425,0.35705622179167607,0.3598392
	//This dumps the json in the cell / may be too long
	//document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetData, null, 2);

	console.log("linkUrl.length",linkUrl.length)
	console.log("Valid URL?", /^[ -~]+$/.test(linkUrl));
	if (linkUrl.length > 10000) {
		localStorage.clear();
		const storageKey = `data_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
		localStorage.setItem(storageKey, JSON.stringify(targetData));
		const linkUrlShort = `html/${encodeURIComponent(targetObjType)}.html#storageKey=${storageKey}`;
		console.log("localStorage linkUrlShort.length",linkUrlShort.length)
		console.log("Valid localStorage URL?", /^[ -~]+$/.test(linkUrlShort));
		window.open(linkUrlShort, "_blank");
	} else {
		window.open(linkUrl, "_blank");
	}
}



/// AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE

// Viewer generated by makeFormForReaders.js
// include..... repository: CHEMeDATA/solidStateNMRCSA-reader
// include..... jsLibrary: undefined
	NMRspinSystemModel_CSA_AdditionalViewer() {
		const objClassName = "NMRspinSystemModel_CSA";
		const myName = `${objClassName}_AdditionalViewer`; // function name don't use js feature in case 'use strict'

		function callGenerationGraphic(myName, viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame red-frame";
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);
			// const svg = d3.select("#" + myName).append("svg").attr("width", 200).attr("height", 100);
			const svg = d3.select("#" + myName)
				.append("svg")
				.attr("viewBox", "0 0 900 500") // may be controled by frame size
				.style("width", "100%") // scales with container
				.style("height", "auto")
				.style("display", "block");

			var theSsSpectrum = new SsSpectrum(viewerDataPassed, svg);
		}

		const viewerDataPassed = SsSpectrum.getProperDataForVisualization(this, objClassName);
		callGenerationGraphic(myName, viewerDataPassed);
	}

}
