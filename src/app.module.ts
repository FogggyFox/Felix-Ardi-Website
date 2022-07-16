import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { AuthModule } from './auth/auth.module';
import { WishListModule } from './wishlist/wishlist.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { DescriptionModule } from './description/description.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { AppGateway } from './gateway/app.gateway';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, WishListModule, UserModule, StoryModule, DescriptionModule],
  controllers: [AppController],
  providers:[
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    AppGateway
  ]
})
export class AppModule {}
