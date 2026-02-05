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

export default function CalculatorDisplay() {
  const { display, prevExpression } = useCalculator()
  const formatted = formatDisplay(display)

  return (
    <div className="flex flex-col items-end justify-end min-h-[120px] px-2 pb-2">
      {prevExpression && (
        <span
          className="text-[15px] leading-5 tracking-tight opacity-70 mb-1"
          style={{ letterSpacing: '-0.5px' }}
        >
          {prevExpression}
        </span>
      )}
      <span
        className="text-[48px] md:text-[64px] font-semibold leading-tight break-all text-right max-w-full overflow-x-auto"
        style={{ lineHeight: 1.1 }}
      >
        {formatted}
      </span>
    </div>
  )
}
