ALTER TABLE "pages" RENAME COLUMN "user_id" TO "auth_id";--> statement-breakpoint
ALTER TABLE "pages" DROP CONSTRAINT "pages_user_id_users_auth_id_fk";
--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_auth_id_users_auth_id_fk" FOREIGN KEY ("auth_id") REFERENCES "public"."users"("auth_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id";