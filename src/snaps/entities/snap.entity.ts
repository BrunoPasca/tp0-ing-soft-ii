import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Snap {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({ length: 280 })
    message: string;
}
