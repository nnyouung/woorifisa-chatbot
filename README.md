# 🐝 wibee-chatbot 🐝
Express 서버를 통해 CLOVA Chatbot Custom API와 통신하는 웹 기반 챗봇 데모 프로젝트입니다.<br>
우리FISA 수강생이 자주 확인해야 하는 일정·커리큘럼·학습 정보를 대화형 UI로 제공하는 것을 목표로 합니다.

<br>

## 🍯 Demo

<br>

## 🍯 Features
📅 일정 & 학사 정보 안내
  - 교과목 평가, 세미나, 특강, 멘토링, 프로젝트 발표, 해커톤, 수료식 일정 제공
  - 기초 특강, 휴강일, 토요일 특강 등 커리큘럼 정보 안내

🏫 교육 환경 정보 제공
  - 강의실 위치 및 와이파이 정보 안내

⏰ 수업 운영 정보
  - 일별 수업 시간 및 특강/멘토링 포함 일정 안내

🔗 학습 자료 안내
  - 강의 교안 및 실습·유틸 서비스 링크 제공

💬 챗봇 UI/UX
  - 말풍선 기반 채팅 UI
  - 위비 캐릭터 아이콘 적용

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
- 챗봇 응답 로딩 상태 표시
- 중복 전송 방지: 전송 중 버튼 disabled + Enter 연타 방지
- 질문 추천 기능(Prompt Suggestions) 추가
