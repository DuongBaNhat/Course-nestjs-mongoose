import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionCommon } from './common/exception.common';
import { TransformResponse } from './common/transformer.response';
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new ExceptionCommon(httpAdapter))
  app.useGlobalInterceptors(new TransformResponse());
  app.useGlobalPipes(
    new ValidationPipe(
      {whitelist: true}
    ));
  await app.listen(3000);
}
bootstrap();
