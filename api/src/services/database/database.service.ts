import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../database/entities/item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>
    ) {}

    public findAll(id: string): Promise<Item[]> {
        return this.itemRepo.find({
            where: {
                userId: id
            }
        });
    }

    public async update(data: Item, userId: string): Promise<Item[]> {
        await this.itemRepo.update({ id: data.id }, { state: data.state });

        return this.findAll(userId);
    }

    public async create(data: Item, userId: string): Promise<Item[]> {
        await this.itemRepo.insert(data);

        return this.findAll(userId);
    }

    public async deleteOne(id: number, userId: string): Promise<Item[]> {
        await this.itemRepo.delete({ id: id });

        return this.findAll(userId);
    }

    public async deleteMany(ids: number[], userId: string): Promise<Item[]> {
        await this.itemRepo.delete(ids);

        return this.findAll(userId);
    }
}
