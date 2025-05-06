/**
 * BlindChat - JavaScript tối giản, dễ tích hợp API
 */

document.addEventListener("DOMContentLoaded", function () {
  // === Các biến DOM cần thiết ===
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const mainContent = document.querySelector(".main-content");
  const sendButton = document.querySelector(".send-btn");
  const periodBtns = document.querySelectorAll(".period-btn");
  const newChatOption = document.querySelector(".dropdown-option");

  // Auto-resize textarea
  if (userInput) {
    userInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

    // Enter để gửi tin nhắn (trừ khi dùng Shift+Enter)
    userInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    });
  }

  // Xử lý các nút thời gian trong pricing
  if (periodBtns && periodBtns.length > 0) {
    periodBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        periodBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  // Xử lý nút gửi tin nhắn nếu có
  if (sendButton) {
    sendButton.addEventListener("click", handleSendMessage);
  }

  // Xử lý tạo chat mới
  if (newChatOption) {
    newChatOption.addEventListener("click", resetChat);
  }

  // === CORE FUNCTIONS (cần thiết cho UI) ===

  // Hàm gửi tin nhắn - sẽ được tích hợp với API
  function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
      // Thêm tin nhắn của user vào giao diện
      addUserMessage(message);

      // Reset input
      userInput.value = "";
      userInput.style.height = "auto";

      // Hiển thị đang gõ...
      showTypingIndicator();

      // ĐIỂM TÍCH HỢP API: Thay thế đoạn code sau bằng API call
      setTimeout(function () {
        hideTypingIndicator();
        // Mock response - sẽ được thay bởi response API
        const botResponse =
          "Đây là nơi response từ API sẽ được hiển thị. Bạn chỉ cần thay đoạn này bằng kết quả từ API call.";
        addBotMessage(botResponse);
      }, 1000);
    }
  }

  // Thêm tin nhắn của user
  function addUserMessage(content) {
    const messageHTML = `
      <div class="message user-message">
        <div class="message-container">
          <div class="message-content">${escapeHTML(content)}</div>
        </div>
        <div class="message-actions">
          <button class="message-action-btn edit-btn" onclick="editMessage(this)">
            <img src="assets/img/Edit.svg" alt="Edit">Chỉnh sửa
          </button>
          <button class="message-action-btn copy-btn" onclick="copyMessage(this)">
            <img src="assets/img/Copy.svg" alt="Copy">Sao chép
          </button>
        </div>
      </div>
    `;
    appendMessageToChat(messageHTML);
  }

  // Thêm tin nhắn của bot
  function addBotMessage(content) {
    const messageHTML = `
      <div class="message bot-message">
        <div class="message-container">
          <div class="message-content">${escapeHTML(content)}</div>
        </div>
        <div class="message-actions">
          <button class="message-action-btn copy-btn" onclick="copyMessage(this)">
            <img src="assets/img/Copy.svg" alt="Copy">Sao chép
          </button>
          <button class="message-action-btn like-btn" onclick="likeMessage(this)">
            <img src="assets/img/Facebook Like.svg" alt="Like">Thích
          </button>
          <button class="message-action-btn dislike-btn" onclick="dislikeMessage(this)">
            <img src="assets/img/Facebook Like.svg" alt="Dislike" style="transform: rotate(180deg)">Không thích
          </button>
        </div>
      </div>
    `;
    appendMessageToChat(messageHTML);
  }

  // Thêm tin nhắn vào khung chat
  function appendMessageToChat(messageHTML) {
    if (chatMessages) {
      // Nếu đây là tin nhắn đầu tiên, thêm class has-messages
      if (!mainContent.classList.contains("has-messages")) {
        mainContent.classList.add("has-messages");
      }

      // Thêm tin nhắn vào khung chat
      chatMessages.insertAdjacentHTML("beforeend", messageHTML);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  // Hiển thị đang gõ...
  function showTypingIndicator() {
    const typingHTML = `
      <div class="message bot-message typing-indicator">
        <div class="message-container">
          <div class="message-content">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    `;
    appendMessageToChat(typingHTML);
  }

  // Ẩn đang gõ...
  function hideTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Reset chat
  function resetChat() {
    if (chatMessages) {
      chatMessages.innerHTML = "";
    }

    if (mainContent) {
      mainContent.classList.remove("has-messages");
    }
  }

  // Utility: Escape HTML để tránh XSS
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Đặt các hàm xử lý tin nhắn lên window để có thể gọi từ HTML
  window.copyMessage = function (button) {
    const messageContent = button
      .closest(".message")
      .querySelector(".message-content").textContent;
    navigator.clipboard.writeText(messageContent);

    // Optional: hiển thị thông báo đã copy
    const original = button.innerHTML;
    button.innerHTML = '<img src="assets/img/Copy.svg" alt="Copy">Đã sao chép';
    setTimeout(() => {
      button.innerHTML = original;
    }, 1000);
  };

  window.editMessage = function (button) {
    const messageElement = button.closest(".message");
    const messageContent =
      messageElement.querySelector(".message-content").textContent;

    // Đưa nội dung tin nhắn vào ô input để chỉnh sửa
    if (userInput) {
      userInput.value = messageContent;
      userInput.focus();
      userInput.style.height = "auto";
      userInput.style.height = userInput.scrollHeight + "px";

      // Xóa tin nhắn cũ (tùy chọn)
      // messageElement.remove();
    }
  };

  window.likeMessage = function (button) {
    toggleActiveClass(button);
    // Ở đây có thể thêm code gửi feedback về API
  };

  window.dislikeMessage = function (button) {
    toggleActiveClass(button);
    // Ở đây có thể thêm code gửi feedback về API
  };

  function toggleActiveClass(button) {
    // Kiểm tra nếu nút đã active
    const isActive = button.classList.contains("active");

    // Bỏ active từ tất cả các nút trong cùng nhóm actions
    const actionBtns = button
      .closest(".message-actions")
      .querySelectorAll(".message-action-btn");
    actionBtns.forEach((btn) => {
      if (
        btn.classList.contains("like-btn") ||
        btn.classList.contains("dislike-btn")
      ) {
        btn.classList.remove("active");
      }
    });

    // Toggle active cho nút được click
    if (!isActive) {
      button.classList.add("active");
    }
  }

  // Tối ưu hóa viewport (đơn giản)
  function optimizeViewport() {
    if (window.innerWidth >= 992 && mainContent) {
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 70;
      mainContent.style.height = `${window.innerHeight - headerHeight}px`;
    }
  }

  window.addEventListener("load", optimizeViewport);
  window.addEventListener("resize", optimizeViewport);
});
