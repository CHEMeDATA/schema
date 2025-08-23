
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
