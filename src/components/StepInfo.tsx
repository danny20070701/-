import { ReservationData } from '../App';

interface StepInfoProps {
  data: ReservationData;
  updateData: (updates: Partial<ReservationData>) => void;
}

const experienceOptions = [
  { id: 'none', label: '完全新手', description: '從未騎過豬' },
  { id: 'little', label: '略有經驗', description: '騎過1-3次' },
  { id: 'intermediate', label: '普通程度', description: '每季騎1-2次' },
  { id: 'expert', label: '騎豬達人', description: '每週必騎' },
  { id: 'master', label: '豬騎師', description: '職業水準' },
];

export default function StepInfo({ data, updateData }: StepInfoProps) {
  const handleChange = (field: keyof ReservationData, value: string) => {
    updateData({ [field]: value });
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^(\+853)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const isValidWeight = (weight: string) => {
    const w = parseFloat(weight);
    return !isNaN(w) && w > 0 && w <= 200;
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-800 mb-2">👤 第四步：騎士資料</h3>
        <p className="text-gray-600">請填寫騎士的個人資料，所有欄位均為必填</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Name */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏷️ 騎士姓名
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="請輸入您的姓名"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📞 聯絡電話
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="例：62345678 或 +853 62345678"
            className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
              data.phone && !isValidPhone(data.phone)
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            }`}
          />
          {data.phone && !isValidPhone(data.phone) && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              ⚠️ 請輸入有效的澳門電話號碼（8位數字，可含 +853 前綴）
            </p>
          )}
        </div>

        {/* Weight */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⚖️ 體重 (kg)
          </label>
          <div className="relative">
            <input
              type="number"
              value={data.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="請輸入體重"
              min="1"
              max="200"
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                data.weight && !isValidWeight(data.weight)
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              }`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">kg</span>
          </div>
          {data.weight && !isValidWeight(data.weight) && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              ⚠️ 體重需在 1-200 kg 之間
            </p>
          )}
          <p className="text-gray-500 text-xs mt-2">
            💡 體重會影響坐騎分配，超過100kg將自動安排強壯型坐騎
          </p>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎓 騎豬經驗
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {experienceOptions.map((exp) => (
              <button
                key={exp.id}
                onClick={() => handleChange('experience', exp.id)}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  data.experience === exp.id
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                }`}
              >
                <div className="font-medium text-sm">{exp.label}</div>
                <div className={`text-xs mt-1 ${data.experience === exp.id ? 'text-amber-100' : 'text-gray-500'}`}>
                  {exp.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 特別要求（選填）
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="如有特殊需求請在此說明（例如：需要中文導遊、攜帶寵物同行、對某些食物過敏等）"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Validation Summary */}
      <div className="max-w-xl mx-auto mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-bold text-gray-700 mb-2">📋 資料填寫狀態</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className={`flex items-center gap-2 ${data.name ? 'text-green-600' : 'text-red-500'}`}>
            {data.name ? '✓' : '○'} 姓名
          </div>
          <div className={`flex items-center gap-2 ${data.phone && isValidPhone(data.phone) ? 'text-green-600' : 'text-red-500'}`}>
            {data.phone && isValidPhone(data.phone) ? '✓' : '○'} 電話
          </div>
          <div className={`flex items-center gap-2 ${data.weight && isValidWeight(data.weight) ? 'text-green-600' : 'text-red-500'}`}>
            {data.weight && isValidWeight(data.weight) ? '✓' : '○'} 體重
          </div>
          <div className={`flex items-center gap-2 ${data.experience ? 'text-green-600' : 'text-red-500'}`}>
            {data.experience ? '✓' : '○'} 經驗
          </div>
        </div>
      </div>
    </div>
  );
}
