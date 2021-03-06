/* tslint:disable */
import {MigrationInterface, QueryRunner} from "typeorm";

import { config } from '../config';

export class AuthMigration1511005729918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "client_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "client_secret" uuid NOT NULL DEFAULT uuid_generate_v4(), "redirect_uris" text NOT NULL, "is_trusted" boolean NOT NULL, CONSTRAINT "uk_client_client_id" UNIQUE ("client_id"), PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "oauth_access_token" ("access_token" character varying NOT NULL, "access_token_expires_at" date NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("access_token"))`);
        await queryRunner.query(`CREATE TABLE "oauth_authorization_code" ("authorization_code" character varying NOT NULL, "authorization_code_expires_at" date NOT NULL, "redirect_uri" character varying NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("authorization_code"))`);
        await queryRunner.query(`CREATE TABLE "oauth_refresh_token" ("refresh_token" character varying NOT NULL, "refresh_token_expires_at" date NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("refresh_token"))`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "token" character varying`);
        await queryRunner.query(`ALTER TABLE "oauth_access_token" ADD CONSTRAINT "fk_d1dd806c4adad1f4627f3fb9c95" FOREIGN KEY ("userUid") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "oauth_access_token" ADD CONSTRAINT "fk_801f8b36e244326c4f3a9ae5e1e" FOREIGN KEY ("clientCid") REFERENCES "client"("id")`);
        await queryRunner.query(`ALTER TABLE "oauth_authorization_code" ADD CONSTRAINT "fk_250571fceb80c6f6c9cbc0bd312" FOREIGN KEY ("userUid") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "oauth_authorization_code" ADD CONSTRAINT "fk_8709a372382c854bc703c3b085d" FOREIGN KEY ("clientCid") REFERENCES "client"("id")`);
        await queryRunner.query(`ALTER TABLE "oauth_refresh_token" ADD CONSTRAINT "fk_0a6d55dffdb076166d2e118623f" FOREIGN KEY ("userUid") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "oauth_refresh_token" ADD CONSTRAINT "fk_34362a2bd1b10ca5287e0e7645a" FOREIGN KEY ("clientCid") REFERENCES "client"("id")`);

        await queryRunner.query(`INSERT INTO "client" ("client_id", "client_secret", "name", "redirect_uris", "is_trusted") VALUES ('${config.electron.clientId}', '${config.electron.clientSecret}', 'Prello-Electron', '${config.electron.redirectUri}', true)`);
        await queryRunner.query(`INSERT INTO "client" ("client_id", "client_secret", "name", "redirect_uris", "is_trusted") VALUES ('${config.zendesk.clientId}', '${config.zendesk.clientSecret}', 'Prello-Zendesk', '${config.zendesk.redirectUri}', false)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "oauth_refresh_token" DROP CONSTRAINT "fk_34362a2bd1b10ca5287e0e7645a"`);
        await queryRunner.query(`ALTER TABLE "oauth_refresh_token" DROP CONSTRAINT "fk_0a6d55dffdb076166d2e118623f"`);
        await queryRunner.query(`ALTER TABLE "oauth_authorization_code" DROP CONSTRAINT "fk_8709a372382c854bc703c3b085d"`);
        await queryRunner.query(`ALTER TABLE "oauth_authorization_code" DROP CONSTRAINT "fk_250571fceb80c6f6c9cbc0bd312"`);
        await queryRunner.query(`ALTER TABLE "oauth_access_token" DROP CONSTRAINT "fk_801f8b36e244326c4f3a9ae5e1e"`);
        await queryRunner.query(`ALTER TABLE "oauth_access_token" DROP CONSTRAINT "fk_d1dd806c4adad1f4627f3fb9c95"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP "token"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP "uuid"`);
        await queryRunner.query(`DROP TABLE "oauth_refresh_token"`);
        await queryRunner.query(`DROP TABLE "oauth_authorization_code"`);
        await queryRunner.query(`DROP TABLE "oauth_access_token"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
