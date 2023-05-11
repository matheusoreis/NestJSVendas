import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/:stateID')
  async getCitiesByStateID(
    @Param('stateID') stateID: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getCitiesByStateID(stateID);
  }

  @Get()
  async getAllCites(): Promise<CityEntity[]> {
    return this.cityService.getAllCities();
  }
}
