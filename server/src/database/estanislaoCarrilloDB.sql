-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         9.1.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para estanislaocarrillodb
CREATE DATABASE IF NOT EXISTS `estanislaocarrillodb` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `estanislaocarrillodb`;

-- Volcando estructura para tabla estanislaocarrillodb.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` int NOT NULL AUTO_INCREMENT,
  `comentario` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `archivo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT (0),
  `persona_id` int NOT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `persona_id` (`persona_id`),
  CONSTRAINT `Comentarios_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `estudiantes` (`id_estudiante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.comentarios: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.estudiantes
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id_estudiante` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(10) COLLATE utf8mb3_spanish_ci NOT NULL,
  `primer_nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `segundo_nombre` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `primer_apellido` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `segundo_apellido` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `foto_perfil` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `seccion` int DEFAULT NULL,
  PRIMARY KEY (`id_estudiante`) USING BTREE,
  UNIQUE KEY `correo` (`correo`),
  KEY `secciones` (`seccion`),
  CONSTRAINT `secciones` FOREIGN KEY (`seccion`) REFERENCES `secciones` (`id_seccion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.estudiantes: ~1estudiantesestudiantes rows (aproximadamente)
INSERT INTO `estudiantes` (`id_estudiante`, `cedula`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `correo`, `telefono`, `foto_perfil`, `seccion`) VALUES
	(1, '1234567', 'antonio', 'jose', 'matheus', 'contreras', 'mail@mail.com', '041233333333', '', NULL);

-- Volcando estructura para tabla estanislaocarrillodb.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `materia` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.materias: ~8 rows (aproximadamente)
INSERT INTO `materias` (`id_materia`, `materia`, `descripcion`) VALUES
	(1, 'Matematica', 'Ciencia formal que, partiendo de axiomas y siguiendo el razonamiento lógico, estudia las propiedades y relaciones entre entidades abstractas como números, figuras geométricas o símbolos.'),
	(2, 'Biologia', 'ciencia que estudia a los seres vivos, su origen, evolución y sus propiedades: nutrición, morfogénesis, reproducción, patogenia, etc'),
	(3, 'Ingles', 'Es una lengua germánica occidental que surgió en los reinos anglosajones de Inglaterra y se extendió hasta el Norte en lo que se convertiría en el sudeste de Escocia, bajo la influencia del Reino de Northumbria.'),
	(4, 'Quimica', 'Ciencia que estudia tanto la composición, como la estructura y las propiedades de la materia como los cambios que esta experimenta durante las reacciones químicas y su relación con la energía.​'),
	(5, 'Fisica', 'al q tiene q ver con las interecciones del los objrods'),
	(6, 'Ciencias Sociales', 'Está vinculada a las actividades y el comportamiento de los seres humanos, por lo tanto, analizan las manifestaciones de la sociedad, tanto materiales como simbólicas.'),
	(7, 'Geografia', 'Es la ciencia que se encarga de la descripción de la Tierra, por lo tanto, estudia el medio ecológico, las sociedades que habitan en él y las regiones que se forman al producirse esta relación.'),
	(8, 'Orientacion y Convivencia', 'Consiste en brindarle ayuda al estudiante para que logre identificar y superar dificultades que afecten su rendimiento académico.');

-- Volcando estructura para tabla estanislaocarrillodb.mensiones
CREATE TABLE IF NOT EXISTS `mensiones` (
  `id_mension` int NOT NULL,
  `mension` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_mension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.mensiones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id_notas` int NOT NULL AUTO_INCREMENT,
  `materia` int NOT NULL DEFAULT (0),
  `evaluacion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `estudiante` int NOT NULL,
  `nota` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_notas`),
  KEY `materia` (`materia`),
  KEY `FK_notas_estudiantes` (`estudiante`),
  CONSTRAINT `FK_notas_estudiantes` FOREIGN KEY (`estudiante`) REFERENCES `estudiantes` (`id_estudiante`),
  CONSTRAINT `materia` FOREIGN KEY (`materia`) REFERENCES `materias` (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.notas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.profesores
CREATE TABLE IF NOT EXISTS `profesores` (
  `id_prof` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `p_nombre` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `s_nombre` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `p_apellido` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `s_apellido` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `foto_perfil` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_prof`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.profesores: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.prof_materia
CREATE TABLE IF NOT EXISTS `prof_materia` (
  `id` int NOT NULL,
  `id_profesor` int NOT NULL,
  `id_materia` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IdProfesor` (`id_profesor`),
  KEY `IdMateria` (`id_materia`),
  CONSTRAINT `IdMateria` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`),
  CONSTRAINT `IdProfesor` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_prof`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.prof_materia: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.prof_seccion
CREATE TABLE IF NOT EXISTS `prof_seccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_profespor` int NOT NULL DEFAULT '0',
  `id_seccion` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `profesor` (`id_profespor`),
  KEY `seccion` (`id_seccion`),
  CONSTRAINT `profesor` FOREIGN KEY (`id_profespor`) REFERENCES `profesores` (`id_prof`),
  CONSTRAINT `seccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.prof_seccion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.pubicacioncomentarios
CREATE TABLE IF NOT EXISTS `pubicacioncomentarios` (
  `id_pubcomen` int NOT NULL AUTO_INCREMENT,
  `publicacion_id` int NOT NULL,
  `comentario_id` int NOT NULL,
  PRIMARY KEY (`id_pubcomen`),
  KEY `comentario_id` (`comentario_id`),
  KEY `publicacion_id` (`publicacion_id`),
  CONSTRAINT `PubicacionComentarios_ibfk_1` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id_comentario`),
  CONSTRAINT `PubicacionComentarios_ibfk_2` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id_publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.pubicacioncomentarios: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.publicaciones
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id_publicacion` int NOT NULL AUTO_INCREMENT,
  `publicacion` varchar(512) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `archivo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `seccion_id` int NOT NULL,
  `profesor_id` int NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `seccion_id` (`seccion_id`),
  KEY `persona_id` (`profesor_id`) USING BTREE,
  CONSTRAINT `FK_publicaciones_profesores` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id_prof`),
  CONSTRAINT `Publicaciones_ibfk_3` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id_seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.publicaciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.rol: ~3 rows (aproximadamente)
INSERT INTO `rol` (`id_rol`, `rol`) VALUES
	(1, 'Estudiante'),
	(2, 'Profesor'),
	(3, 'Master');

-- Volcando estructura para tabla estanislaocarrillodb.secciones
CREATE TABLE IF NOT EXISTS `secciones` (
  `id_seccion` int NOT NULL AUTO_INCREMENT,
  `seccion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `id_mension` int DEFAULT NULL,
  PRIMARY KEY (`id_seccion`),
  KEY `mensiones` (`id_mension`),
  CONSTRAINT `mensiones` FOREIGN KEY (`id_mension`) REFERENCES `mensiones` (`id_mension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.secciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `clave` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`),
  KEY `rol_usuarios` (`id_rol`),
  CONSTRAINT `rol_usuarios` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.usuarios: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
