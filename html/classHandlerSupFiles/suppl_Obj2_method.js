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
