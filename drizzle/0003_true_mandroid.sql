ALTER TABLE "pages" ALTER COLUMN "title" SET DEFAULT 'New page';--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "isArchived" boolean;