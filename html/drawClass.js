// ===== BASE CLASSES =====
export class DiagramElement {
	constructor({ svg, id }) {
		this.svg = svg;
		this.id = id;
		this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.group.setAttribute("id", id);
	}
}

export class DiagramObject extends DiagramElement {
	constructor(param) {
		super({ svg: param.svg, id: param.id });
		const { id, svg, ...rest } = param;
		this.param = rest;
	}

	getCoordinates() {
		return { id: this.id, x: this.param.x, y: this.param.y };
	}

	center() {
		return { cx: this.x + this.w / 2, cy: this.y + this.h / 2 };
	}

	getSidePoint(targetX, targetY, targetW, targetH) {
		const cx = this.x + this.w / 2;
		const cy = this.y + this.h / 2;

		const dx = targetX - cx;
		const dy = targetY - cy;

		const factor = 2;
		// Decide horizontal vs vertical connection
		const deltaX = Math.abs(dx) - targetW / 2 - this.w / 2;
		const deltaY = Math.abs(dy) - targetH / 2 - this.h / 2;
		if (deltaX > deltaY) {
			var deltay = dy * (this.w / Math.abs(factor * dx));
			if (deltay > this.h / 2) deltay = this.h / 2;
			if (deltay < -this.h / 2) deltay = -this.h / 2;
			// Connect from left or right side
			if (dx > 0) {
				return { x: cx + this.w / 2, y: cy + deltay }; // right side
			} else {
				return { x: cx - this.w / 2, y: cy + deltay }; // left side
			}
		} else {
			var deltax = dx * (this.h / Math.abs(factor * dy));
			if (deltax > this.w / 2) deltax = this.w / 2;
			if (deltax < -this.w / 2) deltax = -this.w / 2;
			// Connect from top or bottom side
			if (dy > 0) {
				return { x: cx + deltax, y: cy + this.h / 2 }; // bottom
			} else {
				return { x: cx + deltax, y: cy - this.h / 2 }; // top
			}
		}
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

			// Shift grid snap SHIFT KEY
			if (e.shiftKey) {
				const step = 20;
				this.x = Math.round((this.x - this.w / 2) / step) * step + this.w / 2;
				this.y = Math.round((this.y - this.h / 2) / step) * step + this.h / 2;
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

	move(dx, dy) {
		this.x += dx;
		this.y += dy;
		this.updateShape();
	}
}

export class DiagramConnector extends DiagramElement {
	constructor(param) {
		super({ svg: param.svg, id: param.id });
		this.fromObj = param.fromObj;
		this.toObj = param.toObj;
	}
	update() {}

	makeCircleWithTooltip(color, text) {
		const x = this.x;
		const y = this.y;
		this.midCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		this.midCircle.setAttribute("cx", x);
		this.midCircle.setAttribute("cy", y);
		this.midCircle.setAttribute("r", 6);
		this.midCircle.setAttribute("fill", color);
		this.midCircle.style.pointerEvents = "all";
		this.midCircle.style.cursor = "pointer";

		// group for tooltip (rect + text)
		this.tooltipGroup = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"g"
		);
		this.tooltipGroup.style.visibility = "hidden";

		this.tooltipRect = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"rect"
		);
		this.tooltipRect.setAttribute("fill", "lightyellow");
		this.tooltipRect.setAttribute("stroke", "black");
		this.tooltipRect.setAttribute("rx", "4"); // rounded corners

		this.tooltipText = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"text"
		);

		this.tooltipText.setAttribute("fill", "black");
		this.tooltipText.setAttribute("font-size", "12");

