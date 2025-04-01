-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         9.1.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
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

-- Volcando estructura para tabla estanislaocarrillodb.clases
CREATE TABLE IF NOT EXISTS `clases` (
  `id_clase` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_materias` int NOT NULL,
  `id_seccion` int NOT NULL,
  `id_anno` int NOT NULL,
  `id_mension` int NOT NULL,
  PRIMARY KEY (`id_clase`) USING BTREE,
  KEY `prof_user` (`id_user`),
  KEY `prof_seccion` (`id_seccion`),
  KEY `prof_materia` (`id_materias`),
  KEY `prof_year` (`id_anno`),
  KEY `prof_mension` (`id_mension`),
  CONSTRAINT `prof_materia` FOREIGN KEY (`id_materias`) REFERENCES `materias` (`id_materia`),
  CONSTRAINT `prof_mension` FOREIGN KEY (`id_mension`) REFERENCES `mensiones` (`id_mension`),
  CONSTRAINT `prof_seccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`),
  CONSTRAINT `prof_user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `prof_year` FOREIGN KEY (`id_anno`) REFERENCES `year` (`id_anno`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.clases: ~1 rows (aproximadamente)
INSERT INTO `clases` (`id_clase`, `id_user`, `id_materias`, `id_seccion`, `id_anno`, `id_mension`) VALUES
	(1, 2, 2, 4, 3, 1);

-- Volcando estructura para tabla estanislaocarrillodb.estudiantes
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id_estudiante` int NOT NULL AUTO_INCREMENT,
  `id_seccion` int NOT NULL,
  `id_user` int NOT NULL,
  `id_year` int NOT NULL,
  `id_mension` int NOT NULL,
  PRIMARY KEY (`id_estudiante`) USING BTREE,
  KEY `secciones` (`id_seccion`) USING BTREE,
  KEY `year` (`id_year`) USING BTREE,
  KEY `estudiante_user` (`id_user`),
  KEY `mension` (`id_mension`),
  CONSTRAINT `estudiante_user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `mension` FOREIGN KEY (`id_mension`) REFERENCES `mensiones` (`id_mension`),
  CONSTRAINT `secciones` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`),
  CONSTRAINT `year` FOREIGN KEY (`id_year`) REFERENCES `year` (`id_anno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.estudiantes: ~1 rows (aproximadamente)
INSERT INTO `estudiantes` (`id_estudiante`, `id_seccion`, `id_user`, `id_year`, `id_mension`) VALUES
	(1, 2, 1, 4, 2);

-- Volcando estructura para tabla estanislaocarrillodb.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `materia` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.materias: ~5 rows (aproximadamente)
INSERT INTO `materias` (`id_materia`, `materia`, `descripcion`) VALUES
	(2, 'Biologia', 'ciencia que estudia a los seres vivos, su origen, evolución y sus propiedades: nutrición, morfogénesis, reproducción, patogenia, etc'),
	(4, 'Quimica', 'Ciencia que estudia tanto la composición, como la estructura y las propiedades de la materia como los cambios que esta experimenta durante las reacciones químicas y su relación con la energía.​'),
	(5, 'Fisica', 'Estudia las leyes del movimiento'),
	(6, 'Ciencias Sociales', 'Está vinculada a las actividades y el comportamiento de los seres humanos, por lo tanto, analizan las manifestaciones de la sociedad, tanto materiales como simbólicas.'),
	(8, 'Orientacion y Convivencia', 'Consiste en brindarle ayuda al estudiante para que logre identificar y superar dificultades que afecten su rendimiento académico.');

-- Volcando estructura para tabla estanislaocarrillodb.mensiones
CREATE TABLE IF NOT EXISTS `mensiones` (
  `id_mension` int NOT NULL AUTO_INCREMENT,
  `mension` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_mension`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.mensiones: ~3 rows (aproximadamente)
INSERT INTO `mensiones` (`id_mension`, `mension`, `descripcion`) VALUES
	(1, 'Informatica', 'Manejar computadoras y SO'),
	(2, 'Administración', 'Administrar datos y betas'),
	(3, 'Contabilidad', 'Llevar registro contable de las cuentas');

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

-- Volcando estructura para tabla estanislaocarrillodb.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.rol: ~3 rows (aproximadamente)
INSERT INTO `rol` (`id_rol`, `rol`) VALUES
	(1, 'Master'),
	(2, 'Profesor'),
	(3, 'Estudiante');

-- Volcando estructura para tabla estanislaocarrillodb.secciones
CREATE TABLE IF NOT EXISTS `secciones` (
  `id_seccion` int NOT NULL AUTO_INCREMENT,
  `seccion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_seccion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.secciones: ~4 rows (aproximadamente)
INSERT INTO `secciones` (`id_seccion`, `seccion`) VALUES
	(1, 'a'),
	(2, 'b'),
	(3, 'c'),
	(4, 'd');

-- Volcando estructura para tabla estanislaocarrillodb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `p_nombre` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `s_nombre` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `p_apellido` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `s_apellido` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `clave` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `usuario` (`cedula`) USING BTREE,
  KEY `rol_usuarios` (`id_rol`),
  CONSTRAINT `rol_usuarios` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `cedula`, `p_nombre`, `s_nombre`, `p_apellido`, `s_apellido`, `telefono`, `email`, `clave`, `id_rol`) VALUES
	(1, '1111111', 'Juan', 'Cho', 'Pintejo', 'Pepiniño', '412-0607829', 'correo8xk@mailv.com', NULL, 3),
	(2, '12906825', 'Jason', 'David', 'Aguilar', 'Morales', '412-0607829', 'aab8v8xk@knmcaav.com', NULL, 2);

-- Volcando estructura para tabla estanislaocarrillodb.year
CREATE TABLE IF NOT EXISTS `year` (
  `id_anno` int NOT NULL AUTO_INCREMENT,
  `anno` varchar(10) COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id_anno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.year: ~6 rows (aproximadamente)
INSERT INTO `year` (`id_anno`, `anno`) VALUES
	(1, '1er'),
	(2, '2do'),
	(3, '3ro'),
	(4, '4to'),
	(5, '5to'),
	(6, '6to');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
