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
exports.downloadFile = exports.download = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const config_1 = require("../config");
const download = async (params) => {
    const downloadResponse = [];
    await Promise.allSettled(params.map(async (record) => {
        const params = {
            projectId: record.ProjectId,
            documentId: record.DocumentId,
            filename: record.FileName
        };
        const response = await (0, exports.downloadFile)(params);
        downloadResponse.push(response);
    }));
    return downloadResponse;
};
exports.download = download;
const downloadFile = async (params) => {
    const { projectId, documentId, filename } = params;
    const uri = `${config_1.apiUrl}api/projects/${projectId}/register/${documentId}`;
    const userName = config_1.apiUsername;
    const password = config_1.apiPassword;
    const method = 'GET';
    let error = false;
    let errorMessage = '';
    try {
        const headers = {
            'Authorization': `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
        };
        const config = {
            method,
            url: uri,
            headers,
            responseType: 'stream',
        };
        const axiosResponse = await (0, axios_1.default)(config);
        const fileStream = fs.createWriteStream(filename);
        axiosResponse.data.pipe(fileStream);
        await new Promise((resolve, reject) => {
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
            fileStream.on('error', (err) => {
                reject(err);
            });
        });
        console.log('File downloaded');
    }
    catch (e) {
        error = true;
        errorMessage = `Error: ${e.message}`;
    }
};
exports.downloadFile = downloadFile;
