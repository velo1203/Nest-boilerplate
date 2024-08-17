import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'useremail', // username 대신 email을 사용
    });
  }

  async validate(useremail: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(useremail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
