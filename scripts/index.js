import fs from "fs";

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

fs.mkdirSync(instanceDir, { recursive: true });

createSchemaAndInstances() 

console.log(
	"\n****** In v1/schemaResolved, write a copy of each schema but removed all 'allOf' and explicit '$refs' except if recursive\n"
);

fs.rmSync(schemaResolved, { recursive: true, force: true });
fs.mkdirSync(schemaResolved, { recursive: true });

processSchemasResolution();

fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(classHandlerDir, { recursive: true });

fs.rmSync(src_objects, { recursive: true, force: true });
fs.mkdirSync(src_objects, { recursive: true });

const schemaList = mainGeneration();
generateIndexPage(schemaList);
runElevators();

console.log("****************************** 0");
mainMakeForm();

console.log("****************************** 1");

insertSupplementForFormInObjectClasses("supImpAA_", "supImpBB_"); 
insertSupplementForFormInObjectClasses("supplement", "supImpZZ_");
insertSupplementForFormInObjectClasses("supImpMe_", "supImpIn_");

console.log("****************************** 2");
insertSupplementForViewersClasses();
console.log("****************************** End");




