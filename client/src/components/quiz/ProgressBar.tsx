interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
  score
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary rounded-full h-2.5 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
