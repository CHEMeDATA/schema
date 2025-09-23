// ===== BASE CLASSES =====
export class DiagramElement {
	constructor(svg, id) {
		this.svg = svg;
		this.id = id;
		this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.group.setAttribute("id", id);
	}
}

export class DiagramObject extends DiagramElement {
	constructor(svg, id, x, y) {
		super(svg, id);
		this.x = x;
		this.y = y;
	}
	getCoordinates() {
		return { id: this.id, x: this.x, y: this.y };
	}
}

export class DiagramConnector extends DiagramElement {
	constructor(svg, id, fromObj, toObj) {
		super(svg, id);
		this.fromObj = fromObj;
		this.toObj = toObj;
	}
	update() {}
}

// ===== DERIVED CLASSES =====
export class Box extends DiagramObject {
	constructor(svg, id, x, y, w, h, color, cutColor = null) {
		super(svg, id, x, y);
		this.w = w;
		this.h = h;
		this.color = color;
		this.cutColor = cutColor;

		// Polygon shape
		this.shape = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polygon"
		);
		this.shape.setAttribute("fill", color);
		this.shape.setAttribute("stroke-width", "2");
		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.shape.setAttribute("stroke", isDark ? "white" : "black");
		this.group.appendChild(this.shape);

		// Cut line

		this.cutLine = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line"
		);
    console.log(cutColor)
		this.cutLine.setAttribute(
			"stroke",
			cutColor || (isDark ? "white" : "black")
		);
		this.cutLine.setAttribute("stroke-width", "4");
		this.group.appendChild(this.cutLine);
		this.updateShape();
	}

	updateShape() {
		const cut = 10;
		const x = this.x,
			y = this.y,
			w = this.w,
			h = this.h;

		// polygon points
		const points = [
			`${x + cut},${y}`,
			`${x + w},${y}`,
			`${x + w},${y + h}`,
			`${x},${y + h}`,
			`${x},${y + cut}`,
		].join(" ");
		this.shape.setAttribute("points", points);

		// cut-line inset proportional to cut (max 2px or 20% of cut)
		const offset = 4; //Math.min(10, cut * 10.2);
		const x1 = x + offset;
		const y1 = y + cut + offset;
		const x2 = x + cut + offset;
		const y2 = y + offset;

		this.cutLine.setAttribute("x1", x1);
		this.cutLine.setAttribute("y1", y1);
		this.cutLine.setAttribute("x2", x2);
		this.cutLine.setAttribute("y2", y2);
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;
		this.updateShape();
	}

	center() {
		return { cx: this.x + this.w / 2, cy: this.y + this.h / 2 };
	}

	enableDragging(diagram) {
		let isDragging = false;
		let lastX, lastY;

		this.shape.addEventListener("mousedown", (e) => {
			if (diagram.mode === "move") {
				isDragging = true;
				lastX = e.clientX;
				lastY = e.clientY;
				diagram.objectLayer.appendChild(this.group);
			} else if (diagram.mode === "view") {
				alert("Box: " + this.id);
			}
		});

		window.addEventListener("mousemove", (e) => {
			if (!isDragging) return;
			if (diagram.mode !== "move") return;

			let dx = e.clientX - lastX;
			let dy = e.clientY - lastY;
			this.move(dx, dy);

			// Shift grid snap
			if (e.shiftKey) {
				const step = 10;
				this.x = Math.round(this.x / step) * step;
				this.y = Math.round(this.y / step) * step;
				this.updateShape();
			}

			lastX = e.clientX;
			lastY = e.clientY;

			diagram.updateAll();
		});

		window.addEventListener("mouseup", () => {
			isDragging = false;
		});
	}
}

export class LineConnector extends DiagramConnector {
	constructor(svg, id, fromObj, toObj) {
		super(svg, id, fromObj, toObj);

		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;

		this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.line.setAttribute("stroke", isDark ? "#ccc" : "black");
		this.line.setAttribute("stroke-width", "2");

		this.midCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		this.midCircle.setAttribute("r", 5);
		this.midCircle.setAttribute("fill", isDark ? "#ff6666" : "red");

		this.group.appendChild(this.line);
		this.group.appendChild(this.midCircle);

		this.update();
	}

	update() {
		const c1 = this.fromObj.center();
		const c2 = this.toObj.center();
		this.line.setAttribute("x1", c1.cx);
		this.line.setAttribute("y1", c1.cy);
		this.line.setAttribute("x2", c2.cx);
		this.line.setAttribute("y2", c2.cy);

		const mx = (c1.cx + c2.cx) / 2;
		const my = (c1.cy + c2.cy) / 2;
		this.midCircle.setAttribute("cx", mx);
		this.midCircle.setAttribute("cy", my);
	}
}

// ===== DIAGRAM MANAGER =====
export class Diagram {
	constructor(svg) {
		this.svg = svg;

		this.connectorLayer = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"g"
		);
		this.svg.appendChild(this.connectorLayer);

		this.objectLayer = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"g"
		);
		this.svg.appendChild(this.objectLayer);

		this.objects = [];
		this.connectors = [];
		this.mode = "move";

		// Auto dark mode background
		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.svg.style.background = isDark ? "#1e1e1e" : "#fff";

		this.svg.addEventListener("dblclick", (e) => {
			if (e.target === this.svg) {
				this.mode = this.mode === "move" ? "view" : "move";
				console.log("Mode switched to:", this.mode);
			}
		});
	}

	addObject(obj) {
		this.objectLayer.appendChild(obj.group);
		this.objects.push(obj);
		if (typeof obj.enableDragging === "function") obj.enableDragging(this);
		return obj;
	}

	addConnector(conn) {
		this.connectorLayer.appendChild(conn.group);
		this.connectors.push(conn);
		return conn;
	}

	updateAll() {
		for (let conn of this.connectors) conn.update();
	}

	getState() {
		return { objects: this.objects.map((o) => o.getCoordinates()) };
	}
}
