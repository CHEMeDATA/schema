import { initializeSettings } from "../src_objects/nmrSpectrum.js";
import { NmrSpectrum } from "../src_objects/nmrSpectrum.js";
import { createSVG } from "../src_objects/nmrSpectrum.js";

import { JgraphObject } from "../src_objects/JgraphObject.js";
import { NmrAssignment } from "../src_objects/nmrAssignement.js";

export class JgraphViewer {
	constructor(viewerDataPassed, svg, settings) {
		
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
}