		// split the string into lines
		text.split("\n").forEach((line, i) => {
			const tspan = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"tspan"
			);
			tspan.setAttribute("x", 0);
			tspan.setAttribute("dy", i === 0 ? "0" : "1.2em");

			// simple formatting convention: **bold**
			if (line.startsWith("**") && line.endsWith("**")) {
				tspan.setAttribute("font-weight", "bold");
				tspan.textContent = line.replace(/\*\*/g, "");
			} else {
				tspan.textContent = line;
			}

			this.tooltipText.appendChild(tspan);
		});

		// measure text AFTER appending it
		this.svg.appendChild(this.tooltipGroup);
		this.tooltipGroup.appendChild(this.tooltipText);
		const bbox = this.tooltipText.getBBox();

		this.tooltipRect.setAttribute("x", bbox.x - 4);
		this.tooltipRect.setAttribute("y", bbox.y - 2);
		this.tooltipRect.setAttribute("width", bbox.width + 8);
		this.tooltipRect.setAttribute("height", bbox.height + 4);

		this.tooltipGroup.setAttribute("pointer-events", "none");

		this.tooltipGroup.appendChild(this.tooltipRect);
		this.tooltipGroup.appendChild(this.tooltipText);
		this.tooltipGroup.setAttribute(
			"transform",
			`translate(${this.x + 10}, ${(this, y - 30)})`
		);

		this.svg.appendChild(this.midCircle);
		this.svg.appendChild(this.tooltipGroup);

		// show/hide on hover or touch
		this.midCircle.addEventListener("mouseenter", () => {
			this.setVisibilityText("visible");
		});
		this.midCircle.addEventListener("mouseleave", () => {
			this.setVisibilityText("hidden");
		});
		this.midCircle.addEventListener("touchstart", (e) => {
			e.preventDefault();
			this.setVisibilityText("visible");
		});
		this.midCircle.addEventListener("touchend", () => {
			this.setVisibilityText("hidden");
		});
	}

	setVisibilityText(status) {
		this.tooltipGroup.style.visibility = status;
	}
}

// ===== DERIVED CLASSES =====

export class Box extends DiagramObject {
	constructor(params) {
		super(params); // expects { svg, id, x, y }
		// assign all other params to this
		this.type = "Box"; /// SAME AS CLASS NAME
		Object.assign(this, params);

		// Derived / default values
		this.cutColor = this.cutColor || null;
		this.anyIcon =
			this.showEye ||
			this.showArrowDown ||
			this.showArrowUp ||
			this.showArrowRight;

		// Polygon shape
		this.shape = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polygon"
		);
		this.shape.setAttribute("fill", this.color);
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
		this.cutLine.setAttribute(
			"stroke",
			this.cutColor || (isDark ? "white" : "black")
		);
		this.cutLine.setAttribute("stroke-width", "4");
		this.group.appendChild(this.cutLine);

		// Eye + pupil
		if (this.showEye) {
			this.eye = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"ellipse"
			);
			this.eye.setAttribute("rx", 7.5);
			this.eye.setAttribute("ry", 4);
			this.eye.setAttribute("fill", "white");
			this.eye.setAttribute("stroke", "black");
			this.group.appendChild(this.eye);

