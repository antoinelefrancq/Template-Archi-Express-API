-- EXAMPLE

BEGIN;
-- Si toutes les commandes entre le BEGIN; et le COMMIT; se passe bien, j'acte les changements

DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

CREATE TABLE IF NOT EXISTS  "list" (
    -- on va préferer le generated as identity primary car c'est un standard SQL alors que SERIAL et un pseudo-type de PG
    -- "id" SERIAL PRIMARY KEY,
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "card" (
    -- on va préferer le generated as identity primary car c'est un standard SQL alors que SERIAL et un pseudo-type de PG
    -- "id" SERIAL PRIMARY KEY,
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT '',
    "colour" TEXT NOT NULL DEFAULT '#FFF',
    "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS "tag" (
    -- on va préferer le generated as identity primary car c'est un standard SQL alors que SERIAL et un pseudo-type de PG
    -- "id" SERIAL PRIMARY KEY,
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "colour" TEXT NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "card_has_tag" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
    "tag_id" INTEGER NOT NULL REFERENCES tag("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- ici pas d'updated_at ... une relation ne se met pas à jour, soit on l'ajoute, soit on la supprime
);

COMMIT;
COMMIT;