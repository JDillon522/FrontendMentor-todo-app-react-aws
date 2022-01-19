import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>
    ) {}

    findAll(): Promise<Item[]> {
        return this.itemRepo.find();
    }
}
