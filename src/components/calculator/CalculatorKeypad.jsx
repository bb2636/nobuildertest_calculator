import { useTheme } from '../../context/ThemeContext.jsx'
import { useCalculator } from '../../context/CalculatorContext.jsx'

const btnBase =
  'w-full aspect-square max-w-full max-h-full min-w-0 min-h-0 rounded-[16px] text-[22px] md:text-[24px] font-medium flex items-center justify-center transition-colors active:scale-95 select-none'

export default function CalculatorKeypad() {
  const { isDark } = useTheme()
  const {
    prevExpression,
    operator,
    appendDigit,
    applyOperator,
    calculateResult,
    clear,
    percent,
    deleteLast,
    toggleSign,
  } = useCalculator()
  const showAC = prevExpression !== '' || operator != null

  const low = isDark
    ? 'bg-calc-dark-btn-low text-calc-dark-text'
    : 'bg-calc-light-btn-low text-calc-light-text'
  const medium = isDark
    ? 'bg-calc-dark-btn-medium text-calc-dark-text'
    : 'bg-calc-light-btn-medium text-calc-light-text'
  const high = 'bg-calc-light-btn-high text-white'

  const handleKey = (key) => {
    if (key === 'C' || key === 'AC') return clear(key === 'AC')
    if (key === '+/-') return toggleSign()
    if (key === '%') return percent()
    if (key === '.') return appendDigit('.')
    if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === '7' || key === '8' || key === '9') {
      return appendDigit(key)
    }
    if (key === '÷') return applyOperator('divide')
    if (key === '×') return applyOperator('multiply')
    if (key === '-') return applyOperator('subtract')
    if (key === '+') return applyOperator('add')
    if (key === '=') return calculateResult()
  }

  const grid = [
    [
      { label: showAC ? 'AC' : 'C', class: medium, key: showAC ? 'AC' : 'C' },
      { label: '+/-', class: medium, key: '+/-' },
      { label: '%', class: medium, key: '%' },
      { label: '÷', class: high, key: '÷' },
    ],
    [
      { label: '7', class: low, key: '7' },
      { label: '8', class: low, key: '8' },
      { label: '9', class: low, key: '9' },
      { label: '×', class: high, key: '×' },
    ],
    [
      { label: '4', class: low, key: '4' },
      { label: '5', class: low, key: '5' },
      { label: '6', class: low, key: '6' },
      { label: '-', class: high, key: '-' },
    ],
    [
      { label: '1', class: low, key: '1' },
      { label: '2', class: low, key: '2' },
      { label: '3', class: low, key: '3' },
      { label: '+', class: high, key: '+' },
    ],
    [
      { label: '.', class: low, key: '.' },
      { label: '0', class: low, key: '0' },
      { label: '⌫', class: low, key: 'backspace' },
      { label: '=', class: high, key: '=' },
    ],
  ]

  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-3 md:gap-4 w-full max-w-full md:max-w-[320px] mx-auto aspect-[4/5]">
      {grid.flat().map((cell, i) => (
        <button
          key={i}
          type="button"
          className={`${btnBase} ${cell.class}`}
          onClick={() => {
            if (cell.key === 'backspace') deleteLast()
            else handleKey(cell.key)
          }}
        >
          {cell.label}
        </button>
      ))}
    </div>
  )
}
