(function (){

  const api_url = "http://localhost:3000/api/chat" 

  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-owner-id")

  if (!ownerId) {
   console.log("owner id not found")
   return
  }

  // ========== STYLES ==========
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes chatPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
      50% { box-shadow: 0 0 0 14px rgba(99, 102, 241, 0); }
    }
    @keyframes chatGlow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.12); }
    }
    @keyframes msgSlideIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes typingBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .chat-msg { animation: msgSlideIn 0.3s ease-out; }
    .chat-msg-user { 
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%) !important; 
      color: #fff !important; 
      border: 1px solid rgba(255,255,255,0.08) !important;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
    }
    .chat-msg-ai { 
      background: #fff !important; 
      color: #1f2937 !important; 
      border: 1px solid #e5e7eb !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
    }
    .typing-dot {
      width: 6px; height: 6px; background: #9ca3af; border-radius: 50%;
      display: inline-block; animation: typingBounce 0.6s infinite;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .typing-dot:nth-child(3) { animation-delay: 0.3s; }
    #chat-messages::-webkit-scrollbar { width: 5px; }
    #chat-messages::-webkit-scrollbar-track { background: transparent; }
    #chat-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
    #chat-input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12) !important;
    }
  `;
  document.head.appendChild(styleSheet);

  // ========== CHAT BUTTON ==========
  const button = document.createElement("div")
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`

  Object.assign(button.style,{
     position: "fixed",
     bottom: "24px",
     right: "24px",
     width: "64px",
     height: "64px",
     borderRadius: "50%",
     background: "linear-gradient(135deg, #18181b 0%, #27272a 25%, #3f3f46 50%, #18181b 100%)",
     backgroundSize: "200% 200%",
     color: "#fff",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     fontSize: "28px",
     cursor: "pointer",
     boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
     zIndex: "999999",
     userSelect: "none",
     transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
     animation: "chatPulse 2.5s infinite, chatGlow 3s infinite",
     backdropFilter: "blur(10px)",
     border: "1px solid rgba(255,255,255,0.12)"
  })

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1) translateY(-2px)";
    button.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(99, 102, 241, 0.25)";
    button.style.background = "linear-gradient(135deg, #27272a 0%, #3f3f46 25%, #52525b 50%, #27272a 100%)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1) translateY(0)";
    button.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)";
    button.style.background = "linear-gradient(135deg, #18181b 0%, #27272a 25%, #3f3f46 50%, #18181b 100%)";
  });

  button.addEventListener("mousedown", () => { button.style.transform = "scale(0.95)"; });
  button.addEventListener("mouseup", () => { button.style.transform = "scale(1.1) translateY(-2px)"; });

  document.body.appendChild(button)

  // ========== CHAT BOX ==========
  const box = document.createElement("div")
  Object.assign(box.style,{
     position: "fixed",
     bottom: "96px",
     right: "24px",
     width: "360px",
     height: "500px",
     background: "linear-gradient(180deg, #fafafa 0%, #f4f4f5 30%, #f3f4f6 60%, #e4e4e7 100%)",
     borderRadius: "24px",
     boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
     display: "none",
     flexDirection: "column",
     zIndex: "999999",
     fontFamily: "Inter, system-ui, -apple-system, sans-serif",
     overflow: "hidden",
     border: "1px solid rgba(0,0,0,0.06)",
     transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
  })

  box.innerHTML = `
  <div style="
     background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 50%, #e4e4e7 100%);
     color: #18181b;
     padding: 16px 20px;
     font-size: 15px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     border-bottom: 1px solid rgba(0,0,0,0.06);
     backdrop-filter: blur(20px);
  ">
     <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 10px; height: 10px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);"></div>
        <span style="font-weight: 700; letter-spacing: -0.2px; color: #18181b;">Customer Support</span>
     </div>
     <span id="chat-close" style="cursor: pointer; font-size: 18px; color: #52525b; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 10px; transition: all 0.2s ease;" onmouseover="this.style.background='#e4e4e7'; this.style.color='#18181b'" onmouseout="this.style.background='transparent'; this.style.color='#52525b'">✕</span>
  </div>

  <div id="chat-messages" style="
     flex: 1;
     padding: 16px;
     overflow-y: auto;
     background: linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #f4f4f5 100%);
     display: flex;
     flex-direction: column;
     gap: 12px;
  "></div>

  <div style="
     display: flex;
     border-top: 1px solid rgba(0,0,0,0.06);
     padding: 12px 14px;
     gap: 10px;
     background: linear-gradient(180deg, #f4f4f5 0%, #fafafa 100%);
     backdrop-filter: blur(20px);
  ">
     <input id="chat-input" type="text" style="
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #d4d4d8;
        border-radius: 14px;
        font-size: 14px;
        outline: none;
        background: #ffffff;
        color: #18181b;
        transition: all 0.3s ease;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
     " placeholder="Type a message..." />

     <button id="chat-send" style="
        padding: 12px 20px;
        border: none;
        background: linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%);
        color: #fff;
        border-radius: 14px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 6px;
     " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.25)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.15)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        Send
     </button>
  </div>
  `

  document.body.appendChild(box)

  // Toggle
  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none"
    if (box.style.display === "flex") {
      box.style.opacity = "0"
      box.style.transform = "translateY(16px) scale(0.96)"
      setTimeout(() => {
        box.style.opacity = "1"
        box.style.transform = "translateY(0) scale(1)"
      }, 10)
    }
  }

  document.querySelector("#chat-close").onclick = () => {
    box.style.display = "none"
  }

  const input = document.querySelector("#chat-input")
  const sendBtn = document.querySelector("#chat-send")
  const messageArea = document.querySelector("#chat-messages")

  function addMessage(text, from) {
    const bubble = document.createElement("div")
    bubble.className = "chat-msg chat-msg-" + from
    bubble.textContent = text
    Object.assign(bubble.style, {
      maxWidth: "78%",
      padding: "12px 16px",
      borderRadius: "18px",
      fontSize: "13.5px",
      lineHeight: "1.5",
      marginBottom: "4px",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      wordWrap: "break-word",
      borderTopRightRadius: from === "user" ? "4px" : "18px",
      borderTopLeftRadius: from === "user" ? "18px" : "4px",
      transition: "all 0.2s ease"
    })
    messageArea.appendChild(bubble)
    messageArea.scrollTop = messageArea.scrollHeight
  }

  // Welcome message
  setTimeout(() => {
    addMessage("👋 Hi there! How can I help you today?", "ai")
  }, 500)

  sendBtn.onclick = async () => {
    const text = input.value.trim()
    if (!text) return

    addMessage(text, "user")
    input.value = ""

    // Typing indicator
    const typingDiv = document.createElement("div")
    typingDiv.id = "typing-indicator"
    typingDiv.style.cssText = "align-self: flex-start; padding: 10px 14px; background: #fff; border-radius: 18px; border: 1px solid #e5e7eb; display: flex; align-items: center; gap: 6px;"
    typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`
    messageArea.appendChild(typingDiv)
    messageArea.scrollTop = messageArea.scrollHeight

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, message: text })
      })

      const data = await response.json()
      const typingInd = document.querySelector("#typing-indicator")
      if (typingInd) typingInd.remove()
      addMessage(data.reply || data.message || "I received your message!", "ai")
    } catch (error) {
      console.log(error)
      const typingInd = document.querySelector("#typing-indicator")
      if (typingInd) typingInd.remove()
      addMessage("Sorry, something went wrong. Please try again.", "ai")
    }
  }

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click()
  })

})()