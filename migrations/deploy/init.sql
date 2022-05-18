-- Deploy koesio:init to pg

BEGIN;

CREATE TABLE "USER" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  mail TEXT NOT NULL UNIQUE,
  lastname TEXT NOT NULL,
  firstname TEXT NOT NULL,
  pseudo  TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL UNIQUE
);


CREATE TABLE "MESSAGE" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" TEXT NOT NULL UNIQUE,
  "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id INT NOT NULL REFERENCES "USER"(id)
  
);

COMMIT;
