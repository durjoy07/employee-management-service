import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1717925834426 implements MigrationInterface {
    name = 'NewMigration1717925834426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean DEFAULT false, "name" character varying NOT NULL, "position_id" integer NOT NULL, "position_name" character varying NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b14204e8af5e371e36b8c11e1" ON "employees" ("position_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_8b14204e8af5e371e36b8c11e1"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
