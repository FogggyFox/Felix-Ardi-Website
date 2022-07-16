import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';

@Module({
  controllers: [DescriptionController],
  providers: [DescriptionService, PrismaService],
  exports: [DescriptionService]
})
export class DescriptionModule {}