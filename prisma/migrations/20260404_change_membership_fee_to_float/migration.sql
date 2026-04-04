-- AlterTable: Change membership_fee from VARCHAR to FLOAT
ALTER TABLE `memberships` MODIFY COLUMN `membership_fee` FLOAT NOT NULL DEFAULT 0;
