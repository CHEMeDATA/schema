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

/**
 * Get JSON data from URL query or fragment
 */
 
function loadFromStorage() {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const storageKey = params.get("storageKey");

    if (!storageKey) return null;

    const dataStr = localStorage.getItem(storageKey);
    if (!dataStr) return null;

    try {
        return JSON.parse(dataStr);
    } catch (err) {
        console.error("Failed to parse JSON from localStorage", err);
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
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (err) {
                    console.error("Failed to parse stored JSON", err);
                    return null;
                }
            }
            return null;
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
		if (container) mainObject.showAllOptionsInHTML(container);
	}
}

/**
 * Load JSON instance from URL parameter
 */
export async function loadFromURL(mainObject, editor, validationMessage) {
	const dataParam = getDataFromURL();
	if (!dataParam) return;

	try {
		const parsedData = JSON.parse(dataParam);
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
			validationMessage.textContent = "⚠ No 'content' field found in URL data";
		}
	} catch (error) {
		validationMessage.textContent = "❌ Invalid JSON in URL";
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

	try {
		const response = await fetch("../instances/" + fileName);
		if (!response.ok)
			throw new Error("Failed to fetch instance: " + response.status);

		const data = await response.json();
		editor.value = JSON.stringify(data, null, 4);

		const schemas = await fetchSchemas(data);
		validateJSON(data, schemas, validationMessage);
		updateFeatureOfObject(data, mainObject, editor, validationMessage);
		editor.dataset.schema = JSON.stringify(schemas);
	} catch (err) {
		editor.value = "";
		validationMessage.textContent =
			"❌ Failed to load instance: " + err.message;
		console.error("Error loading instance:", err);
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
