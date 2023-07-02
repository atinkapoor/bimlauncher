"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDocuments = void 0;
const axios_1 = __importDefault(require("axios"));
const xml_js_1 = require("xml-js");
const config_1 = require("../config");
const listDocuments = async (params) => {
    const projectId = params.ProjectId;
    const returnFields = 'attribute1,attribute2,author,discipline,docno,doctype,received,reference,revision,revisiondate,statusid,title';
    const uri = `${config_1.apiUrl}api/projects/${projectId}/register?search_query=${params.search_query}&return_fields=${returnFields}`;
    const apiKey = config_1.apiUsername;
    const apiSecret = config_1.apiPassword;
    try {
        const headers = {
            'Authorization': `Bearer ${apiKey}:${apiSecret}`,
        };
        const config = {
            method: 'get',
            url: uri,
            headers,
        };
        const response = await (0, axios_1.default)(config);
        const xmlData = response.data;
        // Process and handle the documents as needed
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const jsonData = (0, xml_js_1.xml2js)(xmlData, options);
        return jsonData;
    }
    catch (error) {
        // Handle error response
        console.error('Error retrieving documents:', error.message);
    }
};
exports.listDocuments = listDocuments;
