"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util_1 = require("util");
const list_1 = require("./src/list");
const download_1 = require("./src/download");
const upload_1 = require("./src/upload");
const readFileAsync = (0, util_1.promisify)(fs.readFile);
const run = async function () {
    const action = process.argv[2];
    const paramsFile = process.argv[3];
    const params = await readFileAsync(paramsFile, 'utf8');
    switch (action) {
        case 'download':
            await (0, download_1.download)(JSON.parse(params));
            break;
        case 'upload':
            await (0, upload_1.upload)(JSON.parse(params));
            break;
        case 'list':
            const documents = await (0, list_1.listDocuments)(JSON.parse(params));
            console.log(documents);
            break;
        default:
        // Code to be executed when none of the cases match the expression
    }
};
run();
