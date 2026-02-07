# 계산기 SPA (React + Vite + Tailwind)

피그마 디자인을 반영한 SPA 계산기 앱입니다. **Capacitor**로 Android 앱 래핑 및 실기기 연동을 지원합니다.

## 기술 스택

- **Framework**: React 18 (Vite 기반 SPA)
- **Styling**: Tailwind CSS (피그마 컬러/radius 반영)
- **Icons**: Lucide-react (Sun, Moon, Clock, ArrowLeft)
- **State**: React Context API (테마 + 계산기/히스토리)
- **Native**: Capacitor (Android 앱 래핑)

---

## ⚠️ Capacitor 명령어 실행 위치

**모든 `cap` / `npx cap` 명령어는 반드시 프로젝트 루트(프론트엔드 폴더)에서 실행해야 합니다.**

- 이 프로젝트는 루트가 곧 프론트엔드이므로, `c:\xblock_test\step3` 에서 실행하세요.
- `cd step3` 후 `npx cap add android`, `npx cap sync`, `npx cap run android` 등을 실행합니다.

---

## 실행 방법

### 웹 개발

```bash
npm install
npm run dev
```

빌드:

```bash
npm run build
npm run preview
```

### Android 앱 (Capacitor)

1. **빌드 → 동기화 → 실행** (프로젝트 루트에서)

   ```bash
   npm run build
   npx cap sync
   npx cap run android
   ```

   한 번에 실행:

   ```bash
   npm run android
   ```

2. **Android Studio에서 Run으로 구동**
   - `android` 폴더를 Android Studio로 엽니다. (File → Open → `android` 선택)
   - 실기기 또는 에뮬레이터 연결 후 상단 **Run** 버튼(녹색 재생)으로 앱을 빌드·실행합니다.
   - **Cap 수정 후에는 반드시 프로젝트 루트에서 `npm run build` → `npx cap sync` 실행 후 Android Studio에서 다시 Run 하세요.**

3. **Android SDK 위치 설정** (빌드 시 "SDK location not found" 발생 시)
   - **방법 A**: `android/local.properties` 파일을 만들고 다음 한 줄 추가 (경로는 본인 PC에 맞게 수정)
     ```properties
     sdk.dir=C:/Users/내사용자명/AppData/Local/Android/Sdk
     ```
   - **방법 B**: 환경 변수 `ANDROID_HOME`을 Android SDK 설치 경로로 설정
   - 예시는 `android/local.properties.example` 참고. (`local.properties`는 git에 포함되지 않음)

---

## Android 네이티브 설정 요약

- **Java 17**: `android/build.gradle`, `android/app/build.gradle` 에서 `sourceCompatibility` / `targetCompatibility` = `JavaVersion.VERSION_17`
- **Cleartext (HTTP) 허용**: `AndroidManifest.xml` 에 `android:usesCleartextTraffic="true"`, `android:networkSecurityConfig="@xml/network_security_config"`
- **network_security_config.xml**: localhost, 10.0.2.2, 지정 PC IP 등에 대해 `cleartextTrafficPermitted="true"`
- **Mixed Content**: `MainActivity.java` 에서 `WebSettings.MIXED_CONTENT_ALWAYS_ALLOW` 적용

---

## 프로젝트 구조

```
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── CalculatorContext.jsx
│   └── components/
│       ├── calculator/
│       └── history/
├── android/                 # Capacitor Android (cap 명령은 루트에서)
├── capacitor.config.json    # appId, appName, webDir: dist
```

---

## 완성된 기능

### 상단 바
- **다크/라이트 토글** (맨 위 중앙): 왼쪽 달(🌙)·오른쪽 해(☀️) 스위치. `localStorage` 키 `calculator-theme`에 저장.
- **기록 버튼** (맨 위 오른쪽): 시계 아이콘. 클릭 시 기록 탭으로 전환.
- **뒤로가기 버튼** (맨 위 왼쪽, 기록 탭에서만): 파란색 왼쪽 화살표.

### 디스플레이·계산·기록
- **디스플레이**: 위쪽 회색 줄(식), 아래쪽 큰 숫자(현재 입력/결과). 스크롤바 숨김.
- **사칙연산**, **=**, **C**, **AC**, **%**, **+/-**, **⌫**, 소수점 지원.
- **기록**: 계산 시마다 추가, 항목 클릭 시 결과를 입력창에 로드.

### 디자인
- 피그마 변수 적용. 반응형: 모바일은 계산기 ↔ 기록 탭 전환, 데스크톱은 한 화면에 계산기 + 기록.

## 참고

- 피그마: [노빌더 교육생 테스트](https://www.figma.com/design/8Ec92DyjlSqs5j1CvDUIJX) — Calculator (node-id=2-15384)
