import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCitiesByStateID(stateID: number): Promise<CityEntity[]> {
    // Verifica se as cidades encontradas estão em cache
    const citiesCache: CityEntity[] = await this.cacheManager.get(
      `state_${stateID}`,
    );

    // Caso exista em cache, retorna o cache
    if (citiesCache) {
      return citiesCache;
    }

    // Caso não exista em cache, busca no banco
    const cities = await this.cityRepository.find({
      where: {
        stateID: stateID,
      },
    });

    // Salva as cidades encontrada em cache
    await this.cacheManager.set(`state_${stateID}`, cities);

    return cities;
  }

  async getAllCities(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }
}
