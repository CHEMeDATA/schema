
	setSpectra_AdditionalViewer() {
	    const myName = "setSpectra_AdditionalViewer"; // function name don't use js feature in case 'use strict'
		const frame = document.createElement("div");
		frame.id = myName;
		frame.className = "frame red-frame";
		frame.innerHTML = `<svg width="200" height="100"></svg>`;

		const container = document.getElementById("dynamicContent");
		container.appendChild(frame);

		var viewerDataPassed = {};
		// NSKEA not viewer specific, object specific
		if (myName == "setSpectra_AdditionalViewer") { // do not remove automatic code...
		
			
const origin = {
                        timeStampConversion: "no timestamp for tests no content ugly test",
                       
                    };
					console.log("UUZ this.obj.jsonSpectrum", this.obj.jsonSpectrum)

                    const param = {
                        creatorParam: {
                            editor: "djeanner",
                            version: "1",
                            source: "MnovaJson",
                            id: "none",
                        },
                    };
                    const viewerDataPassed = new JgraphObject(param, {
                        jsonSpectrum: this.obj.jsonSpectrum,
                        jsonMolecule: this.obj.jsonMolecule,
                        jsonDataInitial: this.obj.jsonDataInitial,
                        origin: origin,
                    });
					console.log("UUZ viewerDataPassed", viewerDataPassed)

		
		} 
		
		// NSKEA end not viewer specific, object specific
		// AZGLC start
		function call(viewerDataPassed) {
			const settings = initializeSettings({});
			var svg = createSVG(myName, settings);
			var spectrum = new NmrSpectrum(
				viewerDataPassed,
				svg,
				settings,
				settings.smallScreen
			);
		}
		// AZGLC end
		call(viewerDataPassed);
	}