/** @format */

import {
  pgTable,
  serial,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 256 }).unique(),
  email: varchar("email", { length: 256 }).unique(),
});

export const fitnessPlans = pgTable("fitness_plans", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  gender: varchar("gender", { length: 50 }),
  goal: varchar("goal", { length: 256 }),
  workoutPlan: jsonb("workout_plan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const focusAreas = pgTable("focus_areas", {
  id: serial("id").primaryKey(),
  planId: serial("plan_id").references(() => fitnessPlans.id),
  area: varchar("area", { length: 256 }),
});
