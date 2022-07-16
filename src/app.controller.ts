import { Body, Controller, Get, HttpException, HttpStatus, Post, Render, Request, Res, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { CreateUserDTO } from './auth/DTO/createuser.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';
import { TransformInterceptor } from './transform.interceptor';
@Controller()
export class AppController {
  constructor(
  private authService: AuthService
  ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiCreatedResponse({ description: "Success auth", schema: {
      type: "object",
      properties: {
        acess_token: {
          type: "string",
          description: "auth key"
        }
      },
    }})
    @ApiConflictResponse({ description: 'Wrong data'})
    async login(@Body() data: CreateUserDTO) {
      return this.authService.login(data)
    }
  
    @Post('register')
    @ApiCreatedResponse({ description: 'Success created user'})
    @ApiConflictResponse({ description: 'Username already exist'})
    @UseFilters(HttpExceptionFilter)
    async createUser(@Body() data: CreateUserDTO) {
      var result = await this.authService.createUser(data)
      if (result == null) {
        throw new HttpException('Username already exist', HttpStatus.CONFLICT);
      }
      return result
    }
  
    @UseInterceptors(TransformInterceptor)
    @ApiOkResponse({description: "main page"})
    @Get()
    @Render('index')
    root(@Request() req, @Res() res) {
      if (req.user != null) {
        return { form: "redirect" }
      }
      return {
        form: "login",
        name: ""
      };
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("index")
    @Render('index')
    index(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("gallery")
    @Render('gallery')
    gallery(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }
    
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("cube")
    @Render('cube')
    cube(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("news")
    @Render('news')
    news(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("stories")
    @Render('stories')
    stories(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TransformInterceptor)
    @Get("todo")
    @Render('todo')
    todo(@Request() req) {
      return {
        form: "logged",
        name: req.user.username
      };
    }
}

