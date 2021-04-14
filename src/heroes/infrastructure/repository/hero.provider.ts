import { Provider } from "@nestjs/common";
import { HeroRepository } from "./hero.repository";

export const HeroRepoProvider: Provider = {
    provide: 'HeroRepo',
    useClass: HeroRepository
}