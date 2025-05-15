-- Search indices

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION public.unaccent_immutable(text)
  RETURNS text
  LANGUAGE SQL IMMUTABLE
AS $$
  SELECT lower(unaccent($1));
$$;

ALTER TABLE "Product"
  ADD COLUMN name_norm text
    GENERATED ALWAYS AS ( lower(unaccent_immutable(name)) ) STORED;

CREATE INDEX product_name_trgm_idx
  ON "Product"
  USING GIN (name_norm gin_trgm_ops);


-- Some data

insert into "Role" (id, name, reg_date) values (1,'Administrator', NOW());
INSERT INTO "User" (
    id,
    email,
    "userLogin",
    "roleId",
    reg_date
) VALUES (
	1,
    'admin@example.com',
    'admin',
    1,         -- existing roleId
    NOW()
);
INSERT INTO "User" (
    id,
    email,
    "userLogin",
    "roleId",
    reg_date
) VALUES (
	2,
    '',
    'batch',
    1,         -- existing roleId
    NOW()
);
