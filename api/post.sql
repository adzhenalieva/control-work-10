CREATE SCHEMA `post` DEFAULT CHARACTER SET utf8 ;

USE `post`;

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(255) NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `author` VARCHAR(255) NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `news_id_fk_idx` (`news_id` ASC),
  CONSTRAINT `news_id_fk`
    FOREIGN KEY (`news_id`)
    REFERENCES `news` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO `news` (`title`, `description`, `date`)
VALUES ('New kindergarden',  'New kindergarden was opened in Bishkek', '2019-03-30'), ('V.Putin visited Bishkek',  'The president of RF has visited Bishkek', '2019-03-28'), ('New hospital',  'New hospital was opened in Bishkek', '2019-03-30');

INSERT INTO `comments` (`news_id`, `author`, `comment`)
VALUES (1,  'Mario', 'Great news'), (2,  'Leo', 'Nice news'), (3,  'Miki', 'Super');
