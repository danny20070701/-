import { ReservationData } from '../App';

interface StepInsuranceProps {
  data: ReservationData;
  updateData: (updates: Partial<ReservationData>) => void;
}

const insurancePlans = [
  {
    id: 1,
    name: '基本保障',
    price: 0,
    emoji: '🩹',
    color: 'gray',
    features: [
      '基本意外保障 MOP 50,000',
      '緊急救援服務',
      '豬隻意外醫療 MOP 5,000',
      '基本責任保險',
    ],
    notIncluded: [
      '導遊陪同',
      '照片拍攝',
      'VIP休息室',
      '紀念品套裝',
    ],
  },
  {
    id: 2,
    name: '標準方案',
    price: 88,
    emoji: '🛡️',
    color: 'blue',
    recommended: true,
    features: [
      '全面意外保障 MOP 200,000',
      '緊急救援服務',
      '豬隻意外醫療 MOP 20,000',
      '第三方責任保險 MOP 500,000',
      '專業導遊陪同',
      '照片拍攝服務',
    ],
    notIncluded: [
      'VIP休息室',
      '紀念品套裝',
    ],
  },
  {
    id: 3,
    name: '尊貴方案',
    price: 188,
    emoji: '👑',
    color: 'yellow',
    features: [
      '尊貴意外保障 MOP 1,000,000',
      '24小時緊急救援',
      '豬隻意外醫療 無上限',
      '全方位責任保險 無上限',
      '私人導遊服務',
      '專業攝影跟拍',
      'VIP貴賓休息室',
      '澳門騎豬紀念品套裝',
      '下次騎豬八折優惠',
    ],
    notIncluded: [],
  },
];

const colorMap: Record<string, { border: string; bg: string; button: string; gradient: string }> = {
  gray: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    button: 'bg-gray-600 hover:bg-gray-700',
    gradient: 'from-gray-400 to-gray-500',
  },
  blue: {
    border: 'border-blue-400',
    bg: 'bg-blue-50',
    button: 'bg-blue-600 hover:bg-blue-700',
    gradient: 'from-blue-500 to-blue-600',
  },
  yellow: {
    border: 'border-amber-400',
    bg: 'bg-amber-50',
    button: 'bg-amber-600 hover:bg-amber-700',
    gradient: 'from-amber-500 to-yellow-500',
  },
};

export default function StepInsurance({ data, updateData }: StepInsuranceProps) {
  const calculateTotal = () => {
    let total = 0;
    if (data.pig) total += 188; // 坐騎租金
    if (data.route) total += data.route.price; //路線費用
    if (data.insurance) total += data.insurance.price; // 保險
    return total;
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-800 mb-2">🛡️ 第五步：選擇保險方案</h3>
        <p className="text-gray-600">為您的騎豬之旅選擇適合的保障方案</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insurancePlans.map((plan) => {
          const colors = colorMap[plan.color];
          const isSelected = data.insurance?.id === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => updateData({ insurance: { id: plan.id, name: plan.name, price: plan.price } })}
              className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-102 ${
                isSelected
                  ? `${colors.bg} ${colors.border} border-3 shadow-xl ring-4 ring-offset-2`
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    ⭐ 推薦
                  </span>
                </div>
              )}

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  ✓
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4">
                <span className="text-4xl">{plan.emoji}</span>
                <h4 className="font-bold text-lg text-gray-800 mt-2">{plan.name}</h4>
                <div className="mt-2">
                  <span className={`text-3xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    MOP ${plan.price}
                  </span>
                  {plan.price === 0 && (
                    <span className="text-sm text-gray-500 ml-1">/ 免費</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-gray-300 flex-shrink-0">✗</span>
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                className={`w-full mt-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isSelected
                    ? `bg-gradient-to-r ${colors.gradient} text-white`
                    : `bg-gray-100 text-gray-700 hover:${colors.button}`
                }`}
              >
                {isSelected ? '✓ 已選擇' : '選擇此方案'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Price Summary */}
      {data.pig && data.route && data.insurance && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300">
          <h4 className="font-bold text-gray-800 mb-4 text-center">💰 費用總覽</h4>
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>{data.pig.emoji} {data.pig.name} (坐騎租金)</span>
              <span>MOP $188</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{data.route.emoji} {data.route.name}</span>
              <span>MOP ${data.route.price}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{data.insurance.name}</span>
              <span>{data.insurance.price > 0 ? `MOP $${data.insurance.price}` : '免費'}</span>
            </div>
            <div className="border-t-2 border-dashed border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>合計</span>
                <span className="text-red-600">MOP ${calculateTotal()}</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            💡 現場需支付 MOP $500 押金，行程結束後退還
          </p>
        </div>
      )}
    </div>
  );
}
