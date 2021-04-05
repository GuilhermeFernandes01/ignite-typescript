import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

interface IResponse {
  storage: multer.StorageEngine;
}

export default {
  upload(folder: string): IResponse {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    };
  },
};
