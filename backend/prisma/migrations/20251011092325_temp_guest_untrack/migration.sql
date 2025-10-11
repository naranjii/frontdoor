-- DropForeignKey
ALTER TABLE `Guest` DROP FOREIGN KEY `Guest_createdBy_fkey`;

-- DropIndex
DROP INDEX `Guest_createdBy_fkey` ON `Guest`;

-- AlterTable
ALTER TABLE `Guest` MODIFY `createdById` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Logbook` MODIFY `checkOut` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_createdBy_fkey` FOREIGN KEY (`createdById`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
