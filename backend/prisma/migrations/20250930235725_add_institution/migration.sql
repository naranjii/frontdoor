/*
  Warnings:

  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `institutionId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Guest` DROP FOREIGN KEY `Guest_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `Logbook` DROP FOREIGN KEY `Logbook_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `Patient` DROP FOREIGN KEY `Patient_createdBy_fkey`;

-- DropIndex
DROP INDEX `Guest_createdBy_fkey` ON `Guest`;

-- DropIndex
DROP INDEX `Logbook_createdBy_fkey` ON `Logbook`;

-- DropIndex
DROP INDEX `Patient_createdBy_fkey` ON `Patient`;

-- AlterTable
ALTER TABLE `Guest` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Logbook` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Staff` DROP PRIMARY KEY,
    ADD COLUMN `institutionId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Institution` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_institutionId_fkey` FOREIGN KEY (`institutionId`) REFERENCES `Institution`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_createdBy_fkey` FOREIGN KEY (`createdById`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_createdBy_fkey` FOREIGN KEY (`createdById`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logbook` ADD CONSTRAINT `Logbook_createdBy_fkey` FOREIGN KEY (`createdById`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
