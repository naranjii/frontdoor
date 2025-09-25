/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Staff_name_key` ON `Staff`;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_username_key` ON `Staff`(`username`);
