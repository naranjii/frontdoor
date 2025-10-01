-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_organization_fkey`;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_institution_fkey` FOREIGN KEY (`institutionId`) REFERENCES `Institution`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
