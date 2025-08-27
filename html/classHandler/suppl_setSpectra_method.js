
NmrSpectrum_AdditionalViewer() {
    const myName = "NmrSpectrum_AdditionalViewer"; // don't automatize in case 'use strict'
	const frame = document.createElement("div");
	frame.id = myName;
	frame.className = "frame red-frame";
	frame.innerHTML = `<svg width="200" height="300"></svg>`;

	const container = document.getElementById("dynamicContent");
	container.appendChild(frame);
		
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
		

	const nMRspectraObjects =  [
		new NMRspectrumObject({},this.obj.members[0]), 
		new NMRspectrumObject({},this.obj.members[1])
	]; 

	const settings = initializeSettings({});
	var svg = createSVG(myName, settings);
	var spectrum = new NmrSpectrum(
		nMRspectraObjects,
		svg,
		settings,
		settings.smallScreen
	);
	}