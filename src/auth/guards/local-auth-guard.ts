import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { LoginDto } from '../dto/user.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 요청 객체의 바디를 클래스 인스턴스로 변경
    const body = plainToClass(LoginDto, request.body);

    // 요청 바디의 유효성을 검사하여 에러 리스트 가져오기
    const errors = await validate(body);

    // 에러 메세지가 추출된다면 유효성 검사 실패
    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );

    // 유효성 검사 실패 시 BadRequest 응답
    if (errorMessages.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
