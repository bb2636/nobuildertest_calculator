import { useState } from 'react'
import { Sun, Moon, Clock, ArrowLeft } from 'lucide-react'
import { useTheme } from './context/ThemeContext.jsx'
import Calculator from './components/Calculator.jsx'
import History from './components/History.jsx'

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('calculator') // 'calculator' | 'history'
  const pageBg = isDark ? 'bg-calc-dark-bg' : 'bg-calc-light-bg'
  const text = isDark ? 'text-calc-dark-text' : 'text-calc-light-text'

  return (
    <div className={`min-h-screen ${pageBg} ${text} transition-colors`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 상단 바: 테마 스위치(중앙) + 기록 버튼(오른쪽) */}
        <header className="flex items-center py-4 md:py-5">
          <div className="w-10 flex-shrink-0 flex items-center justify-start">
            {activeTab === 'history' && (
              <button
                type="button"
                aria-label="계산기로 돌아가기"
                onClick={() => setActiveTab('calculator')}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#4B5EFC] hover:opacity-90 transition-opacity"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            {/* 다크/라이트 모드 전환 - 맨 위 중앙 (가로 스위치) */}
            <div
              className="flex rounded-full p-1"
              style={{ background: isDark ? '#4E505F' : '#D2D3DA' }}
            >
            <button
              type="button"
              aria-label="라이트 모드로 전환"
              onClick={toggleTheme}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                !isDark ? 'bg-[#4B5EFC] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="다크 모드로 전환"
              onClick={toggleTheme}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isDark ? 'bg-[#4B5EFC] text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              <Moon className="w-5 h-5" />
            </button>
            </div>
          </div>
          <div className="w-10 flex-shrink-0 flex justify-end">
          {/* 기록 버튼 - 시계 아이콘, 맨 위 오른쪽 */}
          <button
            type="button"
            aria-label="기록"
            onClick={() => setActiveTab((t) => (t === 'history' ? 'calculator' : 'history'))}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[#4B5EFC] hover:opacity-90 transition-opacity"
          >
            <Clock className="w-5 h-5" />
          </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:gap-6 gap-6 items-stretch pb-6 md:pb-8">
          {/* 계산기 영역 */}
          <section
            className={`flex-1 min-w-0 ${activeTab === 'calculator' ? 'block' : 'hidden md:block'}`}
          >
            <Calculator />
          </section>

          {/* 히스토리 영역 */}
          <section
            className={`md:w-[280px] md:flex-shrink-0 min-w-0 ${activeTab === 'history' ? 'block' : 'hidden md:block'}`}
          >
            <History />
          </section>
        </div>
      </div>
    </div>
  )
}
