CREATE TABLE `facebook_publication_jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`editorialId` int NOT NULL,
	`status` enum('pending','publishing','published','failed','blocked') NOT NULL DEFAULT 'pending',
	`message` text,
	`targetUrl` varchar(1000),
	`facebookPostId` varchar(255),
	`attemptCount` int NOT NULL DEFAULT 0,
	`lastError` text,
	`publishedAt` timestamp,
	`lockedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `facebook_publication_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `facebook_publication_jobs_editorialId_unique` UNIQUE(`editorialId`)
);
--> statement-breakpoint
CREATE TABLE `facebook_publisher_settings` (
	`id` int NOT NULL,
	`isEnabled` boolean NOT NULL DEFAULT false,
	`firstPostConfirmed` boolean NOT NULL DEFAULT false,
	`enabledAt` timestamp,
	`scheduleTaskUid` varchar(65),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `facebook_publisher_settings_id` PRIMARY KEY(`id`)
);
