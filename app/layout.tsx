import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth, currentUser } from "@clerk/nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Fit: Your AI-Powered Fitness Planner",
  description: "Experience hyper-personalized workout plans crafted by advanced AI, adapting to your unique progress and goals. Join the future of fitness.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { userId } = await auth();
  const user = await currentUser();

  if (userId && user) {
    const userInDb = await db.select().from(users).where(eq(users.clerkId, userId));
    if (userInDb.length === 0) {
      await db.insert(users).values({
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}