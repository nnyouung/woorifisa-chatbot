# 🐝 wibee-chatbot 🐝
Express 서버를 통해 CLOVA Chatbot Custom API와 통신하는 웹 기반 챗봇 데모 프로젝트입니다.<br>
우리FISA 수강생이 자주 확인해야 하는 일정, 커리큘럼, 학습 정보를 대화형 UI로 제공하는 것을 목표로 합니다.

<br>

## 🍯 Demo

<img width="1440" height="681" alt="스크린샷 2026-01-07 18 18 05" src="https://github.com/user-attachments/assets/e8092dc7-f671-4f51-985f-186023d485f6" />

<br><br>

## 🍯 Features
📅 일정 & 수업 운영 정보 안내
  - 프로젝트 발표회, 멘토링, 토요일 특강, 휴강일 등 주요 일정 정보
  - 일별 수업 커리큘럼 정보

🏫 교육 환경 정보 안내
  - 강의실 위치 및 와이파이 정보

💬 챗봇 UI/UX
  - 말풍선 기반 채팅 UI
  - 위비 캐릭터 아이콘을 활용한 친근한 인터페이스
  - 모바일 대응 반응형 UI

<br>

## 🍯 Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- External API: NAVER CLOVA Chatbot
- Env: dotenv

<br>

## 🍯 Project Structure
```
woorifisa-chatbot/
├─ server.js
├─ package.json
├─ package-lock.json
├─ .env
├─ .gitignore
└─ public/
  ├─ index.html
  ├─ style.css
  └─ app.js
  └─ icons/
  └─ components/
    └─ bubble/
      ├─ bubble.html
      └─ bubble.css
  
```
<br>

## 🍯 Team
<a href="https://github.com/jsssun"></a>
<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/jiwoo061">
              <img src="https://github.com/jiwoo061.png" width="25%" height="25%" >
              <br />
              <b>박지우</b>
            </a> 
            <br/>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/khmandarrin">
              <img src="https://github.com/khmandarrin.png" width="25%" height="25%" >
              <br />
              <b>정가은</b>
            </a>
            <br/>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/jsssun">
              <img src="https://github.com/jsssun.png" width="25%" height="25%" >
              <br />
              <b>정선우</b>
            </a> 
            <br/>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/nnyouung">
              <img src="https://github.com/nnyouung.png" width="25%" height="25%" >
              <br />
              <b>하은영</b>
            </a> 
            <br/>
        </td>
    </tr>
</table>

<br>

## 🍯 Troubleshooting
### #1
- **Problem:** 클로바 답변이 의도한 것과 다르게 출력됨
  - 예: “1주차 강의 내용 알려줘” 입력 시 강의자료 답변 출력
   
- **Cause:** 서로 다른 정규식에 공통 키워드(강의)가 포함됨
  - 예: 커리큘럼: [1주차|강의|내용]*, 강의자료: [강의|교안|자료|링크|주소]\*

- **Solution:** 거리 연산자(::<?>*?)를 사용해 두 키워드 묶음이 함께 있을 때만 매칭되도록 수정
  - 수정 전: [강의|교안|자료|링크|주소]*
  - 수정 후: [강의|교안|자료]::<?>*?[링크|주소]\*

### #2
- **Problem:** 배경 그라데이션(::before)이 채팅 UI 위에 겹쳐 보이는 레이어 충돌 발생

- **Cause:** ::before가 별도의 스택 컨텍스트를 생성하지 않아, 채팅 UI 요소들과 동일한 컨텍스트에서 렌더링됨

- **Solution:** 채팅 UI 자식 요소에 z-index를 지정해 배경 레이어보다 위에 오도록 조정
  ```
  .chat-app > * {
    z-index: 1;
  }
  ```




<br>

## 🍯 Getting Started
### 1) Install
```npm install```

### 2) Create .env
```
CLOVA_CHATBOT_INVOKE_URL=...
CLOVA_CHATBOT_SECRET=...
```

### 3) Run
```npm start```

### 4) Open
http://localhost:3000

<br>

## 🍯 Improvements
- 질문 추천 기능(Prompt Suggestions)
- 답변 작성용 관리자 페이지
