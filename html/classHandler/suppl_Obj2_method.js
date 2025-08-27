	obj2_AdditionalViewer() {
    	const myName = "obj2_AdditionalViewer"; // function name don't use js feature in case 'use strict'		const container = document.getElementById("dynamicContent");
		
		var viewerDataPassed = {}
		// NSKEA not viewer specific, object specific
		if (myName == "obj2_AdditionalViewer") { // do not remove automatic code...
			viewerDataPassed = this.obj.age;

		}
		// NSKEA end not viewer specific, object specific

		// AZGLC start
		function call(viewerDataPassed) {
			const frame = document.createElement("div");
			frame.id = myName;
			frame.className = "frame green-frame";
			frame.innerHTML = `<svg width="200" height="100"></svg>`;
			const container = document.getElementById("dynamicContent");
			container.appendChild(frame);


			const svg = d3.select(frame).select("svg");
			svg
				.append("circle")
				.attr("cx", 100)
				.attr("cy", 50)
				.attr("r", viewerDataPassed)
				.style("fill", "red");	
		}
		// AZGLC end

		call(viewerDataPassed);
	}
