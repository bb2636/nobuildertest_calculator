import { useTheme } from '../../context/ThemeContext.jsx'
import CalculatorDisplay from './CalculatorDisplay.jsx'
import CalculatorKeypad from './CalculatorKeypad.jsx'

export default function Calculator() {
  const { isDark } = useTheme()
  const bg = isDark ? 'bg-calc-dark-bg' : 'bg-calc-light-bg'
  const text = isDark ? 'text-calc-dark-text' : 'text-calc-light-text'

  return (
    <div
      className={`${bg} ${text} rounded-calc p-4 md:p-6 flex flex-col gap-4 md:gap-6 min-w-0 max-w-full shadow-xl`}
      style={{ borderRadius: '24px' }}
    >
      <CalculatorDisplay />
      <CalculatorKeypad />
    </div>
  )
}
