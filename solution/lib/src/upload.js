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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.upload = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const xml_js_1 = require("xml-js");
const uuid_1 = require("uuid");
const config_1 = require("../config");
const upload = async (params) => {
    const uploadResponse = [];
    await Promise.allSettled(params.map(async (record) => {
        const uuid = (0, uuid_1.v4)();
        const wrappedData = {
            ['Document']: {
                DocumentNumber: uuid,
                ...record.Document
            }
        };
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlData = (0, xml_js_1.js2xml)(wrappedData, options);
        const response = await (0, exports.uploadFile)(record.ProjectId, record.FileName, xmlData);
        uploadResponse.push(response);
    }));
    return uploadResponse;
};
exports.upload = upload;
const uploadFile = async (projectId, filename, paramXML) => {
    const uri = `${config_1.apiUrl}api/projects/${projectId}/register`;
    const userName = config_1.apiUsername;
    const password = config_1.apiPassword;
    const method = 'POST';
    let postXML = paramXML;
    let response = '';
    let error = false;
    let aconexError = false;
    let errorMessage = '';
    try {
        const boundary = '----------------------------' + Date.now().toString(16);
        const postData = [];
        postData.push(`--${boundary}\r\n\r\n`);
        postData.push(postXML);
        postData.push(`\r\n--${boundary}\r\n`);
        postData.push(`X-Filename: ${filename}\r\n\r\n`);
        const fileBytes = fs.readFileSync(`./files/${filename}`);
        const encodedData = Buffer.from(fileBytes).toString('base64');
        postData.push(encodedData);
        postData.push(`\r\n--${boundary}--\r\n`);
        const postDataBuffer = Buffer.from(postData.join(''), 'utf-8');
        const headers = {
            'Authorization': `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            'Content-Type': `multipart/mixed; boundary="${boundary}"`,
            'Content-Length': postDataBuffer.length.toString(),
        };
        const config = {
            method,
            url: uri,
            headers,
            data: postDataBuffer,
        };
        const axiosResponse = await (0, axios_1.default)(config);
        response = axiosResponse.data;
        console.log(response);
        return {
            success: true,
        };
    }
    catch (e) {
        error = true;
        errorMessage = `Error: ${e.message}`;
        console.log(errorMessage);
        return {
            error,
            errorMessage
        };
    }
};
exports.uploadFile = uploadFile;
