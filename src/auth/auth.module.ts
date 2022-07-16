import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [ UserModule,  PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
          },
          AuthService, UserService, PrismaService, LocalStrategy, JwtStrategy, SessionSerializer],
    exports: [AuthService],
})
export class AuthModule {}
