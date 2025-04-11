import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT, PROXY } from './config/global.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const proxy = configService.get(PROXY);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix(proxy);

  const config = new DocumentBuilder()
    .setTitle('Kochka API')
    .setDescription('The kochka app API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${proxy}/docs`, app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get(PORT);
  await app.listen(port, () => {
    logger.log(`App has started on port ${port}.`);
  });
}
bootstrap();
