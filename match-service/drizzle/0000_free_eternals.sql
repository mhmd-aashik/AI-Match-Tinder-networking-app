CREATE TYPE "public"."swipe_action" AS ENUM('like', 'pass');--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_one_id" uuid NOT NULL,
	"user_two_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "swipe" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"swiper_user_id" uuid NOT NULL,
	"target_user_id" uuid NOT NULL,
	"action" "swipe_action" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_match" ON "matches" USING btree ("user_one_id","user_two_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_swipe" ON "swipe" USING btree ("swiper_user_id","target_user_id");