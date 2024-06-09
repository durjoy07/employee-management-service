import { Entity, Column, Index } from 'typeorm';
import { ExtendedBaseEntity } from './_base.entity';

@Entity('employees')
export class Employee extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column()
  @Index()
  position_id: number;

  @Column()
  position_name: string;
}