			this.pupil = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"circle"
			);
			this.pupil.setAttribute("r", 3);
			this.pupil.setAttribute("fill", "black");
			this.group.appendChild(this.pupil);
		}

		// Arrows
		const fillArr = "white",
			strokrArr = "black",
			strokeWidth = "1";

		if (this.showArrowDown)
			this.arrowDown = this.createArrow(
				fillArr,
				strokrArr,
				strokeWidth,
				"down"
			);
		if (this.showArrowUp)
			this.arrowUp = this.createArrow(fillArr, strokrArr, strokeWidth, "up");
		if (this.showArrowRight)
			this.arrowRight = this.createArrow(
				fillArr,
				strokrArr,
				strokeWidth,
				"right"
			);

		// Menu if needed
		if (this.anyIcon) this.initMenu();

		// SVG Icon (if file exists)
		this.initIcon();

		// Text label
		this.initLabel();

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

		if (this.icon) {
			this.icon.setAttribute("x", x + (w - this.iconSizeWidth) / 2);
			this.icon.setAttribute("y", y + 20);
		}
		if (this.label) {
			this.label.setAttribute("x", x + w / 2);
			this.label.setAttribute("y", y + h - this.sideMargins);
		}
	}

	createArrow(fill, stroke, width, type) {
		const arrow = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polygon"
		);
		arrow.setAttribute("fill", fill);
		arrow.setAttribute("stroke", stroke);
		arrow.setAttribute("stroke-width", width);
		this.group.appendChild(arrow);
		return arrow;
	}

	initMenu() {
		this.group.setAttribute("cursor", "pointer");
		const title = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"title"
		);
		title.textContent = "Add object ...";
		this.group.appendChild(title);

		this.group.addEventListener("click", (e) => {
			if (!this.menuEnabled) return;
			e.stopPropagation();
			this.showMenu(this.param.x + 2, this.param.y + 18, [
				{ label: "Zoom", action: () => alert("Zoom clicked") },
				{ label: "Info", action: () => alert("Info clicked") },
				{
					label: "Add Box",
					action: () => {
						if (!this.diagram) return;
						const newBox = new Box2({
							svg: this.diagram.svg,
							id: `box${this.diagram.objects.length + 1}`,
							x: this.param.x + 250,
							y: this.param.y,
							w: this.param.w,
							h: this.param.h,
							color: "#ddd",
							showEye: true,
							showArrowDown: true,
							showArrowUp: true,
							showArrowRight: true,
							diagram: this.diagram,
							objectName: "child of " + this.objectName,
						});
						this.diagram.addObject(newBox);

						// Connector
						const connector = new LineConnector({
							svg: this.diagram.svg,
							id: `conn${this.diagram.connectors.length + 1}`,
							fromObj: this,
							toObj: newBox,
						});
						this.diagram.addConnector(connector);

						this.diagram.updateAll();
					},
				},
			]);
		});
	}

	initIcon() {
		const svgFile = `../images/${this.objectName}.svg`;
		this.iconSizeWidth = 75;
		this.iconSizeHeight = 26;
		fetch(svgFile)
			.then((resp) => resp.text())
			.then((svgText) => {
				const parser = new DOMParser();
				const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
				this.icon = svgDoc.documentElement;
				this.icon.setAttribute(
					"x",
					+this.x + (this.w - this.iconSizeWidth) / 2
				);
				this.icon.setAttribute("y", this.y + 20);
				this.icon.setAttribute("width", String(this.iconSizeWidth));
				this.icon.setAttribute("height", String(this.iconSizeHeight));
				this.group.appendChild(this.icon);
			});
	}

	initLabel() {
		this.sideMargins = 5;
		var text = "NovalueUse_" + String(this.id);
		if (this.param.objectName) {
			text = this.param.objectName;
		}
		const charCount = text.length || 1;
		const fontSizeTest =
			Math.floor(1.7 * (this.param.w - 2 * this.sideMargins)) / charCount;
		const maxSize = 16;
		const fontSize = fontSizeTest > maxSize ? maxSize : fontSizeTest;
		this.label = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.label.setAttribute("x", this.param.x + this.param.w / 2);
		this.label.setAttribute(
			"y",
			this.param.y + this.param.h - this.sideMargins
		);
		this.label.setAttribute("dominant-baseline", "baseline");
		this.label.setAttribute("text-anchor", "middle");
		this.label.setAttribute("font-size", fontSize);
		this.label.setAttribute("font-family", "monospace");
		this.label.textContent = text;
		this.group.appendChild(this.label);
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
}
export class Box2 extends DiagramObject {
	constructor(params) {
		super(params); // expects { svg, id, x, y }
		// assign all other params to this
		this.type = "Box2"; /// SAME AS CLASS NAME

		Object.assign(this, params);

		// Polygon shape
		this.shape = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"polygon"
		);
		this.shape.setAttribute("fill", this.color);
		this.shape.setAttribute("stroke-width", "2");

		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.shape.setAttribute("stroke", isDark ? "white" : "black");
		this.group.appendChild(this.shape);

		// SVG Icon (if file exists)
		this.initIcon();

