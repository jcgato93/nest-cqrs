import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { IHeroRepository } from '../../../domain/hero.repository.interface';
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command';

const HeroRepo = () => Inject('HeroRepo');

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
  implements ICommandHandler<DropAncientItemCommand> {
  constructor(
    @HeroRepo() private readonly repository: IHeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand) {
    console.log(clc.yellowBright('Async DropAncientItemCommand...'));

    const { heroId, itemId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    hero.addItem(itemId);
    hero.commit();
  }
}
