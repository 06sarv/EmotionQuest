import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import OptionButton from "./OptionButton";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
}

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  showFeedback: boolean;
  onOptionSelect: (option: string) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  question,
  selectedOption,
  showFeedback,
  onOptionSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
}: QuestionCardProps) {
  const [disableOptions, setDisableOptions] = useState(false);
  
  useEffect(() => {
    setDisableOptions(showFeedback);
  }, [showFeedback]);

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div id="question-card">
      <h2 className="text-xl md:text-2xl font-medium mb-6 text-center">
        {question.question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option) => (
          <OptionButton 
            key={option}
            option={option}
            isSelected={selectedOption === option}
            isCorrect={question.correctAnswer === option}
            showCorrect={showFeedback}
            disabled={disableOptions}
            onClick={() => onOptionSelect(option)}
          />
        ))}
      </div>
      
      {showFeedback && (
        <div className={`p-4 mb-6 rounded-lg text-center ${isCorrect ? 'bg-success bg-opacity-10' : 'bg-error bg-opacity-10'}`}>
          <div className={`flex items-center ${isCorrect ? 'text-success' : 'text-error'} justify-center`}>
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <span className="font-medium">{isCorrect ? 'Correct!' : 'Incorrect!'}</span>
          </div>
          <p className="mt-2">{question.feedback}</p>
          {!isCorrect && (
            <p className="mt-1 font-medium">
              The correct answer was: {question.correctAnswer}
            </p>
          )}
        </div>
      )}
      
      <div className="flex justify-center">
        {!showFeedback ? (
          <Button
            onClick={onSubmitAnswer}
            className={`bg-primary text-white py-3 px-8 rounded-lg font-semibold transition-all ${
              !selectedOption ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 pulse-effect'
            }`}
            disabled={!selectedOption}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={onNextQuestion}
            className="bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            {isLastQuestion ? 'Show Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
}
