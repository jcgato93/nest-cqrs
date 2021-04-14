import { Hero } from "./models/hero.model";

export interface IHeroRepository {
    findOneById(id: number): Promise<Hero>
    findAll(): Promise<Hero[]>
}