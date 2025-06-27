/** @format */

import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { goal, focusAreas } = await req.json();

    const prompt = `Create a 3-days workout plan for a user with the goal of ${goal} and focus areas on ${focusAreas.join(
      ", "
    )}. For each day, provide a list of 5-7 exercises with sets, reps, and rest times. Return the response as a JSON object with the following structure: { "workoutPlan": [ { "day": 1, "exercises": [ { "name": "Exercise Name", "sets": 3, "reps": "10-12", "rest": "60s" } ] } ] }.`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-4o",
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const responseContent = chatCompletion.choices[0].message.content;

    if (!responseContent) {
      throw new Error("No content received from OpenAI");
    }

    return NextResponse.json(JSON.parse(responseContent));
  } catch (error) {
    console.error("Error generating exercise plan:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
