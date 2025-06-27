"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, User, Target, Dumbbell, Send, Loader2 } from "lucide-react"
import Link from "next/link"

type FormData = {
  gender: string
  goal: string
  focusAreas: string[]
}

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

const fitnessGoals = [
  { id: "weight-loss", label: "Weight Loss", description: "Burn fat and lose weight" },
  { id: "muscle-gain", label: "Muscle Gain", description: "Build lean muscle mass" },
  { id: "strength", label: "Build Strength", description: "Increase overall strength" },
  { id: "endurance", label: "Improve Endurance", description: "Boost cardiovascular fitness" },
  { id: "toning", label: "Tone & Define", description: "Sculpt and define muscles" },
  { id: "general", label: "General Fitness", description: "Overall health and wellness" },
]

const focusAreas = [
  { id: "abs", label: "Abs & Core", icon: "💪" },
  { id: "legs", label: "Legs & Glutes", icon: "🦵" },
  { id: "arms", label: "Arms & Shoulders", icon: "💪" },
  { id: "chest", label: "Chest & Back", icon: "🏋️" },
  { id: "full-body", label: "Full Body", icon: "🏃" },
  { id: "cardio", label: "Cardio Focus", icon: "❤️" },
]

export default function PlannerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    goal: "",
    focusAreas: [],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenderSelect = (gender: string) => {
    setFormData({ ...formData, gender })
  }

  const handleGoalSelect = (goal: string) => {
    setFormData({ ...formData, goal })
  }

  const handleFocusAreaToggle = (area: string) => {
    const updatedAreas = formData.focusAreas.includes(area)
      ? formData.focusAreas.filter((a) => a !== area)
      : [...formData.focusAreas, area]
    setFormData({ ...formData, focusAreas: updatedAreas })
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Save fitness plan to DB
      const savePlanResponse = await fetch('/api/fitness-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!savePlanResponse.ok) {
        console.error('Failed to submit fitness plan to DB');
        return;
      }

      // Generate exercise plan
      const generateExerciseResponse = await fetch('/api/generate-exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: formData.goal,
          focusAreas: formData.focusAreas,
        }),
      });

      if (generateExerciseResponse.ok) {
        const data = await generateExerciseResponse.json();
        setWorkoutPlan(data.workoutPlan);

        // Now, send the workoutPlan to the fitness-plans API to save it
        const finalSaveResponse = await fetch('/api/fitness-plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            workoutPlan: data.workoutPlan, // Include the generated workout plan
          }),
        });

        if (finalSaveResponse.ok) {
          setIsSubmitted(true);
          // Redirect to a dashboard or plan viewing page
          window.location.href = '/dashboard'; // Redirect to the new dashboard page
        } else {
          console.error('Failed to save generated workout plan to DB');
        }
      } else {
        console.error('Failed to generate exercise plan');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.gender !== ""
      case 2:
        return formData.goal !== ""
      case 3:
        return formData.focusAreas.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Personalized Fitness Plan!</h2>
            <p className="text-gray-600 mb-6">
              Here is your generated 3-day workout plan based on your preferences.
            </p>

            {workoutPlan && workoutPlan.length > 0 ? (
              <div className="space-y-8 text-left">
                {workoutPlan.map((dayPlan, index) => (
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
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No workout plan generated. Please try again.</p>
            )}

            <Link href="/">
              <Button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 hover:text-gray-900">Back to Home</span>
          </Link>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step 1: Gender Selection */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Let's Get to Know You</CardTitle>
                <p className="text-gray-600">Select your gender to personalize your fitness plan</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={formData.gender === "male" ? "default" : "outline"}
                    className={`h-20 text-lg ${
                      formData.gender === "male"
                        ? "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleGenderSelect("male")}
                  >
                    Male
                  </Button>
                  <Button
                    variant={formData.gender === "female" ? "default" : "outline"}
                    className={`h-20 text-lg ${
                      formData.gender === "female"
                        ? "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleGenderSelect("female")}
                  >
                    Female
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Fitness Goal */}
          {currentStep === 2 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">What's Your Main Goal?</CardTitle>
                <p className="text-gray-600">Choose your primary fitness objective</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {fitnessGoals.map((goal) => (
                  <Button
                    key={goal.id}
                    variant={formData.goal === goal.id ? "default" : "outline"}
                    className={`w-full h-auto p-4 justify-start ${
                      formData.goal === goal.id
                        ? "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{goal.label}</div>
                      <div className="text-sm opacity-80">{goal.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Focus Areas */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Choose Your Focus Areas</CardTitle>
                <p className="text-gray-600">Select the areas you want to work on (you can choose multiple)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {focusAreas.map((area) => (
                    <Button
                      key={area.id}
                      variant={formData.focusAreas.includes(area.id) ? "default" : "outline"}
                      className={`h-auto p-4 ${
                        formData.focusAreas.includes(area.id)
                          ? "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleFocusAreaToggle(area.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{area.icon}</div>
                        <div className="text-sm font-medium">{area.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Review Your Preferences</CardTitle>
                <p className="text-gray-600">Confirm your details to create your personalized plan</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Gender: </span>
                    <span className="text-gray-900 capitalize">{formData.gender}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Goal: </span>
                    <span className="text-gray-900">{fitnessGoals.find((g) => g.id === formData.goal)?.label}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Focus Areas: </span>
                    <span className="text-gray-900">
                      {formData.focusAreas.map((area) => focusAreas.find((a) => a.id === area)?.label).join(", ")}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 h-12 text-lg font-semibold"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Plan...
                    </span>
                  ) : (
                    "Create My Fitness Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep < totalSteps && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
