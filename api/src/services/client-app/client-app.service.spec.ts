import { Test, TestingModule } from '@nestjs/testing';
import { ClientAppService } from './client-app.service';

describe('ClientAppService', () => {
  let service: ClientAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAppService],
    }).compile();

    service = module.get<ClientAppService>(ClientAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
