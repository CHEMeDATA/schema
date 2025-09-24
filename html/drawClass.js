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
	constructor(
		svg,
		id,
		x,
		y,
		w,
		h,
		color,
		cutColor = null,
		showEye = true,
		showArrowDown = true,
		showArrowUp = true,
		showArrowRight = true
	) {
		super(svg, id, x, y);
		this.w = w;
		this.h = h;
		this.color = color;
		this.cutColor = cutColor;
		this.showEye = showEye;
		this.showArrowDown = showArrowDown;
		this.showArrowUp = showArrowUp;
		this.showArrowRight = showArrowRight;
		this.anyIcon = showEye || showArrowDown || showArrowUp || showArrowRight;
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
		console.log(cutColor);
		this.cutLine.setAttribute(
			"stroke",
			cutColor || (isDark ? "white" : "black")
		);
		this.cutLine.setAttribute("stroke-width", "4");
		this.group.appendChild(this.cutLine);

		// Eye (ellipse + pupil)
		this.eye = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"ellipse"
		);
		this.eye.setAttribute("rx", 15 / 2); // 15 pt wide
		this.eye.setAttribute("ry", 8 / 2); // 8 pt tall
		this.eye.setAttribute("fill", "white");
		this.eye.setAttribute("stroke", "black");
		this.group.appendChild(this.eye);
		if (this.showEye) {
			this.pupil = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"circle"
			);
			this.pupil.setAttribute("r", 3);
			this.pupil.setAttribute("fill", "black");
			this.group.appendChild(this.pupil);
		}

		const fillArr = "white";
		const strokrArr = "black";
		const strokeWidth = "1";

		if (this.showArrowDown) {
			this.arrowDown = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"polygon"
			);
			this.arrowDown.setAttribute("fill", fillArr);
			this.arrowDown.setAttribute("stroke", strokrArr);
			this.arrowDown.setAttribute("stroke-width", strokeWidth);
			this.group.appendChild(this.arrowDown);
		}

		if (this.showArrowUp) {
			this.arrowUp = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"polygon"
			);
			this.arrowUp.setAttribute("fill", fillArr);
			this.arrowUp.setAttribute("stroke", strokrArr);
			this.arrowUp.setAttribute("stroke-width", strokeWidth);
			this.group.appendChild(this.arrowUp);
		}

		if (this.showArrowRight) {
			this.arrowRight = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"polygon"
			);
			this.arrowRight.setAttribute("fill", fillArr);
			this.arrowRight.setAttribute("stroke", strokrArr);
			this.arrowRight.setAttribute("stroke-width", strokeWidth);
			this.group.appendChild(this.arrowRight);
		}

		this.updateShape();
		if (this.anyIcon) {
			this.group.setAttribute("cursor", "pointer");
			// tooltip
			const title = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"title"
			);
			title.textContent = "Add object ...";
			this.group.appendChild(title);

			// click menu
			this.group.addEventListener("click", (e) => {
				if (!this.menuEnabled) return; // skip menu if not in view
				e.stopPropagation();
				this.showMenu(this.x + 2, this.y + 18, [
					{ label: "Zoom", action: () => alert("Zoom clicked") },
					{ label: "Info", action: () => alert("Info clicked") },
				]);
			});
			this.group.addEventListener("click", this.menuHandler);
		}
	}

	setMode(mode) {
		this.mode = mode;

		// tooltip: only in view mode
		if (this.title)
			this.title.textContent = mode === "view" ? "Add object ..." : "";

		// only enable click menu in view mode
		this.menuEnabled = mode === "view";

		// remove any open menu if leaving view
		if (mode !== "view") {
			let oldMenu = document.getElementById("contextMenu");
			if (oldMenu) oldMenu.remove();
		}
	}

	showMenu(x, y, items) {
		// remove any old menu
		let old = document.getElementById("contextMenu");
		if (old) old.remove();

		const menu = document.createElement("div");
		menu.id = "contextMenu";
		menu.style.position = "absolute";
		menu.style.left = this.svg.getBoundingClientRect().left + x + "px";
		menu.style.top = this.svg.getBoundingClientRect().top + y + "px";
		menu.style.background = "white";
		menu.style.border = "1px solid #ccc";
		menu.style.padding = "5px";
		menu.style.zIndex = 1000;

		for (let item of items) {
			const btn = document.createElement("div");
			btn.textContent = item.label;
			btn.style.padding = "2px 8px";
			btn.style.cursor = "pointer";
			btn.addEventListener("click", () => {
				item.action();
				menu.remove();
			});
			menu.appendChild(btn);
		}

		document.body.appendChild(menu);

		// close on click elsewhere
		document.addEventListener("click", () => menu.remove(), { once: true });
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

		const shiftBottom = 9;
		const interObjectSpace = 20;
		const shiftRightEye = this.w - 12 - interObjectSpace * 3;
		const shiftRightArrowDown = shiftRightEye + 20;
		const shiftRightArrowUp = shiftRightArrowDown + 20;
		const shiftRightArrowRight = shiftRightArrowUp + 20;

		if (this.showEye) {
			// eye position → centered inside box
			const cx = x + shiftRightEye;
			const cy = y + shiftBottom;
			this.eye.setAttribute("cx", cx);
			this.eye.setAttribute("cy", cy);
			this.pupil.setAttribute("cx", cx);
			this.pupil.setAttribute("cy", cy);
		}
		if (this.showArrowDown) {
			const arrowMidHeight = 1;
			const arrowHeight = 8;
			const cx = x + shiftRightArrowDown;
			const cy = y + shiftBottom + 1; // slightly lower than center

			const arrowWidth = 16;
			const arrowMidWidth = 7;

			const p1 = `${cx},${cy + arrowHeight / 2}`; // top (roof tip)
			const p2 = `${cx - arrowWidth / 2},${cy - arrowMidHeight}`; // bottom-left
			const p3 = `${cx - arrowMidWidth / 2},${cy - arrowMidHeight}`; // bottom-left
			const p4 = `${cx - arrowMidWidth / 2},${cy - arrowHeight / 2}`; // bottom-left

			const p5 = `${cx + arrowMidWidth / 2},${cy - arrowHeight / 2}`; // bottom-right
			const p6 = `${cx + arrowMidWidth / 2},${cy - arrowMidHeight}`; // bottom-right
			const p7 = `${cx + arrowWidth / 2},${cy - arrowMidHeight}`; // bottom-right

			this.arrowDown.setAttribute(
				"points",
				`${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7}`
			);
		}

		if (this.showArrowUp) {
			const arrowMidHeight = -1;
			const arrowHeight = -8;
			const cx = x + shiftRightArrowUp;
			const cy = y + shiftBottom - 0; // slightly lower than center

			const arrowWidth = 16;
			const arrowMidWidth = 7;

			const p1 = `${cx},${cy + arrowHeight / 2}`; // top (roof tip)
			const p2 = `${cx - arrowWidth / 2},${cy - arrowMidHeight}`; // bottom-left
			const p3 = `${cx - arrowMidWidth / 2},${cy - arrowMidHeight}`; // bottom-left
			const p4 = `${cx - arrowMidWidth / 2},${cy - arrowHeight / 2}`; // bottom-left

			const p5 = `${cx + arrowMidWidth / 2},${cy - arrowHeight / 2}`; // bottom-right
			const p6 = `${cx + arrowMidWidth / 2},${cy - arrowMidHeight}`; // bottom-right
			const p7 = `${cx + arrowWidth / 2},${cy - arrowMidHeight}`; // bottom-right

			this.arrowUp.setAttribute(
				"points",
				`${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7}`
			);
		}

		if (this.showArrowRight) {
			const arrowMidHeight = -1;
			const arrowHeight = -13;
			const cx = x + shiftRightArrowRight;
			const cy = y + shiftBottom - 0; // slightly lower than center

			const arrowWidth = 10;
			const arrowMidWidth = 4;

			const p1 = `${cx - arrowHeight / 2},${cy}`; // top (roof tip)
			const p2 = `${cx + arrowMidHeight},${cy - arrowWidth / 2}`; // bottom-left
			const p3 = `${cx + arrowMidHeight},${cy - arrowMidWidth / 2}`; // bottom-left
			const p4 = `${cx + arrowHeight / 2},${cy - arrowMidWidth / 2}`; // bottom-left

			const p5 = `${cx + arrowHeight / 2},${cy + arrowMidWidth / 2}`; // bottom-right
			const p6 = `${cx + arrowMidHeight},${cy + arrowMidWidth / 2}`; // bottom-right
			const p7 = `${cx + arrowMidHeight},${cy + arrowWidth / 2}`; // bottom-right

			this.arrowRight.setAttribute(
				"points",
				`${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7}`
			);
		}
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
				//alert("Box: " + this.id);
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
				// tell all boxes about the mode change
				for (let box of this.objects) {
					box.setMode(this.mode);
				}
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
