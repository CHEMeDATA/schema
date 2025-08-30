	jGraphObject_AdditionalViewer() {
		const myName = "jGraphObject_AdditionalViewer"; // function name don't use js feature in case 'use strict'

		// NSKEA DATA location of automatically inserted code

		// NSKEA not viewer specific, object specific
		function getProperDataForVisualization(inputData, myName) {

			if (myName == "jGraphObject_AdditionalViewer") {
				// do not remove automatic code...

				const origin = {
					timeStampConversion: "created by jGraphObject_AdditionalViewer",
				};
				const paramMnovaJsonConverter = {
					creatorParam: {
						editor: "djeanner",
						version: "1",
						source: "MnovaJson",
						id: "none",
					},
				};
				return new JgraphObject(paramMnovaJsonConverter, {
					jsonSpectrum: inputData.obj.jsonSpectrum,
					jsonMolecule: inputData.obj.jsonMolecule,
					jsonDataInitial: inputData.obj.jsonDataInitial,
					origin: origin,
				});

			}
		}
		
		// NSKEA end not viewer specific, object specific
		// NSKEA start
		function callGenerationGraphic(myName, viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame red-frame";
			frame.innerHTML = `<svg width="200" height="100"></svg>`;

			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);
			const settings = initializeSettings({});
			var svg = createSVG(myName, settings);

			var theJgraphViewer = new JgraphViewer(viewerDataPassed, svg, settings);
		}
		// NSKEA end
		const viewerDataPassed = getProperDataForVisualization(this, myName);
		callGenerationGraphic(myName, viewerDataPassed);
	}
