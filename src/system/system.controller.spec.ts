import { Test, TestingModule } from '@nestjs/testing';
import { SystemController } from './system.controller';

describe('AppController', () => {
  let systemController: SystemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SystemController],
      providers: [],
    }).compile();

    systemController = app.get<SystemController>(SystemController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(systemController.healthCheck()).toBe(true);
    });
  });
});
