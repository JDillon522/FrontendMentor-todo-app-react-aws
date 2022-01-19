import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Item } from 'src/database/entities/item.entity';

@Controller('api')
export class ApiController {

    constructor(private db: DatabaseService) {}

    @Get('items')
    public async getItems(): Promise<Item[]> {
        const items = await this.db.findAll();

        return items;
    }
}
