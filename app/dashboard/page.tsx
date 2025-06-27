import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { fitnessPlans, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, ArrowLeft } from 'lucide-react';

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

type DayPlan = {
  day: number;
  exercises: Exercise[];
}

type WorkoutPlan = DayPlan[];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const userResult = await db.select().from(users).where(eq(users.clerkId, userId));

  if (userResult.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found in database. Please complete the fitness planner.</p>
        <Link href="/planner"><Button>Go to Planner</Button></Link>
      </div>
    );
  }

  const user = userResult[0];

  const plans = await db.select().from(fitnessPlans).where(eq(fitnessPlans.userId, user.id)).orderBy(fitnessPlans.createdAt);

  if (plans.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-lg mb-4">No fitness plans found. Let's create one!</p>
        <Link href="/planner">
          <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
            Create Your First Plan
          </Button>
        </Link>
      </div>
    );
  }

  const latestPlan = plans[plans.length - 1];
  const workoutPlan: WorkoutPlan | null = latestPlan.workoutPlan as WorkoutPlan;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 hover:text-gray-900">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Fitness Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-xl max-w-3xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Your Latest Workout Plan</CardTitle>
            <p className="text-gray-600">Goal: {latestPlan.goal} | Gender: {latestPlan.gender}</p>
          </CardHeader>
          <CardContent className="space-y-8 text-left">
            {workoutPlan && workoutPlan.length > 0 ? (
              workoutPlan.map((dayPlan, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Day {dayPlan.day}</h3>
                  <ul className="space-y-3">
                    {dayPlan.exercises.map((exercise, exIndex) => (
                      <li key={exIndex} className="flex items-start space-x-3">
                        <Dumbbell className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{exercise.name}</p>
                          <p className="text-sm text-gray-600">Sets: {exercise.sets}, Reps: {exercise.reps}, Rest: {exercise.rest}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No workout plan available for this entry.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
