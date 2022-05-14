-- Revert koesio:init from pg

BEGIN;

DROP TABLE "MESSAGE", "USER";

COMMIT;