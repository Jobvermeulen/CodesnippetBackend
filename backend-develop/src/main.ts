import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });

    app.enableCors({origin: process.env.SERVER});
    await app.listen(4000);
}
bootstrap();
