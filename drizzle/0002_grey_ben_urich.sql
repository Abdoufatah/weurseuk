CREATE TABLE `article_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `article_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `article_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `article_tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`editorialId` int NOT NULL,
	`userId` int NOT NULL,
	`authorName` varchar(200) NOT NULL,
	`authorEmail` varchar(320) NOT NULL,
	`content` text NOT NULL,
	`isApproved` boolean NOT NULL DEFAULT false,
	`isSpam` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `editorial_tags_junction` (
	`id` int AUTO_INCREMENT NOT NULL,
	`editorialId` int NOT NULL,
	`tagId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `editorial_tags_junction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journalist_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`alias` varchar(100),
	`email` varchar(320) NOT NULL,
	`bio` text,
	`photoUrl` text,
	`categoryId` int NOT NULL,
	`role` enum('reporter','correspondent','columnist','analyst','editorialist') NOT NULL,
	`userId` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `journalist_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `journalist_profiles_email_unique` UNIQUE(`email`)
);
