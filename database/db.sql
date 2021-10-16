CREATE SCHEMA libreria;

USE libreria;

CREATE TABLE libros (
    id              SERIAL          PRIMARY KEY,
    nombre          VARCHAR(255)    NOT NULL,
    autor           VARCHAR(255)    NOT NULL,
    isbn            VARCHAR(20)     NOT NULL,
    editorial       VARCHAR(50)     NOT NULL,
    num_paginas     INT             NOT NULL,
    idioma          VARCHAR(20)     NOT NULL,
    categoria       VARCHAR(20)     NOT NULL,
    precio          FLOAT           NOT NULL,
    imagen          TEXT            NOT NULL
);

CREATE TABLE usuarios (
    id                  SERIAL          PRIMARY KEY,
    nombre              VARCHAR(30)     NOT NULL,
    apellido_paterno    VARCHAR(20)     NOT NULL,
    apellido_materno    VARCHAR(20),
    correo              VARCHAR(40)     NOT NULL,
    password            VARCHAR(255)    NOT NULL,
    tipo_usuario        VARCHAR(10)     NOT NULL      DEFAULT('cliente')
);

CREATE TABLE ventas (
    id          SERIAL        PRIMARY KEY,
    id_libro    INT           NOT NULL,
    id_usuario  INT           NOT NULL,
    tipo_pago   VARCHAR(20)   NOT NULL,
    estatus     VARCHAR(25)   NOT NULL      DEFAULT('Pago confirmado')
);


INSERT INTO libros VALUES(1, 'Ángeles y Demonios', 'Dan Brown', '9786070744969', 'Planeta', 688, 'Español', 'Novela', 360.00, '/uploads/Ángeles%20y%20Demonios%20-%209786070744969.jpg');
INSERT INTO libros VALUES(2, 'El hombre más feliz del mundo', 'Eddie Jaku', '9788408248736', 'Planeta', 240, 'Español', 'Novela', 170.00, '/uploads/El%20hombre%20más%20feliz%20del%20mundo%20-%209788408248736.jpg');
INSERT INTO libros VALUES(3, 'Cómo piensan los ricos', 'Morgan Housel', '9788408246121', 'Planeta', 312, 'Español', 'Economía', 450.00, '/uploads/Cómo%20piensan%20los%20ricos%20-%209788408246121.jpg');
INSERT INTO libros VALUES(4, 'Una nueva felicidad', 'Curro Cañete', '9788408243113', 'Planeta', 336, 'Español', 'Autoayuda', 400.00, '/uploads/Una%20nueva%20felicidad%20-%209788408243113.jpg');
INSERT INTO libros VALUES(5, 'A fuego lento', 'Paula Hawkins', '9786070778155', 'Planeta', 480, 'Español', 'Novela', 400.00, '/uploads/A%20fuego%20lento%20-%209786070778155.jpg');
INSERT INTO libros VALUES(6, 'El fin del mundo tal y como lo conocemos', 'Marta García Aller', '9788408175384', 'Planeta', 336, 'Español', 'Economía', 420.00, '/uploads/El%20fin%20del%20mundo%20tal%20y%20como%20lo%20conocemos%20-%209788408175384.jpg');
INSERT INTO libros VALUES(7, 'El Código Da Vinci', 'Dan Brown', '9786070744945', 'Planeta', 624, 'Español', 'Novela', 340.00, '/uploads/El%20Código%20Da%20Vinci%20-%209786070744945.jpg');