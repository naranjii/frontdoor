/*
  Warnings:

  - You are about to drop the column `checked` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `name` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Guest` DROP COLUMN `checked`,
    ADD COLUMN `contact` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `organization` VARCHAR(191) NULL;
