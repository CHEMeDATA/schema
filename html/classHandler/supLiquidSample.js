
	myDataEnrichment1_DataEnrichment(targetObjType, dataObj = {}) {
		const nyName = "myDataEnrichment1_DataEnrichment"; // dont automatize in case use strict
		if (targetObjType == "info") {
			return {
				sourceObjType: "liquidSample",
				targetObjType: "NMRliquidSample",
				uniqueHTMLcode: nyName, // avoid name conflicts
				elevatorMethod: nyName,
				arrayOfItems: [
					
					{
						type: "baseType",
						htmlID: "tubeDiameter",
						baseType: "float",
						comment: "Enter a Float",
						defaultValue: 5.5,
						show: true,
					}
				],
			};
		}

		// optional escape
	/*	const curField = "tubeDiameter";
		if (
			!document.getElementById(`${curField}${dataObj.uniqueHTMLcode}`).dataset.content
		) {
			const errorMessage = `Failed because of missing ${curField}`;
			document.getElementById(
				`mergeOutput${dataObj.uniqueHTMLcode}`
			).textContent = errorMessage;
			return;
		}
*/
	

	const obj1 = this.#getValOrDefault(dataObj, "tubeDiameter");
		
			
var targetObj = {
    ...this.obj, // start with all fields from this.obj
    $schema: `https://chemedata.github.io/schema/v1/schema/${targetObjType}.json`,
};

// Override or add fields if they exist
if (obj1 !== undefined) targetObj.param1 = obj1;

	
		const content = { content: targetObj };
		const encodedContent = JSON.stringify(content);
		const linkUrl = `https://chemedata.github.io/schema/html/${targetObjType}.html#data=${encodedContent}`;
		document.getElementById(
			`mergeOutput${dataObj.uniqueHTMLcode}`
		).textContent = JSON.stringify(targetObj, null, 2);
		window.open(linkUrl, "_blank");
	}
