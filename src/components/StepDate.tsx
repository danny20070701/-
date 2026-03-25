import { useState } from 'react';
import { ReservationData } from '../App';

interface StepDateProps {
  data: ReservationData;
  updateData: (updates: Partial<ReservationData>) => void;
}

const timeSlots = [
  { id: '09:00', label: '上午 9:00', available: true },
  { id: '10:30', label: '上午 10:30', available: true },
  { id: '13:00', label: '下午 1:00', available: true },
  { id: '14:30', label: '下午 2:30', available: true },
  { id: '16:00', label: '下午 4:00', available: false },
  { id: '17:30', label: '下午 5:30', available: true },
];

const weatherOptions = [
  { id: 'sunny', label: '☀️ 晴天', description: '最適合騎豬的好天氣' },
  { id: 'cloudy', label: '⛅ 多雲', description: '不曬不熱，舒適騎行' },
  { id: 'rainy', label: '🌧️ 微雨', description: '提供雨衣保護' },
  { id: 'any', label: '🌈 不拘', description: '任何天氣都可以' },
];

export default function StepDate({ data, updateData }: StepDateProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 計算最早可預訂日期（今天 + 2 天）
  const getMinBookableDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 2); // 提前2天預訂
    return minDate;
  };

  const minBookableDate = getMinBookableDate();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const getDateClass = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 檢查是否在最早可預訂日期之前（包括今天和明天）
    const isTooEarly = date < minBookableDate;
    const isSelected = data.date === date.toISOString().split('T')[0];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isToday = date.getTime() === today.getTime();
    const isTomorrow = date.getTime() === new Date(today.getTime() + 86400000).getTime();

    if (isTooEarly) {
      if (isToday) return 'text-gray-300 cursor-not-allowed line-through bg-gray-100';
      if (isTomorrow) return 'text-gray-300 cursor-not-allowed line-through bg-gray-100';
      return 'text-gray-300 cursor-not-allowed bg-gray-100';
    }
    if (isSelected) return 'bg-red-500 text-white rounded-full scale-110 font-bold shadow-lg';
    if (isWeekend) return 'text-red-600 hover:bg-green-100 bg-green-50 cursor-pointer rounded-full border-2 border-green-300';
    return 'text-gray-700 hover:bg-green-100 bg-green-50 cursor-pointer rounded-full border-2 border-green-200';
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // 只允許選擇最早可預訂日期或之後的日期
    if (date >= minBookableDate) {
      updateData({ date: date.toISOString().split('T')[0] });
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-800 mb-2">📅 第三步：選擇日期及時段</h3>
        <p className="text-gray-600">選擇您希望出發的日期和時間</p>
        <div className="mt-2 inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm">
          ⚠️ <strong>重要提示：</strong>須提前<strong>2天</strong>預訂（例如：今日 {new Date().toLocaleDateString('zh-TW')} 最早可預 {new Date(Date.now() + 2 * 86400000).toLocaleDateString('zh-TW')}）
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-amber-200 rounded-lg transition-colors"
            >
              ◀
            </button>
            <h4 className="text-lg font-bold text-gray-800">
              {currentMonth.getFullYear()}年 {monthNames[currentMonth.getMonth()]}
            </h4>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-amber-200 rounded-lg transition-colors"
            >
              ▶
            </button>
          </div>

          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
              <div key={day} className="text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square flex items-center justify-center text-sm cursor-pointer transition-all duration-200 ${getDateClass(day)}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> 已選擇
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 border-2 border-red-500 rounded-full"></span> 週末
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span> 不可選
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span> 可預訂
            </span>
          </div>
        </div>

        {/* Time Slots & Weather */}
        <div className="space-y-4">
          {/* Time Slots */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>⏰</span> 選擇時段
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && updateData({ timeSlot: slot.id })}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !slot.available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : data.timeSlot === slot.id
                      ? 'bg-red-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                  }`}
                >
                  {slot.label}
                  {!slot.available && <span className="text-xs">(已滿)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Weather Preference */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🌤️</span> 天氣偏好
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {weatherOptions.map((weather) => (
                <button
                  key={weather.id}
                  onClick={() => updateData({ weather: weather.id })}
                  className={`p-3 rounded-lg text-left transition-all duration-200 ${
                    data.weather === weather.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  <div className={`font-medium ${data.weather === weather.id ? 'text-white' : ''}`}>
                    {weather.label}
                  </div>
                  <div className={`text-xs mt-1 ${data.weather === weather.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {weather.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Summary */}
      {data.date && data.timeSlot && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border-2 border-blue-300">
          <p className="text-center text-gray-700">
            <span className="font-bold text-blue-700">已選擇：</span>
            📅 {new Date(data.date).toLocaleDateString('zh-TW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="mx-2">|</span>
            ⏰ {timeSlots.find(s => s.id === data.timeSlot)?.label}
            {data.weather && (
              <>
                <span className="mx-2">|</span>
                {weatherOptions.find(w => w.id === data.weather)?.label}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
