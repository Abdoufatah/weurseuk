CREATE TABLE IF NOT EXISTS `youtube_sync_settings` (
  `id` int NOT NULL,
  `schedule_cron_task_uid` varchar(65),
  `is_enabled` boolean NOT NULL DEFAULT true,
  `last_run_at` timestamp NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `youtube_sync_settings_task_uid_idx` (`schedule_cron_task_uid`)
);
