import fs from 'fs';
import { promisify } from 'util';
import { upload } from '../src/upload';

const readFileAsync = promisify(fs.readFile);

describe('File Upload Integration Test', () => {
    it('should upload multiple files', async () => {
        const paramsFile = 'data/upload.json';
        const params = await readFileAsync(paramsFile, 'utf8');

        // Call the upload function
        const result = await upload(JSON.parse(params));

        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ success: true });
        expect(result[1]).toEqual({ success: true });
        expect(result[2]).toEqual({ success: true });
    });
});
