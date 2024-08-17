import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async createUser(email: string, password: string): Promise<any> {
    const newUser = this.userRepository.create({
      email,
      password,
    });

    // 데이터베이스에 저장
    return await this.userRepository.save(newUser);
  }
}
