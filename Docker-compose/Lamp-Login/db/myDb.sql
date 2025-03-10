-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 06-Fev-2025 às 19:29
-- Versão do servidor: 5.7.44
-- versão do PHP: 7.4.15

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
-- Estrutura da tabela `Person`
--

CREATE TABLE `Person` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `nota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Person`
--

INSERT INTO `Person` (`id`, `nome`, `nota`) VALUES
(1, 'Fabrício', 100),
(2, 'Angiene', 90),
(3, 'Fabiano', 80),
(4, 'AndrÃ©ia', 50);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `login`, `senha`) VALUES
(8, 'fabricioitajuba', '$2y$10$l6/OUTsojOodGNzSwIr5o.GiCFejSVhRb2EhhBsJcGZ9doLXag5RG');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Person`
--
ALTER TABLE `Person`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`login`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Person`
--
ALTER TABLE `Person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
