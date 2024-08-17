import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const userCopy = { ...user };
      delete userCopy.password;
      return userCopy;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const findUser = await this.userService.findOne(user.email);
    if (findUser) {
      throw new ConflictException('User with this email already exists');
    }
    await this.userService.createUser(user.useremail, user.password);
  }
}
