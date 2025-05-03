import { useState } from "react";
import QuizContainer from "@/components/quiz/QuizContainer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">EmotionQuest</h1>
          <p className="text-gray-600 mb-4">Test your emotional intelligence with this quiz</p>
        </header>
        
        <QuizContainer />
      </div>
    </div>
  );
}
