-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;
-- CREATE TABLE Users (
--   id SERIAL PRIMARY KEY,
--   firstname text,
--   lastname text,
--   email text
-- );
INSERT INTO Users (firstname, lastname, email)
VALUES($1, $2, $3);
-- VALUES ( 'John', 'Smith', 'John@Smith.com'),
-- VALUES( 'Dave', 'Davis', 'Dave@Davis.com'),
-- VALUES( 'Jane', 'Janis', 'Jane@Janis.com');
