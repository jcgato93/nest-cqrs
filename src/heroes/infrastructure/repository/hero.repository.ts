import { Injectable } from '@nestjs/common';
import { IHeroRepository } from '../../domain/hero.repository.interface';
import { Hero } from '../../domain/models/hero.model';
import { userHero } from './fixtures/user';

@Injectable()
export class HeroRepository implements IHeroRepository{
  async findOneById(id: number): Promise<Hero> {
    return userHero;
  }

  async findAll(): Promise<Hero[]> {
    return [userHero];
  }
}
