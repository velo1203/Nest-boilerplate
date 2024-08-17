import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('hanstar')
    .setDescription(
      '금융 소약자 청년들을 위한 파산회생 전문 변호사 매칭 플랫폼, 한별입니다. 복잡한 법적 절차와 재정 문제를 해결하여 청년들이 재정적 어려움을 극복하고 새로운 시작을 할 수 있도록 돕는 종합 솔루션을 제공합니다.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
