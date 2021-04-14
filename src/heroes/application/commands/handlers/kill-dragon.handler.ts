import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { IHeroRepository } from '../../../domain/hero.repository.interface';
import { KillDragonCommand } from '../impl/kill-dragon.command';

const HeroRepo = () => Inject('HeroRepo');

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    @HeroRepo() private readonly repository: IHeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: KillDragonCommand) {
    console.log(clc.greenBright('KillDragonCommand...'));

    const { heroId, dragonId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    hero.killEnemy(dragonId);
    hero.commit();
  }
}
