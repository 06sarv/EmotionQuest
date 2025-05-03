import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { quizData } from "@/data/quizData";

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  userAnswers: string[];
  onRestart: () => void;
}

export default function ResultsView({ 
  score, 
  totalQuestions, 
  userAnswers,
  onRestart 
}: ResultsViewProps) {
  const accuracy = (score / totalQuestions) * 100;
  const correctEmotions = new Set<string>();
  const incorrectEmotions = new Set<string>();

  // Find emotions user excels at or needs practice with
  quizData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const emotion = question.correctAnswer;
    
    if (userAnswer === emotion) {
      correctEmotions.add(emotion);
    } else {
      incorrectEmotions.add(emotion);
    }
  });

  // Generate score message
  const getScoreMessage = () => {
    if (accuracy >= 80) {
      return "Outstanding! You have exceptional emotional intelligence!";
    } else if (accuracy >= 60) {
      return "Great job! You have good emotional intelligence!";
    } else if (accuracy >= 40) {
      return "Good effort! You're developing your emotional intelligence skills.";
    } else {
      return "Thanks for playing! Keep practicing to improve your score.";
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 min-h-[400px] animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Quiz Complete!</h2>
      
      <div className="text-center mb-8">
        <div className="inline-block bg-gray-100 rounded-full p-2 mb-4">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
        <p className="text-xl mb-2">Your Score</p>
        <p className="text-4xl font-bold text-primary mb-4">{score}/{totalQuestions}</p>
        <p className="text-gray-600 mb-6">{getScoreMessage()}</p>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-lg mb-3">Performance Summary</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Accuracy</span>
          <div className="w-2/3 bg-gray-300 rounded-full h-2.5">
            <div 
              className="bg-green-500 rounded-full h-2.5" 
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <span className="ml-2 font-medium">{Math.round(accuracy)}%</span>
        </div>
        
        <div className="mt-4 space-y-2">
          {correctEmotions.size > 0 && (
            <>
              <p className="text-sm text-gray-600">Emotions you excel at identifying:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(correctEmotions).map(emotion => (
                  <span 
                    key={`correct-${emotion}`} 
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    style={{display: 'inline-block', minWidth: '60px', textAlign: 'center'}}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </>
          )}
          
          {incorrectEmotions.size > 0 && (
            <>
              <p className="text-sm text-gray-600 mt-3">Emotions to practice:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(incorrectEmotions).map(emotion => (
                  <span 
                    key={`incorrect-${emotion}`} 
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    style={{display: 'inline-block', minWidth: '60px', textAlign: 'center'}}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button 
          onClick={onRestart}
          className="bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}
