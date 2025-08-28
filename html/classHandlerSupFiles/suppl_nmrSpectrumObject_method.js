
	nmrSpectrum_AdditionalViewer() {
	    const myName = "nmrSpectrum_AdditionalViewer"; // function name don't use js feature in case 'use strict'
		const frame = document.createElement("div");
		frame.id = myName;
		frame.className = "frame red-frame";
		frame.innerHTML = `<svg width="200" height="100"></svg>`;

		const container = document.getElementById("dynamicContent");
		container.appendChild(frame);

		var viewerDataPassed = {};
		// NSKEA not viewer specific, object specific
		if (myName == "setSpectra_AdditionalViewer") { // do not remove automatic code...
			const nMRspectraObjectsDemo = [
			   new NMRspectrumObject({demo : {arrayLorentzian : {
						centers: [7.27, 5.0, 0.0],
						widthsInHz: [0.7, 0.7, 0.7],
						amplitudes: [1, 10, 1],
					}}}), 
			    new NMRspectrumObject({demo : {
				    spectralData:{firstPoint:9}, 
				    arrayLorentzian:{centers:[3.8]}}
			    })
			]; 

			 viewerDataPassed =  [
				new NMRspectrumObject({},this.obj.members[0]), 
				new NMRspectrumObject({},this.obj.members[1])
			]; 
		} 
		if (myName == "nmrSpectrum_AdditionalViewer") { // do not remove automatic code...
			const nMRspectraObjectsDemo = [
			   new NMRspectrumObject({demo : {arrayLorentzian : {
						centers: [7.27, 5.0, 0.0],
						widthsInHz: [0.7, 0.7, 0.7],
						amplitudes: [1, 10, 1],
					}}})
			]; 
				

			 viewerDataPassed =  [
				new NMRspectrumObject({},this.obj)
			]; 
		}
		// NSKEA end not viewer specific, object specific
		// AZGLC start
		function callGenerationGraphic(viewerDataPassed)  {
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
		callGenerationGraphic(viewerDataPassed);
	}