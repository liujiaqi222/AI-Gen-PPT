import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    const hashedPassword = await hash(password);
    // 创建用户实体

    const newUser = this.usersRepository.create({
      password: hashedPassword,
      ...user,
    });
    // 保存用户

    return this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
