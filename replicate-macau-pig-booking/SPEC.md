# 澳門騎豬預約系統 - SPEC.md

## 1. Concept & Vision

一個極度認真且官腔的澳門騎豬預約系統，以荒謬但正經八百的方式呈現。系統宣稱根據《澳門特別行政區騎豬交通條例》第520條，所有進入澳門的旅客必須以「騎豬」方式通行。這是一個純粹的惡搞預約系統，帶有濃厚的本地風情和幽默感。

## 2. Design Language

### Aesthetic Direction
- 澳門賭場風格混合政府部門公文的严肃感
- 金色、紅色、綠色為主調（澳門標誌性顏色）
- 有一種「這是真的官方系統」的諷刺感

### Color Palette
- Primary: #C41E3A (澳門紅)
- Secondary: #FFD700 (金牌金)
- Accent: #228B22 (豬綠)
- Background: #FFF8DC (米黃/公文色)
- Text: #2F2F2F (深灰)
- Border: #8B4513 (木質棕)

### Typography
- 標題：Noto Serif TC (莊重)
- 內文：Noto Sans TC (易讀)
- 數字/時間：Roboto Mono

### Motion Philosophy
- 步驟切換：滑順的進度條動畫
- 豬豬圖片：微妙的搖擺動畫
- 按鈕：hover時輕微放大
- 成功畫面：歡呼的煙火效果

## 3. Layout & Structure

### Page Structure
1. **Header** - 澳門特區政府騎豬管理局LOGO + 標語
2. **Progress Bar** - 5步驟進度指示器
3. **Form Container** - 根據步驟切換不同表單區塊
4. **Announcement Banner** - 重要公告（搞笑內容）
5. **Footer** - © 版權資訊 + 免責聲明

### 5 Steps Flow
1. 選擇坐騎 (Select Your Pig)
2. 選擇路線 (Select Route)
3. 選擇日期時段 (Date & Time)
4. 填寫資料 (Personal Info)
5. 選擇保險 (Insurance) → 確認預約

### Responsive Strategy
- Desktop: 雙欄佈局，左側表單右側插圖
- Tablet: 單欄，卡片堆疊
- Mobile: 全寬單欄，步驟條簡化

## 4. Features & Interactions

### Core Features
- **步驟式表單導航** - 可前進/後退，進度視覺化
- **坐騎選擇** - 6種不同品種的豬，每種有不同屬性（速度、耐力、外觀）
- **路線選擇** - 4條澳門經典路線（包含大三巴、威尼斯人等）
- **日期選擇** - 日曆選擇器，顯示可用時段
- **資料填寫** - 姓名、電話、體重、騎豬經驗
- **保險方案** - 3種方案（基本、標準、尊貴）
- **預約確認** - 顯示完整預約資料 + 確認編號

### Interaction Details
- 步驟切換：淡入淡出 + 滑動
- 選項卡片的選擇：邊框高亮 + 放大效果
- 日期選擇：日曆網格，選中日期放大
- 提交：Loading 動畫 → 成功畫面
- 錯誤：shake 動畫 + 紅色提示

### Edge Cases
- 必填欄位未填：即時驗證，阻止提交
- 電話格式錯誤：提示正確格式
- 體重超出範圍：0-200kg，超出提示
- 選擇過去日期：禁用並提示

## 5. Component Inventory

### ProgressBar
- 5個圓點 + 連接線
- 當前步驟：金色填充 + 放大
- 已完成：綠色 + ✓ 符號
- 未完成：灰色

### StepCard
- 白色卡片，圓角，陰影
- 標題 + 內容區塊
- 底部按鈕區（上一步/下一步）

### PigCard (坐騎選擇)
- 豬的插圖/emoji
- 名稱 + 品種描述
- 屬性條（速度、耐力、可愛度）
- 選中狀態：金色邊框 + 陰影加深

### RouteCard
-路線名稱 + 標誌性景點
- 預計時間 + 難度
- 價格

### CalendarPicker
- 月份切換
- 日期網格
- 可用/不可用狀態
- 選中日期高亮

### InsuranceOption
- 方案名稱
- 價格
- 涵蓋範圍列表
- 推薦標籤（標準方案）

### SuccessModal
- 確認編號（大字顯示）
- 預約摘要
- 二維碼區域（裝飾用）
- 返回首頁按鈕

## 6. Technical Approach

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React useState/useReducer
- **Animation**: CSS transitions + Tailwind animate classes
- **Icons**: Emoji + Lucide React
- **Form Handling**: Controlled components with validation
