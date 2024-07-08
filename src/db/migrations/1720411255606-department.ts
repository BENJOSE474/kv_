import { MigrationInterface, QueryRunner } from "typeorm";

export class Department1720411255606 implements MigrationInterface {
    name = 'Department1720411255606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "employee_id" integer, "department_id" integer, CONSTRAINT "PK_d62835db8c0aec1d18a5a927549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_29af57c55c425f7470809bffe85" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_29af57c55c425f7470809bffe85"`);
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80"`);
        await queryRunner.query(`DROP TABLE "employee_department"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
