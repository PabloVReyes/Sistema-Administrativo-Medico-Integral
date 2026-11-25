-- Crear base de datos
USE CREATE DATABASE IF NOT EXISTS sami_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Seleccionar base de datos
USE sami_db;

-- Crear roles
CREATE ROLE IF NOT EXISTS 'sami_app_role';
CREATE ROLE IF NOT EXISTS 'sami_readonly_role';
CREATE ROLE IF NOT EXISTS 'sami_admin_role';

-- Rol de aplicación
GRANT SELECT, INSERT, UPDATE, DELETE
ON sami_db.*
TO 'sami_app_role';

-- Rol de consulta
GRANT SELECT
ON sami_db.*
TO 'sami_readonly_role';

-- Rol administrativo
GRANT SELECT, INSERT, UPDATE, DELETE,
CREATE, ALTER, INDEX, DROP
ON sami_db.*
TO 'sami_admin_role';

-- Crear cuenta de aplicación
CREATE USER IF NOT EXISTS 'sami_app'
@'localhost'
IDENTIFIED BY 'SG9sYU11bmRv*';

-- Asignar rol
GRANT 'sami_app_role'
TO 'sami_app'@'localhost';

-- Establecer rol predeterminado
SET DEFAULT ROLE 'sami_app_role'
TO 'sami_app'@'localhost';

-- Cuenta de consulta
CREATE USER IF NOT EXISTS 'sami_lectura'
@'localhost'
IDENTIFIED BY '96Vb7=85fktT';

GRANT 'sami_readonly_role'
TO 'sami_lectura'@'localhost';

SET DEFAULT ROLE 'sami_readonly_role'
TO 'sami_lectura'@'localhost';

-- Cuenta administrativa
CREATE USER IF NOT EXISTS 'sami_dba'
@'localhost'
IDENTIFIED BY 'XxS_F#9K.97u';

GRANT 'sami_admin_role'
TO 'sami_dba'@'localhost';

SET DEFAULT ROLE 'sami_admin_role'
TO 'sami_dba'@'localhost';