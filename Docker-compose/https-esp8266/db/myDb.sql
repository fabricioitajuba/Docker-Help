-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 28/03/2025 às 17:48
-- Versão do servidor: 5.7.44
-- Versão do PHP: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `myDb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Person`
--

CREATE TABLE `Person` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `nota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Despejando dados para a tabela `Person`
--

INSERT INTO `Person` (`id`, `nome`, `nota`) VALUES
(1, 'Fabrício', 100),
(2, 'Angiene', 90),
(3, 'Fabiano', 80),
(4, 'AndrÃ©ia', 50);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sensores`
--

CREATE TABLE `sensores` (
  `id` int(11) NOT NULL,
  `data/hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensor` varchar(20) NOT NULL,
  `valor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `sensores`
--

INSERT INTO `sensores` (`id`, `data/hora`, `sensor`, `valor`) VALUES
(1, '2025-03-28 17:47:25', 'temperatura', 25),
(2, '2025-03-28 17:47:55', 'nível', 10),
(3, '2025-03-28 17:48:18', 'pressão', 45);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Person`
--
ALTER TABLE `Person`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Person`
--
ALTER TABLE `Person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `sensores`
--
ALTER TABLE `sensores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
