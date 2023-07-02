import fs from 'fs';
import { promisify } from 'util';
import { download } from '../src/download';

const readFileAsync = promisify(fs.readFile);

describe('File Download Integration Test', () => {
    it('should download multiple files', async () => {
        const paramsFile = 'data/download.json';
        const params = await readFileAsync(paramsFile, 'utf8');

        // Call the download function
        const result = await download(JSON.parse(params));

        expect(result).toHaveLength(3);
    });
});
