// ⚠️ This file was automatically generated. Do not edit manually.
import { processJSONData } from '../src/htmlScripts.js';
  
/// AUTOMATIC viewer IMPORT INSERTION WILL BE MADE HERE

/// AUTOMATIC IMPORT INSERTION WILL BE MADE HERE

export class Obj2Handler {
	constructor(obj = {}) {
		this.obj = obj;
		this.verbose = true;
		this.verboseStartingString = "Obj2Handler";
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

		this.#showUpdateWithButton();
		this.#showUpdateNoButton();

		const methodsUpdater = this.#listNonStaticMethods("_showUpdateNoButton"); // get all elevator methods
		methodsUpdater.forEach((method) => {
			console.log("method", method.info)
			this.#showDataUpdater(method.info); // Call for each elevator
		});

		const methods = this.#listNonStaticMethods("_DataEnrichment"); // get all elevator methods
		methods.forEach((method) => {
			this.#showDataEnrichmentMethods(method.info); // Call for each elevator
		});

		const exporters = this.#listNonStaticMethods("_DataExport"); // get all elevator methods
		exporters.forEach((method) => {
			this.#showDataExportMethods(method.info); // Call for each elevator
		});
		
		this.#showViewer();
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
			
				//ageDisplay.textContent = newAge; // Update display
				//editor.value = JSON.stringify(this.obj, null, 4); // Update editor
				//	window.processJSONData(this.obj, this, validationMessage); // Trigger processing
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






	//	}).catch((err) => {
	//	    console.error(err);
	//	});

		

		
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
		inputElement.textContent = "Save " + item.objDataField + " As...";
		inputElement.id = item.htmlID + dataObj.uniqueHTMLcode;

		// Add file saving logic depending on the file type
		inputElement.addEventListener("click", () => {
			let fileData = {};
			if (Array.isArray(item.objDataField) && item.objDataField.length > 0) {
			    // Copy only listed fields
				item.objDataField.forEach((fieldName) => {
					fileData[fieldName] = this.obj[fieldName];
				});
			} else {
			    // Copy everything if no fields are listed
				fileData = { ...this.obj };
			}

			let blob;
			let fileName = item.defaultFileName || "Output";

			if (item.type === "binary") {
				blob = new Blob([fileData], { type: "application/octet-stream" });
				fileName += ".bin";
			} else if (item.type === "json") {
				blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
				fileName += ".json";
			} else if (item.type === "txt") {
				blob = new Blob([fileData], { type: "text/plain" });
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
		const targetObjType = dataObj.targetObjType;

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

		let inputElement;

        inputElement = document.createElement("button");
        inputElement.textContent = "Save As";
        inputElement.id = dataObj.uniqueHTMLcode;

        // Add file saving logic depending on the file type
        inputElement.addEventListener("click", () => {
            let fileData = this.obj;  // Data to save, must be provided externally
			// Find method to generate export methos

			const methodName = dataObj.elevatorMethod; // "combineFiles"; // Dynamic method name
			if (typeof this[methodName] !== "function") {
					console.error(`Method "${methodName}" does not exist.`);
			}
			console.log(`Method AZU "${methodName}" is called.`);
			console.log(`Method AZU dataObj.outputComponents `, dataObj.outputComponents);
			console.log(`Method AZU dataObj`, dataObj);
			// Call adder of content
			// EMPTY ARRAY IF FORT ALL VALUES
			const dataExport = this[methodName]([], dataObj);
			console.log(`End "${methodName}" is called.`);
			fileData.fromExport = dataExport;
			//Object.assign(fileData, dataExport);  

			let blob;
			let fileName = "output";

			const fileType = "json";
			if (fileType === "binary") {
				blob = new Blob([fileData], { type: "application/octet-stream" });
				fileName += ".bin";
			} else if (fileType === "json") {
				blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
				fileName += ".json";
			} else if (fileType === "txt") {
				blob = new Blob([fileData], { type: "text/plain" });
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

        frame.appendChild(inputElement);
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


/// AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE
	obj2_AdditionalViewer() {
		const objClassName = "obj2";
		const myName = `${objClassName}_AdditionalViewer`; // function name don't use js feature in case 'use strict'

		// NSKEA DATA location of automatically inserted code

		// NSKEA not viewer specific, object specific
		function getProperDataForVisualization(inputData, objClassName) {
			if (objClassName == "obj2") { // do not remove automatic code...
				return inputData.obj.age;
			}
		}
		// NSKEA end not viewer specific, object specific

		// NSKEA Method location of automatically inserted code

		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame green-frame";
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);
			const svg = d3.select("#" + myName).append("svg").attr("width", 200).attr("height", 100);
			/* const svg = d3.select("#" + myName)
				  .append("svg")
				  .attr("viewBox", "0 0 890 490")
				  .attr("width", 890)
				  .attr("height", 490)
				  .style("display", "block")
				  .append("g")
				  .attr("transform", "translate(60,10)");
			*/
			svg
				.append("circle")
				.attr("cx", 100)
				.attr("cy", 50)
				.attr("r", viewerDataPassed)
				.style("fill", "red");	
		}
		// NSKEA end
		const viewerDataPassed = getProperDataForVisualization(this, objClassName);
		callGenerationGraphic(myName, viewerDataPassed);
	}

}
