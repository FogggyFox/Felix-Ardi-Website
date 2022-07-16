import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PrismaService } from 'src/prisma.service';
import { WishListController } from './wishlist.controller';
import { WishListService } from './wishlist.service';

@Module({
  controllers: [WishListController],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  WishListService, PrismaService],
  exports: [WishListService]
})
export class WishListModule {}