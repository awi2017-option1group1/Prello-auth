CREATE TABLE "client" ("id" SERIAL NOT NULL, "client_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "client_secret" uuid NOT NULL DEFAULT uuid_generate_v4(), "redirect_uris" text NOT NULL, "is_trusted" boolean NOT NULL, CONSTRAINT "uk_client_client_id" UNIQUE ("client_id"), PRIMARY KEY("id"));
CREATE TABLE "oauth_access_token" ("access_token" character varying NOT NULL, "access_token_expires_at" date NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("access_token"));
CREATE TABLE "oauth_authorization_code" ("authorization_code" character varying NOT NULL, "authorization_code_expires_at" date NOT NULL, "redirect_uri" character varying NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("authorization_code"));
CREATE TABLE "oauth_refresh_token" ("refresh_token" character varying NOT NULL, "refresh_token_expires_at" date NOT NULL, "scope" character varying, "userUid" integer, "clientCid" integer, PRIMARY KEY("refresh_token"));
ALTER TABLE "public"."user" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4();
ALTER TABLE "oauth_access_token" ADD CONSTRAINT "fk_d1dd806c4adad1f4627f3fb9c95" FOREIGN KEY ("userUid") REFERENCES "user"("id");
ALTER TABLE "oauth_access_token" ADD CONSTRAINT "fk_801f8b36e244326c4f3a9ae5e1e" FOREIGN KEY ("clientCid") REFERENCES "client"("id");
ALTER TABLE "oauth_authorization_code" ADD CONSTRAINT "fk_250571fceb80c6f6c9cbc0bd312" FOREIGN KEY ("userUid") REFERENCES "user"("id");
ALTER TABLE "oauth_authorization_code" ADD CONSTRAINT "fk_8709a372382c854bc703c3b085d" FOREIGN KEY ("clientCid") REFERENCES "client"("id");
ALTER TABLE "oauth_refresh_token" ADD CONSTRAINT "fk_0a6d55dffdb076166d2e118623f" FOREIGN KEY ("userUid") REFERENCES "user"("id");
ALTER TABLE "oauth_refresh_token" ADD CONSTRAINT "fk_34362a2bd1b10ca5287e0e7645a" FOREIGN KEY ("clientCid") REFERENCES "client"("id");

INSERT INTO "client" ("client_id", "name", "redirect_uris", "is_trusted") VALUES ('adfd1753-863a-44f6-b752-05d02bca7e08', 'Prello-WebApp', 'http://localhost/redirect', true);
INSERT INTO "client" ("client_id", "name", "redirect_uris", "is_trusted") VALUES ('e70919f4-b7f3-466b-b326-9faa7f7290f0', 'Prello-Electron', 'http://localhost/redirect', true);
INSERT INTO "client" ("client_id", "name", "redirect_uris", "is_trusted") VALUES ('9fc19d15-4a3a-4373-8f50-c1b478a8051b', 'Prello-Zendesk', 'http://localhost/redirect', true);
