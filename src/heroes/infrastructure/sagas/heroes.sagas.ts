import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DropAncientItemCommand } from '../../application/commands/impl/drop-ancient-item.command';
import { HeroKilledDragonEvent } from '../../application/events/impl/hero-killed-dragon.event';

const itemId = '0';

@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(HeroKilledDragonEvent),
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [HeroesGameSagas] Saga'));
          return new DropAncientItemCommand(event.heroId, itemId);
        }),
      );
  }

  @Saga()
  saveToEventStore =(events$: Observable<any>): Observable<void> => {
    return events$
      .pipe(        
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [EVENT STORE]'), event);
        }),
      );
  }
}
