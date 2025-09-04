// ES module imports
import fs from "fs";
import path from "path";

const inputDir = "v1/schema";
const outputDir = "v1/schemaResolved";

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Load all schemas into memory for resolving $refs
function loadSchemas() {
	const schemaCache = {};
	const files = fs.readdirSync(inputDir);
	files.forEach((file) => {
		if (file.endsWith(".json")) {
			const filePath = path.join(inputDir, file);
			try {
				schemaCache[file] = JSON.parse(fs.readFileSync(filePath, "utf8"));
				console.error(`OK loading schema ${file}:`);
			} catch (err) {
				console.error(`❌ Error loading schema ${file}:`, err);
			}
		}
	});
	return schemaCache;
}

// Resolve $ref references
function resolveRefs(schemaCache, curSchema, schema, seen = new Set()) {
	if (!schema || typeof schema !== "object") return schema;
	if (seen.has(schema)) {
		return schema.$id ? { $ref: schema.$id, $refKEEP: schema.$id } : schema;
	}
	seen.add(schema);

	if (Array.isArray(schema)) {
		return schema.map((item) =>
			resolveRefs(schemaCache, curSchema, item, new Set(seen))
		);
	}
	let resolvedSchema = { ...schema };

	if (schema["$ref"]) {
		const refFile = path.basename(schema["$ref"]);
		if (schemaCache[refFile]) {
			resolvedSchema = {
				...resolveRefs(schemaCache, curSchema, schemaCache[refFile], seen),
				...resolvedSchema,
			};
			delete resolvedSchema["$ref"];
		}
	}
	if (schema["allOf"]) {
		let allRelated = resolvedSchema.related
			? resolvedSchema.related.slice()
			: [];
		schema["allOf"].forEach((ref) => {
			const resolvedRef = resolveRefs(schemaCache, curSchema, ref, seen);
			if (resolvedRef) {
				// Collect related IDs but don't lose previous ones
				if (resolvedRef.$id && allRelated.indexOf(resolvedRef.$id) === -1) {
					allRelated.push(resolvedRef.$id);
				}
				// Merge properties, required, etc.
				resolvedSchema = {
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
				schemaCache,
				curSchema,
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

//! replace keys "$refKEEP" with "$ref"
function replaceRefKeep(obj) {
	if (Array.isArray(obj)) {
		return obj.map(replaceRefKeep);
	} else if (obj && typeof obj === "object") {
		const newObj = {};
		for (const [key, value] of Object.entries(obj)) {
			const newKey = key === "$refKEEP" ? "$ref" : key;
			newObj[newKey] = replaceRefKeep(value);
		}
		return newObj;
	}
	return obj;
}

// Process all schemas and generate effective versions
export function processSchemasResolution() {
	const schemaCache = loadSchemas();
	var curSchema = "";
	Object.keys(schemaCache).forEach((file) => {
		console.log(
			`🛠️ Processing ${file}... (make schema resolution in ${outputDir})`
		);
		curSchema = schemaCache[file];
		const resolvedSchema = resolveRefs(schemaCache, curSchema, curSchema);
		// Write the resolved schema
		const outputFilePath = path.join(outputDir, file);
		const finalSchema = replaceRefKeep(resolvedSchema);
		fs.writeFileSync(outputFilePath, safeStringify(finalSchema, 4), "utf8");
		console.log(`✅ Resolved schema written to ${outputFilePath}`);
	});
}
