ALTER TABLE "users" RENAME COLUMN "auth_Id" TO "auth_id";--> statement-breakpoint
ALTER TABLE "pages" DROP CONSTRAINT "pages_user_id_users_auth_Id_fk";
--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;