CREATE TABLE `aggregated_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`sourceUrl` varchar(1000) NOT NULL,
	`sourceName` varchar(200) NOT NULL,
	`sourceLogoUrl` text,
	`imageUrl` text,
	`categoryId` int,
	`region` enum('senegal','afrique_ouest','monde') NOT NULL DEFAULT 'senegal',
	`isBreakingNews` boolean NOT NULL DEFAULT false,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aggregated_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `breaking_news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`headline` varchar(500) NOT NULL,
	`sourceUrl` text,
	`sourceName` varchar(200),
	`isActive` boolean NOT NULL DEFAULT true,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `breaking_news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `editorials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`slug` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImageUrl` text,
	`categoryId` int,
	`authorId` int,
	`isPublished` boolean NOT NULL DEFAULT false,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `editorials_id` PRIMARY KEY(`id`),
	CONSTRAINT `editorials_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `rss_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`url` varchar(1000) NOT NULL,
	`logoUrl` text,
	`region` enum('senegal','afrique_ouest','monde') NOT NULL DEFAULT 'senegal',
	`categoryId` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastFetchedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rss_sources_id` PRIMARY KEY(`id`)
);
