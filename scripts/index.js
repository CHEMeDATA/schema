import fs from "fs";
import path from "path";

import { processSchemasResolution } from "../src/resolveSchemas.js";

import { generateIndexPage, mainGeneration } from "../src/generateHtmlForSchema.js";

import { runElevators } from "../src/makeElevators.js";
import { mainMakeForm } from "../src/makeFormForReaders.js";

import {
	schemaDir,
	instanceDir,
	htmlDir,
	classHandlerDir,
	schemaResolved,
	src_objects,
	instanceLDDir,
	derivationsFile,
	all_toolsFile,
	objectsFile
} from "./config.js";


import { insertSupplementForFormInObjectClasses } from "../src/insertSupplementForFormInObjectClasses.js";
import { insertSupplementForViewersClasses } from "../src/insertSupplementForViewersClasses.js";

import {
	createSchemaAndInstances,
} from "./createSchemaAndInstances.js";

import {
	createSpinSystemSchema,
} from "./createSpinSystemSchema.js";


import {
	processSchemaObject,
} from "../src/makeLinkedDataInstances.js";


fs.rmSync(schemaDir, { recursive: true, force: true });
fs.mkdirSync(schemaDir, { recursive: true });

fs.rmSync(classHandlerDir, { recursive: true, force: true });
fs.mkdirSync(classHandlerDir, { recursive: true });

fs.mkdirSync(instanceDir, { recursive: true });

// create schema
console.log("Create Schema and instances");
	// this list the list of derived classes
	if (fs.existsSync(derivationsFile)) {
		fs.unlinkSync(derivationsFile); // delete
	}
	// this list the list of derived classes
	if (fs.existsSync(objectsFile)) {
		fs.unlinkSync(objectsFile); // delete
	}
createSchemaAndInstances() 
const also_Range_and_Match_schema = false;
createSpinSystemSchema(also_Range_and_Match_schema);

console.log(
	"****** In v1/schemaResolved, write a copy of each schema but removed all 'allOf' and explicit '$refs' except if recursive"
);
fs.rmSync(schemaResolved, { recursive: true, force: true });
fs.mkdirSync(schemaResolved, { recursive: true });
processSchemasResolution();


// create classHandler for schema's home pages
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(classHandlerDir, { recursive: true });

fs.rmSync(src_objects, { recursive: true, force: true });
fs.mkdirSync(src_objects, { recursive: true });


// Here will read "sup" and "supplement" files
const schemaList = mainGeneration(); // read from v1/schema
generateIndexPage(schemaList); // only generates the index page of schema home pages
runElevators(derivationsFile); // reads derivationsFile file 

console.log("****************************** 0");
mainMakeForm(all_toolsFile);

console.log("****************************** 1");

// for suppl_
insertSupplementForViewersClasses(); // insert sup files into handler

console.log("****************************** 2");

insertSupplementForFormInObjectClasses("supImpBB_", "supImpAA_"); 
insertSupplementForFormInObjectClasses("supplement", "supImpZZ_");
insertSupplementForFormInObjectClasses("supImpMe_", "supImpIn_");

console.log("****************************** End");

console.log("****************************** Export instances as Linked data");

// write linked data
if (false) { // THIS IS CHANGING THE LINKED DATA EACH TIME BECAUSE OF RANDOM HASH
	const instancePath = path.join(instanceDir);
	fs.readdirSync(instancePath).forEach(file => {
	    if (file.endsWith('.json')) {
			console.log(`Try Convert ${file} `);

	        const instancePathFile = path.join(instancePath, file);
	        const instance = JSON.parse(fs.readFileSync(instancePathFile, 'utf8'));

	        // Convert instance and add hashes
	        const ldInstance = processSchemaObject(instance);

	        fs.writeFileSync(
	            path.join(instanceLDDir, file),
	            JSON.stringify(ldInstance, null, 4),
	            'utf8'
	        );

	        console.log(`✅ Converted ${file} to Linked Data JSON with hashes for all schema objects.`);
	    }
	});
}