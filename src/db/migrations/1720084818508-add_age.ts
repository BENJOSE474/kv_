import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAge1720084818508 implements MigrationInterface {
    name = 'AddAge1720084818508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
