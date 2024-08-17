import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/Entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // - DB 종류
      database: 'database.db', // - DB 파일 이름
      autoLoadEntities: true, // - 구동시 entity파일 자동 로드
      synchronize: true, // - 서비스 구동시 entity와 디비의 테이블 싱크 개발만 할것
      logging: true, // - orm 사용시 로그 남기기
      dropSchema: true,
      entities: [UserEntity],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
