import { useTheme } from '../../context/ThemeContext.jsx'
import { useCalculator } from '../../context/CalculatorContext.jsx'

function formatResult(value) {
  if (value === undefined || value === null) return '0'
  const num = Number(value)
  if (Number.isNaN(num)) return String(value)
  const str = String(value)
  if (str.includes('e')) return value
  const [intPart, decPart] = str.split('.')
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted
}

export default function History() {
  const { isDark } = useTheme()
  const { history, loadFromHistory } = useCalculator()
  const bg = isDark ? 'bg-calc-dark-bg' : 'bg-calc-light-bg'
  const text = isDark ? 'text-calc-dark-text' : 'text-calc-light-text'
  const textMuted = isDark ? 'text-white/70' : 'text-black/60'

  return (
    <div
      className={`${bg} ${text} rounded-calc p-4 md:p-6 flex flex-col min-h-[200px] shadow-xl overflow-hidden`}
      style={{ borderRadius: '24px' }}
    >
      <h2 className="text-lg font-semibold mb-4" style={{ fontSize: '15px', letterSpacing: '-0.5px' }}>
        기록
      </h2>
      <ul className="flex-1 overflow-y-auto space-y-3 min-h-0">
        {history.length === 0 ? (
          <li className={textMuted + ' text-sm'}>계산 결과가 여기에 표시됩니다.</li>
        ) : (
          history.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full text-left rounded-lg p-2 -mx-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                onClick={() => loadFromHistory(item.result)}
              >
                <p className={`text-sm ${textMuted} truncate`}>{item.expression}</p>
                <p className="text-xl font-semibold truncate">{formatResult(item.result)}</p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
