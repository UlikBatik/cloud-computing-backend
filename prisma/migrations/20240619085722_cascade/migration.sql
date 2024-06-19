-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_POSTID_fkey`;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_POSTID_fkey` FOREIGN KEY (`POSTID`) REFERENCES `Post`(`POSTID`) ON DELETE CASCADE ON UPDATE RESTRICT;