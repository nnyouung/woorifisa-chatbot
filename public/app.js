const input = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

// 디바운스 로직
let timerId;
function debounce(callback, delay) {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(callback, delay);
}

sendButton.addEventListener("click", async () => {
  const message = input.value;
  debounce(async () => {
    if (!message.trim()) return;

    const clovaResponse = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await clovaResponse.json();

    input.value = "";
    console.log(data.message);
    // TODO: data.message 채팅 버블에 띄우기
  }, 1000);
});
