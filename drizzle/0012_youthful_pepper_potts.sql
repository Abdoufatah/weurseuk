ALTER TABLE `editorials` ADD `approvalStatus` enum('pending','approved','rejected') DEFAULT 'approved' NOT NULL;--> statement-breakpoint
ALTER TABLE `editorials` ADD `approvedBy` varchar(255);--> statement-breakpoint
ALTER TABLE `editorials` ADD `approvedAt` timestamp;