CREATE TABLE `scheduler_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(100) NOT NULL,
	`scheduledTime` timestamp NOT NULL,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`status` varchar(50) NOT NULL,
	`articlesGenerated` int DEFAULT 0,
	`journalistsInvoked` int DEFAULT 0,
	`errorsCount` int DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scheduler_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `scheduler_sessions_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
CREATE TABLE `site_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(100) NOT NULL,
	`category` varchar(100),
	`title` varchar(500) NOT NULL,
	`description` text,
	`status` varchar(50) NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metricName` varchar(100) NOT NULL,
	`metricValue` varchar(500) NOT NULL,
	`unit` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `site_metrics_id` PRIMARY KEY(`id`)
);
