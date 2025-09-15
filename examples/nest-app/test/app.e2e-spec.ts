import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { default as request } from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET) with Accept-Language header', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Accept-Language', 'es')
      .expect(200)
      .expect('¡Hola Mundo!');
  });

  it('/ (GET) with unsupported Accept-Language header', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Accept-Language', 'de')
      .expect(200)
      .expect('Hello World!');
  });
});
