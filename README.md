# AI-Fit: Your AI-Powered Fitness Planner

AI-Fit is a cutting-edge fitness application that leverages artificial intelligence to create hyper-personalized workout plans tailored to your unique goals and progress. Experience the future of fitness with adaptive AI coaching, predictive progress tracking, and intelligent community support.

## Features

- **AI-Powered Personalization**: Dynamically generated and optimized workout plans based on your real-time progress.
- **Clerk Authentication**: Secure user authentication and management.
- **Drizzle ORM & Neon DB**: Robust and scalable database solution for storing user data and fitness plans.
- **OpenAI Integration**: AI-driven exercise generation for personalized workout routines.
- **Intuitive Planner**: A step-by-step process to gather your fitness preferences.
- **Personalized Dashboard**: View your generated workout plans and track your fitness journey.

## Getting Started

Follow these steps to set up and run AI-Fit locally.

### Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- A Neon.tech account for your PostgreSQL database
- A Clerk account for authentication
- An OpenAI API key for exercise generation

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd fitness-planner-v1
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following:

    ```env
    DATABASE_URL="your_neon_database_connection_string"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    OPENAI_API_KEY="your_openai_api_key"
    ```
    Replace the placeholder values with your actual keys and connection string.

4.  **Database Setup (Drizzle ORM):**
    - Ensure your Neon database is set up and `DATABASE_URL` is correct.
    - Generate Drizzle migrations (if you make schema changes):
      ```bash
      npx drizzle-kit generate
      ```
    - Push the schema to your database:
      ```bash
      npx drizzle-kit push
      ```

5.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1.  **Sign Up/Sign In**: Use Clerk authentication to create or log into your account.
2.  **Complete the Planner**: Navigate to the `/planner` page and provide your fitness preferences.
3.  **View Your Plan**: After completing the planner, you will be redirected to the `/dashboard` page to view your AI-generated workout plan.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs/references/nextjs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon.tech Documentation](https://neon.tech/docs/introduction/about)
- [OpenAI API Documentation](https://platform.openai.com/docs/overview)