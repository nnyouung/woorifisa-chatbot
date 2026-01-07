import { createChatMessage } from "./components/Bubble/chatComponent.js";

const input = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const hero = document.getElementById("emptyHero");

function renderClovaBubbles(bubbles = []) {
  // 일단 text만 처리 (다른 타입은 필요하면 추가)
  bubbles.forEach((b) => {
    if (b?.type === "text" && b?.data?.description) {
      addBubble(b.data.description, "chatbot");
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
   const res = await fetch("/chat/open", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const t = await res.text();
    console.log("open failed:", res.status, t);
    return;
  }

  const data = await res.json();
  console.log("open data:", data);
  renderClovaBubbles(data.bubbles);
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

  const last = chatArea.lastElementChild;
  last.classList.add("is-new");

  requestAnimationFrame(() => {
    last.classList.add("is-show");
  });

  chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: "smooth" });
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

  hero.classList.add("is-hiding");
  hero.addEventListener("transitionend", () => hero.remove(), { once: true });

  const data = await clovaResponse.json();

  input.value = "";
  addBubble(data.message, "chatbot");
  console.log("chatbot message: ", data.message);
});
