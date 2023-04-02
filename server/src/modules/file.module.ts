import { Module } from '@nestjs/common';
import { FileService } from '../services/file.service';

@Module({
  providers: [FileService],
})
export class FileModule {}
