-- CreateTable
CREATE TABLE `badusb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub` VARCHAR(8) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `drop_location` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `badusb_sub_key`(`sub`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questionnaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub` VARCHAR(16) NOT NULL,
    `badusb_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `location_found` VARCHAR(191) NOT NULL,
    `insertion_reason` INTEGER NOT NULL,
    `comfort_rating` INTEGER NOT NULL,
    `malicious` BOOLEAN NOT NULL,

    UNIQUE INDEX `questionnaire_sub_key`(`sub`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `questionnaire` ADD CONSTRAINT `questionnaire_badusb_id_fkey`
    FOREIGN KEY (`badusb_id`) REFERENCES `badusb`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;
