-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 10-11-2024 a las 11:03:01
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dgp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CHAT`
--

CREATE TABLE `CHAT` (
  `id` int NOT NULL,
  `mensaje` text,
  `emisor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PETICION`(
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  `fecha_inicio` DATE DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FEEDBACK`
--

CREATE TABLE `FEEDBACK` (
  `id` int NOT NULL,
  `contenido` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GENERA`
--

CREATE TABLE `GENERA` (
  `id_chat` int NOT NULL,
  `id_tarea` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MULTIMEDIA`
--

CREATE TABLE `MULTIMEDIA` (
  `id` int NOT NULL,
  `tipo` enum('VIDEO','FOTO') DEFAULT NULL,
  `archivo` longblob,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PETICION`
--


-- --------------------------------------------------------



--
-- Estructura de tabla para la tabla `RECIBE`
--

CREATE TABLE `RECIBE` (
  `id_chat` int NOT NULL,
  `id_estudiante` int NOT NULL,
  `id_tarea` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SALIDA`
--

CREATE TABLE `SALIDA` (
  `id` int NOT NULL,
  `tipo` enum('APLICACIÓN/JUEGO','POR_PASOS') DEFAULT NULL,
  `confirmacion_llegada` tinyint(1) DEFAULT NULL,
  `consentimiento` tinyint(1) DEFAULT NULL,
  `lugar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SUPERVISADO_POR`
--

CREATE TABLE `SUPERVISADO_POR` (
  `supervisado` int NOT NULL,
  `supervisor` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TAREA`
--

CREATE TABLE `TAREA` (
  `id` int NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `prioridad` varchar(20) DEFAULT NULL,
  `es_creada_por` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TIENE`
--

CREATE TABLE `TIENE` (
  `id_multimedia` int NOT NULL,
  `id_chat` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `id` INT NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `nombre_usuario` varchar(30) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `color_fondo` varchar(20) DEFAULT NULL,
  `tamaño_letra` varchar(20) DEFAULT NULL,
  `rol` enum('ADMINISTRADOR','ESTUDIANTE','PROFESOR') NOT NULL,
  `pref_contenido` enum('TEXTO', 'AUDIO', 'VIDEO', 'PICTOGRAMAS') DEFAULT 'PICTOGRAMAS' NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`id`, `nombre`, `apellidos`, `nombre_usuario`, `contraseña`, `color_fondo`, `tamaño_letra`, `rol`) 
VALUES

(1, 'Alberto', 'Gracian', 'a', '1', 'azul', '12', 'ADMINISTRADOR'),
(2, 'Julia', 'Hurtado', 'p', '1', 'azul', '12', 'PROFESOR'),
(5, 'Carlos', 'Sanchez', 's1', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#FF5733', '16', 'ESTUDIANTE'),
(6, 'Marta', 'Lopez', 's2', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#33FF57', '17', 'ESTUDIANTE'),
(7, 'Luis', 'Perez', 's3', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#3357FF', '18', 'ESTUDIANTE'),
(8, 'Ana', 'Gomez', 's4', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#57FF33', '19', 'ESTUDIANTE'),
(9, 'Pedro', 'Torres', 's5', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#FF33A1', '20', 'ESTUDIANTE'),
(10, 'Sofia', 'Martinez', 's6', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#A133FF', '21', 'ESTUDIANTE'),
(11, 'Rosa', 'Diaz', 's7', 'a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-a1b2c3-', '#33FFA1', '22', 'ESTUDIANTE'),
(12, 'Diego', 'Castro', 's8', 'a1b2c3-008', '#FFA133', '23', 'ESTUDIANTE'),
(13, 'Laura', 'Hernandez', 's9', 'a1b2c3-009', '#FF5733', '24', 'ESTUDIANTE'),
(14, 'Jorge', 'Moreno', 's10', 'a1b2c3-010', '#33FF57', '25', 'ESTUDIANTE'),
(15, 'Elena', 'Vazquez', 's11', 'a1b2c3-011', '#3357FF', '16', 'ESTUDIANTE'),
(16, 'Raul', 'Navarro', 's12', 'a1b2c3-012', '#57FF33', '17', 'ESTUDIANTE'),
(17, 'Isabel', 'Ruiz', 's13', 'a1b2c3-013', '#FF33A1', '18', 'ESTUDIANTE'),
(18, 'Manuel', 'Ortega', 's14', 'a1b2c3-014', '#A133FF', '19', 'ESTUDIANTE'),
(19, 'Teresa', 'Ramos', 's15', 'a1b2c3-015', '#33FFA1', '20', 'ESTUDIANTE'),
(20, 'Pablo', 'Garrido', 's16', 'a1b2c3-016', '#FFA133', '21', 'ESTUDIANTE'),
(21, 'Carmen', 'Silva', 's17', 'a1b2c3-017', '#FF5733', '22', 'ESTUDIANTE'),
(22, 'Sergio', 'Mendoza', 's18', 'a1b2c3-018', '#33FF57', '23', 'ESTUDIANTE'),
(23, 'Lucia', 'Flores', 's19', 'a1b2c3-019', '#3357FF', '24', 'ESTUDIANTE'),
(24, 'Francisco', 'Campos', 's20', 'a1b2c3-020', '#57FF33', '25', 'ESTUDIANTE'),
(25, 'Beatriz', 'Reyes', 's21', 'a1b2c3-021', '#FF33A1', '16', 'ESTUDIANTE'),
(26, 'Hugo', 'Iglesias', 's22', 'a1b2c3-022', '#A133FF', '17', 'ESTUDIANTE'),
(27, 'Clara', 'Santana', 's23', 'a1b2c3-023', '#33FFA1', '18', 'ESTUDIANTE'),
(28, 'Juan', 'Blanco', 's24', 'a1b2c3-024', '#FFA133', '19', 'ESTUDIANTE'),
(29, 'Alba', 'Luna', 's25', 'a1b2c3-025', '#FF5733', '20', 'ESTUDIANTE'),
(30, 'Victor', 'Salas', 's26', 'a1b2c3-026', '#33FF57', '21', 'ESTUDIANTE'),
(31, 'Noelia', 'Padilla', 's27', 'a1b2c3-027', '#3357FF', '22', 'ESTUDIANTE'),
(32, 'Adrian', 'Gil', 's28', 'a1b2c3-028', '#57FF33', '23', 'ESTUDIANTE'),
(33, 'Paula', 'Fuentes', 's29', 'a1b2c3-029', '#FF33A1', '24', 'ESTUDIANTE'),
(34, 'Rafael', 'Lozano', 's30', 'a1b2c3-030', '#A133FF', '25', 'ESTUDIANTE');

UPDATE `USUARIO` SET pref_contenido = "VIDEO" WHERE id = 5;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `CHAT`
--
ALTER TABLE `CHAT`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emisor` (`emisor`);

--
-- Indices de la tabla `FEEDBACK`
--
ALTER TABLE `FEEDBACK`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `GENERA`
--
ALTER TABLE `GENERA`
  ADD PRIMARY KEY (`id_chat`,`id_tarea`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `MULTIMEDIA`
--
ALTER TABLE `MULTIMEDIA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `PETICION`
--

--
-- Indices de la tabla `RECIBE`
--
ALTER TABLE `RECIBE`
  ADD PRIMARY KEY (`id_chat`,`id_estudiante`,`id_tarea`),
  ADD KEY `id_estudiante` (`id_estudiante`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `SALIDA`
--
ALTER TABLE `SALIDA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `SUPERVISADO_POR`
--
ALTER TABLE `SUPERVISADO_POR`
  ADD PRIMARY KEY (`supervisado`,`supervisor`),
  ADD KEY `supervisor` (`supervisor`);

--
-- Indices de la tabla `TAREA`
--
ALTER TABLE `TAREA`
  ADD PRIMARY KEY (`id`),
  ADD KEY `es_creada_por` (`es_creada_por`);

--
-- Indices de la tabla `TIENE`
--
ALTER TABLE `TIENE`
  ADD PRIMARY KEY (`id_multimedia`,`id_chat`),
  ADD KEY `id_chat` (`id_chat`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `CHAT`
--
ALTER TABLE `CHAT`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `FEEDBACK`
--
ALTER TABLE `FEEDBACK`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `MULTIMEDIA`
--
ALTER TABLE `MULTIMEDIA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `PETICION`
--
ALTER TABLE `PETICION`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `SALIDA`
--
ALTER TABLE `SALIDA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `TAREA`
--
ALTER TABLE `TAREA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CHAT`
--
ALTER TABLE `CHAT`
  ADD CONSTRAINT `CHAT_ibfk_1` FOREIGN KEY (`emisor`) REFERENCES `USUARIO` (`id`);

--
-- Filtros para la tabla `GENERA`
--
ALTER TABLE `GENERA`
  ADD CONSTRAINT `GENERA_ibfk_1` FOREIGN KEY (`id_chat`) REFERENCES `CHAT` (`id`),
  ADD CONSTRAINT `GENERA_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `TAREA` (`id`);

--
-- Filtros para la tabla `RECIBE`
--
ALTER TABLE `RECIBE`
  ADD CONSTRAINT `RECIBE_ibfk_1` FOREIGN KEY (`id_chat`) REFERENCES `CHAT` (`id`),
  ADD CONSTRAINT `RECIBE_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `USUARIO` (`id`),
  ADD CONSTRAINT `RECIBE_ibfk_3` FOREIGN KEY (`id_tarea`) REFERENCES `TAREA` (`id`);

--
-- Filtros para la tabla `SUPERVISADO_POR`
--
ALTER TABLE `SUPERVISADO_POR`
  ADD CONSTRAINT `SUPERVISADO_POR_ibfk_1` FOREIGN KEY (`supervisado`) REFERENCES `USUARIO` (`id`),
  ADD CONSTRAINT `SUPERVISADO_POR_ibfk_2` FOREIGN KEY (`supervisor`) REFERENCES `USUARIO` (`id`);

--
-- Filtros para la tabla `TAREA`
--
ALTER TABLE `TAREA`
  ADD CONSTRAINT `TAREA_ibfk_1` FOREIGN KEY (`es_creada_por`) REFERENCES `USUARIO` (`id`);

--
-- Filtros para la tabla `TIENE`
--
ALTER TABLE `TIENE`
  ADD CONSTRAINT `TIENE_ibfk_1` FOREIGN KEY (`id_multimedia`) REFERENCES `MULTIMEDIA` (`id`),
  ADD CONSTRAINT `TIENE_ibfk_2` FOREIGN KEY (`id_chat`) REFERENCES `CHAT` (`id`);
COMMIT;





--
-- Estructura de tabla para la tabla `SOLICITUD_MATERIAL`
--
CREATE TABLE SOLICITUD_MATERIAL (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `profesor_id` INT NOT NULL,
    `fecha_entrega` DATE NOT NULL,
    `aula` VARCHAR(255) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES USUARIO(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



ALTER TABLE TAREA ADD COLUMN id_solicitud INT, ADD FOREIGN KEY (id_solicitud) REFERENCES SOLICITUD_MATERIAL(id);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MATERIALES_ALMACEN`
--

CREATE TABLE MATERIALES_ALMACEN (
    id_material INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada material
    nombre_material VARCHAR(255) NOT NULL,      -- Nombre del material
    descripcion TEXT,                           -- Descripción opcional del material
    categoria VARCHAR(100) NOT NULL,            -- Categoría del material (ej. Papelería, Tecnología)
    cantidad INT NOT NULL,                      -- Cantidad disponible en el almacén
    fecha_ingreso DATE NOT NULL,                -- Fecha en que el material fue ingresado al almacén
    estado ENUM('Disponible', 'Agotado', 'Dañado') DEFAULT 'Disponible', -- Estado del material
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    id_administrador INT NOT NULL,              -- Para vincular los materiales con el administrador, que es el encargado de gestionarlos
    FOREIGN KEY (id_administrador) REFERENCES USUARIO(id)
);


CREATE TABLE SOLICITUD_MATERIAL_DETALLE (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada fila de la relación
    solicitud_id INT NOT NULL,          -- Relaciona con la tabla SOLICITUD_MATERIAL
    id_material INT NOT NULL,           -- Relaciona con la tabla MATERIALES_ALMACEN
    cantidad_solicitada INT NOT NULL,   -- Cantidad solicitada de cada material
    FOREIGN KEY (solicitud_id) REFERENCES SOLICITUD_MATERIAL(id),
    FOREIGN KEY (id_material) REFERENCES MATERIALES_ALMACEN(id_material)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `MATERIALES_ALMACEN`
--
INSERT INTO MATERIALES_ALMACEN (nombre_material, descripcion, categoria, cantidad, fecha_ingreso, estado, id_administrador
) VALUES
    ('Cuaderno A4', 'Cuaderno de 80 hojas, tamaño A4', 'Papelería', 50, '2024-11-15', 'Disponible', 1),
    ('Lápiz HB', 'Lápiz para escritura general', 'Papelería', 200, '2024-11-16', 'Disponible', 1),
    ('Marcadores', 'Marcadores de colores surtidos', 'Papelería', 30, '2024-11-12', 'Disponible', 1),
    ('Borradores', 'Borradores de goma para lápiz', 'Papelería', 100, '2024-11-10', 'Disponible', 1),
    ('Rotuladores', 'Rotuladores de colores', 'Papelería', 80, '2024-11-08', 'Disponible', 1);


CREATE TABLE TAREA_JUEGO(
  `id` INT AUTO_INCREMENT PRIMARY KEY, 
  `url` VARCHAR(255) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE TAREA_INVENTARIO (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Identificador único de la tarea
    aula VARCHAR(50),                          -- Aula solicitante (por ejemplo, "A")
    estudiante_id INT,   
    solicitud_id INT,                       -- ID del estudiante (relación con otra tabla de estudiantes)
    url_imagen VARCHAR(255),                   -- URL donde se guarda la imagen asociada a la tarea
    screen VARCHAR(255),                       -- Información adicional o campo de texto para "screen"
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), -- Fecha de creación de la tarea
    fecha_fin TIMESTAMP,                        -- Fecha de culminación de la tarea
    estado ENUM('Pendiente', 'En progreso', 'Finalizada') DEFAULT 'Pendiente', -- Estado de la tarea
    prioridad ENUM('ALTA', 'MEDIA', 'BAJA') DEFAULT 'MEDIA',   
    /* CONSTRAINT fk_estudiante FOREIGN KEY (estudiante_id) REFERENCES USUARIO(id), -- Relación con tabla de estudiantes
    CONSTRAINT fk_tarea FOREIGN KEY (id) REFERENCES TAREA(id) -- Relación con tabla */
    FOREIGN KEY (estudiante_id) REFERENCES USUARIO(id), 
    FOREIGN KEY (solicitud_id) REFERENCES SOLICITUD_MATERIAL(id) -- Relación con SOLICITUD_MATERIAL 
);

CREATE TABLE MATERIAL_TAREA (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Identificador único de la entrada
    tarea_id INT NOT NULL,                       -- ID de la tarea en la que se usan los materiales
    id_material INT NOT NULL,                    -- ID del material del almacén
    cantidad_solicitada INT NOT NULL,            -- Cantidad solicitada de este material
    solicitud_id INT,                            -- ID que referencia a la tabla SOLICITUD_MATERIAL
    FOREIGN KEY (tarea_id) REFERENCES TAREA_INVENTARIO(id), -- Relación con TAREA_INVENTARIO
    FOREIGN KEY (id_material) REFERENCES MATERIALES_ALMACEN(id_material), -- Relación con MATERIALES_ALMACÉN
    FOREIGN KEY (solicitud_id) REFERENCES SOLICITUD_MATERIAL(id) -- Relación con SOLICITUD_MATERIAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Tablas nuevas necesarias para las tareas de comandas de comedor:
--
CREATE TABLE AULAS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE MENUS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL,
    imagen_url VARCHAR(255)
);



CREATE TABLE TAREA_COMANDAS (
    alumno_id INT NOT NULL,
    screen VARCHAR(100) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url VARCHAR(100) NOT NULL, 
    FOREIGN KEY (alumno_id) REFERENCES USUARIO(id)
);

--
-- Añadir algunas tuplas de las tablas anteriores para poder hacer pruebas:
--
INSERT INTO AULAS (nombre)
VALUES 
('A'),
('B'),
('C');

INSERT INTO MENUS (nombre, descripcion, imagen_url)
VALUES 
('Menú vegetal', 'Menú vegetal estándar con verdura variada', 'https://content-cocina.lecturas.com/medio/2022/04/27/ensalada-de-garbanzos-con-vegetales-frescos_162a00b3_900x900.jpg'),
('Menú especial carne', 'Menú especial de carne para personas con celiaquía', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/77/be/07/para-los-mas-carnivoros.jpg?w=900&h=500&s=1'),
('Menú pasta', 'Menú de pasta básica', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7GXzkcta4h19yO7T1dWIl778cqQaEM4bYcj_Xdb1LPA6Gxxqv9o5s4YEJnSHwUXRJAvI_1tJHkftUzj9OlOBOIH0zggrwFJiniTUl8k_otBbdifHSpZweacjgYM8LX7m018WVa1fhTMo/s1600/DSCF2863.JPG');

/* INSERT INTO TAREA_COMANDAS (aula_id, menu_id, alumno_id, cantidad)
VALUES 
(1, 1, 3, 3),
(2, 2, 3, 1),
(3, 3, 4, 2); */



--
-- Tablas necesarias para las tareas por pasos:
--

-- Tasks: contiene las tareas (he creado esta otra porque la tabla 'Tarea' y 
-- esta no van a tener los mismos atributos y saldrán errores).
CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE, -- Fecha límite para completar la tarea
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium', -- Prioridad de la tarea
    status ENUM('in_progress', 'completed', 'not_started') DEFAULT 'not_started', -- Estado de la tarea
    student_id INT NOT NULL, -- Identificador del estudiante asociado a la tarea
    image_url VARCHAR(2083), -- Campo para almacenar la URL de la imagen representativa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Steps: contiene los pasos de cada tarea.
CREATE TABLE Steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    `order` INT NOT NULL,
    content TEXT NOT NULL,
    status ENUM('completed', 'not_started') DEFAULT 'not_started',
    audio_url VARCHAR(2083) DEFAULT NULL,
    video_url VARCHAR(2083) DEFAULT NULL,
    pictogram_url VARCHAR(2083) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES Tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Insertar algunas tareas por pasos variadas:
INSERT INTO Tasks (name, description, due_date, priority, status, student_id, image_url)
VALUES
-- Tarea 1: Calentar comida en el microondas
('Calentar comida en el microondas', 
 'Selecciona un recipiente adecuado, colócalo en el microondas, ajusta el tiempo y espera hasta que esté caliente', 
 '2024-12-20', 
 'medium', 
 'in_progress', 
 5, 
 'microondas.png'),

-- Tarea 2: Doblar una camiseta
('Doblar una camiseta', 
 'Coloca la camiseta en una superficie plana y sigue los pasos para doblarla correctamente', 
 '2024-12-21', 
 'low', 
 'not_started', 
 5, 
 'camiseta_manga_larga.png'),

-- Tarea 3: Llenar un vaso de agua
('Llenar un vaso de agua', 
 'Toma un vaso limpio, acércalo al grifo, ábrelo con cuidado y llena el vaso sin derramar', 
 '2024-12-22', 
 'low', 
 'not_started', 
 5, 
 'vaso_agua.png'),

-- Tarea 4: Organizar la mochila
('Organizar la mochila', 
 'Revisa la lista de materiales necesarios y coloca cada objeto en el lugar correcto dentro de la mochila', 
 '2024-12-23', 
 'medium', 
 'not_started', 
 5, 
 'mochila.png'),

-- Tarea 5: Recoger la mesa después de comer
('Recoger la mesa después de comer', 
 'Recoge los platos, cubiertos y vasos usados. Llévalos a la cocina y colócalos en el fregadero', 
 '2024-12-24', 
 'medium', 
 'not_started', 
 5, 
 'sentado_en_la_mesa.png'),

-- Tarea 6: Regar una planta
('Regar una planta', 
 'Toma la regadera, llénala con agua y vierte la cantidad adecuada en la maceta de la planta', 
 '2024-12-25', 
 'low', 
 'not_started', 
 5, 
 'regar.png'),

-- Tarea 7: Lavar los platos
('Lavar los platos', 
 'Recoge los platos sucios, lávalos con esponja y jabón, y enjuágalos bajo el grifo', 
 '2024-12-26', 
 'high', 
 'not_started', 
 5, 
 'lavar_platos.png');




-- Insertar los pasos de las tareas anteriores:
-- Pasos para "Calentar comida en el microondas" (task_id = 1)
INSERT INTO Steps (task_id, `order`, content, status, audio_url, video_url, pictogram_url)
VALUES
(1, 1, 'Abre la puerta del microondas', 'in_progress', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),
(1, 2, 'Coloca el recipiente en el centro del microondas', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),
(1, 3, 'Cierra la puerta del microondas', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),
(1, 4, 'Selecciona el tiempo y pulsa el botón de inicio', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),
(1, 5, 'Espera a que termine el tiempo y abre la puerta', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),
(1, 6, 'Saca el recipiente con cuidado', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/BW1tMNI4C5U?feature=share', 'microondas.png'),

-- Pasos para "Doblar una camiseta" (task_id = 2)
(2, 1, 'Extiende la camiseta sobre una superficie plana', 'not_started', 'audio_example.mp3', 'https://youtu.be/fyO19ONc1SA', 'camiseta_manga_larga.png'),
(2, 2, 'Dobla una de las mangas hacia el centro', 'not_started', 'audio_example.mp3', 'https://youtu.be/fyO19ONc1SA', 'camiseta_manga_larga.png'),
(2, 3, 'Dobla la otra manga hacia el centro', 'not_started', 'audio_example.mp3', 'https://youtu.be/fyO19ONc1SA', 'camiseta_manga_larga.png'),
(2, 4, 'Dobla la parte inferior hacia arriba hasta el cuello', 'not_started', 'audio_example.mp3', 'https://youtu.be/fyO19ONc1SA', 'camiseta_manga_larga.png'),
(2, 5, 'Acomoda la camiseta para que quede uniforme', 'not_started', 'audio_example.mp3', 'https://youtu.be/fyO19ONc1SA', 'camiseta_manga_larga.png'),

-- Pasos para "Llenar un vaso de agua" (task_id = 3)
(3, 1, 'Toma un vaso limpio de la alacena', 'not_started', 'audio_example.mp3', 'https://youtu.be/l-xtmCqouG4', 'vaso_agua.png'),
(3, 2, 'Llévalo hasta el fregadero', 'not_started', 'audio_example.mp3', 'https://youtu.be/l-xtmCqouG4', 'vaso_agua.png'),
(3, 3, 'Abre el grifo de agua con cuidado', 'not_started', 'audio_example.mp3', 'https://youtu.be/l-xtmCqouG4', 'vaso_agua.png'),
(3, 4, 'Llena el vaso hasta la mitad o tres cuartos', 'not_started', 'audio_example.mp3', 'https://youtu.be/l-xtmCqouG4', 'vaso_agua.png'),
(3, 5, 'Cierra el grifo y coloca el vaso en la mesa', 'not_started', 'audio_example.mp3', 'https://youtu.be/l-xtmCqouG4', 'vaso_agua.png'),

-- Pasos para "Organizar la mochila" (task_id = 4)
(4, 1, 'Saca todos los objetos de la mochila', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/IheOI1PuCBE?feature=share', 'mochila.png'),
(4, 2, 'Organiza los útiles por categorías (libros, cuadernos, lápices)', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/IheOI1PuCBE?feature=share', 'mochila.png'),
(4, 3, 'Coloca los objetos más grandes primero', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/IheOI1PuCBE?feature=share', 'mochila.png'),
(4, 4, 'Añade los objetos más pequeños en los bolsillos', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/IheOI1PuCBE?feature=share', 'mochila.png'),
(4, 5, 'Revisa que todo lo necesario esté dentro', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/IheOI1PuCBE?feature=share', 'mochila.png'),

-- Pasos para "Recoger la mesa después de comer" (task_id = 5)
(5, 1, 'Levanta los platos y cubiertos de la mesa', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/juneGP2DC4k?feature=share', 'sentado_en_la_mesa.png'),
(5, 2, 'Llévalos a la cocina', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/juneGP2DC4k?feature=share', 'sentado_en_la_mesa.png'),
(5, 4, 'Revisa si quedó algo en la mesa y recógelo', 'not_started', 'audio_example.mp3', 'https://www.youtube.com/shorts/juneGP2DC4k?feature=share', 'sentado_en_la_mesa.png'),

-- Pasos para "Regar una planta" (task_id = 6)
(6, 1, 'Toma la regadera y llénala con agua', 'not_started', 'audio_example.mp3', 'https://youtu.be/KQ3pJfF3ZiY', 'regar.png'),
(6, 2, 'Lleva la regadera a la planta', 'not_started', 'audio_example.mp3', 'https://youtu.be/KQ3pJfF3ZiY', 'regar.png'),
(6, 3, 'Vierte el agua lentamente sobre la maceta', 'not_started', 'audio_example.mp3', 'https://youtu.be/KQ3pJfF3ZiY', 'regar.png'),
(6, 4, 'Revisa que la planta no esté encharcada', 'not_started', 'audio_example.mp3', 'https://youtu.be/KQ3pJfF3ZiY', 'regar.png'),

-- Pasos para "Lavar los platos" (task_id = 7)
(7, 1, 'Recoge todos los platos sucios de la mesa', 'not_started', 'audio_example.mp3', 'https://youtu.be/pvNv5aMYmDY', 'lavar_platos.png'),
(7, 2, 'Llena el fregadero con agua tibia y un poco de jabón', 'not_started', 'audio_example.mp3', 'https://youtu.be/pvNv5aMYmDY', 'lavar_platos.png'),
(7, 3, 'Toma una esponja y frota los platos con jabón', 'not_started', 'audio_example.mp3', 'https://youtu.be/pvNv5aMYmDY', 'lavar_platos.png'),
(7, 4, 'Enjuaga los platos bajo el grifo hasta que no quede jabón', 'not_started', 'audio_example.mp3', 'https://youtu.be/pvNv5aMYmDY', 'lavar_platos.png'),
(7, 5, 'Coloca los platos limpios en el escurridor para que se sequen', 'not_started', 'audio_example.mp3', 'https://youtu.be/pvNv5aMYmDY', 'lavar_platos.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;