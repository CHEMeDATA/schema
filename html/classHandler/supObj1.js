
	myDataEnrichment1_DataEnrichment(targetObjType, dataObj = {}) {
		const nyName = "myDataEnrichment1_DataEnrichment"; // dont automatize in case use strict
		if (targetObjType == "info") {
			return {
				sourceObjType: "obj1",
				targetObjType: "groupObject1",
				uniqueHTMLcode: nyName, // avoid name conflicts
				elevatorMethod: nyName,
				arrayOfItems: [
					{
						type: "file",
						htmlID: "input1",
						comment: "Upload JSON File 1 - mandatory",
						show: true,
					},
					{
						type: "file",
						htmlID: "input2rr",
						comment: "Upload JSON File 2",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "param1",
						baseType: "int",
						comment:
							"Enter an Integer - this dummy test, not required by schema",
						defaultValue: 10,
						show: true,
					},
					{
						type: "baseType",
						htmlID: "param2",
						baseType: "float",
						comment: "Enter a Float - this dummy test, not required by schema",
						defaultValue: 5.5,
						show: true,
					},
					{
						type: "baseType",
						htmlID: "param3",
						baseType: "string",
						comment: "Enter a String - this dummy test, not required by schema",
						defaultValue: "toto",
						show: true,
					},
				],
			};
		}

		// optional escape
		if (
			!document.getElementById(`input1${dataObj.uniqueHTMLcode}`).dataset
				.content
		) {
			const errorMessage = "Failed because of missing input1";
			document.getElementById(
				`mergeOutput${dataObj.uniqueHTMLcode}`
			).textContent = errorMessage;
			return;
		}

		const objm1 = this.#getValOrDefault(dataObj, "input1");
		const objm2 = this.#getValOrDefault(dataObj, "input2rr");
		const obj1 = this.#getValOrDefault(dataObj, "param1");
		const obj2 = this.#getValOrDefault(dataObj, "param2");
		const obj3 = this.#getValOrDefault(dataObj, "param3");
		const groupObj = {
			$schema: `https://raw.githubusercontent.com/NMReDATAInitiative/J-graph/main/testSchema/schemaNoLinkData/${targetObjType}.json`,
			members: [this.obj, objm1, objm2],
			param1: obj1,
			param2: obj2,
			param3: obj3,
		};

		const content = { content: groupObj };
		const encodedContent = JSON.stringify(content);
		const linkUrl = `https://nmredatainitiative.github.io/J-graph/testSchema/html/${targetObjType}.html#data=${encodedContent}`;

		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = JSON.stringify(groupObj, null, 2);
		window.open(linkUrl, "_blank");
	}

	myDataEnrichment2_DataEnrichment(targetObjType, dataObj = {}) {
		const nyName = "myDataEnrichment2_DataEnrichment"; // dont automatize in case use strict
		if (targetObjType == "info") {
			return {
				targetObjType: "pairObj1",
				uniqueHTMLcode: nyName, // avoid name conflicts use different names
				elevatorMethod: nyName, // this is the name of the methods
				arrayOfItems: [
					{
						type: "file",
						htmlID: "input1",
						comment: "Upload second object of type obj1",
						show: true,
					},
					{
						type: "baseType",
						htmlID: "param1",
						baseType: "int",
						comment: "Enter an Integer",
						defaultValue: 10,
						show: true,
					},
				],
			};
		}

		const objm = this.#getValOrDefault(dataObj, "input1");
		const obj1 = this.#getValOrDefault(dataObj, "param1");

		// optional escape
		if (
			!document.getElementById(`input1${dataObj.uniqueHTMLcode}`).dataset
				.content
		) {
			const errorMessage = "Failed because of missing input1";
			document.getElementById(
				`mergeOutput${dataObj.uniqueHTMLcode}`
			).textContent = errorMessage;
			return;
		}

		const pairObj = {
			$schema: `https://raw.githubusercontent.com/NMReDATAInitiative/J-graph/main/testSchema/schemaNoLinkData/${targetObjType}.json`,
			object1: this.obj,
			object2: objm,
			param1: obj1,
		};

		const content = { content: pairObj };
		const encodedContent = JSON.stringify(content);
		const linkUrl = `https://nmredatainitiative.github.io/J-graph/testSchema/html/${targetObjType}.html#data=${encodedContent}`;

		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = JSON.stringify(pairObj, null, 2);
		window.open(linkUrl, "_blank");
	}