		// Text label
		this.initLabel();

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
			`${x},${y}`,
			`${x + w},${y}`,
			`${x + w},${y + h}`,
			`${x},${y + h}`,
			`${x},${y}`,
		].join(" ");
		this.shape.setAttribute("points", points);

		if (this.icon) {
			this.icon.setAttribute("x", x + (w - this.iconSizeWidth) / 2);
			this.icon.setAttribute("y", y + 20);
		}
		if (this.label) {
			this.label.setAttribute("x", x + w / 2);
			this.label.setAttribute("y", y + h - this.sideMargins);
		}
	}
	initLabel() {
		this.sideMargins = 5;
		var text = "NMRspectru  : " + String(this.id);
		if (this.param.objectName) {
			text = this.param.objectName;
		}
		const charCount = text.length || 1;
		const fontSizeTest =
			Math.floor(1.7 * (this.param.w - 2 * this.sideMargins)) / charCount;
		const maxSize = 16;
		const fontSize = fontSizeTest > maxSize ? maxSize : fontSizeTest;
		this.label = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.label.setAttribute("x", this.param.x + this.param.w / 2);
		this.label.setAttribute(
			"y",
			this.param.y + this.param.h - this.sideMargins
		);
		this.label.setAttribute("dominant-baseline", "baseline");
		this.label.setAttribute("text-anchor", "middle");
		this.label.setAttribute("font-size", fontSize);
		this.label.setAttribute("font-family", "monospace");
		this.label.textContent = text;
		this.group.appendChild(this.label);
	}

	initIcon() {
		const svgFile = `${this.objectName}.svg`;
		this.iconSizeWidth = 75;
		this.iconSizeHeight = 25;
		fetch(svgFile, { method: "HEAD" }).then((resp) => {
			if (resp.ok) {
				this.icon = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"image"
				);
				this.icon.setAttributeNS(
					"http://www.w3.org/1999/xlink",
					"href",
					svgFile
				);
				this.icon.setAttribute(
					"x",
					+this.x + (this.w - this.iconSizeWidth) / 2
				);
				this.icon.setAttribute("y", this.y + 20);
				this.icon.setAttribute("width", String(this.iconSizeWidth));
				this.icon.setAttribute("height", String(this.iconSizeHeight));
				this.group.appendChild(this.icon);
			}
		});
	}
}
export class LineConnector extends DiagramConnector {
	constructor(params) {
		super(params);
		this.type = "LineConnector"; /// SAME AS CLASS NAME

		const { id, svg, fromObj, toObj, ...rest } = params;
		console.log("rest", rest);
		console.log("params", params);
		this.param = rest;
		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;

		this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		const defaultColor = isDark ? "#ccc" : "black";
		const color = this.param.lineColor ? this.param.lineColor : defaultColor;

		if (this.param.arrowTo) {
			const defs =
				this.svg.querySelector("defs") ||
				document.createElementNS("http://www.w3.org/2000/svg", "defs");
			if (!this.svg.querySelector("defs")) this.svg.appendChild(defs);

			if (!defs.querySelector("#arrowEnd")) {
				const markerEnd = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"marker"
				);
				markerEnd.setAttribute("id", "arrowEnd");
				markerEnd.setAttribute("markerWidth", "10");
				markerEnd.setAttribute("markerHeight", "7");
				markerEnd.setAttribute("refX", "10");
				markerEnd.setAttribute("refY", "3.5");
				markerEnd.setAttribute("orient", "auto");
				markerEnd.setAttribute("markerUnits", "strokeWidth");

				const path = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"path"
				);
				path.setAttribute("d", "M0,0 L0,7 L10,3.5 z");
				path.setAttribute("fill", color);

				markerEnd.appendChild(path);
				defs.appendChild(markerEnd);
			}

