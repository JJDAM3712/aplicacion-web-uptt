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

-- Volcando datos para la tabla estanislaocarrillodb.clases: ~2 rows (aproximadamente)
INSERT INTO `clases` (`id_clase`, `id_user`, `id_materias`, `id_seccion`, `id_anno`, `id_mension`) VALUES
	(6, 12, 4, 4, 4, 3),
	(7, 11, 8, 4, 4, 3);

-- Volcando datos para la tabla estanislaocarrillodb.estudiantes: ~3 rows (aproximadamente)
INSERT INTO `estudiantes` (`id_estudiante`, `id_seccion`, `id_user`, `id_year`, `id_mension`) VALUES
	(1, 1, 1, 6, 3),
	(2, 2, 5, 4, 2);

-- Volcando datos para la tabla estanislaocarrillodb.evaluaciones: ~0 rows (aproximadamente)

-- Volcando datos para la tabla estanislaocarrillodb.lapso: ~3 rows (aproximadamente)
INSERT INTO `lapso` (`id_lapso`, `lapso`) VALUES
	(1, '1er lapso'),
	(2, '2do lapso'),
	(3, '3er lapso');

-- Volcando datos para la tabla estanislaocarrillodb.materias: ~5 rows (aproximadamente)
INSERT INTO `materias` (`id_materia`, `materia`, `descripcion`) VALUES
	(2, 'Biologia', 'ciencia que estudia a los seres vivos, su origen, evolución y sus propiedades: nutrición, morfogénesis, reproducción, patogenia, etc'),
	(4, 'Quimica', 'Ciencia que estudia tanto la composición, como la estructura y las propiedades de la materia como los cambios que esta experimenta durante las reacciones químicas y su relación con la energía.​'),
	(5, 'Fisica', 'Estudia las leyes del movimiento'),
	(6, 'Ciencias Sociales', 'Está vinculada a las actividades y el comportamiento de los seres humanos, por lo tanto, analizan las manifestaciones de la sociedad, tanto materiales como simbólicas.'),
	(8, 'Orientacion y Convivencia', 'Consiste en brindarle ayuda al estudiante para que logre identificar y superar dificultades que afecten su rendimiento académico.');

-- Volcando datos para la tabla estanislaocarrillodb.mensiones: ~3 rows (aproximadamente)
INSERT INTO `mensiones` (`id_mension`, `mension`) VALUES
	(1, 'Informatica'),
	(2, 'Administración'),
	(3, 'Contabilidad');

-- Volcando datos para la tabla estanislaocarrillodb.notas: ~0 rows (aproximadamente)

-- Volcando datos para la tabla estanislaocarrillodb.rol: ~3 rows (aproximadamente)
INSERT INTO `rol` (`id_rol`, `rol`) VALUES
	(1, 'Master'),
	(2, 'Profesor'),
	(3, 'Estudiante');

-- Volcando datos para la tabla estanislaocarrillodb.secciones: ~4 rows (aproximadamente)
INSERT INTO `secciones` (`id_seccion`, `seccion`) VALUES
	(1, 'a'),
	(2, 'b'),
	(3, 'c'),
	(4, 'd');

-- Volcando datos para la tabla estanislaocarrillodb.usuarios: ~5 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `cedula`, `p_nombre`, `s_nombre`, `p_apellido`, `s_apellido`, `telefono`, `email`, `clave`, `id_rol`) VALUES
	(1, '10039174', 'Andres', 'Carlos', 'Matheus', 'Matos', '04127894561', '', NULL, 3),
	(2, '12906825', 'yonson', 'jaime', 'Aguilera', 'Molare', '412-0607829', 'aab8v8xk@knmcaav.com', NULL, 2),
	(4, '318141', 'Jason', 'David', 'Aguilar', 'Morales', '412-0607829', 'wg4tb8v8xk@kav.com', NULL, 1),
	(5, '1111111', 'Juan', 'Cho', 'Pintejo', 'Pepiniño', '412-0607829', 'correo8xk@mailv.com', NULL, 3),
	(11, '25863000', 'chamo', 'maura', 'jhonson', 'Morales', '412-0607829', 'Holamail@correo.com', NULL, 2),
	(12, '25888888', 'chamo', 'maura', 'jhonson', 'Morales', '412-0607829', 'correl@correo.com', NULL, 2);

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
