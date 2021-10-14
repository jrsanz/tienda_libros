CREATE DATABASE libreria;

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
    precio          FLOAT           NOT NULL
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


INSERT INTO libros VALUES('Ángeles y Demonios', 'Dan Brown', '9786070744969', 'Planeta', 688, 'Español', 'Novela', 360.00);
INSERT INTO libros VALUES('El hombre más feliz del mundo', 'Eddie Jaku', '9788408248736', 'Planeta', 240, 'Español', 'Novela', 170.00);
INSERT INTO libros VALUES('Cómo piensan los ricos', 'Morgan Housel', '9788408246121', 'Planeta', 312, 'Español', 'Economía', 450.00);
INSERT INTO libros VALUES('Una nueva felicidad', 'Curro Cañete', '9788408243113', 'Planeta', 336, 'Español', 'Autoayuda', 400.00);
INSERT INTO libros VALUES('A fuego lento', 'Paula Hawkins', '9786070778155', 'Planeta', 480, 'Español', 'Novela', 400.00);
INSERT INTO libros VALUES('El fin del mundo tal y como lo conocemos', 'Marta García Aller', '9788408175384', 'Planeta', 336, 'Español', 'Economía', 420.00);
INSERT INTO libros VALUES('El Código Da Vinci', 'Dan Brown', '9786070744945', 'Planeta', 624, 'Español', 'Novela', 340.00);