import { MigrationInterface, QueryRunner } from "typeorm";

export class Aunthentication1720156266809 implements MigrationInterface {
    name = 'Aunthentication1720156266809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "password"`);
    }

}
