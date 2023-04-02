import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TrackController } from '../controllers/track.controller';
import { TrackService } from '../services/track.service';
import { FileService } from '../services/file.service';
import { TrackSchema, Track } from '../models/track.model';
import { CommentSchema, Comment } from '../models/comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
