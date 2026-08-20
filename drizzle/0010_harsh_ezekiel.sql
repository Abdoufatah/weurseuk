ALTER TABLE `facebook_publisher_settings` ADD `tokenCheckTaskUid` varchar(65);--> statement-breakpoint
ALTER TABLE `facebook_publisher_settings` ADD `tokenLastCheckedAt` timestamp;--> statement-breakpoint
ALTER TABLE `facebook_publisher_settings` ADD `tokenLastStatus` varchar(32);--> statement-breakpoint
ALTER TABLE `facebook_publisher_settings` ADD `tokenLastDiagnostic` varchar(1000);--> statement-breakpoint
CREATE INDEX `facebook_publisher_settings_token_check_task_uid_idx` ON `facebook_publisher_settings` (`tokenCheckTaskUid`);