import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  controllers: [StoryController],
  providers: [StoryService, PrismaService],
  exports: [StoryService]
})
export class StoryModule {}