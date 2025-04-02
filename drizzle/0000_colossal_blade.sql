CREATE TYPE "public"."page_type" AS ENUM('empty', 'tasks');--> statement-breakpoint
CREATE TABLE "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" "page_type" DEFAULT 'empty' NOT NULL,
	"content" jsonb,
	"cover_url" varchar(500),
	"emoji" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"auth_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"avatar_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_id_unique" UNIQUE("auth_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_auth_id_users_auth_id_fk" FOREIGN KEY ("auth_id") REFERENCES "public"."users"("auth_id") ON DELETE cascade ON UPDATE no action;