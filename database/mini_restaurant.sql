CREATE DATABASE  IF NOT EXISTS `mini_restaurant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mini_restaurant`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: mini_restaurant
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `unit_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,4,120.00),(2,1,2,2,60.00),(3,1,3,1,80.00),(4,2,1,3,120.00),(5,3,1,4,120.00),(6,3,2,3,60.00),(7,3,3,2,80.00),(8,3,4,2,45.00),(9,3,5,2,40.00),(10,4,1,4,120.00),(11,4,2,3,60.00),(12,4,3,2,80.00),(13,4,4,2,45.00),(14,4,5,2,40.00),(15,5,1,5,120.00),(16,5,2,5,60.00),(17,5,3,3,80.00),(18,5,4,3,45.00),(19,5,5,2,40.00),(20,6,1,2,120.00),(21,7,1,3,120.00),(22,8,1,3,120.00),(23,9,1,4,120.00),(24,10,1,4,120.00),(25,11,1,5,120.00),(26,12,1,6,120.00),(27,13,1,6,120.00),(28,14,1,6,120.00),(29,15,1,4,120.00),(30,16,2,1,60.00),(31,16,1,1,120.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,680.00,'paid','2026-05-27 12:47:40'),(2,360.00,'paid','2026-05-28 14:03:48'),(3,990.00,'paid','2026-05-28 14:04:16'),(4,990.00,'paid','2026-05-28 14:09:24'),(5,1355.00,'paid','2026-05-28 14:12:07'),(6,240.00,'paid','2026-05-28 14:12:12'),(7,360.00,'paid','2026-05-28 14:12:16'),(8,360.00,'paid','2026-05-28 14:12:18'),(9,480.00,'paid','2026-05-28 14:12:22'),(10,480.00,'paid','2026-05-28 14:12:25'),(11,600.00,'paid','2026-05-28 14:12:29'),(12,720.00,'paid','2026-05-28 14:12:33'),(13,720.00,'paid','2026-05-28 14:12:36'),(14,720.00,'paid','2026-05-28 14:12:37'),(15,480.00,'paid','2026-05-29 14:04:42'),(16,180.00,'paid','2026-05-29 14:20:07');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Burger',120.00,'Juicy beef burger with lettuce and tomato','Burger.png','2026-05-27 11:44:54'),(2,'Fries',60.00,'Crispy golden french fries','Fries.png','2026-05-27 11:44:54'),(3,'Hotdog',80.00,'Classic hotdog with mustard and ketchup','Hotdog.png','2026-05-27 11:44:54'),(4,'Iced Tea',45.00,'Freshly brewed sweetened iced tea','IcedTea.png','2026-05-27 11:44:54'),(5,'Soda',40.00,'Chilled carbonated soft drink','Soda.png','2026-05-27 11:44:54');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-30  0:28:35
