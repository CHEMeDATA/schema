
	NMRspinSystemModel_CSA_AdditionalViewer() {
		const objClassName = "NMRspinSystemModel_CSA";
		const myName = `${objClassName}_AdditionalViewer`; // function name don't use js feature in case 'use strict'

		// NSKEA DATA location of automatically inserted code

		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame red-frame";
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);
			// const svg = d3.select("#" + myName).append("svg").attr("width", 200).attr("height", 100);
			const svg = d3.select("#" + myName)
				.append("svg")
				.attr("viewBox", "0 0 890 490")
				.attr("width", 890)
				.attr("height", 490)
				.style("display", "block");

			var theSsSpectrum = new SsSpectrum(viewerDataPassed, svg);
		}
		// NSKEA end
		const viewerDataPassed = SsSpectrum.getProperDataForVisualization(this, objClassName);
		callGenerationGraphic(myName, viewerDataPassed);
	}
