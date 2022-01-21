import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../database/entities/item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>
    ) {}

    public findAll(): Promise<Item[]> {
        return this.itemRepo.find();
    }

    public async update(data: Item): Promise<Item[]> {
        await this.itemRepo.update({ id: data.id }, { state: data.state });

        return this.findAll();
    }

    public async create(data: Item): Promise<Item[]> {
        await this.itemRepo.insert(data);

        return this.findAll();
    }

    public async delete(id: number): Promise<Item[]> {
        await this.itemRepo.delete({ id: id });

        return this.findAll();
    }
}