			this.line.setAttribute("marker-end", "url(#arrowEnd)");
		}

		if (this.param.arrowFrom) {
			const defs =
				this.svg.querySelector("defs") ||
				document.createElementNS("http://www.w3.org/2000/svg", "defs");
			if (!this.svg.querySelector("defs")) this.svg.appendChild(defs);

			if (!defs.querySelector("#arrowStart")) {
				const markerStart = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"marker"
				);
				markerStart.setAttribute("id", "arrowStart");
				markerStart.setAttribute("markerWidth", "10");
				markerStart.setAttribute("markerHeight", "7");
				markerStart.setAttribute("refX", "0");
				markerStart.setAttribute("refY", "3.5");
				markerStart.setAttribute("orient", "auto");
				markerStart.setAttribute("markerUnits", "strokeWidth");

				const path = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"path"
				);
				path.setAttribute("d", "M10,0 L10,7 L0,3.5 z");
				path.setAttribute("fill", color);

				markerStart.appendChild(path);
				defs.appendChild(markerStart);
			}

			this.line.setAttribute("marker-start", "url(#arrowStart)");
		}

		this.line.setAttribute("stroke", color);
		this.line.setAttribute("stroke-width", "2");

		this.midCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);

		this.midCircle.setAttribute("r", 8);
		this.midCircle.setAttribute("fill", color);

		// click handler
		this.midCircle.addEventListener("click", (e) => {
			e.stopPropagation(); // stop bubbling if needed
			alert("Circle clicked on connector " + this.id);
		});

		this.side1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		this.side1.setAttribute("r", 5);
		this.side1.setAttribute("fill", isDark ? "#66ff66" : "green");

		this.side2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		this.side2.setAttribute("r", 5);
		this.side2.setAttribute("fill", isDark ? "#6666ff" : "blue");

		this.group.appendChild(this.line);
		this.group.appendChild(this.side1);
		this.group.appendChild(this.side2);

		this.update();
		console.log("this", this);
		if (this.param.typeTool === "derivation") {
			if (this.param.fieldsToAdd) {
				const str = this.param.fieldsToAdd
					.map(
						(obj) =>
							`${obj.name}(${obj.defaultValue})${obj.mandatory ? "*" : ""}`
					)
					.join("\n");

				//this.makeCircleWithTooltip(color,"==>**Bold line**\n" + JSON.stringify(this.param.fieldsToAdd, null, 2) );
				this.makeCircleWithTooltip(color, "**Added fields**\n" + str);
			} else {
				if (this.param.fieldsSetTrue) {
					const str = this.param.fieldsSetTrue.join("\n");
					this.makeCircleWithTooltip(color, "**Mandatory fields**\n" + str);
				} else {
					this.makeCircleWithTooltip(
						color,
						"**derivation**\n" + JSON.stringify(this.param, null, 2)
					);
				}
			}
		} else {
			this.makeCircleWithTooltip(
				color,
				"**NOT derivation NOr implemented**\n" +
					JSON.stringify(this.param, null, 2)
			);
		}
		this.update();
	}

	update() {
		// Find side points instead of centers
		if (!this.toObj) {
			console.warning(
				"problem with one of the objects of the connector with id:<",
				this.id,
				"> this:",
				this,
				" in particular this.toObj:",
				this.toObj
			);
			return;
		}
		if (!this.fromObj) {
			console.warning(
				"problem with one of the objects of the connector with id:<",
				this.id,
				"> this:",
				this,
				" in particular this.fromObj:",
				this.fromObj
			);
			return;
		}
		const fromCenter = this.toObj.center();
		const toCenter = this.fromObj.center();

		const p1 = this.fromObj.getSidePoint(
			fromCenter.cx,
			fromCenter.cy,
			this.toObj.w,
			this.toObj.h
		);
		const p2 = this.toObj.getSidePoint(
			toCenter.cx,
			toCenter.cy,
			this.fromObj.w,
			this.fromObj.h
		);

		// top line
		this.line.setAttribute("x1", p1.x);
		this.line.setAttribute("y1", p1.y);
		this.line.setAttribute("x2", p2.x);
		this.line.setAttribute("y2", p2.y);

		// offset vector for double line
		const dx = p2.y - p1.y;
		const dy = -(p2.x - p1.x);
		const len = Math.sqrt(dx * dx + dy * dy) || 1;

		const offsetLength1 = this.param.arrowFrom ? 20 : 0;
		const lendgthOffsetX1 = (dy / len) * offsetLength1;
		const lendgthOffsetY1 = -(dx / len) * offsetLength1;
		const offsetLength2 = this.param.arrowTo ? 20 : 0;
		const lendgthOffsetX2 = (dy / len) * offsetLength2;
		const lendgthOffsetY2 = -(dx / len) * offsetLength2;

		// Midpoint for red circle
		const mx = (p1.x - lendgthOffsetX1 + p2.x + lendgthOffsetX2) / 2;
		const my = (p1.y - lendgthOffsetY1 + p2.y + lendgthOffsetY2) / 2;
		if (this.midCircle) {
			this.midCircle.setAttribute("cx", mx);
			this.midCircle.setAttribute("cy", my);
		}
		if (this.tooltipGroup) {
			this.tooltipGroup.setAttribute(
				"transform",
				`translate(${mx + 10}, ${my - 30})`
			);
		}
		this.x = mx;
		this.y = my;
	}
}

