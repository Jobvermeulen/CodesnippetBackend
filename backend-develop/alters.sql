# 16 April 2020 Added userResetPassword

CREATE TABLE `cs_development`.`userResetPassword` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `userId` INT NOT NULL , 
    `expiresAt` TIMESTAMP NULL DEFAULT NULL , 
    `token` CHAR(32) NOT NULL , 
    `issuedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
    `usedAt` DATETIME NULL DEFAULT NULL ) 
ENGINE = InnoDB;

ALTER TABLE `userResetPassword` ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);