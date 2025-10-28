-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2025 a las 07:32:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guevara`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `cursoID` int(11) NOT NULL,
  `division` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`cursoID`, `division`) VALUES
(1, 71),
(2, 72),
(3, 73);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `materiaID` int(11) NOT NULL,
  `materiaNombre` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`materiaID`, `materiaNombre`) VALUES
(1, 'Matematica'),
(2, 'Inglés técnico'),
(3, 'Marco jurídico'),
(4, 'TÉCNICA: Asistencia 2'),
(5, 'TÉCNICA: Autogestión'),
(6, 'TÉCNICA: Hardware 4'),
(7, 'TÉCNICA: Prácticas profe'),
(8, 'TÉCNICA: Programacion IV'),
(9, 'TÉCNICA: Redes 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `notaID` int(11) NOT NULL,
  `userIDFK` int(11) DEFAULT NULL,
  `cursoIDFK` int(11) DEFAULT NULL,
  `materiaIDFK` int(11) DEFAULT NULL,
  `notaNum` int(11) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `informe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userNombre` varchar(32) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `correo` varchar(24) NOT NULL,
  `cursoIDFK` int(11) DEFAULT NULL,
  `rol` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`userID`, `userNombre`, `contraseña`, `correo`, `cursoIDFK`, `rol`) VALUES
(23, '456', '$2b$10$PilDq1e5C2IlY2rU..kHIeMoJ2OuPUDQHYEiqZS5zPy691NmGnJBW', '456@gmail.com', 1, 1),
(24, 'picadisimo', '$2b$10$WoWt8aXTp8bzQLgXUdvyauksYEIo6O7QcxLXz4uwhJYjdyOqJAMFe', 'picadisimo@gmail.com', 3, 3),
(25, 'Barrionuevo', '$2b$10$nOJAfo6GiPDd7AQ7Ml8dhuXMGphxE6c4IcmoMzHekPjkNz48gMUuS', 'fnewhood@gmail.com', 2, 2),
(26, 'brisa', '$2b$10$ehmsF5H0wUZK1V8P8J46SucNr.xG33D1PvAPX0wUrd2DBkH2Oi5VS', 'Brisa@201805', NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`cursoID`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materiaID`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`notaID`),
  ADD KEY `userIDFK` (`userIDFK`),
  ADD KEY `cursoIDFK` (`cursoIDFK`,`materiaIDFK`,`notaNum`),
  ADD KEY `materiaIDFK` (`materiaIDFK`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `cursoIDFK` (`cursoIDFK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `cursoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `materiaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`materiaIDFK`) REFERENCES `materia` (`materiaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`cursoIDFK`) REFERENCES `curso` (`cursoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nota_ibfk_3` FOREIGN KEY (`userIDFK`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`cursoIDFK`) REFERENCES `curso` (`cursoID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
