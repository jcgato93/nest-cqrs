import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { IHeroRepository } from '../../../domain/hero.repository.interface';
import { GetHeroesQuery } from '../impl';

const HeroRepo = () => Inject('HeroRepo');

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  constructor(@HeroRepo() private readonly repository: IHeroRepository) {}

  async execute(query: GetHeroesQuery) {
    console.log(clc.yellowBright('Async GetHeroesQuery...'));
    return this.repository.findAll();
  }
}
