CREATE TABLE `youtube_channels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`channelId` varchar(100) NOT NULL,
	`name` varchar(300) NOT NULL,
	`subscribers` varchar(20),
	`category` varchar(100),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `youtube_channels_id` PRIMARY KEY(`id`),
	CONSTRAINT `youtube_channels_channelId_unique` UNIQUE(`channelId`)
);
--> statement-breakpoint
CREATE TABLE `youtube_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`videoId` varchar(20) NOT NULL,
	`channelId` varchar(100) NOT NULL,
	`channelName` varchar(300) NOT NULL,
	`title` varchar(500) NOT NULL,
	`thumbnailUrl` text,
	`publishedAt` timestamp,
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `youtube_videos_id` PRIMARY KEY(`id`),
	CONSTRAINT `youtube_videos_videoId_unique` UNIQUE(`videoId`)
);
--> statement-breakpoint
ALTER TABLE `editorials` ADD `useAlias` boolean DEFAULT true NOT NULL;