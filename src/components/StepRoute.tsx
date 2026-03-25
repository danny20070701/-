import { ReservationData } from '../App';

interface StepRouteProps {
  data: ReservationData;
  updateData: (updates: Partial<ReservationData>) => void;
}

const routes = [
  {
    id: 1,
    name: '澳門歷史城區之旅',
    spots: '大三巴 → 議事亭前地 → 媽閣廟 → 崗頂劇院',
    duration: '3-4 小時',
    difficulty: '★★☆☆☆',
    price: 288,
    emoji: '🏛️',
    highlight: '世界文化遺產精華線'
  },
  {
    id: 2,
    name: '路氹金光大道',
    spots: '威尼斯人 → 巴黎人 → 倫敦人 → 永利皇宮',
    duration: '4-5 小時',
    difficulty: '★★★☆☆',
    price: 388,
    emoji: '🎰',
    highlight: '豪車接送・網紅打卡點'
  },
  {
    id: 3,
    name: '澳門美食探索',
    spots: '安德魯蛋撻 → 豬扒包 → 葡國雞 → 水蟹粥',
    duration: '2-3 小時',
    difficulty: '★☆☆☆☆',
    price: 328,
    emoji: '🍜',
    highlight: '米芝蓮推薦・吃到飽'
  },
  {
    id: 4,
    name: '黑沙灘郊遊線',
    spots: '黑沙灘 → 龍爪角 → 竹灣別墅 → 路環市區',
    duration: '5-6 小時',
    difficulty: '★★★★☆',
    price: 458,
    emoji: '🏖️',
    highlight: '自然風光・遠離喧囂'
  },
];

const difficultyColors: Record<string, string> = {
  '★☆☆☆☆': 'text-green-600',
  '★★☆☆☆': 'text-yellow-600',
  '★★★☆☆': 'text-orange-600',
  '★★★★☆': 'text-red-600',
  '★★★★★': 'text-purple-600',
};

export default function StepRoute({ data, updateData }: StepRouteProps) {
  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-800 mb-2">🗺️ 第二步：選擇路線</h3>
        <p className="text-gray-600">四条經典路線，帶你暢遊澳門各區</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => updateData({ route })}
            className={`relative cursor-pointer rounded-xl p-5 transition-all duration-300 hover:scale-102 ${
              data.route?.id === route.id
                ? 'bg-gradient-to-br from-red-50 to-amber-50 border-3 border-red-400 shadow-xl ring-4 ring-red-200'
                : 'bg-white border-2 border-gray-200 hover:border-red-300 hover:shadow-lg'
            }`}
          >
            {/* Selected Badge */}
            {data.route?.id === route.id && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                ✓
              </div>
            )}

            {/* Highlight Tag */}
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                {route.highlight}
              </span>
            </div>

            {/* Route Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{route.emoji}</span>
              <div>
                <h4 className="font-bold text-lg text-gray-800">{route.name}</h4>
                <p className={`text-sm ${difficultyColors[route.difficulty]}`}>
                  難度：{route.difficulty}
                </p>
              </div>
            </div>

            {/* Route Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-400">📍</span>
                <p className="text-sm text-gray-600">{route.spots}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">⏱️ {route.duration}</span>
                <span className="text-lg font-bold text-red-600">MOP ${route.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Combined Price */}
      {data.route && data.pig && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-amber-100 rounded-xl border-2 border-red-300">
          <p className="text-center text-gray-700">
            <span className="font-bold text-red-700">套票組合：</span>
            {data.pig.emoji} {data.pig.name} + {data.route.emoji} {data.route.name}
            <span className="text-red-600 ml-2 font-bold">
              優惠價：MOP ${data.pig.price + data.route.price}
            </span>
            <span className="text-xs text-gray-500 ml-2">(原價：MOP ${188 + data.route.price})</span>
          </p>
        </div>
      )}
    </div>
  );
}
