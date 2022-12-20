import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionCommon } from './common/exception.common';
import { TransformResponse } from './common/transformer.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Project permission')
    .setDescription('The mongodb-stripe API description')
    .setVersion('1.0')
    .addTag('permission')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new ExceptionCommon(httpAdapter))
  app.useGlobalInterceptors(new TransformResponse());
  app.useGlobalPipes(
    new ValidationPipe(
      { whitelist: true }
    ));

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
