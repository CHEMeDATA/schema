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



// for suppl_
mainMakeForm();
