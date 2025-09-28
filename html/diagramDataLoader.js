// diagramDataLoader.js
async function loadJsonFile(path) {
	try {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Failed to load ${path}`);
		return await response.json();
	} catch (err) {
		console.warn(`Could not load ${path}:`, err.message);
		return null;
	}
}

function getCoordinatesFromSavedOrIndex(
	InputId,
	savePositionData,
	indexBox,
	boxW,
	boxH,
	margin
) {
	const obj = savePositionData.objects.find((o) => o.id === InputId);
	if (obj) {
		return { x: obj.x, y: obj.y };
	}
	const winW = window.innerWidth;
	const winH = window.innerHeight;
	const cols = Math.max(
		1,
		Math.floor((winW - margin - 2 * boxW) / (boxW + margin))
	);
	const rows = Math.max(1, Math.floor((winH - margin) / (boxH + margin)));

	const col = indexBox % cols;
	const row = Math.floor(indexBox / cols) % rows;
	const x = margin + col * (boxW + margin);
	const y = margin + row * (boxH + margin);
	return { x, y };
}

export async function loadDiagramData(replaceWithObjects) {
	const boxW = 120;
	const boxH = 80;
	const margin = 20;

	const demoData = {
		objects: [
			{
				x: 18,
				y: 19,
				w: 200,
				h: 50,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				arrowFrom: true,
				id: "box1",
				type: "Box",
			},
			{
				x: 220,
				y: 255,
				w: 120,
				h: 70,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: true,
				cutColor: "green",
				arrowTo: true,
				id: "box2",
				type: "Box",
			},
			{
				objectName: "obj1",
				x: 50,
				y: 199,
				w: 120,
				h: 70,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "purple",
				arrowTo: true,
				id: "box3",
				type: "Box",
			},
			{
				objectName: "obj2",
				x: 217,
				y: 115,
				w: 120,
				h: 70,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "purple",
				id: "box4",
				type: "Box",
			},
			{
				objectName: "box1",
				x: 185,
				y: 355,
				w: 120,
				h: 70,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "purple",
				id: "box3",
				type: "Box",
			},
			{
				objectName: "box2",
				x: 400,
				y: 115,
				w: 120,
				h: 70,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "purple",
				id: "box5",
				type: "Box",
			},
			{
				x: 633,
				y: 227,
				w: 120,
				h: 70,
				color: "#ddd",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: true,
				objectName: "box1",
				cutColor: null,
				id: "box7",
				type: "Box",
			},
			{
				x: 378,
				y: 355,
				w: 120,
				h: 70,
				color: "#ddd",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: true,
				objectName: "child of box1",
				cutColor: null,
				id: "box8",
				type: "Box2",
			},
			{
				x: 650,
				y: 115,
				w: 120,
				h: 70,
				color: "#ddd",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: true,
				objectName: "child of box2",
				cutColor: null,
				id: "box9",
				type: "Box2",
			},
		],
		connectors: [
			{
				id: "conn1",
				from: "box1",
				to: "box2",
				type: "LineConnector",
			},
			{
				id: "conn2",
				from: "box2",
				to: "box3",
				type: "LineConnector",
			},
			{
				id: "conn3",
				from: "box1",
				to: "box3",
				type: "LineConnector",
			},
			{
				arrowTo: true,
				id: "conn4",
				from: "box3",
				to: "box7",
				type: "LineConnector",
			},
			{
				id: "conn5",
				from: "box3",
				to: "box8",
				type: "LineConnector",
			},
			{
				arrowFrom: true,
				id: "conn6",
				from: "box5",
				to: "box9",
				type: "LineConnector",
			},
		],
	};
	const savePositionData = {
  "objects": [
    {
      "x": 71,
      "y": 12,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "obj1",
      "id": "obj1",
      "type": "Box"
    },
    {
      "x": 616,
      "y": -10,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "obj2",
      "id": "obj2",
      "type": "Box"
    },
    {
      "x": 602,
      "y": 4,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "groupObject1",
      "id": "groupObject1",
      "type": "Box"
    },
    {
      "x": 403,
      "y": 3,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "sample",
      "id": "sample",
      "type": "Box"
    },
    {
      "x": 580,
      "y": 20,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "pairObj1",
      "id": "pairObj1",
      "type": "Box"
    },
    {
      "x": 20,
      "y": 180,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "nmrSpectrumObject",
      "id": "nmrSpectrumObject",
      "type": "Box"
    },
    {
      "x": 180,
      "y": 700,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "setSpectra",
      "id": "setSpectra",
      "type": "Box"
    },
    {
      "x": 625,
      "y": 623,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "jGraphObject",
      "id": "jGraphObject",
      "type": "Box"
    },
    {
      "x": 337,
      "y": 122,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "intPair",
      "id": "intPair",
      "type": "Box"
    },
    {
      "x": 321,
      "y": 143,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "tensor",
      "id": "tensor",
      "type": "Box"
    },
    {
      "x": 360,
      "y": 103,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "diagTensor",
      "id": "diagTensor",
      "type": "Box"
    },
    {
      "x": 611,
      "y": 355,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "atomicPropertySpin",
      "id": "atomicPropertySpin",
      "type": "Box"
    },
    {
      "x": 474,
      "y": 424,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "atomicPropertySpin_CSA",
      "id": "atomicPropertySpin_CSA",
      "type": "Box"
    },
    {
      "x": 443,
      "y": 219,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "atomicPropertySpin_Liquid",
      "id": "atomicPropertySpin_Liquid",
      "type": "Box"
    },
    {
      "x": 592,
      "y": 221,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "atomicPropertySpinInteraction",
      "id": "atomicPropertySpinInteraction",
      "type": "Box"
    },
    {
      "x": 453,
      "y": 315,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "NMRspinSystemModel",
      "id": "NMRspinSystemModel",
      "type": "Box"
    },
    {
      "x": 186,
      "y": 404,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "NMRspinSystemModel_CSA",
      "id": "NMRspinSystemModel_CSA",
      "type": "Box"
    },
    {
      "x": 323,
      "y": 313,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "red",
      "objectName": "liquidStatesNMRproperties",
      "id": "liquidStatesNMRproperties",
      "type": "Box"
    },
    {
      "x": 170,
      "y": 239,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "viewer_nmrSpectrumObject",
      "id": "viewer_nmrSpectrumObject",
      "type": "Box2"
    },
    {
      "x": 340,
      "y": 620,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "viewer_setSpectra",
      "id": "viewer_setSpectra",
      "type": "Box2"
    },
    {
      "x": 470,
      "y": 519,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "viewer_jGraphObject",
      "id": "viewer_jGraphObject",
      "type": "Box2"
    },
    {
      "x": 20,
      "y": 620,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "export_setSpectra",
      "id": "export_setSpectra",
      "type": "Box2"
    },
    {
      "x": 20,
      "y": 280,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "export_nmrSpectrumObject",
      "id": "export_nmrSpectrumObject",
      "type": "Box2"
    },
    {
      "x": 171,
      "y": 105,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "import_nmrSpectrumObject",
      "id": "import_nmrSpectrumObject",
      "type": "Box2"
    },
    {
      "x": 655,
      "y": 488,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "import_jGraphObject",
      "id": "import_jGraphObject",
      "type": "Box2"
    },
    {
      "x": 27,
      "y": 467,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "viewer_NMRspinSystemModel_CSA",
      "id": "viewer_NMRspinSystemModel_CSA",
      "type": "Box2"
    },
    {
      "x": 185,
      "y": 534,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "blue",
      "objectName": "bridge_NMRspinSystemModel_CSA",
      "id": "bridge_NMRspinSystemModel_CSA",
      "type": "Box"
    },
    {
      "x": 236,
      "y": 12,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "green",
      "objectName": "obj1size",
      "id": "obj1size",
      "type": "Box"
    },
    {
      "x": 546,
      "y": 117,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "green",
      "objectName": "liquidSample",
      "id": "liquidSample",
      "type": "Box"
    },
    {
      "x": 689,
      "y": 117,
      "w": 120,
      "h": 80,
      "color": "lightgray",
      "showEye": null,
      "showArrowDown": null,
      "showArrowUp": null,
      "showArrowRight": null,
      "cutColor": "green",
      "objectName": "NMRliquidSample",
      "id": "NMRliquidSample",
      "type": "Box"
    }
  ],
  "connectors": [
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "viewer_nmrSpectrumObject",
      "from": "nmrSpectrumObject",
      "to": "viewer_nmrSpectrumObject",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "viewer_setSpectra",
      "from": "setSpectra",
      "to": "viewer_setSpectra",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "viewer_jGraphObject",
      "from": "jGraphObject",
      "to": "viewer_jGraphObject",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "export_setSpectra",
      "from": "setSpectra",
      "to": "export_setSpectra",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "export_nmrSpectrumObject",
      "from": "nmrSpectrumObject",
      "to": "export_nmrSpectrumObject",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "import_nmrSpectrumObject",
      "from": "nmrSpectrumObject",
      "to": "import_nmrSpectrumObject",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "import_jGraphObject",
      "from": "jGraphObject",
      "to": "import_jGraphObject",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "viewer_NMRspinSystemModel_CSA",
      "from": "NMRspinSystemModel_CSA",
      "to": "viewer_NMRspinSystemModel_CSA",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "bridge_NMRspinSystemModel_CSA",
      "from": "NMRspinSystemModel_CSA",
      "to": "bridge_NMRspinSystemModel_CSA",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "obj1_obj1size",
      "from": "obj1",
      "to": "obj1size",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "sample_liquidSample",
      "from": "sample",
      "to": "liquidSample",
      "type": "LineConnector"
    },
    {
      "arrowFrom": false,
      "arrowTo": true,
      "id": "liquidSample_NMRliquidSample",
      "from": "liquidSample",
      "to": "NMRliquidSample",
      "type": "LineConnector"
    }
  ]
};
	if (!replaceWithObjects) {
		return demoData;
	}

	let objects = [];
	let connectors = [];
	var indexBox = 0;
	const objData = await loadJsonFile("../objectsList.json");
	if (objData && Array.isArray(objData.objects)) {
		objData.objects.forEach((obj) => {
			const { name, ...otherFields } = obj;
			const id = name;
			const { x, y } = getCoordinatesFromSavedOrIndex(
				id,
				savePositionData,
				indexBox,
				boxW,
				boxH,
				margin
			);

			indexBox++;
			objects.push({
				x,
				y,
				w: boxW,
				h: boxH,
				color: "lightgray",
				showEye: false,
				showArrowDown: false,
				showArrowUp: false,
				showArrowRight: false,
				cutColor: "red",
				id: id,
				type: "Box",
				objectName: name,
				otherFieldObjectMAYDELETE: otherFields,
			});
		});
	}

	//
	// 2️⃣ Load all_tools.json
	//
	/*"comment": "Generated by createListObjects.js in nmr-objects for schema",
  "list": [
    {
      "listObject": [
        {
          "object": "NmrSpectrum",
          "type": "viewer",
          "repository": "CHEMeDATA/NMRspectrum-viewer",
          "fileNameViewerUSELESSMAXBE_REDUNDANT": [
            "src/nmrSpectrum.js"
          ],
          "jsLibraryView": [
            {
              "repository": "CHEMeDATA/viewers-base",
              "fileName": "src/viewerBase.js"
            },
            {
              "repository": "CHEMeDATA/NMRspectrum-viewer",
              "fileName": "src/nmrSpectrum.js",
              "include": "NmrSpectrum"
            },
            {
              "repository": "CHEMeDATA/objects-base",
              "fileName": "src/objectBase.js",
              "include": "ObjectBase"
            },
            {
              "repository": "CHEMeDATA/nmr-objects",
              "fileName": "src/nmrSpectrumObject.js",
              "include": 
			  */
	console.log("test1");

	const toolsData = await loadJsonFile("../all_tools.json");
	if (toolsData && Array.isArray(toolsData.list)) {
		toolsData.list.forEach((objInnerList) => {
			// GET
			/////$ creatorParam
			/////$ creatorParam
			/////$ creatorParam
			/////$ creatorParam
			/////$ creatorParam
			/////$ creatorParam
			/////$ creatorParam
			if (objInnerList && Array.isArray(objInnerList.listObject)) {
				objInnerList.listObject.forEach((obj) => {
					const { object, type, listObjectSchema, ...otherFields } = obj;

					var listSources = [object];
					const name = type;
					if (type === "viewer")
						if (toolsData && Array.isArray(listObjectSchema)) {
							listSources = listObjectSchema;
						}

					listSources.forEach((nameSource) => {
						var target = name + "_" + nameSource;
						const id = target;
						const { x, y } = getCoordinatesFromSavedOrIndex(
							id,
							savePositionData,
							indexBox,
							boxW,
							boxH,
							margin
						);

						indexBox++;

						const boxType = (type === "bridge") ? "Box" : "Box2";
						const obje = {
							x,
							y,
							w: boxW,
							h: boxH,
							color: "lightgray",
							showEye: false,
							showArrowDown: false,
							showArrowUp: false,
							showArrowRight: false,
							cutColor: "blue",
							id: id,
							type: boxType,
							objectName: target,
							otherFieldObjectMAYDELETE: otherFields,
						};
						objects.push(obje);

						const objAlreadIn = objects.find(o => o.id === target);
						if (!objAlreadIn) {
        					console.warn(`Object with id "${o.id }" not found for pair `);
    					}
						/////////
						/////////
						///////// Check source exists.... if not make a dummy ?
						/////////
						///////// Give a name to export...
						/////////
						/////////
						/////////
						const link = {
							id: target,
							from: nameSource,
							to: target,
							type: "LineConnector",
							arrowFrom: false,
							arrowTo: true,
							otherFieldConnectorMAYDELETE: otherFields,
						};
						if (true) connectors.push(link);
						//console.log("link type object ", link,type ,object);
					});
				});
			}
		});
	}

	//
	// 3️⃣ Load derivations.json → likely connectors
	//
	/*
 "_comment": "This file is automatically generated. Do not edit manually.",
    "derivations": [
        {
            "base": "obj1",
            "derived": "obj1size",
            "fieldsToAdd": [
                {
                    "name": "size",
                    "mandatory": true,
                    "type": "float",
                    "userRequest": "Enter a value in m (default 1.91m)",
                    "defaultValue": 1.91,
                    "randomFrom": 1.4,
                    "randomTo": 2.1,
                    "show": true
                }
            ]
        },
        {
		*/
	const derivData = await loadJsonFile("../derivations.json");
	console.log("test2");
	if (derivData && Array.isArray(derivData.derivations)) {
		derivData.derivations.forEach((obj, index) => {
			const { base, derived, ...otherFields } = obj;
			const name = derived;
			const id = name;

			const { x, y } = getCoordinatesFromSavedOrIndex(
				id,
				savePositionData,
				indexBox,
				boxW,
				boxH,
				margin
			);

			indexBox++;

			const obje = {
				x,
				y,
				w: boxW,
				h: boxH,
				color: "lightgray",
				showEye: false,
				showArrowDown: false,
				showArrowUp: false,
				showArrowRight: false,
				cutColor: "green",
				id: id,
				type: "Box",
				objectName: name,
				otherFieldObjectMAYDELETE: otherFields,
			};
			if (true) objects.push(obje);

			const link = {
				id: base + "_" + derived,
				from: base,
				to: derived,
				type: "LineConnector",
				arrowFrom: false,
				arrowTo: true,
				otherFieldConnectorMAYDELETE: otherFields,
			};
			connectors.push(link);
			console.log("link", link);
		});
	}
	console.log("test3");

	return { objects, connectors };
}
