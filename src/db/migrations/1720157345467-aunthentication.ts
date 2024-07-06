import { MigrationInterface, QueryRunner } from "typeorm";

export class Aunthentication1720157345467 implements MigrationInterface {
    name = 'Aunthentication1720157345467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "password" character varying`);
    }

}
