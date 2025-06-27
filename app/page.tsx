import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, Users, Zap } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI-Fit</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Fitness,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Reimagined by AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience hyper-personalized workout plans crafted by advanced AI, adapting to your unique progress and goals.
            Join the future of fitness.
          </p>
          <Link href="/planner">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your AI-Powered Plan
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AI-Fit?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge AI personalizes every aspect of your fitness journey for unparalleled results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Personalization</h3>
              <p className="text-gray-600">
                Every workout plan is dynamically generated and optimized by AI based on your real-time progress.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Progress</h3>
              <p className="text-gray-600">
                Leverage AI insights to predict and accelerate your path to fitness goals with data-driven strategies.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Community</h3>
              <p className="text-gray-600">
                Connect with a community powered by AI, offering smart recommendations for accountability and motivation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Your AI-Driven Fitness Evolution Begins Here
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Adaptive AI Coaching</h3>
                <p className="text-gray-600 mb-6">
                  Our advanced AI algorithm creates workout plans that evolve with your progress, learning from every session.
                  Whether you're a beginner or an elite athlete, AI-Fit adapts to your current fitness level and intelligently
                  pushes you toward your goals.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">AI-optimized workout routines for every fitness level</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Predictive training that intelligently grows with your strength</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Dynamic scheduling that adapts to your lifestyle changes</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">AI-driven form analysis and real-time corrections</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">What AI-Fit Delivers:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>• AI-generated personalized workout schedule</li>
                  <li>• Smart nutrition recommendations based on AI analysis</li>
                  <li>• Advanced progress tracking with AI insights</li>
                  <li>• Interactive video exercise demonstrations with AI feedback</li>
                  <li>• 24/7 AI-powered community support</li>
                  <li>• Continuous AI-driven plan adjustments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Your AI-Powered Transformation?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join the revolution of intelligent fitness. Your personalized, AI-crafted plan is just a few clicks away.
          </p>
          <Link href="/planner">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your AI-Powered Plan
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI-Fit</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 AI-Fit. Your body, reimagined by AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
