"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCommand = void 0;
const tslib_1 = require("tslib");
const nestjs_command_1 = require("nestjs-command");
const common_1 = require("@nestjs/common");
const items_seed_1 = require("../seeds/items.seed");
let SeedCommand = class SeedCommand {
    constructor(itemsSeeder) {
        this.itemsSeeder = itemsSeeder;
    }
    async seed() {
        try {
            await this.itemsSeeder.seed();
        }
        catch (error) {
            console.error('Error seeding items:', error);
        }
    }
};
exports.SeedCommand = SeedCommand;
tslib_1.__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:items',
        describe: 'Seed items collection',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SeedCommand.prototype, "seed", null);
exports.SeedCommand = SeedCommand = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [items_seed_1.ItemsSeeder])
], SeedCommand);
//# sourceMappingURL=seed.command.js.map