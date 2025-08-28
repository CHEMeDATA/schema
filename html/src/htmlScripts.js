// htmlScripts.js
import { fetchSchemas } from "./validateSchema.js";
import { validateJSON } from "./validateSchema.js";

/**
 * Restore special characters from URL-encoded string
 */
function restoreSpecialCharacters(encodedString) {
	try {
		let decoded = decodeURIComponent(encodedString);
		decoded = decoded.replace(/%22/g, '"');
		return decoded;
	} catch (error) {
		console.error("Error restoring special characters:", error);
		return null;
	}
}

// utils/urlData.js
export function getDataFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	let dataParam = urlParams.get("data");
	if (!dataParam) {
		const hash = window.location.hash.substring(1);
		if (hash.startsWith("data=")) {
			dataParam = hash.substring(5);
		} else if (hash.startsWith("storageKey=")) {
			const storageKey = hash.substring(11);
			dataParam = localStorage.getItem(storageKey);
		}
	}
	return dataParam ? restoreSpecialCharacters(dataParam) : null;
}

/**
 * Update the main object and show dynamic content
 */
export function updateFeatureOfObject(
	data,
	mainObject,
	editor,
	validationMessage
) {
	if (!data || typeof data !== "object") return;
	if (data.$schema && mainObject) {
		mainObject.updateContent(data);
		const container = document.getElementById("dynamicContent");
		console.log("call object's showAllOptionsInHTML")
		if (container) mainObject.showAllOptionsInHTML(container);
		console.log("end object's showAllOptionsInHTML")

	}
}

/**
 * Load JSON instance from URL parameter
 */
export async function loadFromURL(mainObject, editor, validationMessage) {
	const dataParam = getDataFromURL();
	if (!dataParam) return;

	let parsedData = null;
	const MAX_PRETTY_PRINT_SIZE = 2 * 1024 * 1024; // 2 MB limit for pretty printing

	try {
		// If dataParam is too large, skip full JSON.stringify
		if (dataParam.length > MAX_PRETTY_PRINT_SIZE) {
			editor.value =
				dataParam.slice(0, 1000) + "\n\n... (truncated preview) ...";
			validationMessage.textContent =
				"⚠ Data is too large to display fully in the editor. Showing truncated preview.";
			parsedData = JSON.parse(dataParam.slice(0, 1000)); // optionally parse only a small preview
		} else {
			parsedData = JSON.parse(dataParam);
			if (parsedData.content) {
				editor.value = JSON.stringify(parsedData.content, null, 4);
				const schemas = await fetchSchemas(parsedData.content);
				validateJSON(parsedData.content, schemas, validationMessage);
				updateFeatureOfObject(
					parsedData.content,
					mainObject,
					editor,
					validationMessage
				);
				editor.dataset.schema = JSON.stringify(schemas);
			} else {
				validationMessage.textContent =
					"⚠ No 'content' field found in URL data";
			}
		}
	} catch (error) {
		validationMessage.textContent = "❌ Invalid JSON in URL / localStorage";
		console.error("Error parsing URL data:", error);
	}
}

/**
 * Load JSON instance from file
 */
export async function loadInstance(
	fileName,
	mainObject,
	editor,
	validationMessage
) {
	if (!fileName) return;

	const MAX_PRETTY_PRINT_SIZE = 2 * 1024 * 1024; // 2 MB limit for pretty printing

	try {
		const response = await fetch("../instances/" + fileName);
		if (!response.ok)
			throw new Error("Failed to fetch instance: " + response.status);

		// Try to get Content-Length header (optional, may be null)
		const contentLength = response.headers.get("Content-Length");
		const sizeMB = contentLength
			? parseInt(contentLength, 10) / (1024 * 1024)
			: null;

		const data = await response.json();

		if (sizeMB && sizeMB > 50) {
			// For very large files, read only a small preview

			const short = JSON.stringify(data);

			editor.value = short.slice(0, 1000) + "\n\n... (truncated preview) ...";
			validationMessage.textContent =
				"⚠ Instance too large to display fully. Showing preview only.";
		} else {
			editor.value = JSON.stringify(data, null, 4);
		}

		// Otherwise load full JSON normally

		const schemas = await fetchSchemas(data);
		console.log("validateJSON ...", schemas);
		validateJSON(data, schemas, validationMessage);
		console.log("updateFeatureOfObject ...");
		updateFeatureOfObject(data, mainObject, editor, validationMessage);
		console.log("end ...");

		editor.dataset.schema = JSON.stringify(schemas);
	} catch (err) {
		validationMessage.textContent =
			"❌ Failed to load instance or schema : " + err.message;
		console.error("❌ Failed to load instance or schema ::", err);
	}
}

/**
 * Process arbitrary JSON data
 */
export async function processJSONData(data, mainObject, validationMessage) {
	if (!data) return;

	try {
		let schemas = {};
		if (data && data.$schema) {
			schemas = await fetchSchemas(data);
		} else if (validationMessage && validationMessage.dataset?.schema) {
			schemas = JSON.parse(validationMessage.dataset.schema);
		}

		validateJSON(data, schemas, validationMessage);

		if (mainObject) {
			mainObject.updateContent(data);
			const container = document.getElementById("dynamicContent");
			if (container) mainObject.showAllOptionsInHTML(container);
		}
	} catch (err) {
		console.error("Error processing JSON data:", err);
		if (validationMessage) {
			validationMessage.textContent = "❌ Failed to process JSON data";
			validationMessage.style.color = "red";
		}
	}
}
