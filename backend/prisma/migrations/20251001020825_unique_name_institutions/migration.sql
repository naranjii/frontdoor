/*
  Warnings:

  - A unique constraint covering the columns `[institutionName]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Institution_institutionName_key` ON `Institution`(`institutionName`);
