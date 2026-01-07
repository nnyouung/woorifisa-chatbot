const input = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", async () => {
  const message = input.value;
  if (!message.trim()) return;
  console.log("my message: ", message);

  const clovaResponse = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await clovaResponse.json();

  input.value = "";
  console.log("chatbot message: ", data.message);
  // TODO: data.message 챗봇 쪽 채팅 버블에 띄우기
});
