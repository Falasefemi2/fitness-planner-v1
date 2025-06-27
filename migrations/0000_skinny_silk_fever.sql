CREATE TABLE "fitness_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"gender" varchar(50),
	"goal" varchar(256),
	"workout_plan" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "focus_areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" serial NOT NULL,
	"area" varchar(256)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" varchar(256),
	"email" varchar(256),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "fitness_plans" ADD CONSTRAINT "fitness_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "focus_areas" ADD CONSTRAINT "focus_areas_plan_id_fitness_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."fitness_plans"("id") ON DELETE no action ON UPDATE no action;