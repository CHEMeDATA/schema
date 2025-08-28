	/// AUTOMATIC viewer METHOD INSERTION WILL BE MADE HERE
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
			viewerDataPassed = new JgraphObject(paramMnovaJsonConverter, {
				jsonSpectrum: this.obj.jsonSpectrum,
				jsonMolecule: this.obj.jsonMolecule,
				jsonDataInitial: this.obj.jsonDataInitial,
				origin: origin,
			});
			//	console.log("check1", viewerDataPassed.data.spectrumDataAllChopped)
		}
		// NSKEA end not viewer specific, object specific
		// AZGLC start
		function callGenerationGraphic(viewerDataPassed) {
			console.log("check2", viewerDataPassed.data.spectrumDataAllChopped);
			const settings = initializeSettings({});
			var svg = createSVG(myName, settings);
			var spectrum = new NmrSpectrum(
				viewerDataPassed.data.spectrumDataAllChopped,
				svg,
				settings,
				settings.smallScreen, // default true
				//{totalCoveredPPM: 7.0,regions: [{ start: 8.0, end: 1.0 }]},
				viewerDataPassed.data.regionsData // default {}
			);

			const settings_with_spectrum_settings = spectrum.getSettings();

			var nmrAssignmentList = [];
			var first = true;
			for (const jGraphObj2 of viewerDataPassed.data.jGraphObjDataList) {
				const condition1 =
					jGraphObj2 &&
					typeof jGraphObj2 === "object" &&
					jGraphObj2.type === "couplingNetwork";
				const condition2 =
					jGraphObj2 &&
					typeof jGraphObj2 === "object" &&
					jGraphObj2.type === "variableSet";
				const condition3 = Array.isArray(jGraphObj2) && first;
				if (condition3) {
					first = false;
				} // first array only
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

			spectrum.triggerSendAxis();
			nmrAssignmentList.forEach((nmrAssignment) => {
				nmrAssignment.build();
			});
		}
		// AZGLC end
		callGenerationGraphic(viewerDataPassed);
	}