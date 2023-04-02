import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './modules/file.module';
import { TrackModule } from './modules/track.module';

@Module({
  imports: [
    TrackModule,
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://korsunmaksim6:music_platform_korsun@cluster0.hh29loz.mongodb.net/?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
