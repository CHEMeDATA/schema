const fs = require("fs");
const path = require("path");

// Directories
const source = "../v1/schema";
const target = "../v1/schemaResolved";
const inputDir = path.join(__dirname, source);
const outputDir = path.join(__dirname, target);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Load all schemas into memory for resolving $refs
const schemaCache = {};

// Load schemas from inputDir
function loadSchemas() {
	const files = fs.readdirSync(inputDir);
	files.forEach((file) => {
		if (file.endsWith(".json")) {
			const filePath = path.join(inputDir, file);
			try {
				schemaCache[file] = JSON.parse(fs.readFileSync(filePath, "utf8"));
			} catch (err) {
				console.error(`❌ Error loading schema ${file}:`, err);
			}
		}
	});
}

// Resolve $ref references
function resolveRefs(schema, seen = new Set()) {
	if (!schema || typeof schema !== "object") return schema;
	if (seen.has(schema)) return schema; // skip circular objects
	seen.add(schema);

	if (Array.isArray(schema)) {
		return schema.map((item) => resolveRefs(item, new Set(seen)));
	}
	let resolvedSchema = { ...schema };

	if (schema["$ref"]) {
		const refFile = path.basename(schema["$ref"]);
		if (schemaCache[refFile]) {
			resolvedSchema = {
				...resolveRefs(schemaCache[refFile], seen),
				...resolvedSchema,
			};
			delete resolvedSchema["$ref"];
		}
	}

	if (schema["allOf"]) {
		schema["allOf"].forEach((ref) => {
			const resolvedRef = resolveRefs(ref, seen);
			if (resolvedRef) {
				resolvedSchema = {
                    related: resolvedSchema.$id,
					...resolvedRef,
					...resolvedSchema,
					properties: {
						...(resolvedRef.properties || {}),
						...(resolvedSchema.properties || {}),
					},
					required: [
						...new Set([
							...(resolvedRef.required || []),
							...(resolvedSchema.required || []),
						]),
					],
				};
			}
		});
		delete resolvedSchema["allOf"];
	}

	if (resolvedSchema.properties) {
		Object.keys(resolvedSchema.properties).forEach((key) => {
			resolvedSchema.properties[key] = resolveRefs(
				resolvedSchema.properties[key],
				seen
			);
		});
	}

	return resolvedSchema;
}

function safeStringify(obj, space = 4) {
	const seen = new WeakSet();
	return JSON.stringify(
		obj,
		function (key, value) {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) {
					return "[Circular]"; // Mark cycles instead of crashing
				}
				seen.add(value);
			}
			return value;
		},
		space
	);
}

// Process all schemas and generate effective versions
function processSchemas() {
	loadSchemas();

	Object.keys(schemaCache).forEach((file) => {
		console.log(`🛠️ Processing ${file}...`);

		const resolvedSchema = resolveRefs(schemaCache[file]);

		// Write the resolved schema
		const outputFilePath = path.join(outputDir, file);
		fs.writeFileSync(outputFilePath, safeStringify(resolvedSchema, 4), "utf8");
		console.log(`✅ Resolved schema written to ${outputFilePath}`);
	});
}

// Run script
processSchemas();
