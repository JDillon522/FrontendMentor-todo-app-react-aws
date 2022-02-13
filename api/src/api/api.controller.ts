import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { DatabaseService } from '../services/database/database.service';

import { Item } from '../database/entities/item.entity';
import { JwtAuthGuard } from '../services/auth/auth.service';
import { JwtUser } from '../services/auth/auth.validators';

@Controller('api')
export class ApiController {

    constructor(private db: DatabaseService) {}

    @Get('items')
    @UseGuards(JwtAuthGuard)
    public async getItems(@JwtUser() user): Promise<Item[]> {
        const items = await this.db.findAll(user.id);

        return items;
    }

    @Put('items')
    @UseGuards(JwtAuthGuard)
    public async updateItem(@JwtUser() user, @Body() body: { item: Item }): Promise<Item[]> {
        const item = await this.db.update(body.item, user.id);

        return item;
    }

    @Post('items')
    @UseGuards(JwtAuthGuard)
    public async createNewItem(@JwtUser() user, @Body() body: { item: Item}): Promise<Item[]> {
        const items = await this.db.create({
            ...body.item,
            userId: user.id
        }, user.id);
        return items;
    }

    @Delete('items/:id')
    @UseGuards(JwtAuthGuard)
    public async deleteItem(@JwtUser() user, @Param('id') id: number, @Request() req): Promise<Item[]> {
        const items = await this.db.deleteOne(id, user.id);
        return items;
    }

    @Delete('items')
    @UseGuards(JwtAuthGuard)
    public async deleteCompletedItems(@JwtUser() user, @Body() ids: number[]): Promise<Item[]> {
        const items = await this.db.deleteMany(ids, user.id);

        return items;
    }
}
