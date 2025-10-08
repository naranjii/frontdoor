-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `notes` VARCHAR(191) NULL,
    MODIFY `patientCode` INTEGER NULL,
    MODIFY `supportLevel` INTEGER NULL;
