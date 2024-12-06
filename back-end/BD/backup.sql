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

CREATE TABLE `PETICION` (
  `id` int NOT NULL,
  `tipo` enum('FOTOCOPIA','MATERIAL_ESCOLAR','COMANDA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `rol` enum('ADMINISTRADOR','ESTUDIANTE','PROFESOR') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Estructura de tabla para la tabla `SOLICITUD_MATERIAL`
--



--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`id`, `nombre`, `apellidos`, `nombre_usuario`, `contraseña`, `color_fondo`, `tamaño_letra`, `rol`) VALUES
(1, 'Alberto', 'Gracian', 'a', '1', 'azul', '12', 'ADMINISTRADOR'),
(2, 'Julia', 'Hurtado', 'p', '1', 'azul', '12', 'PROFESOR');

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
ALTER TABLE `PETICION`
  ADD PRIMARY KEY (`id`);

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
    estudiante_id INT,                         -- ID del estudiante (relación con otra tabla de estudiantes)
    url_imagen VARCHAR(255),                   -- URL donde se guarda la imagen asociada a la tarea
    screen VARCHAR(255),                       -- Información adicional o campo de texto para "screen"
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación de la tarea
    fecha_fin TIMESTAMP,                        -- Fecha de culminación de la tarea
    estado ENUM('Pendiente', 'En progreso', 'Finalizada') DEFAULT 'Pendiente', -- Estado de la tarea
    prioridad ENUM('ALTA', 'MEDIA', 'BAJA') DEFAULT 'MEDIA', 
    CONSTRAINT fk_estudiante FOREIGN KEY (estudiante_id) REFERENCES USUARIO(id), -- Relación con tabla de estudiantes
    CONSTRAINT fk_tarea FOREIGN KEY (tarea_id) REFERENCES TAREA(id) -- Relación con tabla
);

CREATE TABLE MATERIAL_TAREA (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Identificador único de la entrada
    tarea_id INT NOT NULL,                       -- ID de la tarea en la que se usan los materiales
    id_material INT NOT NULL,                    -- ID del material del almacén
    cantidad_solicitada INT NOT NULL,            -- Cantidad solicitada de este material
    FOREIGN KEY (tarea_id) REFERENCES TAREA_INVENTARIO(id), -- Relación con TAREA_INVENTARIO
    FOREIGN KEY (id_material) REFERENCES MATERIALES_ALMACEN(id_material) -- Relación con MATERIALES_ALMACÉN
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;