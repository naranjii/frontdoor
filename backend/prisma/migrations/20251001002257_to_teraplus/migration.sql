-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_institutionId_fkey`;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_organization_fkey` FOREIGN KEY (`institutionId`) REFERENCES `Institution`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
