CREATE TABLE `editorial_governance_settings` (
	`id` int NOT NULL,
	`weeklyReminderTaskUid` varchar(65),
	`weeklyCron` varchar(64) NOT NULL DEFAULT '0 30 8 * * 1',
	`automaticPublicationSuspended` boolean NOT NULL DEFAULT true,
	`exceptionalPublicationRequiresApproval` boolean NOT NULL DEFAULT true,
	`defaultSignaturePolicy` varchar(120) NOT NULL DEFAULT 'Abdou Fatah Fall ou Bensirac',
	`lastReminderAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `editorial_governance_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `editorial_governance_settings_task_uid_idx` ON `editorial_governance_settings` (`weeklyReminderTaskUid`);