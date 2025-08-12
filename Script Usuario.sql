-- USER SQL
create user "C##EBAY" identified by "1234"
   default tablespace "USERS"
   temporary tablespace "TEMP";

-- QUOTAS
alter user "C##EBAY"
   quota unlimited on "USERS";

-- ROLES
grant "CONNECT" to "C##EBAY";
grant "RESOURCE" to "C##EBAY";
alter user "C##EBAY" default role "CONNECT","RESOURCE";

-- SYSTEM PRIVILEGES
grant
   create trigger
to "C##EBAY";
grant
   create view
to "C##EBAY";
grant
   create session
to "C##EBAY";
grant
   create table
to "C##EBAY";