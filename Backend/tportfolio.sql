-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2026 at 06:54 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tportfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'Hana Asefa', 'hana@example.com', 'Portfolio Contact Test', 'Hello! I am testing my full-stack portfolio backend.', '2026-10-13 09:00:14'),
(2, 'Hana amen asefa', 'h1607322@gmail.com', 'tyuio', 'nm,adjko;rl', '2026-10-13 09:09:15'),
(3, 'hs', 'h1607322@gmail.com', 'how to used data base in this website', 'hjks,mck', '2026-10-13 09:14:35'),
(4, 'Hana amen asefa', 'h1607322@gmail.com', 'how to used data base in this website', 'n,/', '2026-10-13 09:23:56'),
(5, 'Hana amen asefa', 'h1607322@gmail.com', 'how to used data base in this website', 'nmmmmmmmiojklmjkdiuwijokl', '2026-10-13 13:05:52'),
(6, 'jkdjiofjlkm', 'h1607322@gmail.com', ',m,kljjjjk', 'k,ooiokpl,.', '2026-10-13 13:15:43'),
(7, 'Hana amen asefa', 'h1607322@gmail.com', 'how to used data base in this website', 'bnm,kljio', '2026-10-14 20:33:15'),
(8, 'Hana amen asefa', 'h1607322@gmail.com', 'how to used data base in this website', 'axcxfdvckklu', '2026-10-18 16:56:24');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `project_description` text NOT NULL,
  `project_image_url` varchar(500) DEFAULT NULL,
  `project_github_link` varchar(500) DEFAULT NULL,
  `project_live_demo` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_title`, `project_description`, `project_image_url`, `project_github_link`, `project_live_demo`, `created_at`) VALUES
(1, 'Evangadi Menu', 'Full-stack food ordering interface built with React, Node.js.', 'https://i.ibb.co/pBLnm3VJ/evangadi-menu.png', 'https://github.com/Amen-2124/evangadi-menu.git', 'https://serene-pika-b6e6b9.netlify.app', '2026-10-18 15:39:21'),
(2, 'Netflix Clone', 'A responsive streaming site clone utilizing TMDB API, React Swiper, and CSS modules', 'https://i.ibb.co/chBppNWB/netflix.png', 'https://github.com/Amen-2124/netflix-clone-frontend.git', 'https://shimmering-khapse-637a88.netlify.app', '2026-10-18 15:39:21'),
(3, 'ChatGPT Clone', 'A smart conversational web app built with Node.js Express, MySQL, and Google GenAI SDK using Gemini models.', 'https://i.ibb.co/bjr6hXhN/chatgpt-clone.png', 'https://github.com/Amen-2124/ChatGPT_clone.git', 'https://frabjous-dragon-d505ff.netlify.app', '2026-10-18 15:39:21'),
(4, 'Apple Page (React)', 'A dynamic Apple product showcase web application featuring embedded Apple video assets, React Functional Components, custom CSS Modules, and an Express.js with MySQL backend.', 'https://i.ibb.co/Wv4K6YCJ/react-apple.png', 'https://github.com/Amen-2124/apple-replica', 'https://apple-react-functional-components-git-main-et-4fd7.vercel.app', '2026-10-18 15:39:21'),
(5, 'puppy page', 'A responsive web application built using HTML, CSS, and CSS Media Queries to ensure a seamless layout across all screen sizes and mobile devices.', 'https://i.ibb.co/Q3gV2NhV/Screenshot-2026-10-18-134554.png', 'https://github.com/Amen-2124/puppyLover.git', 'https://puppy-lover21.vercel.app/', '2026-10-18 15:39:21'),
(6, 'Apple Page (Bootstrap)', 'A sleek, dynamic Apple product showcase page developed using Bootstrap framework for modern, responsive component layouts and styling.', 'https://i.ibb.co/TqtkqR2k/Screenshot-2026-10-18-172235.png', 'https://github.com/Amen-2124/apple-bootstrap-project2.git', 'https://apple-bootstrap-project2-u7p1.vercel.app', '2026-10-18 15:39:21'),
(7, 'AI-form', 'A major collaborative full-stack AI project built using Retrieval-Augmented Generation (RAG) architecture, enabling dynamic document processing, semantic search, and intelligent form handling.', 'https://i.ibb.co/84mRXbTs/Screenshot-2026-10-18-090052.png', 'https://github.com/Hiwe47/Group1EvangadiForum2026.git', 'https://evanagdi.getenetabebaw.com/', '2026-10-18 15:39:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_title` (`project_title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
