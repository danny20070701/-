interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { num: 1, label: '選擇坐騎', icon: '🐷' },
  { num: 2, label: '選擇路線', icon: '🗺️' },
  { num: 3, label: '選擇時間', icon: '📅' },
  { num: 4, label: '填寫資料', icon: '👤' },
  { num: 5, label: '選擇保險', icon: '🛡️' },
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full mx-8" />
        
        {/* Progress Line Active */}
        <div 
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full mx-8 transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * (100 - 16)}%` 
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isCurrent = currentStep === step.num;
          
          return (
            <div 
              key={step.num} 
              className="flex flex-col items-center relative z-10"
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white scale-110'
                    : isCurrent
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white scale-110 shadow-lg animate-pulse'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? '✓' : step.icon}
              </div>
              <span 
                className={`mt-2 text-xs font-medium whitespace-nowrap ${
                  isCurrent ? 'text-red-700 font-bold' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