export class LineConnectorImEx extends DiagramConnector {
	constructor(params) {
		super(params);
		this.type = "LineConnectorImEx"; /// SAME AS CLASS NAME

		const { id, svg, fromObj, toObj, ...rest } = params;
		console.log("rest", rest);
		console.log("params", params);
		this.param = rest;
		const isDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		const defaultColor = isDark ? "#ccc" : "black";
		const color = this.param.lineColor ? this.param.lineColor : defaultColor;

		if (this.param.arrowTo) {
			const defs =
				this.svg.querySelector("defs") ||
				document.createElementNS("http://www.w3.org/2000/svg", "defs");
			if (!this.svg.querySelector("defs")) this.svg.appendChild(defs);

			if (!defs.querySelector("#arrowEnd")) {
				const markerEnd = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"marker"
				);
				markerEnd.setAttribute("id", "arrowEnd");
				markerEnd.setAttribute("markerWidth", "10");
				markerEnd.setAttribute("markerHeight", "7");
				markerEnd.setAttribute("refX", "10");
				markerEnd.setAttribute("refY", "3.5");
				markerEnd.setAttribute("orient", "auto");
				markerEnd.setAttribute("markerUnits", "strokeWidth");

				const path = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"path"
				);
				path.setAttribute("d", "M0,0 L0,7 L10,3.5 z");
				path.setAttribute("fill", color);

				markerEnd.appendChild(path);
				defs.appendChild(markerEnd);
			}

