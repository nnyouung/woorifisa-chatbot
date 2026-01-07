/* 내보낼 컴포넌트 */

export function createChatMessage(msg) {
  // 1. 왼쪽/오른쪽 여부에 따른 HTML 분기 처리
  const isLeft = msg.side === "left";

  return `
    <link rel="stylesheet" href="/components/Bubble/bubble.css" />
    <div class="message ${isLeft ? "left" : "right"}">
      ${
        isLeft
          ? `
        <div class="meta">
          <div class="badge" aria-hidden="true">
            <span class="badge-icon">💬</span>
          </div>
          <span class="meta-text">${msg.senderName || "AI Chat"}</span>
        </div>
      `
          : ""
      }

      <div class="message-row">
        ${!isLeft ? `<span class="time">${msg.time}</span>` : ""}
        
        <div class="bubble ${msg.variant || ""}">
          ${msg.content.replace(/\n/g, "<br />")}
        </div>

        ${isLeft ? `<span class="time">${msg.time}</span>` : ""}
      </div>
    </div>
  `;
}
