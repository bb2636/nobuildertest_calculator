import { createContext, useContext, useCallback, useState, useRef } from 'react'

const CalculatorContext = createContext(null)

export function CalculatorProvider({ children }) {
  const [prevExpression, setPrevExpression] = useState('')
  const [currentValue, setCurrentValue] = useState('0')
  const [operator, setOperator] = useState(null)
  const [history, setHistory] = useState([])
  const [lastExpression, setLastExpression] = useState('') // AC 전까지 위에 보여줄 식 (회색)
  const replaceNextDigit = useRef(false)

  const appendDigit = useCallback((digit) => {
    setCurrentValue((prev) => {
      if (replaceNextDigit.current) {
        replaceNextDigit.current = false
        if (digit === '.') return '0.'
        return String(digit)
      }
      if (digit === '.') {
        if (prev.includes('.')) return prev
        return prev === '0' ? '0.' : prev + '.'
      }
      if (prev === '0') return String(digit)
      return prev + digit
    })
  }, [])

  const setDisplayFromValue = useCallback((val) => {
    setCurrentValue(String(val))
  }, [])

  const applyOperator = useCallback((op) => {
    if (operator != null && prevExpression !== '') {
      const prevNum = parseFloat(prevExpression)
      const currNum = parseFloat(currentValue)
      const result = calculate(prevNum, currNum, operator)
      const expr = `${prevExpression} ${opSymbol(operator)} ${currentValue}`
      setHistory((h) => [{ expression: expr, result }, ...h].slice(0, 50))
      setPrevExpression(String(result))
      setCurrentValue(String(result))
      replaceNextDigit.current = true
    } else {
      setPrevExpression(currentValue)
      setCurrentValue('0')
      replaceNextDigit.current = true
    }
    setOperator(op)
  }, [operator, prevExpression, currentValue])

  const calculateResult = useCallback(() => {
    if (operator == null || prevExpression === '') return
    const result = calculate(parseFloat(prevExpression), parseFloat(currentValue), operator)
    const expr = `${prevExpression} ${opSymbol(operator)} ${currentValue}`
    setHistory((h) => [{ expression: expr, result }, ...h].slice(0, 50))
    setLastExpression(expr) // AC 전까지 위에 회색으로 유지
    setPrevExpression('')
    setOperator(null)
    setCurrentValue(String(result))
    replaceNextDigit.current = true
  }, [operator, prevExpression, currentValue])

  const clear = useCallback((full = false) => {
    if (full) {
      setPrevExpression('')
      setCurrentValue('0')
      setOperator(null)
      setLastExpression('')
    } else {
      setCurrentValue('0')
      setPrevExpression('')
      setOperator(null)
      setLastExpression('') // C 눌렀을 때도 위 회색 식 초기화
    }
  }, [])

  const percent = useCallback(() => {
    const val = parseFloat(currentValue)
    setCurrentValue(String(val / 100))
  }, [currentValue])

  const toggleSign = useCallback(() => {
    setCurrentValue((prev) => {
      if (prev === '0' || prev === '') return prev
      return prev.startsWith('-') ? prev.slice(1) : '-' + prev
    })
  }, [])

  const loadFromHistory = useCallback((result) => {
    setCurrentValue(String(result))
    setPrevExpression('')
    setOperator(null)
    setLastExpression('')
    replaceNextDigit.current = false
  }, [])

  const deleteLast = useCallback(() => {
    setCurrentValue((prev) => {
      const next = prev.slice(0, -1)
      return next === '' || next === '-' ? '0' : next
    })
  }, [])

  const value = {
    display: currentValue,
    prevExpression,
    lastExpression,
    currentValue,
    operator,
    history,
    appendDigit,
    setDisplayFromValue,
    applyOperator,
    calculateResult,
    clear,
    percent,
    loadFromHistory,
    deleteLast,
    toggleSign,
  }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext)
  if (!ctx) throw new Error('useCalculator must be used within CalculatorProvider')
  return ctx
}

function opSymbol(op) {
  const map = { add: '+', subtract: '-', multiply: '×', divide: '÷' }
  return map[op] ?? op
}

function calculate(a, b, op) {
  if (Number.isNaN(a) || Number.isNaN(b)) return 0
  switch (op) {
    case 'add': return a + b
    case 'subtract': return a - b
    case 'multiply': return a * b
    case 'divide': return b === 0 ? 0 : a / b
    default: return b
  }
}
