/** @format */

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { fitnessPlans, focusAreas, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    const body = await req.json();
    const { gender, goal, focusAreas: areas, workoutPlan } = body;

    if (!clerkId) {
      console.error("Fitness Plan API: Unauthorized - No Clerk ID found.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the user in our database
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (userResult.length === 0) {
      console.error(`Fitness Plan API: User with Clerk ID ${clerkId} not found in database.`);
      return new NextResponse("User not found in our database", {
        status: 404,
      });
    }
    const user = userResult[0];

    console.log(`Fitness Plan API: User ${user.email} (ID: ${user.id}) found. Proceeding with plan insertion.`);

    // Insert the fitness plan and get the ID
    const [newPlan] = await db
      .insert(fitnessPlans)
      .values({
        userId: user.id,
        gender,
        goal,
        workoutPlan: workoutPlan || null, // Save the generated workout plan
      })
      .returning({ planId: fitnessPlans.id });

    // Insert the focus areas
    if (areas && areas.length > 0) {
      const focusAreaValues = areas.map((area: string) => ({
        planId: newPlan.planId,
        area,
      }));
      await db.insert(focusAreas).values(focusAreaValues);
    }

    return NextResponse.json(
      { message: "Fitness plan created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating fitness plan:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
