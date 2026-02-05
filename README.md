# 계산기 SPA (React + Vite + Tailwind)

피그마 디자인을 반영한 SPA 계산기 앱입니다.

## 기술 스택

- **Framework**: React 18 (Vite 기반 SPA)
- **Styling**: Tailwind CSS (피그마 컬러/radius 반영)
- **Icons**: Lucide-react
- **State**: React Context API (테마 + 계산기/히스토리)

## 실행 방법

```bash
npm install
npm run dev
```

빌드:

```bash
npm run build
npm run preview
```

## 프로젝트 구조

```
src/
├── main.jsx                 # 진입점, Provider 래핑
├── App.jsx                  # 탭(모바일) / 나란히(데스크톱) 레이아웃
├── index.css                # Tailwind 디렉티브
├── context/
│   ├── ThemeContext.jsx     # 다크/라이트 모드, localStorage 유지
│   └── CalculatorContext.jsx # 입력값, 연산자, 히스토리 스택
└── components/
    ├── Calculator.jsx       # 계산기 패널 (배경/테마)
    ├── CalculatorDisplay.jsx # 상단 표시 영역 (이전 식 + 현재 값)
    ├── CalculatorKeypad.jsx # C·AC, %, ÷×−+, 숫자, =, 테마 토글
    └── History.jsx          # 기록 목록, 클릭 시 입력창에 로드
```

## 기능 요약

- **디자인**: 피그마 변수 적용 (Light/Dark 배경·버튼·텍스트 컬러, border-radius 24px/16px)
- **다크/화이트 모드**: 해/달 아이콘 토글, `localStorage` 키 `calculator-theme` 유지
- **계산**: 사칙연산, %, 소수점, C(현재 지우기), AC(전체 초기화), ⌫(한 글자 삭제)
- **히스토리**: "=" 시 기록 추가, 항목 클릭 시 해당 결과를 입력창에 로드
- **반응형**: 모바일은 계산기/기록 탭 전환, 데스크톱은 한 화면에 나란히 배치
