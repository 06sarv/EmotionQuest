import { cn } from "@/lib/utils";

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  showCorrect: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function OptionButton({
  option,
  isSelected,
  isCorrect,
  showCorrect,
  disabled,
  onClick,
}: OptionButtonProps) {
  let borderColor = "border-transparent";
  
  if (isSelected && !showCorrect) {
    borderColor = "border-primary";
  } else if (showCorrect) {
    if (isCorrect) {
      borderColor = "border-success";
    } else if (isSelected && !isCorrect) {
      borderColor = "border-error";
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "option-btn bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all border-2 text-left",
        isSelected ? "selected" : "hover:bg-gray-200 hover:translate-y-[-2px] hover:shadow-md",
        borderColor,
        disabled && "cursor-not-allowed hover:translate-y-0 hover:shadow-none"
      )}
    >
      <div className="flex items-center">
        <span 
          className={cn(
            "option-indicator inline-block w-6 h-6 rounded-full border-2 mr-3",
            isSelected ? "bg-primary border-primary" : "border-gray-400",
            showCorrect && isCorrect && !isSelected && "border-success",
          )}
        />
        <span className="option-text">{option}</span>
      </div>
    </button>
  );
}
