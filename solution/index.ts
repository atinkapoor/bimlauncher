import * as fs from 'fs';
import { promisify } from 'util';
import { listDocuments } from './src/list';
import { download } from './src/download';
import { upload } from './src/upload';

const readFileAsync = promisify(fs.readFile);

const run = async function () {
    const action = process.argv[2];
    const paramsFile = process.argv[3];
    const params = await readFileAsync(paramsFile, 'utf8');

    switch (action) {
        case 'download':
            await download(JSON.parse(params));
            break;
        case 'upload':
            await upload(JSON.parse(params));
            break;
        case 'list':
            const documents = await listDocuments(JSON.parse(params));
            console.log(documents);
            break;
        default:
            // Code to be executed when none of the cases match the expression
    }
};
run();
