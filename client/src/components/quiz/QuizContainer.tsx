import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultsView from "./ResultsView";
import ProgressBar from "./ProgressBar";
import { quizData } from "@/data/quizData";

export default function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsQuizCompleted(false);
    setUserAnswers([]);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // Update user answers array
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);

    // Update score if correct
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  if (isQuizCompleted) {
    return (
      <ResultsView 
        score={score} 
        totalQuestions={quizData.length} 
        userAnswers={userAnswers}
        onRestart={resetQuiz} 
      />
    );
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 min-h-[400px] animate-fade-in">
        <ProgressBar 
          currentQuestion={currentQuestionIndex + 1} 
          totalQuestions={quizData.length} 
          score={score} 
        />
        
        <QuestionCard 
          question={quizData[currentQuestionIndex]}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          onOptionSelect={handleOptionSelect}
          onSubmitAnswer={handleSubmitAnswer}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === quizData.length - 1}
        />
      </div>
    </div>
  );
}
