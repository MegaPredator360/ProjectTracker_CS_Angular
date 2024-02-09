CREATE DATABASE ProjectTracker
GO

USE ProjectTracker
GO


-- Creacion de Tabla para los permisos de los usuarios
CREATE TABLE PERMISO(
    PERM_ID INT IDENTITY(0, 1),
    PERM_NOMBRE VARCHAR(50),
    CONSTRAINT PK_PERMISO PRIMARY KEY (PERM_ID)
);

-- Datos de Permisos
INSERT INTO PERMISO VALUES ('Administrador');
INSERT INTO PERMISO VALUES ('Gerente');
INSERT INTO PERMISO VALUES ('Usuario');

SELECT * FROM PERMISO;

-- Creacion de la tabla de Usuarios
CREATE TABLE USUARIO(
    USUA_ID INT IDENTITY(0, 1),
    USUA_CEDULA VARCHAR(20),
    USUA_NOMBRE VARCHAR(150),
    USUA_USERNAME VARCHAR(100),
    USUA_CORREO VARCHAR(150),
    USUA_CONTRASENA VARCHAR(255),
    USUA_TELEFONO VARCHAR(15),
    USUA_DIRECCION VARCHAR(200),
    USUA_PRIMER_INICIO BIT,
    USUA_PERM_ID INT,
    CONSTRAINT PK_USUARIO PRIMARY KEY (USUA_ID),
    CONSTRAINT FK_USUA_PERM FOREIGN KEY (USUA_PERM_ID) REFERENCES PERMISO(PERM_ID)
);

-- Usuario Administrador / La contraseña es 12345
INSERT INTO USUARIO VALUES('12345678', 'Usuario Administrador', 'admin', 'admin@correo.com', '5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5', '123456789', 'Direccion del Usuario Administrador', 0, 0);
INSERT INTO USUARIO VALUES('23456789', 'Usuario Gestor', 'gestor', 'gestor@correo.com', '5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5', '123456789', 'Direccion del Usuario Gestor', 0, 1);
INSERT INTO USUARIO VALUES('34567890', 'Usuario Comun', 'user', 'user@correo.com', '5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5', '123456789', 'Direccion del Usuario Comun', 0, 2);

SELECT * FROM USUARIO;

-- Creacion de la tabla de Estados
CREATE TABLE ESTADO(
    ESTA_ID INT IDENTITY(0, 1),
    ESTA_NOMBRE VARCHAR(50),
    CONSTRAINT PK_ESTADO PRIMARY KEY (ESTA_ID)
);

-- Datos de la tabla de Estados
INSERT INTO ESTADO VALUES ('En Progreso');
INSERT INTO ESTADO VALUES ('En Espera');
INSERT INTO ESTADO VALUES ('Cerrado');
INSERT INTO ESTADO VALUES ('Cancelado');

SELECT * FROM ESTADO;

-- Creacion de tabla de Proyectos
CREATE TABLE PROYECTO(
    PROY_ID INT IDENTITY(0, 1),
    PROY_NOMBRE VARCHAR(100),
    PROY_DESCRIPCION VARCHAR(255),
    PROY_FECHA_INICIO VARCHAR(10),
    PROY_ESTA_ID INT,
    CONSTRAINT PK_PROYECTO PRIMARY KEY (PROY_ID),
    CONSTRAINT FK_PROY_ESTA FOREIGN KEY (PROY_ESTA_ID) REFERENCES ESTADO(ESTA_ID) 
);

-- Creacion de la Tabla de Tareas
CREATE TABLE TAREA(
    TARE_ID INT IDENTITY(0 ,1),
    TARE_NOMBRE VARCHAR(100),
    TARE_DESCRIPCION VARCHAR(255),
    TARE_FECHA_INICIO VARCHAR(10),
    TARE_PROY_ID INT,
    TARE_ESTA_ID INT,
    CONSTRAINT PK_TAREA PRIMARY KEY (TARE_ID),
    CONSTRAINT FK_TARE_PROY FOREIGN KEY (TARE_PROY_ID) REFERENCES PROYECTO(PROY_ID) ON DELETE CASCADE,
    CONSTRAINT FK_TARE_ESTA FOREIGN KEY (TARE_ESTA_ID) REFERENCES ESTADO(ESTA_ID)
);

-- Creacion de la tabla relacional de Tareas y Usuarios
CREATE TABLE TAREA_USUARIO(
    TARE_ID INT,
    USUA_ID INT,
    CONSTRAINT PK_TARE_USUA PRIMARY KEY (TARE_ID, USUA_ID),
    CONSTRAINT FK_TAUS_TARE FOREIGN KEY (TARE_ID) REFERENCES TAREA(TARE_ID) ON DELETE CASCADE,
    CONSTRAINT FK_TAUS_USUA FOREIGN KEY (USUA_ID) REFERENCES USUARIO(USUA_ID) ON DELETE CASCADE
);