import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ItemsSeeder } from '../seeds/items.seed';

@Injectable()
export class SeedCommand {
  constructor(private readonly itemsSeeder: ItemsSeeder) {}

  @Command({
    command: 'seed:items',
    describe: 'Seed items collection',
  })
  async seed() {
    try {
      await this.itemsSeeder.seed();
    } catch (error) {
      console.error('Error seeding items:', error);
    }
  }
}
