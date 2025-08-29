import fs from "fs";

import { processSchemas, loadSchemas } from "../src/resolveSchemas.js";

import { generateIndexPage, mainGeneration } from "../src/generateHtmlForSchema.js";

import { runElevators } from "../src/makeElevators.js";
import { mainMakeForm } from "../src/makeFormForReaders.js";

import {
	schemaDir,
	instanceDir,
	htmlDir,
	classHandlerDir,
	derivationsFile,
	schemaResolved,
	src_objects,
} from "./config.js";

import { insertSupplementForFormInObjectClasses } from "../src/insertSupplementForFormInObjectClasses.js";
import { insertSupplementForViewersClasses } from "../src/insertSupplementForViewersClasses.js";

import {
	createSchemaAndInstances,
} from "./createSchemaAndInstances.js";


fs.rmSync(schemaDir, { recursive: true, force: true });
fs.mkdirSync(schemaDir, { recursive: true });

fs.rmSync(classHandlerDir, { recursive: true, force: true });
fs.mkdirSync(classHandlerDir, { recursive: true });

if (fs.existsSync(derivationsFile)) {
	fs.unlinkSync(derivationsFile);
}

createSchemaAndInstances() 

console.log(
	"\n****** In v1/schemaResolved, write a copy of each schema but removed all 'allOf' and explicit '$refs' except if recursive\n"
);

fs.rmSync(schemaResolved, { recursive: true, force: true });
fs.mkdirSync(schemaResolved, { recursive: true });

processSchemas();

fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(classHandlerDir, { recursive: true });
fs.mkdirSync(instanceDir, { recursive: true });
// Ensure the HTML output directory exists
if (!fs.existsSync(htmlDir)) {
	fs.mkdirSync(htmlDir, { recursive: true });
}

fs.rmSync(src_objects, { recursive: true, force: true });
fs.mkdirSync(src_objects, { recursive: true });

const schemaList = mainGeneration();
generateIndexPage(schemaList);
runElevators();

console.log("****************************** 0");
mainMakeForm();

console.log("****************************** 1");
insertSupplementForFormInObjectClasses();
console.log("****************************** 2");
insertSupplementForViewersClasses();
console.log("****************************** End");




