jGraphObject_AdditionalViewer() {
		const myName = "jGraphObject_AdditionalViewer"; // function name don't use js feature in case 'use strict'
		const frame = document.createElement("div");
		frame.id = myName;
		frame.className = "frame red-frame";
		frame.innerHTML = `<svg width="200" height="100"></svg>`;

		const container = document.getElementById("dynamicContent");
		container.appendChild(frame);

		var viewerDataPassed = {};
		// NSKEA not viewer specific, object specific
		if (myName == "jGraphObject_AdditionalViewer") { // do not remove automatic code...
		
			
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
					const jGraph = new JgraphObject(param, {
						jsonSpectrum: this.obj.jsonSpectrum,
						jsonMolecule: this.obj.jsonMolecule,
						jsonDataInitial: this.obj.jsonDataInitial,
						origin: origin,
					});
					console.log("UUZ jGraph", jGraph)






		  const settings = initializeSettings({});
					var svg = createSVG(myName, settings);
					var spectrum = new NmrSpectrum(
						jGraph.data.spectrumDataAllChopped,
						svg,
						settings,
						settings.smallScreen, // default true
						//{totalCoveredPPM: 7.0,regions: [{ start: 8.0, end: 1.0 }]},
						jGraph.data.regionsData // default {}
					);

					
					console.log("UUZ3 spectrum", spectrum)

					const settings_with_spectrum_settings = spectrum.getSettings();

					var nmrAssignmentList = [];
					var first = true;
					for (const jGraphObj2 of jGraph.data.jGraphObjDataList) {

						const condition1 = (jGraphObj2 && typeof jGraphObj2 === "object" && jGraphObj2.type === "couplingNetwork");
						const condition2 = (jGraphObj2 && typeof jGraphObj2 === "object" && jGraphObj2.type === "variableSet");
						const condition3 = Array.isArray(jGraphObj2) && first; if (condition3) { first = false; } // first array only
						if (condition1 || condition2 || condition3) {
							nmrAssignmentList.push(
								new NmrAssignment(
									jGraphObj2,
									svg,
									settings_with_spectrum_settings.smallScreen,
									settings_with_spectrum_settings,
									"JmolAppletAz", // WERE   NOT IN quaotes....... for jmol
									nmrAssignmentList.length
								)
							);
						}
					}
					console.log("UUZ4 spectrum", spectrum)

					const classes = [...nmrAssignmentList, spectrum];
				  
					// Register each class as a receiver for every other class based on data type compatibility


					classes.forEach((sender) => {
						classes.forEach((receiver) => {
							if (sender !== receiver) {
								sender.getExportTypes().forEach((sendType) => {
									if (receiver.getImportTypes().includes(sendType)) {
										sender.registerReceiver(receiver, sendType);
									}
								});
							}
						});
					});
										console.log("UUZ5 spectrum", spectrum)

					spectrum.triggerSendAxis();
					nmrAssignmentList.forEach((nmrAssignment) => {
						nmrAssignment.build();
					});


										console.log("UUZ6 spectrum", spectrum)
	
		} 
		
		// NSKEA end not viewer specific, object specific
		// AZGLC start
		function call(viewerDataPassed) {
			
		}
		// AZGLC end
		//call(viewerDataPassed);
	}