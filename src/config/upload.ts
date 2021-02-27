import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import e from 'express';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const filename = (
  request: e.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void => {
  const fileHash = crypto.randomBytes(10).toString('hex');

  const filename = `${fileHash}-${file.originalname}`;

  callback(null, filename);
};

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename,
  }),
};
