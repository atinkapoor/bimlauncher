import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import { apiUrl, apiUsername, apiPassword } from '../config';

export const download = async (params: any) => {
  const downloadResponse: any[] = [];
  await Promise.allSettled(params.map(async (record: any) => {
    const params = {
      projectId: record.ProjectId,
      documentId: record.DocumentId,
      filename: record.FileName
    };
    const response = await downloadFile(params);
    downloadResponse.push(response);
  }));
  return downloadResponse;
};

export const downloadFile = async (params: any) => {
  const { projectId, documentId, filename } = params;
  const uri = `${apiUrl}api/projects/${projectId}/register/${documentId}`;
  const userName = apiUsername;
  const password = apiPassword;
  const method = 'GET';
  let error = false;
  let errorMessage = '';

  try {
    const headers = {
      'Authorization': `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
    };

    const config: AxiosRequestConfig = {
      method,
      url: uri,
      headers,
      responseType: 'stream',
    };

    const axiosResponse = await axios(config);

    const fileStream = fs.createWriteStream(filename);
    axiosResponse.data.pipe(fileStream);

    await new Promise<void>((resolve, reject) => {
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        reject(err);
      });
    });

    console.log('File downloaded');
  } catch (e: any) {
    error = true;
    errorMessage = `Error: ${e.message}`;
  }
}
