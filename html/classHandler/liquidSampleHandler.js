// ⚠️ This file was automatically generated. Do not edit manually.
class LiquidSampleHandler {
	constructor(obj = {}) {
		this.obj = obj;
		this.verbose = true;
		this.verboseStartingString = "LiquidSampleHandler";
	}

	// called by htmlScript.ps
	showAllOptionsInHTML(container) {
		if (this.verbose)
			console.log(this.verboseStartingString + "starts showAllOptionsInHTML");
		container.innerHTML = ""; // Clear existing content before adding new elements
		this.#showViewer();
		this.#showUpdateWithButton();

		const methodsUpdater = this.#listNonStaticMethods("showUpdateNoButton"); // get all elevator methods
		methodsUpdater.forEach((method) => {
			this.#showDataUpdater(method.info); // Call for each elevator
		});

		const methods = this.#listNonStaticMethods("_DataEnrichment"); // get all elevator methods
		methods.forEach((method) => {
			this.#showDataEnrichmentMethods(method.info); // Call for each elevator
		});

		this.#showViewer2();
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
			//if (!isNaN(newAge)) {
			this.obj.age = newAge; // Update the object's age
			document.getElementById("ageDisplay").textContent = inputVal; // Update display
			const validationMessage = document.getElementById("validationMessage");        

			window.processJSONData(this.obj, validationMessage); // Trigger processing

			const editor = document.getElementById("jsonEditor");
			editor.value = JSON.stringify(this.obj, null, 4);
		});
	}
	showUpdateNoButton(param, dataObj = {}) {
		const myName = "showUpdateNoButton"; // dont automatize in case use strict
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
        			}
            ],
        };
		if (param == "info") {
			return info
		}

		info.arrayOfItems.forEach((item) => {
	    const el = document.getElementById(item.htmlID+"showUpdateNoButton");
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

			window.processJSONData(this.obj, validationMessage); // Trigger processing

			const editor = document.getElementById("jsonEditor");
			editor.value = JSON.stringify(this.obj, null, 4);




		
	}

	#generateTableOfInputForEnrichment(frame, dataObj) {
		const dataArray = dataObj.arrayOfItems;
		frame.innerHTML = "<h4>Data Enrichment</h4>"; // Clear previous content
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
		dataObj.arrayOfItems.forEach((item) => {
			const inputElement = document.getElementById(
				`${item.htmlID}${dataObj.uniqueHTMLcode}`
			);
			if (inputElement) {
				// Check if this.obj has a property matching item.htmlID
				if (this.obj.hasOwnProperty(item.htmlID)) {
					inputElement.value = this.obj[item.htmlID]; // Use the object's value
					inputElement.style.color = "blue"; // Change text color
					// inputElement.style.backgroundColor = "#e0f7fa"; // Light blue background
				} else if (item.defaultValue !== undefined) {
					inputElement.value = item.defaultValue; // Fallback to defaultValue
					inputElement.style.color = "black"; // Default text color
					//inputElement.style.backgroundColor = "#f0f0f0"; // Light gray background
				}
			}
		});
	}

	#showDataEnrichmentMethods(dataObj) {
		const container = document.getElementById("dynamicContent");
		const targetObjType = dataObj.targetObjType;

		// Create the container for the file input and input
		const frame = document.createElement("div");
		frame.className = "frame red-frame";

		this.#generateTableOfInputForEnrichment(frame, dataObj);

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

	#showDataUpdater(dataObj) {
		const container = document.getElementById("dynamicContent");
		const targetObjType = dataObj.targetObjType;

		// Create the container for the file input and input
		const frame = document.createElement("div");
		frame.className = "frame blue-frame";

		this.#generateTableOfInputForEnrichment(frame, dataObj);

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

	#showViewer2() {
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
			.style("fill", "blue");
	}



	myDataEnrichment1_DataEnrichment(targetObjType, dataObj = {}) {
		const myName = "myDataEnrichment1_DataEnrichment"; // dont automatize in case use strict
		if (targetObjType == "info") {
			return {
				sourceObjType: "liquidSample",
				targetObjType: "NMRliquidSample",
				uniqueHTMLcode: myName, // avoid name conflicts
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
						show: true,
					}
				],
			};
		}		
		var targetObj = {
		    ...this.obj, // start with all fields from this.obj
		    $schema: `https://chemedata.github.io/schema/v1/schema/${targetObjType}.json`,
		};

		// optional escape
		const curField = "tubeDiameter_mm";
		/*	if (
					!document.getElementById(`${curField}${dataObj.uniqueHTMLcode}`).dataset.content
				) {
					const errorMessage = `Failed because of missing ${curField}`;
					document.getElementById(
						`mergeOutput${dataObj.uniqueHTMLcode}`
					).textContent = errorMessage;
					return;
				}
		*/
			

		// Override or add fields if they exist
		const obj1 = this.#getValOrDefault(dataObj, curField);

		if (obj1 !== undefined) targetObj[curField] = obj1;

			
		const content = { content: targetObj };
		const encodedContent = JSON.stringify(content);
		const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;
		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = JSON.stringify(targetObj, null, 2);
		window.open(linkUrl, "_blank");
	}




// Auto-generated supplement file for liquidSample
liquidSample_DataEnrichment(targetObjType, dataObj = {}) {
    const myName = "liquidSample_DataEnrichment"; // don't automatize in case 'use strict'
    const myName2 = "liquidSample_DataEnrichment"; // don't automatize in case 'use strict'
    if (targetObjType == "info") {
        return {
            sourceObjType: "liquidSample",
            targetObjType: "NMRliquidSample",
            uniqueHTMLcode: myName2,
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
        }
            ],
        };
    }

    var targetObj = {
        ...this.obj,
        $schema: `https://chemedata.github.io/schema/v1/schema/${targetObjType}.json`,
    };

    // Handle fields dynamically
    
        const tubeDiameter_mm = this.#getValOrDefault(dataObj, "tubeDiameter_mm");
        if (tubeDiameter_mm !== undefined) targetObj["tubeDiameter_mm"] = tubeDiameter_mm;

    const content = { content: targetObj };
    const encodedContent = JSON.stringify(content);
    const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;

    document.getElementById(`mergeOutput${dataObj.uniqueHTMLcode}`).textContent = JSON.stringify(targetObj, null, 2);
    window.open(linkUrl, "_blank");
}

//module.exports = liquidSample_DataEnrichment;

}
