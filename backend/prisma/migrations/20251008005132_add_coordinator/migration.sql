/*
  Warnings:

  - You are about to alter the column `role` on the `Staff` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Staff` MODIFY `role` ENUM('ADMIN', 'RECEPTIONIST', 'COORDINATOR') NOT NULL DEFAULT 'RECEPTIONIST';
