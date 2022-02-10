import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { DatabaseService } from '../services/database/database.service';

import { Item } from '../database/entities/item.entity';
import { JwtAuthGuard } from '../services/auth/auth.service';

@Controller('api')
export class ApiController {

    constructor(private db: DatabaseService) {}

    @Get('items')
    public async getItems(): Promise<Item[]> {
        const items = await this.db.findAll();

        return items;
    }

    @Put('items')
    public async updateItem(@Body() body: Item): Promise<Item[]> {
        const item = await this.db.update(body);

        return item;
    }

    @Post('items')
    public async createNewItem(@Body() body: Item): Promise<Item[]> {
        const items = await this.db.create(body);
        return items;
    }

    @Delete('items/:id')
    @UseGuards(JwtAuthGuard)
    public async deleteItem(@Param('id') id: number, @Request() req): Promise<Item[]> {
        const items = await this.db.deleteOne(id);
        return items;
    }

    @Delete('items')
    public async deleteCompletedItems(@Body() ids: number[]): Promise<Item[]> {
        const items = await this.db.deleteMany(ids);

        return items;
    }
}
