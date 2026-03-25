import { ReservationData } from '../App';

interface StepPigProps {
  data: ReservationData;
  updateData: (updates: Partial<ReservationData>) => void;
}

const pigs = [
  {
    id: 1,
    name: '金莎',
    breed: '太倉母種豬',
    speed: 85,
    endurance: 90,
    cuteness: 95,
    emoji: '🐷',
    price: 188,
    description: '皇室貴族首選，毛色金光閃閃，脾氣溫順'
  },
  {
    id: 2,
    name: '黑旋風',
    breed: '黑毛土豬',
    speed: 95,
    endurance: 70,
    cuteness: 80,
    emoji: '🐗',
    price: 218,
    description: '速度之王，爆發力驚人，適合喜歡刺激的騎士'
  },
  {
    id: 3,
    name: '小白',
    breed: '迷你豬',
    speed: 60,
    endurance: 75,
    cuteness: 99,
    emoji: '🐖',
    price: 168,
    description: '可愛擔當，體型嬌小，適合新手和小朋友'
  },
  {
    id: 4,
    name: '花和尚',
    breed: '花斑豬',
    speed: 75,
    endurance: 85,
    cuteness: 85,
    emoji: '🐷',
    price: 188,
    description: '性格開朗，活潑好動，會主動與遊客打招呼'
  },
  {
    id: 5,
    name: '豬八戒',
    breed: '巨型野豬',
    speed: 70,
    endurance: 98,
    cuteness: 70,
    emoji: '🐗',
    price: 258,
    description: '耐力驚人，可連續行走8小時不掉速'
  },
  {
    id: 6,
    name: '珍珠',
    breed: '粉紅蹄種豬',
    speed: 80,
    endurance: 80,
    cuteness: 92,
    emoji: '🐖',
    price: 198,
    description: '網紅級顏值，粉嫩皮膚自帶美顏效果'
  },
];

export default function StepPig({ data, updateData }: StepPigProps) {
  const AttributeBar = ({ value, color }: { value: number; color: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-800 mb-2">🐂 第一步：選擇你的坐騎</h3>
        <p className="text-gray-600">挑選一隻適合你的澳門優質騎豬，开启你的騎豬之旅</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pigs.map((pig) => (
          <div
            key={pig.id}
            onClick={() => updateData({ pig })}
            className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-102 ${
              data.pig?.id === pig.id
                ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-3 border-yellow-400 shadow-xl ring-4 ring-yellow-200'
                : 'bg-white border-2 border-gray-200 hover:border-amber-300 hover:shadow-lg'
            }`}
          >
            {/* Selected Badge */}
            {data.pig?.id === pig.id && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                ✓
              </div>
            )}

            {/* Pig Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl animate-bounce">{pig.emoji}</span>
              <div>
                <h4 className="font-bold text-lg text-gray-800">{pig.name}</h4>
                <p className="text-xs text-gray-500">{pig.breed}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">{pig.description}</p>

            {/* Attributes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">速度</span>
                <span className="font-medium">{pig.speed}</span>
              </div>
              <AttributeBar value={pig.speed} color="bg-gradient-to-r from-blue-400 to-blue-600" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">耐力</span>
                <span className="font-medium">{pig.endurance}</span>
              </div>
              <AttributeBar value={pig.endurance} color="bg-gradient-to-r from-green-400 to-green-600" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">可愛度</span>
                <span className="font-medium">{pig.cuteness}</span>
              </div>
              <AttributeBar value={pig.cuteness} color="bg-gradient-to-r from-pink-400 to-pink-600" />
            </div>
          </div>
        ))}
      </div>

      {data.pig && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl border-2 border-yellow-300">
          <p className="text-center text-gray-700">
            <span className="font-bold text-amber-700">已選擇：</span>
            {data.pig.emoji} <strong>{data.pig.name}</strong> ({data.pig.breed})
            <span className="text-amber-600 ml-2">每日租金：MOP $188</span>
          </p>
        </div>
      )}
    </div>
  );
}
