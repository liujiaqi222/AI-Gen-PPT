import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SessionData } from './type';

@Injectable()
export class AuthService {
  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<SessionData> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatched = await verify(user.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials');
    return {
      name: user.name,
      email: user.email,
    };
  }
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  @Inject(UsersService)
  private readonly usersService: UsersService;
  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exits');
    return this.usersService.create(createUserDto);
  }
}
