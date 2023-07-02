import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import { js2xml } from 'xml-js';
import { v4 as uuidv4 } from 'uuid';
import { apiUrl, apiUsername, apiPassword } from '../config';

export const upload = async (params: any) => {
  const uploadResponse: any[] = [];
  await Promise.allSettled(params.map(async (record: any) => {
      const uuid = uuidv4();
      const wrappedData = {
          ['Document']: {
              DocumentNumber: uuid,
              ...record.Document
          }
      };
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const xmlData = js2xml(wrappedData, options);
      const response = await uploadFile(record.ProjectId, record.FileName, xmlData);
      uploadResponse.push(response);
  }));
  return uploadResponse;
};

export const uploadFile = async (projectId: String, filename: String, paramXML: any) => {
  const uri = `${apiUrl}api/projects/${projectId}/register`;
  const userName = apiUsername;
  const password = apiPassword;
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

    const config: AxiosRequestConfig = {
      method,
      url: uri,
      headers,
      data: postDataBuffer,
    };

    const axiosResponse = await axios(config);
    response = axiosResponse.data;
    console.log(response);
    return {
      success: true,
    }
  } catch (e: any) {
    error = true;
    errorMessage = `Error: ${e.message}`;
    console.log(errorMessage);
    return {
      error,
      errorMessage
    }
  }
}

