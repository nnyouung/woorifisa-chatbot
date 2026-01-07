import { createChatMessage } from "./components/Bubble/chatComponent.js";

const input = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");

function getUserId() {
  let id = localStorage.getItem("clova_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("clova_user_id", id);
  }
  return id;
}

function renderClovaBubbles(bubbles = []) {
  // 일단 text만 처리 (다른 타입은 필요하면 추가)
  bubbles.forEach((b) => {
    if (b?.type === "text" && b?.data?.description) {
      addBubble(b.data.description, "chatbot");
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userId = getUserId();

    const res = await fetch("/chat/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    renderClovaBubbles(data.bubbles);
  } catch (e) {
    console.error("open error:", e);
  }
});

function addBubble(message, sender) {
  const html = createChatMessage({
    side: sender === "me" ? "right" : "left",
    content: message,
    senderName: sender === "me" ? null : "AI Chat",
    time: new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  chatArea.insertAdjacentHTML("beforeend", html);
  chatArea.scrollTop = chatArea.scrollHeight;
}

sendButton.addEventListener("click", async () => {
  const message = input.value;
  if (!message.trim()) return;
  addBubble(message, "me");
  console.log("my message: ", message);

  const clovaResponse = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await clovaResponse.json();

  input.value = "";
  addBubble(data.message, "chatbot");
  console.log("chatbot message: ", data.message);
});