			this.line.setAttribute("marker-end", "url(#arrowEnd)");
		}

		if (this.param.arrowFrom) {
			const defs =
				this.svg.querySelector("defs") ||
				document.createElementNS("http://www.w3.org/2000/svg", "defs");
			if (!this.svg.querySelector("defs")) this.svg.appendChild(defs);

			if (!defs.querySelector("#arrowStart")) {
				const markerStart = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"marker"
				);
				markerStart.setAttribute("id", "arrowStart");
				markerStart.setAttribute("markerWidth", "10");
				markerStart.setAttribute("markerHeight", "7");
				markerStart.setAttribute("refX", "0");
				markerStart.setAttribute("refY", "3.5");
				markerStart.setAttribute("orient", "auto");
				markerStart.setAttribute("markerUnits", "strokeWidth");

				const path = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"path"
				);
				path.setAttribute("d", "M10,0 L10,7 L0,3.5 z");
				path.setAttribute("fill", color);

				markerStart.appendChild(path);
				defs.appendChild(markerStart);
			}

			this.line.setAttribute("marker-start", "url(#arrowStart)");
		}

		this.line.setAttribute("stroke", "none");
		this.line.setAttribute("stroke-width", "2");

		// --- visible double lines ---
		this.line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

		[this.line1, this.line2].forEach((line) => {
			line.setAttribute("stroke", color);
			line.setAttribute("stroke-width", "2");
		});

		// add to SVG in correct order: arrows line first (invisible), then visible lines
		this.group.appendChild(this.line1);
		this.group.appendChild(this.line2);
		this.group.appendChild(this.line);
		this.svg.appendChild(this.group);

		this.update();
		if (this.param.typeTool === "derivation") {
			if (this.param.fieldsToAdd) {
				const str = this.param.fieldsToAdd
					.map((obj) => `${obj.name}(${obj.defaultValue})`)
					.join("\n");
				//this.makeCircleWithTooltip(color,"==>**Bold line**\n" + JSON.stringify(this.param.fieldsToAdd, null, 2) );
				this.makeCircleWithTooltip(color, "**Added fields**\n" + str);
			} else if (this.param.fieldsSetTrue) {
				const str = this.param.fieldsSetTrue
					.map((obj) => `${obj.name}(${obj.defaultValue})`)
					.join("\n");
				//this.makeCircleWithTooltip(color,"==>**Bold line**\n" + JSON.stringify(this.param.fieldsToAdd, null, 2) );
				this.makeCircleWithTooltip(color, "**Mandatory fields**\n" + str);
			} else {
				this.makeCircleWithTooltip(
					color,
					"**derivation**\n" + JSON.stringify(this.param, null, 2)
				);
			}
		} else {
			this.makeCircleWithTooltip(
				color,
				"**NOT derivation NOr implemented**\n" +
					JSON.stringify(this.param, null, 2)
			);
		}
		//this.makeCircleWithTooltip(color, JSON.stringify(this.param, null, 2));
		this.update();
	}

	update() {
		// Find side points instead of centers
		if (!this.toObj) {
			console.warning(
				"problem with one of the objects of the connector with id:<",
				this.id,
				"> this:",
				this,
				" in particular this.toObj:",
				this.toObj
			);
			return;
		}
		if (!this.fromObj) {
			console.warning(
				"problem with one of the objects of the connector with id:<",
				this.id,
				"> this:",
				this,
				" in particular this.fromObj:",
				this.fromObj
			);
			return;
		}
		const fromCenter = this.toObj.center();
		const toCenter = this.fromObj.center();

		const p1 = this.fromObj.getSidePoint(
			fromCenter.cx,
			fromCenter.cy,
			this.toObj.w,
			this.toObj.h
		);
		const p2 = this.toObj.getSidePoint(
			toCenter.cx,
			toCenter.cy,
			this.fromObj.w,
			this.fromObj.h
		);

		this.line.setAttribute("x1", p1.x);
		this.line.setAttribute("y1", p1.y);
		this.line.setAttribute("x2", p2.x);
		this.line.setAttribute("y2", p2.y);

		this.updateLine(p1, p2);
	}

	updateLine(p1, p2) {
		// offset vector for double line
		const dx = p2.y - p1.y;
		const dy = -(p2.x - p1.x);
		const len = Math.sqrt(dx * dx + dy * dy) || 1;
		const offset = 2; // distance between lines

		const ox = (dx / len) * offset;
		const oy = (dy / len) * offset;

		// make short lines by 10 pt to avoid averwriting the eventual arrow

		const offsetLength1 = this.param.arrowFrom ? 8 : 0;
		const lendgthOffsetX1 = -(dy / len) * offsetLength1;
		const lendgthOffsetY1 = (dx / len) * offsetLength1;
		const offsetLength2 = this.param.arrowTo ? 8 : 0;
		const lendgthOffsetX2 = -(dy / len) * offsetLength2;
		const lendgthOffsetY2 = (dx / len) * offsetLength2;
		// top line
		this.line1.setAttribute("x1", p1.x + ox + lendgthOffsetX1);
		this.line1.setAttribute("y1", p1.y + oy + lendgthOffsetY1);
		this.line1.setAttribute("x2", p2.x + ox - lendgthOffsetX2);
		this.line1.setAttribute("y2", p2.y + oy - lendgthOffsetY2);

		// bottom line
		this.line2.setAttribute("x1", p1.x - ox + lendgthOffsetX1);
		this.line2.setAttribute("y1", p1.y - oy + lendgthOffsetY1);
		this.line2.setAttribute("x2", p2.x - ox - lendgthOffsetX2);
		this.line2.setAttribute("y2", p2.y - oy - lendgthOffsetY2);
		{
			const offsetLength1 = this.param.arrowFrom ? 20 : 0;
			const lendgthOffsetX1 = -(dy / len) * offsetLength1;
			const lendgthOffsetY1 = (dx / len) * offsetLength1;
			const offsetLength2 = this.param.arrowTo ? 20 : 0;
			const lendgthOffsetX2 = -(dy / len) * offsetLength2;
			const lendgthOffsetY2 = (dx / len) * offsetLength2;
			// Midpoint for red circle
			const mx = (p1.x + lendgthOffsetX1 + p2.x - lendgthOffsetX2) / 2;
			const my = (p1.y + lendgthOffsetY1 + p2.y - lendgthOffsetY2) / 2;
			if (this.midCircle) {
				this.midCircle.setAttribute("cx", mx);
				this.midCircle.setAttribute("cy", my);
			}
			if (this.tooltipGroup) {
				this.tooltipGroup.setAttribute(
					"transform",
					`translate(${mx + 10}, ${my - 30})`
				);
			}
		}
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
