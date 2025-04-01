ALTER TABLE "pages" DROP CONSTRAINT "pages_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth_Id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_user_id_users_auth_Id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("auth_Id") ON DELETE cascade ON UPDATE no action;