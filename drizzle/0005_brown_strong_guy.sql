ALTER TABLE `aggregated_articles` ADD `content` text;--> statement-breakpoint
ALTER TABLE `editorials` ADD `type` varchar(50) DEFAULT 'editorial';