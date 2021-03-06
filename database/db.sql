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
    precio          DECIMAL(6,2)    NOT NULL,
    imagen          TEXT            NOT NULL,
    sinopsis        TEXT            NOT NULL,
    existencias     INT             NOT NULL
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
    cantidad    INT           NOT NULL,
    tipo_envio  VARCHAR(10)   NOT NULL,
    tipo_pago   VARCHAR(20)   NOT NULL,
    total_se    DECIMAL(6,2)  NOT NULL,
    total_ce    DECIMAL(6,2)  NOT NULL,
    estatus     VARCHAR(25)   NOT NULL      DEFAULT('Pago confirmado')
);

CREATE TABLE proveedores (
    id          SERIAL          PRIMARY KEY,
    nombre      VARCHAR(30)     NOT NULL,
    telefono    CHAR(10)        NOT NULL,
    direccion   VARCHAR(255)    NOT NULL
);

CREATE TABLE surtir (
    id              SERIAL          PRIMARY KEY,
    id_proveedor    INT             NOT NULL,
    id_libro        INT             NOT NULL,
    cantidad        INT             NOT NULL,
    pago            DECIMAL(6,2)    NOT NULL
);


INSERT INTO libros VALUES(1, 'Ángeles y Demonios', 'Dan Brown', '9786070744969', 'Planeta', 688, 'Español', 'Novela', 360.00, '/uploads/Ángeles%20y%20Demonios%20-%209786070744969.jpg', 'Ángeles y demonios, la primera aventura del carismático e inolvidable Robert Langdon, es un adictivo y trepidante thriller sobre la eterna pugna entre ciencia y religión. Esta lucha se convierte en una verdadera guerra que pondrá en jaque a toda la humanidad, que deberá luchar hasta el último minuto para evitar un gran desastre. Robert Langdon, experto en simbología, es convocado a un centro de investigación suizo para analizar un misterioso signo marcado a fuego en el pecho de un físico asesinado. Allí, Langdon descubre el resurgimiento de una antigua hermandad secreta: los illuminati, que han emergido de las sombras para llevar a cabo la fase final de una legendaria venganza contra su enemigo más odiado: la Iglesia católica.  Los peores temores de Langdon se confirman cuando los illuminati anuncian que han escondido una bomba en el corazón de la Ciudad del Vaticano. Con la cuenta atrás en marcha, Langdon viaja a Roma para unir fuerzas con Vittoria Vetra, una bella y misteriosa científica. Los dos se embarcarán en una desesperada carrera contrarreloj por los rincones menos conocidos del Vaticano.', 20);
INSERT INTO libros VALUES(2, 'El hombre más feliz del mundo', 'Eddie Jaku', '9788408248736', 'Planeta', 240, 'Español', 'Novela', 170.00, '/uploads/El%20hombre%20más%20feliz%20del%20mundo%20-%209788408248736.jpg', 'Eddie Jaku se consideraba alemán antes que judío. Siempre sintió un gran orgullo por su país, hasta que en 1938 fue arrestado por los nazis y trasladado a uno de sus campos de concentración. Aunque su formación como ingeniero le concedió ciertos privilegios, primero en Buchenwald y después en Auschwitz, Eddie sufrió horrores indecibles. Perdió a su familia, a sus amigos, a su país. Durante todos esos años, lo que le mantuvo con vida fue su amigo Kurt y la bondad de la gente. Como superviviente del Holocausto y para honrar a todos aquellos que no pudieron hacerlo, Eddie se comprometió a sonreír todos los días y a vivir el resto de su vida con gratitud. A sus 100 años de edad, Eddie asegura que se siente el hombre más feliz del mundo. En estas memorias conmovedoras nos cuenta la historia de su supervivencia y de cómo, gracias a su optimismo, logró superar los mayores horrores y transformar el dolor en esperanza. Un relato exquisito y conmovedor de una vida extraordinaria.', 15);
INSERT INTO libros VALUES(3, 'Cómo piensan los ricos', 'Morgan Housel', '9788408246121', 'Planeta', 312, 'Español', 'Economía', 450.00, '/uploads/Cómo%20piensan%20los%20ricos%20-%209788408246121.jpg', 'En cuestiones de dinero, lo que importa no es lo listo que seas sino cómo te comportas. Tendemos a pensar en la inversión o la gestión de las finanzas personales como una disciplina matemática, en la que los datos y las fórmulas nos dicen exactamente qué hacer. Sin embargo, el rasgo que define a las personas que logran enriquecerse no es su destreza con los números, ni su salario o su talento, sino su historia personal, sus motivaciones y su visión única del mundo. Un genio que pierde el control de sus emociones puede ser un desastre financiero. Y lo mismo vale en caso contrario: gente de a pie sin formación en finanzas puede enriquecerse si cuenta con unos cuantos patrones de comportamiento. Esto, impensable en otras disciplinas como la arquitectura o la medicina, es fundamental en el campo de las finanzas. Este libro, llamado a convertirse en un clásico de las finanzas personales, nos provee del conocimiento esencial para entender la psicología del dinero y nos invita a hacernos una pregunta fundamental que raramente nos hacemos, cuál es nuestra relación con el dinero y qué queremos realmente de él. A partir de 18 claves imperecederas, Morgan Housel nos enseña cómo funciona la psicología del dinero y cuáles son los hábitos y conductas que nos ayudarán no solo a generar riqueza, sino, más importante aún, a conservarla. "Un libro imprescindible para cualquiera que quiera tomar decisiones más inteligentes y vivir una vida más rica." Daniel Pink, autor de La sorprendente verdad sobre qué nos motiva "Ideas fascinantes y consejos prácticos. Cualquiera que quiera hacerse rico debería tener una copia de este libro." James Clear, autor de Hábitos atómicos "Uno de los mejores y más originales libros de finanzas de los últimos años." Jason Zweig, Wall Street Journal "Housel es de esos escritores capaces de hacer digeribles conceptos financieros de lo más complejos. Este es un libro que se devora de principio a fin y que no solo nos explica por qué tomamos malas decisiones con respecto al dinero, sino que nos ayudará a tomar mejores." Annie Duke, autora de Thinking in Bets La riqueza no es fruto de nuestra inteligencia, talento o trabajo. Es fruto de nuestro comportamiento.', 10);
INSERT INTO libros VALUES(4, 'Una nueva felicidad', 'Curro Cañete', '9788408243113', 'Planeta', 336, 'Español', 'Autoayuda', 400.00, '/uploads/Una%20nueva%20felicidad%20-%209788408243113.jpg', 'A veces basta una decisión para provocar un cambio imparable. La vida de Curro Cañete cambió para siempre cuando, en el momento más crítico y doloroso de su vida, se marchó a Lanzarote unos días. Allí, en Playa Blanca, inició un proceso de redescubrimiento de sí mismo que sacudiría su realidad. Tras ese verano, en el que se reencontró con su hermano fallecido al descubrir uno de sus poemas en una vieja maleta, la magia empezó a llenarlo todo y le ayudó a iniciar la fascinante aventura de encontrar su propósito en la vida, un camino en el que las señales y las coincidencias brillaron como estrellas. Una nueva felicidad fue el primer libro de Curro, en el que volcó toda la experiencia de transformación que, con el tiempo, le convertiría en el exitoso autor que es hoy gracias a El poder de confiar en ti y Ahora te toca ser feliz. Con esta edición revisada y prologada por el autor, ponemos de nuevo en manos de todos los lectores una poderosa historia cargada de ilusión y de esperanza. El primer libro de Curro Cañete, autor de El poder de confiar en ti, recuperado en una edición revisada y prologada por el propio autor.', 40);
INSERT INTO libros VALUES(5, 'A fuego lento', 'Paula Hawkins', '9786070778155', 'Planeta', 480, 'Español', 'Novela', 400.00, '/uploads/A%20fuego%20lento%20-%209786070778155.jpg', 'Con la misma intensidad con la que ha cautivado a 27 millones de lectores en todo el mundo la autora de La chica del tren, Paula Hawkins, nos ofrece un brillante thriller sobre las heridas que provocan los secretos que ocultamos. El descubrimiento del cuerpo de un joven asesinado brutalmente en una casa flotante de Londres desencadena sospechas sobre tres mujeres. Laura es la chica conflictiva que quedó con la víctima la noche en que murió; Carla, aún de luto por la muerte de un familiar, es la tía del joven; y Miriam es la indiscreta vecina que oculta información sobre el caso a la policía. Tres mujeres que no se conocen, pero que tienen distintas conexiones con la víctima. Tres mujeres que, por diferentes razones, viven con resentimiento y que, consciente o inconscientemente, esperan el momento de reparar el daño que se les ha hecho. Mira lo que has provocado.', 35);
INSERT INTO libros VALUES(6, 'El fin del mundo tal y como lo conocemos', 'Marta García Aller', '9788408175384', 'Planeta', 336, 'Español', 'Economía', 420.00, '/uploads/El%20fin%20del%20mundo%20tal%20y%20como%20lo%20conocemos%20-%209788408175384.jpg', 'Igual que en el siglo XX desaparecieron imperios que parecían eternos, preceptos morales que habían durado mil años y dogmas científicos que resultaron falsos, en el XXI vamos a decir adiós a muchas de esas tecnologías, costumbres e ideas que nos rodean desde que nacimos. Y la misma suerte que corrieron los videoclubs, el fax y la URSS, la vivirán en breve muchas de las profesiones y los aparatos que nos rodean, como los volantes y el mando a distancia. ¿Cuánto de lo que vemos se desvanecerá? Se avecina el fin de los idiomas y de las cajas registradoras. Y a medida que vamos olvidando cómo era el mundo antes de Google, desaparece la noción de privacidad, la costumbre de conversar y hasta el reloj biológico. Sin olvidar el más ambicioso de todos los avances que la ciencia espera lograr este siglo: el fin del envejecimiento. En sintonía con los grandes reporteros y narradores de la actualidad, Marta García Aller nos sumerge en la transformación digital que vivimos y en los cambios culturales, tecnológicos y económicos que nos esperan en el siglo XXI. Lo hace charlando con expertos de prestigio mundial, pero también con ciudadanos de a pie, como el dependiente de la tienda que no teme la robotización; el alto directivo del motor que sueña con jubilarse antes de que los coches sean autónomos y el encargado de cuidar un viejo almacén de cabinas telefónicas. Un libro imprescindible para entender los cambios inevitables que van a transformar nuestras vidas en un futuro próximo.', 30);
INSERT INTO libros VALUES(7, 'El Código Da Vinci', 'Dan Brown', '9786070744945', 'Planeta', 624, 'Español', 'Novela', 340.00, '/uploads/El%20Código%20Da%20Vinci%20-%209786070744945.jpg', 'Robert Langdon recibe una llamada en mitad de la noche: el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación, Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci? y que están a la vista de todos, ocultas por el ingenio del pintor. Langdon une esfuerzos con la criptóloga francesa Sophie Neveu y descubre que el conservador del museo pertenecía al priorato de Sión, una sociedad que a lo largo de los siglos ha contado con miembros tan destacados como sir Isaac Newton, Botticelli, Victor Hugo o el propio Da Vinci, y que ha velado por mantener en secreto una sorprendente verdad histórica. Una mezcla trepidante de aventuras, intrigas vaticanas, simbología y enigmas cifrados que provocó una extraordinaria polémica al poner en duda algunos de los dogmas sobre los que se asienta la Iglesia católica. Una de las novelas más leídas de todos los tiempos.', 25);

INSERT INTO proveedores VALUES(1, 'Planeta', '5523698745', 'Av. México #1500');
INSERT INTO proveedores VALUES(2, 'Debolsillo', '5596842137', 'Av. Javier Mina #2120');
INSERT INTO proveedores VALUES(3, 'Lumen', '3356258741', 'Calle Miguel Hidalgo #515');
INSERT INTO proveedores VALUES(4, 'Alianza', '3325630021', 'Av. San Miguel Allende #123');
INSERT INTO proveedores VALUES(5, 'Porrúa', '5598632597', 'Calle Río Nilo #1890');
INSERT INTO proveedores VALUES(6, 'Umbral', '3336589241', 'Calle Oblatos #1000');
INSERT INTO proveedores VALUES(7, 'Panorama', '5566320149', 'Av. Niños Héroes #400');
INSERT INTO proveedores VALUES(8, 'Diana', '5577487259', 'Calle Independencia #30');
INSERT INTO proveedores VALUES(9, 'Patria', '3336432597', 'Calle Pablo Valdez #755');
INSERT INTO proveedores VALUES(10, 'Santillana', '3336985201', 'Av. Enrique Díaz de León #635');