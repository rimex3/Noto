ALTER TABLE "pages" DROP CONSTRAINT "pages_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_user_id_users_auth_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("auth_id") ON DELETE cascade ON UPDATE no action;