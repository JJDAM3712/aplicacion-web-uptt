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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.clases: ~6 rows (aproximadamente)
INSERT INTO `clases` (`id_clase`, `id_user`, `id_materias`, `id_seccion`, `id_anno`, `id_mension`) VALUES
	(6, NULL, 4, 4, 4, 3),
	(9, 13, 2, 5, 2, 2),
	(10, 22, 6, 2, 2, 2),
	(11, 24, 10, 3, 2, 3),
	(12, 11, 5, 4, 3, 3),
	(13, 2, 5, 3, 2, 2),
	(14, 22, 10, 2, 4, 2),
	(15, 29, 8, 1, 4, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.estudiantes: ~80 rows (aproximadamente)
INSERT INTO `estudiantes` (`id_estudiante`, `id_seccion`, `id_user`, `id_year`, `id_mension`) VALUES
	(2, 2, 5, 4, 3),
	(11, 1, 21, 4, 2),
	(15, 5, 30, 1, 3),
	(16, 1, 31, 1, 2),
	(17, 1, 32, 1, 2),
	(18, 2, 33, 1, 2),
	(19, 2, 34, 1, 2),
	(20, 3, 35, 1, 2),
	(21, 4, 36, 1, 2),
	(22, 3, 37, 1, 2),
	(23, 4, 38, 1, 2),
	(24, 1, 39, 1, 3),
	(25, 2, 40, 1, 3),
	(26, 3, 41, 1, 3),
	(27, 4, 42, 1, 3),
	(28, 1, 43, 1, 1),
	(29, 1, 44, 2, 2),
	(30, 2, 45, 2, 2),
	(31, 1, 46, 2, 1),
	(32, 3, 47, 2, 2),
	(33, 1, 48, 2, 1),
	(34, 1, 49, 3, 2),
	(35, 1, 50, 2, 1),
	(36, 2, 51, 2, 2),
	(37, 3, 52, 2, 2),
	(38, 4, 53, 2, 2),
	(39, 1, 54, 2, 3),
	(40, 2, 55, 2, 3),
	(41, 3, 56, 2, 3),
	(42, 3, 57, 2, 3),
	(43, 3, 58, 2, 3),
	(44, 4, 59, 2, 3),
	(45, 2, 60, 2, 1),
	(46, 3, 61, 2, 1),
	(47, 4, 62, 2, 1),
	(48, 4, 63, 2, 1),
	(49, 1, 64, 3, 2),
	(50, 2, 65, 3, 2),
	(51, 3, 66, 3, 2),
	(52, 4, 67, 3, 2),
	(53, 2, 68, 3, 2),
	(54, 1, 69, 3, 3),
	(55, 2, 70, 3, 3),
	(56, 3, 71, 3, 3),
	(57, 4, 72, 3, 3),
	(58, 1, 73, 3, 1),
	(59, 2, 74, 3, 1),
	(60, 3, 75, 3, 1),
	(61, 4, 76, 3, 1),
	(62, 4, 77, 3, 1),
	(63, 1, 78, 4, 2),
	(64, 1, 79, 4, 3),
	(65, 1, 80, 4, 1),
	(66, 2, 81, 4, 2),
	(67, 2, 82, 4, 1),
	(68, 3, 83, 4, 2),
	(69, 3, 84, 4, 1),
	(70, 3, 85, 4, 3),
	(71, 3, 86, 4, 1),
	(72, 4, 87, 4, 2),
	(73, 4, 88, 4, 3),
	(74, 4, 89, 4, 1),
	(75, 1, 90, 5, 2),
	(76, 1, 91, 6, 2),
	(77, 2, 92, 5, 2),
	(78, 2, 93, 6, 2),
	(79, 3, 94, 5, 2),
	(80, 3, 95, 6, 2),
	(81, 4, 96, 5, 2),
	(82, 4, 97, 6, 2),
	(83, 1, 98, 5, 3),
	(84, 1, 99, 6, 3),
	(85, 2, 100, 5, 3),
	(86, 2, 101, 6, 3),
	(87, 3, 102, 5, 3),
	(88, 4, 103, 5, 3),
	(89, 4, 104, 5, 3),
	(90, 4, 105, 6, 3),
	(91, 3, 106, 6, 3),
	(92, 1, 107, 5, 1),
	(93, 1, 108, 4, 1);

-- Volcando estructura para tabla estanislaocarrillodb.evaluaciones
CREATE TABLE IF NOT EXISTS `evaluaciones` (
  `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `evaluacion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_evaluacion`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.evaluaciones: ~4 rows (aproximadamente)
INSERT INTO `evaluaciones` (`id_evaluacion`, `evaluacion`) VALUES
	(2, 'EXPOCISION'),
	(3, 'CARTELERA'),
	(10, 'LAMINA GRUPAL'),
	(13, 'EXAMEN ESCRITA');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.materias: ~6 rows (aproximadamente)
INSERT INTO `materias` (`id_materia`, `materia`, `descripcion`) VALUES
	(2, 'BIOLOGIA', 'CIENCIA QUE ESTUDIA A LOS SERES VIVOS, SU ORIGEN, EVOLUCIÓN Y SUS PROPIEDADES: NUTRICIÓN, MORFOGÉNESIS, REPRODUCCIÓN, PATOGENIA, ETC'),
	(4, 'QUIMICA', 'CIENCIA QUE ESTUDIA TANTO LA COMPOSICIÓN, COMO LA ESTRUCTURA Y LAS PROPIEDADES DE LA MATERIA COMO LOS CAMBIOS QUE ESTA EXPERIMENTA DURANTE LAS REACCIONES QUÍMICAS Y SU RELACIÓN CON LA ENERGÍA.'),
	(5, 'FISICA', 'ESTUDIA LAS LEYES DEL MOVIMIENTO'),
	(6, 'CIENCIAS SOCIALES', 'ESTÁ VINCULADA A LAS ACTIVIDADES Y L COMPORTAMIENTO DE LOS SERES HUMANOS, POR LO TANTO, ANALIZAN LAS MANIFESTACIONES DE LA SOCIEDAD, TANTO MATERIALES COMO SIMBÓLICAS.'),
	(8, 'ORIENTACION Y CONVIVENCIA', 'CONSISTE EN BRINDARLE AYUDA AL ESTUDIANTE PARA QUE LOGRE IDENTIFICAR Y SUPERAR DIFICULTADES QUE AFECTEN SU RENDIMIENTO ACADÉMICO.'),
	(10, 'MATEMATICA', 'SUMAR RESTAS');

-- Volcando estructura para tabla estanislaocarrillodb.mensiones
CREATE TABLE IF NOT EXISTS `mensiones` (
  `id_mension` int(11) NOT NULL AUTO_INCREMENT,
  `mension` varchar(255) NOT NULL,
  PRIMARY KEY (`id_mension`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.mensiones: ~3 rows (aproximadamente)
INSERT INTO `mensiones` (`id_mension`, `mension`) VALUES
	(1, 'INFORMATICA '),
	(2, 'ADMINISTRACIÓN'),
	(3, 'CONTABILIDAD ');

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.notas: ~8 rows (aproximadamente)
INSERT INTO `notas` (`id_notas`, `id_clase`, `evaluacion`, `estudiante`, `nota`, `fecha`, `comentario`, `id_lapso`) VALUES
	(26, 15, 3, 65, '15', NULL, NULL, 1),
	(27, 15, 3, 93, '19', NULL, NULL, 1),
	(28, 15, 13, 65, '20', NULL, NULL, 1),
	(29, 15, 13, 93, '17', NULL, NULL, 1),
	(30, 15, 13, 65, '20', NULL, NULL, 1),
	(31, 15, 13, 93, '19', NULL, NULL, 1),
	(32, 15, 2, 65, '20', NULL, NULL, 2),
	(33, 15, 2, 93, '19', NULL, NULL, 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla estanislaocarrillodb.usuarios: ~89 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `cedula`, `p_nombre`, `s_nombre`, `p_apellido`, `s_apellido`, `telefono`, `email`, `clave`, `id_rol`) VALUES
	(2, '12906825', 'YONSONS', 'JAIMEA', 'AGUILERA', 'MOLARES', '4120607829', 'A@KNMCAAV.COM', NULL, 2),
	(4, '318141', 'Jason', 'David', 'Aguilar', 'Morales', '412-0607829', 'wg4tb8v8xk@kav.com', '$2b$10$.J8umeq/nPV6ajCQ1Nw9LOb2DwsvnOq.DTtpMF9ZkcRQEJ9NvtikK', 1),
	(5, '47744889', 'Juan', 'Cho', 'Pintejo', 'Pepiniño', '412-0607829', 'correo8xk@mailv.com', NULL, 3),
	(11, '25863000', 'CHAMO', 'MAURAM', 'JHONSONS', 'MORALE', '4120607829', 'MARQ@GMAIL.CO', NULL, 2),
	(13, '1234567', 'WILSON', 'DANIEL', 'GARCIA', 'MARQUEZ', '02712492863', 'MARQUEZ@GMAIL.COM', NULL, 2),
	(21, '27512863', 'JASON', 'DAVID', 'AGUILAR', 'MORALES', '02712492863', 'ELECTRONICOQ@MAIL.COM', NULL, 3),
	(22, '588988', 'ASD', 'ASD', 'AASD', 'ASDAS', '1233', 'A@A', NULL, 2),
	(24, '22234123', 'JOSE', 'JOSE', 'MENDEZ', 'MENDEZ', '1234123123', '41ASD@ADSA', NULL, 2),
	(26, '12637672', 'JOSE', 'JOSE', 'MENDEZ', 'MENDEZ', '1234123123', 'A111@A', NULL, 2),
	(27, '98928559', 'CARLOS', 'CARLOS', 'PEREZ', 'PEREZ', '125588', '12313@SAD', NULL, 2),
	(29, '123999', 'JOSE', 'JOSE', 'MENDEZ', 'MENDEZ', '05474548', 'JOSE@GMAIL.COM', NULL, 2),
	(30, '1234444', 'JOSE', 'CARLOS', 'MENDEZ', 'PEREZ', '48558522', 'JOSEC@ARLOS', NULL, 3),
	(31, '11448774', 'JUAN', 'JUAN', 'GREYSON', 'GREYSON', '1235888', '111@111', NULL, 3),
	(32, '111111', 'PEDRO', 'PEDRO', 'PEPEPE', 'PEPEPE', '11111111', '1111@11111', NULL, 3),
	(33, '11111122', 'ANDRES', 'ANDRES', 'GARCIA', 'GARCIA', '1122222', 'ASD@DSE', NULL, 3),
	(34, '1231231', 'CARMEN', 'CARMEN', 'MARI', 'MARI', '112318', 'HASJDHA@HASLDJ', NULL, 3),
	(35, '8884329', 'KATHERIN', 'KATHERIN', 'WAYNE', 'WAYNE', '12313', 'ASDA@3313', NULL, 3),
	(36, '16516', 'KABUTO', 'KABUTO', 'SENSEI', 'SENSEI', '12313123', 'SADKJ@KASNJDL', NULL, 3),
	(37, '8778789', 'LUIS', 'LUIS', 'FERNADEZ', 'FERNADEZ', '1264666', 'AKJSDK@AKSJDK', NULL, 3),
	(38, '468465', 'JESSICA', 'JESSICA', 'RUIZ', 'RUIZ', '2131414', '123@ASD', NULL, 3),
	(39, '124214123', 'JULIO', 'JULIO', 'PEREZ', 'PEREZ', '12313141', 'A@SDA', NULL, 3),
	(40, '1231355', 'STANLIN', 'STANLIN', 'COMUNIS', 'COMUNIS', '1231455', 'ASDASD@ADAD', NULL, 3),
	(41, '1231414', 'DANIEL', 'DANIEL', 'NUNEZ', 'NUNEZ', '1321412', 'SADA@ASD', NULL, 3),
	(42, '14123124', 'JOSUE', 'JOSUE', 'MARZIO', 'MARZIO', '231314123', 'ASDAD@ASD', NULL, 3),
	(43, '4556416', 'RODOLFO', 'RODOLFO', 'ELRE', 'NOATRO', '123131455', 'QWE@ASD', NULL, 3),
	(44, '4789033', 'JINX', 'POWDER', 'ARCANE', 'ARCANE', '23412455', 'ASDAD@ASDSAD', NULL, 3),
	(45, '1231412431', 'CAIT', 'PIUPIU', 'LESBIS', 'LESBIS', '41564561', 'FVBJKADHSSS@FDASBHJK', NULL, 3),
	(46, '3241789', 'BJKDFLA', 'FJKDB', 'JDFBNKAL', 'BJKASD', '34890', 'HJKLDVS@NJHIOGC', NULL, 3),
	(47, '53478920', 'JKFNL', 'GFKNJL', 'FGVNJKL', 'FGENKL', '4537890', 'DFHUJSGI@H890TGF34', NULL, 3),
	(48, '166456', 'DFGBNJKOS', 'JBNFGE', 'DJKSFNO', 'DFGJHNIO', '380279', 'FG@HJIONDF', NULL, 3),
	(49, '1234512134', 'JKNF', 'NDF', 'DKJNF', 'KDSNF', '123189', 'JNSKDF@NJLAKSD', NULL, 3),
	(50, '293801784', 'NODJKFB', 'DFBHK', 'DBFI', 'DPTOGKP', '1293181', 'DBGF@ANSKJDHN', NULL, 3),
	(51, '12368', 'SNDKLS', 'SJHDBK', 'JBFKA', 'PFKPGG', '2341515', '123@SADRR', NULL, 3),
	(52, '1254123', 'ASDASD', 'ASDA', 'ASDA', 'ASDAD', '16418161', 'ASDA@ASDAS', NULL, 3),
	(53, '123123114', 'DFUHK', 'SDFKJN', 'DJFNKS', 'JSDFK', '45666', 'JFDHKLJ@JKSHD', NULL, 3),
	(54, '01943193', 'SOLJNLD', 'KXFNL', 'LNFLGL', 'NFLNL', '19023123', 'JNASOLND@NFLNL', NULL, 3),
	(55, '1231940194', 'MSDLFL', 'LNGNKLN', 'MDLFMLL', 'NLDNGFL', '213901', 'ASDAD@BNJKGT', NULL, 3),
	(56, '12314124311', 'VKDNFK', 'QWEQWWE', 'ASGQWE', 'QWEQSA', '168462', 'TADAS@ASDAS', NULL, 3),
	(57, '47589745', 'JGOOP', 'NJFOLN', 'NDNFNK', 'ASDAD', '1123141', 'ASDA@BFGI', NULL, 3),
	(58, '151213123', 'ASDASD', '123', '521SAD', 'ASD4', '145161', 'ASDAD@ASDASD', NULL, 3),
	(59, '123123123', 'SADASD', '51SDAZD', '123SADAD', 'SADASDASD', '123141244', 'ASDAS@ASDERF2', NULL, 3),
	(60, '12312', 'ASDAS', 'ASDA', 'ASDAD', 'ADASD', '51234122', 'ADA@JLGHJGH', NULL, 3),
	(61, '1231413413', 'ASDASD', 'ASDAD', 'ASDADA', 'ASDASD', '123141213', '♠ASD@ASDRR', NULL, 3),
	(62, '265699', 'ASDAOKO', 'KMLM', 'IOJIN', 'OOJOJO', '41661666', 'JOSEASD@LASJD', NULL, 3),
	(63, '18949686', 'KIOPJGJ', 'JKPKOPOÑKD', 'KJLFJL', 'JKLJSF', '123141555', 'ASDA@ASDAD', NULL, 3),
	(64, '141213123', 'ASDADJL', 'JOJLHKÑLK', 'SLMÑG,9ASDH', 'NXLFNLOM', '5416481816', 'SDA@4LGHJKL', NULL, 3),
	(65, '407801194', 'SADAD', 'NDKSADA', 'ASDASD', 'ASDADASD', '1683123', 'ASDTTT@12313', NULL, 3),
	(66, '168744', 'ANLGJFLGJ', 'UJDIVNM.SN', 'LNGOIDNOL', 'NFLNLO', '49494494', '13SDA@ADAD3', NULL, 3),
	(67, '5648448', 'ADASDIJ', 'OHGJDF', 'JDGOK', 'MGOMKODF', '29789898', 'ASDAD@ADASD', NULL, 3),
	(68, '12312355', 'ASDA', 'ATDS', 'JKGOIJSÑ', 'MLDGML', '51618168', 'AASDAGHH@MNBL', NULL, 3),
	(69, '4464865', 'DNAKBNDK', 'ASDMALKMG', 'OJPGMN', ',MNFGKL', '218488', 'DQWE@ASDMKLA', NULL, 3),
	(70, '62651614', 'NJGNJKNK', 'JKDGSDN', 'IDGJNOSLIJD', 'IKDNGLDIF', '9813135', 'OJK@SMND', NULL, 3),
	(71, '5184866', 'GLSKDMF', 'KMFIKSMF', 'ASDAKMO', 'KDGIDSFJ', '488786', 'DBFKAS@ANSMKD', NULL, 3),
	(72, '1456161', 'GMKMSKL', 'LGKNML', 'MBVGÑ', 'ASDA13', '123124144', 'ASDA@DAD', NULL, 3),
	(73, '46131355', 'GJNFKLSDN', 'JDNGFJ', 'JFNKS', 'JNFJQPO', '391804', 'ADAD@KGHJ', NULL, 3),
	(74, '141231235', 'SAD', 'HM,Ñ', 'KGO', 'GVBUJB', '18131818', 'SASDF@ASDAT', NULL, 3),
	(75, '64414513412', 'SDASDA', 'HOOG,O', 'ASDASD', 'JOKQSAD', '051818', 'OJOHG@NMBKD', NULL, 3),
	(76, '5926', 'ASDASD', 'KLHOKHOK', 'JMHO', 'ASDT', '626229', 'ADOKGH@MKG', NULL, 3),
	(77, '118878', '5N GUJ', 'ASDAD', 'NJDFN', 'ADA4', '1848123', 'ASTVBNB@ASDIKNG', NULL, 3),
	(78, '1985959', 'TGNS', 'OHKMO', 'KMGGMI', 'OANGK', '515995', 'HOKON@NMIGNM', NULL, 3),
	(79, '1231237787', 'ASNOLHIO', 'NBOO', 'HNMOM', 'NIGOSAD', '2955559598', 'POJHT@LBNOLVC', NULL, 3),
	(80, '195598', 'LHLMGLD', 'NLGNL', 'HPKLP', 'NLKNG', '9898556', 'IJIBJB@MBOL', NULL, 3),
	(81, '5464', 'GNDL', 'KGKJ', 'IHJIJDF', 'IGJM', '1815151', 'ADJKAJ@LDKFO', NULL, 3),
	(82, '39494949', 'FKNVL', 'DAS', 'ASDF', 'KOV', '1561232', 'ADG@HKJ', NULL, 3),
	(83, '1844848', 'FODIJF', 'IGJOJSF', 'BOIU', 'BNFNUOI', '95249', 'JBIJ@OGJKBO', NULL, 3),
	(84, '48499', 'NGLSNMFL', '| GLKSND', 'NGLKS', 'NVIOI', '1811618', 'ASGJK@KGJWW', NULL, 3),
	(85, '1082370', 'DJFLKNSDLFN', 'DJGJDLSJF', 'NLGNSLDF', 'NGLSOJFO', '5611646', 'GFKNA@GKNMLÑAS', NULL, 3),
	(86, '803294', 'GLNMLSD', 'DJNFLOJ', 'SAD', 'GKMSM', '031589', 'ADASOK@GOK', NULL, 3),
	(87, '12313809', 'DKLFLA', 'KDFJL', 'DKJFL', 'PKSOK', '6511949', 'AFI@GOO', NULL, 3),
	(88, '283091803', 'DHNFGOS', 'NFN', 'NDNFK', 'NDFKLNSK', '12989541', 'NJFAO@NSIED', NULL, 3),
	(89, '49498', 'FGNKINDF', 'NGKDNFK', 'NDKJGFNKS', 'JDGFNK', '01481894', 'FK@ASDM', NULL, 3),
	(90, '848648', 'FNKASDNF', 'JDGNFNK', 'JDNFKS', 'JDFNKJ', '12398', 'ASJNDLAJ@GNIS', NULL, 3),
	(91, '9023402', 'KMDTKMSM', 'MDGFLKSM', 'MVLSKDM', 'MKLDFMSL', '30405', 'MMDFLP@ANSDOIA', NULL, 3),
	(92, '123140', 'DMFLM', 'DFLSJFL', 'KDFNMLW', 'MFLSDAMFK', '34991', 'DSMFM@GHMO', NULL, 3),
	(93, '81273901803', 'HDFHI', 'DJFLDSJ', 'DNGFLK', 'GNSND', '123481', 'NDLGN@ASDO', NULL, 3),
	(94, '456466', 'FDJFOPI', 'NGSI', 'GNIS', 'NGI', '1203141', 'ASMDMAQ@ASDM', NULL, 3),
	(95, '1230923', 'NFLKNN', 'NNKNK', 'OKOPFK', 'NVO0PSD', '1518', 'SDAD@ADAS', NULL, 3),
	(96, '485023984', 'NDOFJO', 'DNFLKN', 'MDLFOL', 'JFNGO', '611651', 'A@S', NULL, 3),
	(97, '13445123', 'DADK', 'NLNDFMLKDNF', 'KGLDKFN', 'DFNLD', '1241234', 'ASDA@GNLS', NULL, 3),
	(98, '9820384', 'DMFWJS', 'MDLKGFNSWL', 'DNGFSOL', 'NDLFGNSL', '1234115', 'ASDA@ASDA', NULL, 3),
	(99, '12313564', 'ADA', 'RM', 'LMGÑ', 'DOGJP', '12300', 'JFAP@ASDA', NULL, 3),
	(100, '13141', 'DNFLL', 'KGMFLK', 'KDFGL', 'KDFML', '39810294', 'JAFOPA@AKSNDM', NULL, 3),
	(101, '99128301830', 'HSDKJFH', 'HSFNK', 'DJFK', 'DFGHK', '5418158', 'SAFSA@ASD', NULL, 3),
	(102, '84484859', 'DNFML', 'KNGMLSN', 'DKNFML', 'SAAD', '659595', 'ASD@ASD', NULL, 3),
	(103, '12959', 'DFNMLKJ', 'KJGNL', 'KFGL', 'INGO', '9896532', 'FNODIFJ@ASDL', NULL, 3),
	(104, '813098013', 'ASDÑA', 'NDLFN', 'LSDFK', 'LSFK', '998983', 'SFDASD@ASDA', NULL, 3),
	(105, '464684', 'ASDA', 'FAG', 'ODFKJO', 'OKF', '8422', 'ASDA@ADR', NULL, 3),
	(106, '141341231', 'ADAND', 'KDLFGNL', 'NDLG', 'NGOLSDJFO', '123114515', 'GNOLS@NG', NULL, 3),
	(107, '902848', 'NDKFGN', 'NDKGFJNK', 'DJFNKSN', 'JKDNFKN', '8411', '1ADASD@ASDAD', NULL, 3),
	(108, '87654321', 'JUAN', 'RAMON', 'GONZALEZ', 'BARRETO', '0412087777977', 'CORREO@MAIL.COM', NULL, 3);

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
