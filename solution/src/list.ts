import axios, { AxiosRequestConfig } from 'axios';
import { xml2js } from 'xml-js';
import { apiUrl, apiUsername, apiPassword } from '../config';

export const listDocuments = async (params: any) => {
  const projectId = params.ProjectId;
  const returnFields = 'attribute1,attribute2,author,discipline,docno,doctype,received,reference,revision,revisiondate,statusid,title';
  const uri = `${apiUrl}api/projects/${projectId}/register?search_query=${params.search_query}&return_fields=${returnFields}`;
  const apiKey = apiUsername;
  const apiSecret = apiPassword;

  try {
    const headers = {
      'Authorization': `Bearer ${apiKey}:${apiSecret}`,
    };

    const config: AxiosRequestConfig = {
      method: 'get',
      url: uri,
      headers,
    };

    const response = await axios(config);
    const xmlData = response.data;

    // Process and handle the documents as needed
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const jsonData = xml2js(xmlData, options);
        
    return jsonData;

  } catch (error: any) {
    // Handle error response
    console.error('Error retrieving documents:', error.message);
  }
}
