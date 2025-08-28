	obj2_AdditionalViewer() {
		const myName = "obj2_AdditionalViewer"; // function name don't use js feature in case 'use strict'				

		// NSKEA DATA location of automatically inserted code

		// NSKEA not viewer specific, object specific
		function getProperDataForVisualization(inputData, myName) {
			if (myName == "obj2_AdditionalViewer") { // do not remove automatic code...
				return inputData.obj.age;
			}
		}
		// NSKEA end not viewer specific, object specific

		// NSKEA Method location of automatically inserted code

		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed)  {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame green-frame";
			frame.innerHTML = `<svg width="200" height="100"></svg>`;

			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);


			const svg = d3.select(frame).select("svg");
			svg
				.append("circle")
				.attr("cx", 100)
				.attr("cy", 50)
				.attr("r", viewerDataPassed)
				.style("fill", "red");	
		}
		// NSKEA end
		const viewerDataPassed = getProperDataForVisualization(this, myName);
		callGenerationGraphic(myName, viewerDataPassed);
	}
