import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from './../src/test.app.module'; 

describe('Snaps', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); 
  });

  it(`/GET snaps`, () => {
    return request(app.getHttpServer())
      .get('/snaps')
      .expect(200)
      .expect({
        data: [],
      });
  });

  it(`/POST snaps`, async () => {
    const response = await request(app.getHttpServer())
      .post('/snaps')
      .send({ message: 'this is a new snap' }) 
      .expect(201);
    
    expect(response.body.data).toMatchObject({
      message: "this is a new snap"
    });
    expect(response.body.data).toHaveProperty('id');
  });

  it(`/GET snaps/{id}`, async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/snaps')
      .send({ message: 'snap to be retrieved' })
      .expect(201);
  
    const snapId = postResponse.body.data.id;
    const getResponse = await request(app.getHttpServer())
      .get(`/snaps/${snapId}`)
      .expect(200);

    expect(getResponse.body.data).toMatchObject({
      message: 'snap to be retrieved'
    });
    expect(getResponse.body.data).toHaveProperty('id', snapId);
  });

  it(`/DELETE snaps/{id}`, async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/snaps')
      .send({ message: 'snap to be deleted' })
      .expect(201);
  
    const deletedSnapId = postResponse.body.data.id;

    await request(app.getHttpServer())
      .delete(`/snaps/${deletedSnapId}`)
      .expect(200);
    
    await request(app.getHttpServer())
      .get(`/snaps/${deletedSnapId}`)
      .expect(404);
  });
});