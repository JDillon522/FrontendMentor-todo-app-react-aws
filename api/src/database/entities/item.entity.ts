import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    state: number;
}
