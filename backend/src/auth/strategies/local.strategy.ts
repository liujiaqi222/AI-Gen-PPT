import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService:AuthService) {
    super({ usernameField:'email' }); // 这里把email当做了账号密码登录的账号
  }
  validate(email:string,password:string) {
    return this.authService.validateLocalUser(email,password)
  }
}
