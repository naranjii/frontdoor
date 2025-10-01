/*
  Warnings:

  - You are about to drop the column `name` on the `Institution` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,institutionName]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institutionName` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_institution_fkey`;

-- DropIndex
DROP INDEX `Institution_id_name_key` ON `Institution`;

-- DropIndex
DROP INDEX `Staff_institution_fkey` ON `Staff`;

-- AlterTable
ALTER TABLE `Institution` DROP COLUMN `name`,
    ADD COLUMN `institutionName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Institution_id_institutionName_key` ON `Institution`(`id`, `institutionName`);

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_institution_fkey` FOREIGN KEY (`institutionId`, `institutionName`) REFERENCES `Institution`(`id`, `institutionName`) ON DELETE RESTRICT ON UPDATE CASCADE;
