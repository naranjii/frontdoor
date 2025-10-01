/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institutionName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_institution_fkey`;

-- DropIndex
DROP INDEX `Staff_institution_fkey` ON `Staff`;

-- AlterTable
ALTER TABLE `Patient` MODIFY `healthcare` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `institutionName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Institution_id_name_key` ON `Institution`(`id`, `name`);

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_institution_fkey` FOREIGN KEY (`institutionId`, `institutionName`) REFERENCES `Institution`(`id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;
