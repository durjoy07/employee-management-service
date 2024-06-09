import {
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class ExtendedBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;
}
