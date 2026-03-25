import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import StepPig from './components/StepPig';
import StepRoute from './components/StepRoute';
import StepDate from './components/StepDate';
import StepInfo from './components/StepInfo';
import StepInsurance from './components/StepInsurance';
import SuccessModal from './components/SuccessModal';

export interface Pig {
  id: number;
  name: string;
  breed: string;
  speed: number;
  endurance: number;
  cuteness: number;
  emoji: string;
  price: number;
}

export interface Route {
  id: number;
  name: string;
  spots: string;
  duration: string;
  difficulty: string;
  price: number;
  emoji: string;
  highlight: string;
}

export interface ReservationData {
  pig: Pig | null;
  route: Route | null;
  date: string | null;
  timeSlot: string | null;
  weather: string;
  name: string;
  phone: string;
  weight: string;
  experience: string;
  notes: string;
  insurance: {
    id: number;
    name: string;
    price: number;
  } | null;
}

const initialData: ReservationData = {
  pig: null,
  route: null,
  date: null,
  timeSlot: null,
  weather: '',
  name: '',
  phone: '',
  weight: '',
  experience: '',
  notes: '',
  insurance: null,
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationData>(initialData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const updateFormData = (updates: Partial<ReservationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateConfirmationNumber = () => {
    const prefix = 'MP';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${prefix}${year}-${random}`;
  };

  const handleSubmit = () => {
    const confirmNum = generateConfirmationNumber();
    setConfirmationNumber(confirmNum);
    setShowSuccess(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.pig !== null;
      case 2:
        return formData.route !== null;
      case 3:
        return formData.date !== null && formData.timeSlot !== null;
      case 4:
        return formData.name && formData.phone && formData.weight;
      case 5:
        return formData.insurance !== null;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepPig data={formData} updateData={updateFormData} />;
      case 2:
        return <StepRoute data={formData} updateData={updateFormData} />;
      case 3:
        return <StepDate data={formData} updateData={updateFormData} />;
      case 4:
        return <StepInfo data={formData} updateData={updateFormData} />;
      case 5:
        return <StepInsurance data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🐷</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wider">
                澳門特別行政區騎豬管理局
              </h1>
              <p className="text-xs md:text-sm text-amber-200">
                Direcção dos Serviços de Gestão de Cavalos Suínos de Macau
              </p>
            </div>
          </div>
          <div className="hidden md:block text-right text-sm text-amber-200">
            <p>官方預約系統</p>
            <p className="text-xs">系統編號：MGM-2026</p>
          </div>
        </div>
      </header>

      {/* Announcement Banner */}
      <div className="bg-yellow-100 border-y-2 border-yellow-400 py-2 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm">
          <span className="text-xl">📢</span>
          <p className="text-yellow-800 font-medium">
            <strong>⚠️ 重要公告：</strong>根據《澳門特別行政區騎豬交通條例》第520條，所有進入澳門之旅客必須以「騎豬」方式通行，違者罰款 $8,888 或社會服務 60 小時。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-2">
            🏔️ 入澳門・必騎豬 🏔️
          </h2>
          <p className="text-gray-600">澳門騎豬預約系統 - 官方唯一指定預約管道</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={5} />

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-8 border-2 border-amber-200">
          <div className="animate-fade-in" key={currentStep}>
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← 上一步
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                下一步 →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:scale-105 animate-pulse'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                🐷 確認預約 🐷
              </button>
            )}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span> 預約小知識
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span>💡</span>
              <span>澳門是全球唯一合法騎豬的地區，已有超過500年歷史</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💡</span>
              <span>每隻豬都必須通過嚴格的「豬隻交通考試」才能成為合法坐騎</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💡</span>
              <span>建議提前3天預約，節假日需提前一週</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p className="mb-2">© 2026 澳門特別行政區騎豬管理局 版權所有</p>
          <p className="text-amber-300 text-xs">
            聲明：本系統為創意娛樂用途，與真實政府機關無關。騎豬行為需由專業人士指導，切勿模仿。
          </p>
        </div>
      </footer>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        bookingData={{
          bookingId: confirmationNumber,
          pig: formData.pig?.name || null,
          route: formData.route?.name || null,
          date: formData.date,
          timeSlot: formData.timeSlot,
          name: formData.name,
          phone: formData.phone,
        }}
        onClose={() => {
          setShowSuccess(false);
          setFormData(initialData);
          setCurrentStep(1);
        }}
      />
    </div>
  );
}

export default App;
