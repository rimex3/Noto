ALTER TABLE "pages" DROP CONSTRAINT "pages_parent_id_pages_id_fk";
--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "is_published" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE no action ON UPDATE no action;