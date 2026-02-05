import { useCalculator } from '../context/CalculatorContext.jsx'

function formatDisplay(value) {
  if (value === '' || value === undefined) return '0'
  const num = parseFloat(value)
  if (Number.isNaN(num)) return value
  const str = String(value)
  if (str.includes('e')) return value
  const [intPart, decPart] = str.split('.')
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted
}

function operatorSymbol(op) {
  const map = { add: '+', subtract: '-', multiply: '×', divide: '÷' }
  return map[op] ?? ''
}

function formatFullExpression(expr) {
  if (!expr || typeof expr !== 'string') return expr
  const parts = expr.split(/\s+/)
  if (parts.length >= 3) {
    return `${formatDisplay(parts[0])} ${parts[1]} ${formatDisplay(parts[2])}`
  }
  return expr
}

export default function CalculatorDisplay() {
  const { display, prevExpression, lastExpression, operator } = useCalculator()
  const formatted = formatDisplay(display)
  const showLiveExpr = prevExpression !== '' && operator != null
  const showLastExpr = lastExpression !== ''

  return (
    <div className="flex flex-col items-end justify-end min-h-[120px] px-2 pb-2">
      {(showLastExpr || showLiveExpr) && (
        <span
          className="text-[15px] leading-5 tracking-tight mb-1 text-gray-500 dark:text-white/60"
          style={{ letterSpacing: '-0.5px' }}
        >
          {showLastExpr ? formatFullExpression(lastExpression) : `${formatDisplay(prevExpression)} ${operatorSymbol(operator)}`}
        </span>
      )}
      <span
        className="text-[48px] md:text-[64px] font-semibold leading-tight break-all text-right max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ lineHeight: 1.1 }}
      >
        {formatted}
      </span>
    </div>
  )
}
