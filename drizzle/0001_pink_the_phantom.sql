ALTER TABLE "pages" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "content" jsonb;