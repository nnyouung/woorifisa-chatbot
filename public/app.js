import { createChatMessage } from "./components/Bubble/chatComponent.js";

const input = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const hero = document.getElementById("emptyHero");

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

  hero.style.opacity = "0";

  const data = await clovaResponse.json();

  input.value = "";
  addBubble(data.message, "chatbot");
  console.log("chatbot message: ", data.message);
});
