-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
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
CREATE DATABASE IF NOT EXISTS `estanislaocarrillodb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `estanislaocarrillodb`;

-- Volcando estructura para tabla estanislaocarrillodb.clases
CREATE TABLE IF NOT EXISTS `clases` (
  `id_clase` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_materias` int(11) NOT NULL,
  `id_seccion` int(11) NOT NULL,
  `id_anno` int(11) NOT NULL,
  `id_mension` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.clases: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.estudiantes
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id_estudiante` int(11) NOT NULL AUTO_INCREMENT,
  `id_seccion` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_year` int(11) NOT NULL,
  `id_mension` int(11) NOT NULL,
  PRIMARY KEY (`id_estudiante`) USING BTREE,
  KEY `secciones` (`id_seccion`) USING BTREE,
  KEY `year` (`id_year`) USING BTREE,
  KEY `estudiante_user` (`id_user`),
  KEY `mension` (`id_mension`),
  CONSTRAINT `estudiante_user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `mension` FOREIGN KEY (`id_mension`) REFERENCES `mensiones` (`id_mension`),
  CONSTRAINT `secciones` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`),
  CONSTRAINT `year` FOREIGN KEY (`id_year`) REFERENCES `year` (`id_anno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.estudiantes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.evaluaciones
CREATE TABLE IF NOT EXISTS `evaluaciones` (
  `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `evaluacion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_evaluacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.evaluaciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.lapso
CREATE TABLE IF NOT EXISTS `lapso` (
  `id_lapso` int(11) NOT NULL AUTO_INCREMENT,
  `lapso` varchar(50) NOT NULL,
  PRIMARY KEY (`id_lapso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.lapso: ~3 rows (aproximadamente)
INSERT INTO `lapso` (`id_lapso`, `lapso`) VALUES
	(1, '1er lapso'),
	(2, '2do lapso'),
	(3, '3er lapso');

-- Volcando estructura para tabla estanislaocarrillodb.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `materia` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.materias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.mensiones
CREATE TABLE IF NOT EXISTS `mensiones` (
  `id_mension` int(11) NOT NULL AUTO_INCREMENT,
  `mension` varchar(255) NOT NULL,
  PRIMARY KEY (`id_mension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.mensiones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id_notas` int(11) NOT NULL AUTO_INCREMENT,
  `id_clase` int(11) DEFAULT NULL,
  `evaluacion` int(11) NOT NULL,
  `estudiante` int(11) NOT NULL,
  `nota` varchar(4) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `id_lapso` int(11) NOT NULL,
  PRIMARY KEY (`id_notas`),
  KEY `foreig_clase` (`id_clase`),
  KEY `foreig_evaluacion` (`evaluacion`),
  KEY `foreig_alum` (`estudiante`),
  KEY `foreig_lapso` (`id_lapso`) USING BTREE,
  CONSTRAINT `foreig_alum` FOREIGN KEY (`estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `foreig_clase` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id_clase`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `foreig_evaluacion` FOREIGN KEY (`evaluacion`) REFERENCES `evaluaciones` (`id_evaluacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `foreig_lapso` FOREIGN KEY (`id_lapso`) REFERENCES `lapso` (`id_lapso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.notas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estanislaocarrillodb.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.rol: ~3 rows (aproximadamente)
INSERT INTO `rol` (`id_rol`, `rol`) VALUES
	(1, 'Master'),
	(2, 'Profesor'),
	(3, 'Estudiante');

-- Volcando estructura para tabla estanislaocarrillodb.secciones
CREATE TABLE IF NOT EXISTS `secciones` (
  `id_seccion` int(11) NOT NULL AUTO_INCREMENT,
  `seccion` varchar(1) NOT NULL,
  PRIMARY KEY (`id_seccion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.secciones: ~6 rows (aproximadamente)
INSERT INTO `secciones` (`id_seccion`, `seccion`) VALUES
	(1, 'A'),
	(2, 'B'),
	(3, 'C'),
	(4, 'D'),
	(5, 'E'),
	(6, 'F');

-- Volcando estructura para tabla estanislaocarrillodb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) NOT NULL,
  `p_nombre` varchar(255) NOT NULL,
  `s_nombre` varchar(255) NOT NULL,
  `p_apellido` varchar(255) NOT NULL,
  `s_apellido` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `usuario` (`cedula`) USING BTREE,
  KEY `rol_usuarios` (`id_rol`),
  CONSTRAINT `rol_usuarios` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.usuarios: ~1 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `cedula`, `p_nombre`, `s_nombre`, `p_apellido`, `s_apellido`, `telefono`, `email`, `clave`, `id_rol`) VALUES
	(1, 'admin', 'Estanislao', '', 'Carrillo', '', '02712444822', 'wg4tb8v8xk@kav.com', '$2b$10$.J8umeq/nPV6ajCQ1Nw9LOb2DwsvnOq.DTtpMF9ZkcRQEJ9NvtikK', 1);

-- Volcando estructura para tabla estanislaocarrillodb.year
CREATE TABLE IF NOT EXISTS `year` (
  `id_anno` int(11) NOT NULL AUTO_INCREMENT,
  `anno` varchar(10) NOT NULL,
  PRIMARY KEY (`id_anno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
