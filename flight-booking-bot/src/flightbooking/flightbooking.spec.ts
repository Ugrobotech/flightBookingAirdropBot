import { Test, TestingModule } from '@nestjs/testing';
import { Flightbooking } from './flightbooking';

describe('Flightbooking', () => {
  let provider: Flightbooking;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Flightbooking],
    }).compile();

    provider = module.get<Flightbooking>(Flightbooking);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
