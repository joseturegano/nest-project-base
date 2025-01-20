import { ItemsService } from './items.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(pagination: PaginationDto): Promise<import("./schemas/item.schema").Item[]>;
}
