import fs from 'fs';
import { promisify } from 'util';
import { listDocuments } from '../src/list';

const readFileAsync = promisify(fs.readFile);

describe('File List Integration Test', () => {
    it('should list multiple files', async () => {
        const paramsFile = 'data/list.json';
        const params = await readFileAsync(paramsFile, 'utf8');

        // Call the list function
        const result = await listDocuments(JSON.parse(params));
        // console.log(result);

        expect(result).toHaveLength(3);
    });
});
