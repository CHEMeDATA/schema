	nmrSpectrum_AdditionalViewer() {
		const objClassName = "nmrSpectrum";
		const myName = `${objClassName}_AdditionalViewer`; // function name don't use js feature in case 'use strict'

		// NSKEA DATA location of automatically inserted code

		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed)  {

			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame red-frame";
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);	
			//const svg = d3.select("#" + myName).append("svg").attr("width", 300).attr("height", 150);   
			const svg = d3.select("#" + myName)
				  .append("svg")
				  .attr("viewBox", "0 0 890 490")
				  .attr("width", 890)
				  .attr("height", 490)
				  .style("display", "block")
				  .append("g")
				  .attr("transform", "translate(60,10)");	

			var spectrum = new NmrSpectrum(viewerDataPassed, svg);
		}
		// NSKEA end
		const viewerDataPassed = NmrSpectrum.getProperDataForVisualization(this, objClassName);
		callGenerationGraphic(myName, viewerDataPassed);
	}
