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

function createIfNotExisting(
	base,
	objects,
	errorColor,
	otherFields,
	boxW,
	boxH,
	x,
	y
) {
	const targetObjAlreadIn = objects.find((o) => o.id === base);
	if (!targetObjAlreadIn) {
		console.warn(`Object with id "${base}" not found for pair name to derive`);
		// should never occur, but if when a object with bride does not exists, want to see it
		const objeInCase = {
			x,
			y,
			w: boxW,
			h: boxH,
			color: errorColor,
			showEye: false,
			showArrowDown: false,
			showArrowUp: false,
			showArrowRight: true,
			cutColor: "pink",
			id: base,
			type: "Box",
			objectName: "Missing:" + base,
			otherFieldObjectMAYDELETE: otherFields,
		};
		objects.push(objeInCase);
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
				x: 20,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "obj1",
				id: "obj1",
				type: "Box",
			},
			{
				x: 20,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "obj2",
				id: "obj2",
				type: "Box",
			},
			{
				x: 20,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "groupObject1",
				id: "groupObject1",
				type: "Box",
			},
			{
				x: 360,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "sample",
				id: "sample",
				type: "Box",
			},
			{
				x: 200,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "pairObj1",
				id: "pairObj1",
				type: "Box",
			},
			{
				x: 20,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "red",
				objectName: "nmrSpectrumObject",
				id: "nmrSpectrumObject",
				type: "Box",
			},
			{
				x: 180,
				y: 700,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: null,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "red",
				objectName: "setSpectra",
				id: "setSpectra",
				type: "Box",
			},
			{
				x: 620,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "jGraphObject",
				id: "jGraphObject",
				type: "Box",
			},
			{
				x: 663,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "intPair",
				id: "intPair",
				type: "Box",
			},
			{
				x: 520,
				y: 19,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "tensor",
				id: "tensor",
				type: "Box",
			},
			{
				x: 380,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "diagTensor",
				id: "diagTensor",
				type: "Box",
			},
			{
				x: 600,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin",
				id: "atomicPropertySpin",
				type: "Box",
			},
			{
				x: 469,
				y: 425,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin_CSA",
				id: "atomicPropertySpin_CSA",
				type: "Box",
			},
			{
				x: 460,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin_Liquid",
				id: "atomicPropertySpin_Liquid",
				type: "Box",
			},
			{
				x: 600,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpinInteraction",
				id: "atomicPropertySpinInteraction",
				type: "Box",
			},
			{
				x: 460,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "NMRspinSystemModel",
				id: "NMRspinSystemModel",
				type: "Box",
			},
			{
				x: 200,
				y: 420,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: true,
				cutColor: "red",
				objectName: "NMRspinSystemModel_CSA",
				id: "NMRspinSystemModel_CSA",
				type: "Box",
			},
			{
				x: 320,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "liquidStatesNMRproperties",
				id: "liquidStatesNMRproperties",
				type: "Box",
			},
			{
				x: 180,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_nmrSpectrumObject",
				id: "viewer_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 340,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_setSpectra",
				id: "viewer_setSpectra",
				type: "Box2",
			},
			{
				x: 470,
				y: 521,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_jGraphObject",
				id: "viewer_jGraphObject",
				type: "Box2",
			},
			{
				x: 20,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "export_setSpectra",
				id: "export_setSpectra",
				type: "Box2",
			},
			{
				x: 19,
				y: 429,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "export_nmrSpectrumObject",
				id: "export_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 200,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "import_nmrSpectrumObject",
				id: "import_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 660,
				y: 480,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "import_jGraphObject",
				id: "import_jGraphObject",
				type: "Box2",
			},
			{
				x: 17,
				y: 524,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_NMRspinSystemModel_CSA",
				id: "viewer_NMRspinSystemModel_CSA",
				type: "Box2",
			},
			{
				x: 240,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "obj1size",
				id: "obj1size",
				type: "Box",
			},
			{
				x: 520,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "liquidSample",
				id: "liquidSample",
				type: "Box",
			},
			{
				x: 680,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "NMRliquidSample",
				id: "NMRliquidSample",
				type: "Box",
			},
			{
				x: 469,
				y: 425,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "atomicPropertySpin_CSA",
				id: "atomicPropertySpin_CSA",
				type: "Box",
			},
			{
				x: 460,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "atomicPropertySpin_Liquid",
				id: "atomicPropertySpin_Liquid",
				type: "Box",
			},
		],
		connectors: [
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "viewer_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_setSpectra",
				from: "setSpectra",
				to: "viewer_setSpectra",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_jGraphObject",
				from: "jGraphObject",
				to: "viewer_jGraphObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "export",
				id: "export_setSpectra",
				from: "setSpectra",
				to: "export_setSpectra",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "export",
				id: "export_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "export_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "import",
				id: "import_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "import_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "import",
				id: "import_jGraphObject",
				from: "jGraphObject",
				to: "import_jGraphObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_NMRspinSystemModel_CSA",
				from: "NMRspinSystemModel_CSA",
				to: "viewer_NMRspinSystemModel_CSA",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "bridge",
				id: "nmrSpectrumObject",
				from: "NMRspinSystemModel_CSA",
				to: "nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "obj1_obj1size",
				from: "obj1",
				to: "obj1size",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "sample_liquidSample",
				from: "sample",
				to: "liquidSample",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "liquidSample_NMRliquidSample",
				from: "liquidSample",
				to: "NMRliquidSample",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "atomicPropertySpin_atomicPropertySpin_CSA",
				from: "atomicPropertySpin",
				to: "atomicPropertySpin_CSA",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "atomicPropertySpin_atomicPropertySpin_Liquid",
				from: "atomicPropertySpin",
				to: "atomicPropertySpin_Liquid",
				type: "LineConnector",
			},
		],
	};
	const savePositionData = {
		objects: [
			{
				x: 20,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "obj1",
				id: "obj1",
				type: "Box",
			},
			{
				x: 20,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "obj2",
				id: "obj2",
				type: "Box",
			},
			{
				x: 20,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "groupObject1",
				id: "groupObject1",
				type: "Box",
			},
			{
				x: 360,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "sample",
				id: "sample",
				type: "Box",
			},
			{
				x: 200,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "pairObj1",
				id: "pairObj1",
				type: "Box",
			},
			{
				x: 20,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "red",
				objectName: "nmrSpectrumObject",
				id: "nmrSpectrumObject",
				type: "Box",
			},
			{
				x: 180,
				y: 700,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: null,
				showArrowUp: true,
				showArrowRight: null,
				cutColor: "red",
				objectName: "setSpectra",
				id: "setSpectra",
				type: "Box",
			},
			{
				x: 620,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: true,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "jGraphObject",
				id: "jGraphObject",
				type: "Box",
			},
			{
				x: 663,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "intPair",
				id: "intPair",
				type: "Box",
			},
			{
				x: 520,
				y: 19,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "tensor",
				id: "tensor",
				type: "Box",
			},
			{
				x: 380,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "diagTensor",
				id: "diagTensor",
				type: "Box",
			},
			{
				x: 600,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin",
				id: "atomicPropertySpin",
				type: "Box",
			},
			{
				x: 469,
				y: 425,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin_CSA",
				id: "atomicPropertySpin_CSA",
				type: "Box",
			},
			{
				x: 460,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpin_Liquid",
				id: "atomicPropertySpin_Liquid",
				type: "Box",
			},
			{
				x: 600,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "atomicPropertySpinInteraction",
				id: "atomicPropertySpinInteraction",
				type: "Box",
			},
			{
				x: 460,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "NMRspinSystemModel",
				id: "NMRspinSystemModel",
				type: "Box",
			},
			{
				x: 200,
				y: 420,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: true,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: true,
				cutColor: "red",
				objectName: "NMRspinSystemModel_CSA",
				id: "NMRspinSystemModel_CSA",
				type: "Box",
			},
			{
				x: 320,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "red",
				objectName: "liquidStatesNMRproperties",
				id: "liquidStatesNMRproperties",
				type: "Box",
			},
			{
				x: 180,
				y: 320,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_nmrSpectrumObject",
				id: "viewer_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 340,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_setSpectra",
				id: "viewer_setSpectra",
				type: "Box2",
			},
			{
				x: 470,
				y: 521,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_jGraphObject",
				id: "viewer_jGraphObject",
				type: "Box2",
			},
			{
				x: 20,
				y: 620,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "export_setSpectra",
				id: "export_setSpectra",
				type: "Box2",
			},
			{
				x: 19,
				y: 429,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "export_nmrSpectrumObject",
				id: "export_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 200,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "import_nmrSpectrumObject",
				id: "import_nmrSpectrumObject",
				type: "Box2",
			},
			{
				x: 660,
				y: 480,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "import_jGraphObject",
				id: "import_jGraphObject",
				type: "Box2",
			},
			{
				x: 17,
				y: 524,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "blue",
				objectName: "viewer_NMRspinSystemModel_CSA",
				id: "viewer_NMRspinSystemModel_CSA",
				type: "Box2",
			},
			{
				x: 20,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "obj2",
				id: "obj2",
				type: "Box",
			},
			{
				x: 240,
				y: 20,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "obj1size",
				id: "obj1size",
				type: "Box",
			},
			{
				x: 520,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "liquidSample",
				id: "liquidSample",
				type: "Box",
			},
			{
				x: 680,
				y: 120,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "NMRliquidSample",
				id: "NMRliquidSample",
				type: "Box",
			},
			{
				x: 188,
				y: 538,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "simNmrSpectrum",
				id: "simNmrSpectrum",
				type: "Box",
			},
			{
				x: 469,
				y: 425,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "atomicPropertySpin_CSA",
				id: "atomicPropertySpin_CSA",
				type: "Box",
			},
			{
				x: 460,
				y: 220,
				w: 120,
				h: 80,
				color: "lightgray",
				showEye: null,
				showArrowDown: null,
				showArrowUp: null,
				showArrowRight: null,
				cutColor: "green",
				objectName: "atomicPropertySpin_Liquid",
				id: "atomicPropertySpin_Liquid",
				type: "Box",
			},
		],
		connectors: [
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "viewer_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_setSpectra",
				from: "setSpectra",
				to: "viewer_setSpectra",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_jGraphObject",
				from: "jGraphObject",
				to: "viewer_jGraphObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "export",
				id: "export_setSpectra",
				from: "setSpectra",
				to: "export_setSpectra",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "export",
				id: "export_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "export_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "import",
				id: "import_nmrSpectrumObject",
				from: "nmrSpectrumObject",
				to: "import_nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "import",
				id: "import_jGraphObject",
				from: "jGraphObject",
				to: "import_jGraphObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "viewer",
				id: "viewer_NMRspinSystemModel_CSA",
				from: "NMRspinSystemModel_CSA",
				to: "viewer_NMRspinSystemModel_CSA",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "bridge",
				id: "nmrSpectrumObject",
				from: "NMRspinSystemModel_CSA",
				to: "nmrSpectrumObject",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "obj1_obj2",
				from: "obj1",
				to: "obj2",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "obj1_obj1size",
				from: "obj1",
				to: "obj1size",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "sample_liquidSample",
				from: "sample",
				to: "liquidSample",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "liquidSample_NMRliquidSample",
				from: "liquidSample",
				to: "NMRliquidSample",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "nmrSpectrumObject_simNmrSpectrum",
				from: "nmrSpectrumObject",
				to: "simNmrSpectrum",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "atomicPropertySpin_atomicPropertySpin_CSA",
				from: "atomicPropertySpin",
				to: "atomicPropertySpin_CSA",
				type: "LineConnector",
			},
			{
				arrowFrom: false,
				arrowTo: true,
				typeTool: "derivation",
				id: "atomicPropertySpin_atomicPropertySpin_Liquid",
				from: "atomicPropertySpin",
				to: "atomicPropertySpin_Liquid",
				type: "LineConnector",
			},
		],
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
					if (type === "viewer") {
						if (toolsData && Array.isArray(listObjectSchema)) {
							listSources = listObjectSchema;
						}
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

						if (type === "bridge") {
							target = obj.objectSchemaTarget;
							const targetObjAlreadIn = objects.find((o) => o.id === target);
							if (!targetObjAlreadIn) {
								console.warn(
									`Object with id "${target}" not found for pair name:`,
									nameSource,
									"obj",
									obj
								);
								// should never occur, but if when a object with bride does not exists, want to see it
								const objeInCase = {
									x,
									y,
									w: boxW,
									h: boxH,
									color: "pink",
									showEye: false,
									showArrowDown: false,
									showArrowUp: false,
									showArrowRight: true,
									cutColor: "pink",
									id: target,
									type: "Box",
									objectName: "Missing:" + target,
									otherFieldObjectMAYDELETE: otherFields,
								};
								objects.push(objeInCase);
							}
						} else {
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
								type: "Box2",
								objectName: target,
								otherFieldObjectMAYDELETE: otherFields,
							};
							objects.push(obje);
						}

						const objAlreadIn = objects.find((o) => o.id === nameSource);
						if (objAlreadIn) {
							if (type === "viewer") {
								objAlreadIn.showEye = true;
							}
							if (type === "import") {
								objAlreadIn.showArrowDown = true;
							}
							if (type === "export") {
								objAlreadIn.showArrowUp = true;
							}
							if (type === "bridge") {
								objAlreadIn.showArrowRight = true;
							}
						} else {
							console.warn(
								`Object with id "${nameSource}" not found for pair `
							);
							// should never occur, but if when a object with bride does not exists, want to see it
							const objeInCase = {
								x,
								y,
								w: boxW,
								h: boxH,
								color: "pink",
								showEye: false,
								showArrowDown: false,
								showArrowUp: false,
								showArrowRight: true,
								cutColor: "pink",
								id: nameSource,
								type: "Box",
								objectName: "Missing:" + nameSource,
								otherFieldObjectMAYDELETE: otherFields,
							};
							objects.push(objeInCase);
						}

						const link = {
							id: target,
							from: nameSource,
							to: target,
							type: "LineConnector",
							typeTool: type, // derivation, bridge, export, import, viewer
							arrowFrom: false,
							arrowTo: true,
							otherFieldConnectorMAYDELETE: otherFields,
						};
						connectors.push(link);
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
			if (obj.fieldsToAdd) {
				// two kinds rerived and those set to true (field: fieldsSetTrue)
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
				objects.push(obje);
			}

			if (false)
				createIfNotExisting(
					base,
					objects,
					"lightGreen",
					otherFields,
					boxW,
					boxH,
					x,
					y
				);

			const link = {
				id: base + "_" + derived,
				from: base,
				to: derived,
				type: "LineConnector",
				typeTool: "derivation", // derivation, bridge, export, import, viewer
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
