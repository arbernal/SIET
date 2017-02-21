CREATE DATABASE  IF NOT EXISTS `siet` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `siet`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: siet
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estiba`
--

DROP TABLE IF EXISTS `estiba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estiba` (
  `id_esti` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de estiba',
  `desc_esti` varchar(45) NOT NULL COMMENT 'Descripción de estiba',
  `id_pati` int(11) NOT NULL,
  `esta_esti` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_esti`),
  KEY `fk_estiba_id_pati` (`id_pati`),
  CONSTRAINT `fk_estiba_id_pati` FOREIGN KEY (`id_pati`) REFERENCES `patio` (`id_pati`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estiba`
--

LOCK TABLES `estiba` WRITE;
/*!40000 ALTER TABLE `estiba` DISABLE KEYS */;
INSERT INTO `estiba` VALUES (1,'ESTIBA1',1,1),(2,'PRUEBAR',2,0),(3,'NU',2,0),(7,'ESTIBA2',1,1);
/*!40000 ALTER TABLE `estiba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patio`
--

DROP TABLE IF EXISTS `patio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patio` (
  `id_pati` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de patio',
  `code_pati` varchar(2) NOT NULL COMMENT 'Descripcion del patio',
  `desc_pati` varchar(45) NOT NULL,
  `esta_pati` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_pati`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='Tabla de patios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patio`
--

LOCK TABLES `patio` WRITE;
/*!40000 ALTER TABLE `patio` DISABLE KEYS */;
INSERT INTO `patio` VALUES (1,'DB','DOS BOCAS',1),(2,'AR','OTRO',1);
/*!40000 ALTER TABLE `patio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plataforma` (
  `id_plat` int(11) NOT NULL AUTO_INCREMENT,
  `code_plat` varchar(2) NOT NULL,
  `desc_plat` varchar(45) NOT NULL,
  `esta_plat` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_plat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataforma`
--

LOCK TABLES `plataforma` WRITE;
/*!40000 ALTER TABLE `plataforma` DISABLE KEYS */;
INSERT INTO `plataforma` VALUES (1,'WE','SDSD',1),(2,'SA','EWRERWERER',1);
/*!40000 ALTER TABLE `plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pozo`
--

DROP TABLE IF EXISTS `pozo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pozo` (
  `id_pozo` int(11) NOT NULL AUTO_INCREMENT,
  `desc_pozo` varchar(45) NOT NULL,
  `id_plat` int(11) NOT NULL,
  `esta_pozo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pozo`),
  KEY `fk_pozo_id_plat` (`id_plat`),
  CONSTRAINT `fk_pozo_id_plat` FOREIGN KEY (`id_plat`) REFERENCES `plataforma` (`id_plat`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pozo`
--

LOCK TABLES `pozo` WRITE;
/*!40000 ALTER TABLE `pozo` DISABLE KEYS */;
INSERT INTO `pozo` VALUES (1,'ABA',1,'1'),(2,'BERNAL A',1,'0'),(3,'SDDDSD',1,'0');
/*!40000 ALTER TABLE `pozo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taller`
--

DROP TABLE IF EXISTS `taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taller` (
  `id_tall` int(11) NOT NULL AUTO_INCREMENT,
  `desc_tall` varchar(45) NOT NULL,
  `id_pati` int(11) NOT NULL,
  `esta_tall` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_tall`),
  KEY `fk_taller_id_pati` (`id_pati`),
  CONSTRAINT `fk_taller_id_pati` FOREIGN KEY (`id_pati`) REFERENCES `patio` (`id_pati`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taller`
--

LOCK TABLES `taller` WRITE;
/*!40000 ALTER TABLE `taller` DISABLE KEYS */;
INSERT INTO `taller` VALUES (1,'ARIEL',1,0),(2,'ASAS',2,0),(3,'SDS',2,0),(4,'DSF',1,0),(5,'ARIEL',1,0),(6,'ARIEL',2,0);
/*!40000 ALTER TABLE `taller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `id_ubic` int(11) NOT NULL AUTO_INCREMENT,
  `nume_seri` varchar(10) NOT NULL,
  `fech_regi` datetime NOT NULL,
  `dire_tubo` varchar(150) NOT NULL,
  `esta_ubic` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_ubic`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'0000001','2011-12-18 13:17:17','{\"patio\":\"patio\",\"estiba\":\"Estiba1\" }',1);
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_inspeccion`
--

DROP TABLE IF EXISTS `unidad_inspeccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidad_inspeccion` (
  `id_insp` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de unidad de inspección ',
  `desc_insp` varchar(45) NOT NULL COMMENT 'Descricción de la inspección',
  `id_pati` int(11) NOT NULL,
  `esta_insp` int(11) NOT NULL,
  PRIMARY KEY (`id_insp`),
  KEY `fk_unidad_inspeccion_id_pati` (`id_pati`),
  CONSTRAINT `fk_unidad_inspeccion_id_pati` FOREIGN KEY (`id_pati`) REFERENCES `patio` (`id_pati`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_inspeccion`
--

LOCK TABLES `unidad_inspeccion` WRITE;
/*!40000 ALTER TABLE `unidad_inspeccion` DISABLE KEYS */;
INSERT INTO `unidad_inspeccion` VALUES (1,'NUEVO',2,0),(2,'PRUEBA',2,1),(3,'DSFSD',1,1),(4,'SD',2,0);
/*!40000 ALTER TABLE `unidad_inspeccion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-27 14:35:14
