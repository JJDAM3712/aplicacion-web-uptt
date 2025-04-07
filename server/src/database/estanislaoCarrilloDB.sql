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


CREATE TABLE "clases" (
  "id_clase" SERIAL PRIMARY KEY,
  "id_user" INT DEFAULT NULL,
  "id_materias" INT NOT NULL,
  "id_seccion" INT NOT NULL,
  "id_anno" INT NOT NULL,
  "id_mension" INT NOT NULL,
  CONSTRAINT "prof_user" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_usuario"),
  CONSTRAINT "prof_materia" FOREIGN KEY ("id_materias") REFERENCES "materias" ("id_materia"),
  CONSTRAINT "prof_seccion" FOREIGN KEY ("id_seccion") REFERENCES "secciones" ("id_seccion"),
  CONSTRAINT "prof_year" FOREIGN KEY ("id_anno") REFERENCES "year" ("id_anno"),
  CONSTRAINT "prof_mension" FOREIGN KEY ("id_mension") REFERENCES "mensiones" ("id_mension")
);

INSERT INTO "clases" ("id_clase", "id_user", "id_materias", "id_seccion", "id_anno", "id_mension") VALUES
	(6, NULL, 4, 4, 4, 3),
	(9, 13, 2, 5, 2, 2);

CREATE TABLE "estudiantes" (
  "id_estudiante" int(11) NOT NULL AUTO_INCREMENT,
  "id_seccion" int(11) NOT NULL,
  "id_user" int(11) NOT NULL,
  "id_year" int(11) NOT NULL,
  "id_mension" int(11) NOT NULL,
  PRIMARY KEY ("id_estudiante") USING BTREE,
  KEY "secciones" ("id_seccion") USING BTREE,
  KEY "year" ("id_year") USING BTREE,
  KEY "estudiante_user" ("id_user"),
  KEY "mension" ("id_mension"),
  CONSTRAINT "estudiante_user" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_usuario"),
  CONSTRAINT "mension" FOREIGN KEY ("id_mension") REFERENCES "mensiones" ("id_mension"),
  CONSTRAINT "secciones" FOREIGN KEY ("id_seccion") REFERENCES "secciones" ("id_seccion"),
  CONSTRAINT "year" FOREIGN KEY ("id_year") REFERENCES "year" ("id_anno")
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "estudiantes" ("id_estudiante", "id_seccion", "id_user", "id_year", "id_mension") VALUES
	(2, 2, 5, 4, 3),
	(11, 1, 21, 4, 2);

CREATE TABLE "evaluaciones" (
  "id_evaluacion" int(11) NOT NULL AUTO_INCREMENT,
  "evaluacion" varchar(255) NOT NULL,
  PRIMARY KEY ("id_evaluacion")
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "evaluaciones" ("id_evaluacion", "evaluacion") VALUES
	(2, 'EXPOCISION'),
	(3, 'CARTELERA'),
	(10, 'LAMINA GRUPAL'),
	(13, 'EXAMEN ESCRITA');

CREATE TABLE "lapso" (
  "id_lapso" int(11) NOT NULL AUTO_INCREMENT,
  "lapso" varchar(50) NOT NULL,
  PRIMARY KEY ("id_lapso")
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "lapso" ("id_lapso", "lapso") VALUES
	(1, '1er lapso'),
	(2, '2do lapso'),
	(3, '3er lapso');

CREATE TABLE "materias" (
  "id_materia" int(11) NOT NULL AUTO_INCREMENT,
  "materia" varchar(255) NOT NULL,
  "descripcion" varchar(255) NOT NULL,
  PRIMARY KEY ("id_materia")
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "materias" ("id_materia", "materia", "descripcion") VALUES
	(2, 'Biologia', 'ciencia que estudia a los seres vivos, su origen, evolución y sus propiedades: nutrición, morfogénesis, reproducción, patogenia, etc'),
	(4, 'Quimica', 'Ciencia que estudia tanto la composición, como la estructura y las propiedades de la materia como los cambios que esta experimenta durante las reacciones químicas y su relación con la energía.​'),
	(5, 'Fisica', 'Estudia las leyes del movimiento'),
	(6, 'Ciencias Sociales', 'Está vinculada a las actividades y el comportamiento de los seres humanos, por lo tanto, analizan las manifestaciones de la sociedad, tanto materiales como simbólicas.'),
	(8, 'Orientacion y Convivencia', 'Consiste en brindarle ayuda al estudiante para que logre identificar y superar dificultades que afecten su rendimiento académico.');

CREATE TABLE "mensiones" (
  "id_mension" int(11) NOT NULL AUTO_INCREMENT,
  "mension" varchar(255) NOT NULL,
  PRIMARY KEY ("id_mension")
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "mensiones" ("id_mension", "mension") VALUES
	(1, 'Informatica'),
	(2, 'Administración'),
	(3, 'Contabilidad');

CREATE TABLE "notas" (
  "id_notas" int(11) NOT NULL AUTO_INCREMENT,
  "id_clase" int(11) NOT NULL,
  "evaluacion" int(11) NOT NULL DEFAULT 0,
  "estudiante" int(11) NOT NULL DEFAULT 0,
  "nota" varchar(4) NOT NULL,
  "fecha" date DEFAULT NULL,
  "comentario" varchar(255) DEFAULT NULL,
  "lapso" int(11) NOT NULL,
  PRIMARY KEY ("id_notas"),
  KEY "foreig_clase" ("id_clase"),
  KEY "foreig_evaluacion" ("evaluacion"),
  KEY "foreig_alum" ("estudiante"),
  KEY "foreig_lapso" ("lapso"),
  CONSTRAINT "foreig_alum" FOREIGN KEY ("estudiante") REFERENCES "estudiantes" ("id_estudiante") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "foreig_clase" FOREIGN KEY ("id_clase") REFERENCES "clases" ("id_clase") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "foreig_evaluacion" FOREIGN KEY ("evaluacion") REFERENCES "evaluaciones" ("id_evaluacion") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT "foreig_lapso" FOREIGN KEY ("lapso") REFERENCES "lapso" ("id_lapso") ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE "rol" (
  "id_rol" int(11) NOT NULL AUTO_INCREMENT,
  "rol" varchar(50) NOT NULL,
  PRIMARY KEY ("id_rol")
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "rol" ("id_rol", "rol") VALUES
	(1, 'Master'),
	(2, 'Profesor'),
	(3, 'Estudiante');

CREATE TABLE "secciones" (
  "id_seccion" int(11) NOT NULL AUTO_INCREMENT,
  "seccion" varchar(1) NOT NULL,
  PRIMARY KEY ("id_seccion")
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "secciones" ("id_seccion", "seccion") VALUES
	(1, 'A'),
	(2, 'B'),
	(3, 'C'),
	(4, 'D'),
	(5, 'E'),
	(6, 'F');

CREATE TABLE "usuarios" (
  "id_usuario" int(11) NOT NULL AUTO_INCREMENT,
  "cedula" varchar(255) NOT NULL,
  "p_nombre" varchar(255) NOT NULL,
  "s_nombre" varchar(255) NOT NULL,
  "p_apellido" varchar(255) NOT NULL,
  "s_apellido" varchar(255) NOT NULL,
  "telefono" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "clave" varchar(255) DEFAULT NULL,
  "id_rol" int(11) NOT NULL,
  PRIMARY KEY ("id_usuario"),
  UNIQUE KEY "email" ("email"),
  UNIQUE KEY "usuario" ("cedula") USING BTREE,
  KEY "rol_usuarios" ("id_rol"),
  CONSTRAINT "rol_usuarios" FOREIGN KEY ("id_rol") REFERENCES "rol" ("id_rol")
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "usuarios" ("id_usuario", "cedula", "p_nombre", "s_nombre", "p_apellido", "s_apellido", "telefono", "email", "clave", "id_rol") VALUES
	(2, '12906825', 'YONSONS', 'JAIMEA', 'AGUILERA', 'MOLARES', '4120607829', 'A@KNMCAAV.COM', NULL, 2),
	(4, '318141', 'Jason', 'David', 'Aguilar', 'Morales', '412-0607829', 'wg4tb8v8xk@kav.com', NULL, 1),
	(5, '47744889', 'Juan', 'Cho', 'Pintejo', 'Pepiniño', '412-0607829', 'correo8xk@mailv.com', NULL, 3),
	(11, '25863000', 'CHAMO', 'MAURAM', 'JHONSONS', 'MORALE', '4120607829', 'MARQ@GMAIL.CO', NULL, 2),
	(13, '1234567', 'WILSON', 'DANIEL', 'GARCIA', 'MARQUEZ', '02712492863', 'MARQUEZ@GMAIL.COM', NULL, 2),
	(21, '27512863', 'JASON', 'DAVID', 'AGUILAR', 'MORALES', '02712492863', 'ELECTRONICOQ@MAIL.COM', NULL, 3);

CREATE TABLE "year" (
  "id_anno" int(11) NOT NULL AUTO_INCREMENT,
  "anno" varchar(10) NOT NULL,
  PRIMARY KEY ("id_anno")
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO "year" ("id_anno", "anno") VALUES
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
