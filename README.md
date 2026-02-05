# 계산기 SPA (React + Vite + Tailwind)

피그마 디자인을 반영한 SPA 계산기 앱입니다.

## 기술 스택

- **Framework**: React 18 (Vite 기반 SPA)
- **Styling**: Tailwind CSS (피그마 컬러/radius 반영)
- **Icons**: Lucide-react (Sun, Moon, Clock, ArrowLeft)
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
├── main.jsx                 # 진입점, ThemeProvider·CalculatorProvider 래핑
├── App.jsx                  # 상단 바(테마 토글·기록·뒤로가기) + 계산기/기록 레이아웃
├── index.css                # Tailwind 디렉티브
├── context/
│   ├── ThemeContext.jsx     # 다크/라이트 모드, localStorage 유지
│   └── CalculatorContext.jsx # 입력값, 연산자, lastExpression, 히스토리
└── components/
    ├── Calculator.jsx       # 계산기 패널 (배경/테마)
    ├── CalculatorDisplay.jsx # 상단 표시(회색 식 + 메인 숫자), 스크롤바 숨김
    ├── CalculatorKeypad.jsx # C, +/-, %, ÷×−+, 숫자, ., ⌫, =
    └── History.jsx          # 기록 목록, 클릭 시 해당 결과를 입력창에 로드
```

## 완성된 기능

### 상단 바
- **다크/라이트 토글** (맨 위 중앙): 왼쪽 달(🌙)·오른쪽 해(☀️) 스위치. 어느 쪽을 눌러도 반대 모드로 전환. `localStorage` 키 `calculator-theme`에 저장되어 새로고침 후에도 유지.
- **기록 버튼** (맨 위 오른쪽): 시계 아이콘. 클릭 시 기록 탭으로 전환.
- **뒤로가기 버튼** (맨 위 왼쪽, 기록 탭에서만): 파란색 왼쪽 화살표. 클릭 시 계산기 화면으로 복귀.

### 디스플레이
- **위쪽 회색 줄**: 기존값 + 수식기호(÷, ×, -, +) 또는 마지막 계산 식(예: `25 × 4`)을 작은 회색 글씨로 표시. 숫자는 천 단위 콤마 포맷.
- **아래쪽 큰 숫자**: 현재 입력/결과만 표시. 연산자 입력 시 두 번째 피연산자 입력을 위해 0으로 초기화됨.
- 입력값 옆 **스크롤바 없음** (가로 스크롤은 가능, 스크롤바만 숨김 처리).

### 계산 로직
- **사칙연산**: ÷, ×, -, +. 연산자 입력 시 기존 입력값은 위 회색으로 고정되고, 아래는 0으로 초기화된 뒤 새로 입력.
- **=**: 계산 실행 후 결과를 아래에 표시. 계산한 식(예: `25 × 4`)은 **AC 또는 C를 누르기 전까지** 위 회색 줄에 유지.
- **C**: 현재 입력값 + **위 회색 식** 모두 초기화.
- **AC**: 전체 초기화(회색 식, 연산자, 입력값).
- **%**: 현재 값을 100으로 나눈 값으로 변경.
- **+/-**: 부호 반전.
- **⌫**: 마지막 글자 삭제.
- **소수점**: `.` 지원.

### 기록(History)
- **=** 로 계산할 때마다 "식 + 결과"가 기록에 추가.
- 기록 항목 클릭 시 해당 **결과 값**이 계산기 입력창에 로드.
- 모바일: 기록 탭 전환 시 기록 패널만 표시. 데스크톱: 계산기와 기록이 한 화면에 나란히 배치.

### 디자인
- 피그마 변수 적용: Light/Dark 배경·버튼·텍스트 컬러, border-radius 24px(패널)/16px(버튼).
- 반응형: 모바일은 계산기 ↔ 기록 탭 전환, 데스크톱은 한 화면에 계산기 + 기록.

## 참고

- 피그마: [노빌더 교육생 테스트](https://www.figma.com/design/8Ec92DyjlSqs5j1CvDUIJX) — Calculator (node-id=2-15384)
