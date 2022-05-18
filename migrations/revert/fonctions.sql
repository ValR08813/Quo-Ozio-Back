-- Revert koesio:fonctions from pg

BEGIN;

DROP FUNCTION add_user(json) CASCADE;

DROP FUNCTION update_user(json) CASCADE;

DROP FUNCTION add_msg(json) CASCADE;


COMMIT;
