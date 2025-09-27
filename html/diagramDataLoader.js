// diagramDataLoader.js
export async function loadDiagramData({ replaceWithObjects, baseData }) {
    if (!replaceWithObjects) {
        // just return demo data passed from HTML
        return baseData;
    }

    // fetch and generate objects
    try {
        const response = await fetch("../objectsList.json");
        if (!response.ok) throw new Error("Failed to load objects.json");
        const data = await response.json();

        if (!Array.isArray(data.objects)) {
            throw new Error("Invalid file format: no objects array found");
        }

        const boxW = 120;
        const boxH = 70;
        const margin = 30;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const cols = Math.max(1, Math.floor((winW - margin) / (boxW + margin)));
        const rows = Math.max(1, Math.floor((winH - margin) / (boxH + margin)));

        const objects = data.objects.map((obj, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols) % rows;
            const x = margin + col * (boxW + margin);
            const y = margin + row * (boxH + margin);

            const { name, ...otherFields } = obj;

            return {
                x, y,
                w: boxW,
                h: boxH,
                color: "lightgray",
                showEye: false,
                showArrowDown: false,
                showArrowUp: false,
                showArrowRight: false,
                cutColor: "red",
                id: name,
                type: "Box",
                objectName: name,
                otherFields
            };
        });

        // keep connectors empty by default
        return { objects, connectors: [] };

    } catch (err) {
        console.error("Error loading objects.json:", err);
        return { objects: [], connectors: [] };
    }
}
