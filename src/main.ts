import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as session from 'express-session';
import * as passport from 'passport';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import flash = require('connect-flash');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.use(require('cors')())
  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('Felix Ardi Blog')
    .setVersion('1.0')
    .build();
    PassportModule.register({ session: true })
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  
  
    app.use(
      session({
        secret: 'nest',
        resave: false,
        saveUninitialized: false,
      }),
    );
  
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
