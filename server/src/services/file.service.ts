import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';
import { resolve } from 'path';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: any): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;
      const filePath = resolve(__dirname, '..', 'static', type);
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      console.log(__dirname);
      console.log(filePath);
      console.log(fileExtension);
      writeFileSync(resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {}
}
