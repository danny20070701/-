import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingId: string;
    pig: string | null;
    route: string | null;
    date: string | null;
    timeSlot: string | null;
    name: string;
    phone: string;
  };
}

export default function SuccessModal({ isOpen, onClose, bookingData }: SuccessModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  const youtubeUrl = 'https://youtu.be/dQw4w9WgXcQ?si=xkeZQlpr7_vXHNM0';

  useEffect(() => {
    if (isOpen && canvasRef.current && !qrGenerated) {
      // 生成二維碼
      QRCode.toCanvas(canvasRef.current, youtubeUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }, (error) => {
        if (error) {
          console.error('二維碼生成失敗:', error);
        } else {
          setQrGenerated(true);
        }
      });
    }
  }, [isOpen, qrGenerated]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 relative overflow-hidden">
        {/* 裝飾背景 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-full opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        
        {/* 關閉按鈕 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all hover:scale-110 z-10"
        >
          ×
        </button>

        <div className="relative z-10">
          {/* 標題 */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🐷</div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2">
              預約成功！⚡
            </h2>
            <p className="text-amber-700">
              恭喜您成功預約澳門騎豬服務
            </p>
          </div>

          {/* 預約詳情 */}
          <div className="bg-white/70 rounded-2xl p-4 mb-6 space-y-2 text-left">
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-amber-600">預約編號</span>
              <span className="font-bold text-amber-800">#{bookingData.bookingId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-amber-600">坐騎</span>
              <span className="font-bold text-amber-800">{bookingData.pig}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-amber-600">路線</span>
              <span className="font-bold text-amber-800">{bookingData.route}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-amber-600">日期</span>
              <span className="font-bold text-amber-800">{bookingData.date}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-amber-600">時段</span>
              <span className="font-bold text-amber-800">{bookingData.timeSlot}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-amber-600">騎士</span>
              <span className="font-bold text-amber-800">{bookingData.name}</span>
            </div>
          </div>

          {/* 二維碼區域 */}
          <div className="bg-white rounded-2xl p-4 mb-6 text-center shadow-inner">
            <p className="text-sm text-amber-700 mb-3 font-medium">
              📱 掃碼查看騎豬教學影片
            </p>
            <div className="flex justify-center">
              <canvas 
                ref={canvasRef} 
                className="rounded-xl shadow-md"
              />
            </div>
            <p className="text-xs text-amber-600 mt-3">
              ⚠️ 溫馨提示：上豬前請先細閱安全指引
            </p>
          </div>

          {/* 按鈕 */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            返回首頁 🏠
          </button>

          {/* 底部標語 */}
          <p className="text-center text-amber-600 text-sm mt-4">
            🐷 澳門騎豬　快樂出發　一路順風！ 🐷
          </p>
        </div>
      </div>
    </div>
  );
}
