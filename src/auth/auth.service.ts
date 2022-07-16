import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from './DTO/createuser.dto';

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService,
    ) {}


    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.user({ username: username})
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    @UseFilters(HttpExceptionFilter)
    async login(user: any) {
        let found = await this.userService.user({username: user.username});
        if (found == null){
            throw new HttpException("Wrong data", HttpStatus.CONFLICT)
        }
        const payload = { username: user.username, sub: await (found).id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async createUser(user: CreateUserDTO) {        
        try {
            return await this.userService.createUser(user)
        } catch (e) {
            return null;
        }
    }
}