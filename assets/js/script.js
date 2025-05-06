// Chức năng phản hồi khi nhấn vào các nút
document.querySelectorAll("button:not(.dropdown-option)").forEach((button) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("message-action-btn")) {
      alert("Tính năng này đang được phát triển!");
    }
  });
});

// Auto resize cho textarea
const textarea = document.querySelector(".chat-input");
if (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}

// Cập nhật lại việc tạo mới đoạn chat
const newChatOption = document.querySelector(".dropdown-option");
if (newChatOption) {
  newChatOption.addEventListener("click", function () {
    // Xóa tất cả tin nhắn
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";

    // Reset layout về trạng thái ban đầu
    const mainContent = document.querySelector(".main-content");
    mainContent.classList.remove("has-messages");
    document.querySelector(".greeting").style.display = "block";
    document.querySelector(".chat-messages").style.display = "none";
    document.querySelector(".disclaimer").style.display = "none";

    alert("Đã tạo đoạn chat mới!");
  });
}

// Xử lý gửi tin nhắn khi nhấn Enter
document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

// Hàm xử lý gửi tin nhắn
function handleSendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();

  if (message) {
    // Hiển thị tin nhắn người dùng
    addUserMessage(message);

    // Ẩn greeting, hiện chat messages và đổi layout
    const mainContent = document.querySelector(".main-content");
    mainContent.classList.add("has-messages");
    document.querySelector(".greeting").style.display = "none";
    document.querySelector(".chat-messages").style.display = "block";
    document.querySelector(".disclaimer").style.display = "block";

    // Xử lý phản hồi
    setTimeout(() => {
      if (message.toLowerCase() === "hello") {
        addBotMessage("Hi");
      } else {
        addBotMessage(
          "Tính năng này vẫn đang được cập nhật, vui lòng chờ trong thời gian sớm nhất."
        );
      }

      // Đảm bảo scroll đến dưới cùng sau khi bot trả lời
      scrollToBottom();
    }, 500);

    // Xóa nội dung input
    userInput.value = "";
    userInput.style.height = "auto";

    // Scroll đến dưới cùng sau khi gửi tin nhắn
    scrollToBottom();
  }
}

// Hàm scroll xuống cuối cùng
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hàm thêm tin nhắn người dùng
function addUserMessage(text) {
  const chatMessages = document.getElementById("chatMessages");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message user-message";

  const container = document.createElement("div");
  container.className = "message-container";

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  container.appendChild(content);

  // Thêm các nút hành động (copy, edit) cho tin nhắn người dùng
  const actions = document.createElement("div");
  actions.className = "message-actions user-actions";

  // Nút Copy
  const copyBtn = document.createElement("button");
  copyBtn.className = "message-action-btn";
  copyBtn.innerHTML = `<img src="assets/img/Copy.svg" alt="Copy"> Copy`;
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Đã sao chép vào clipboard!"))
      .catch((err) => console.error("Không thể sao chép: ", err));
  });

  // Nút Chỉnh sửa
  const editBtn = document.createElement("button");
  editBtn.className = "message-action-btn";
  editBtn.innerHTML = `<img src="assets/img/Pencil.svg" alt="Edit"> Chỉnh sửa`;
  editBtn.addEventListener("click", () => {
    // Đổ nội dung vào ô nhập liệu để chỉnh sửa
    const userInput = document.getElementById("userInput");
    userInput.value = text;
    userInput.focus();
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";

    // Tùy chọn: Xóa tin nhắn cũ
    if (confirm("Bạn có muốn xóa tin nhắn cũ để chỉnh sửa không?")) {
      messageDiv.remove();
    }
  });

  actions.appendChild(copyBtn);
  actions.appendChild(editBtn);

  container.appendChild(actions);
  messageDiv.appendChild(container);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hàm thêm tin nhắn bot - bỏ nút chỉnh sửa
function addBotMessage(text) {
  const chatMessages = document.getElementById("chatMessages");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot-message";

  const container = document.createElement("div");
  container.className = "message-container";

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  container.appendChild(content);

  // Thêm các nút hành động (copy, like, dislike)
  const actions = document.createElement("div");
  actions.className = "message-actions";

  // Nút Copy
  const copyBtn = document.createElement("button");
  copyBtn.className = "message-action-btn";
  copyBtn.innerHTML = `<img src="assets/img/Copy.svg" alt="Copy"> Copy`;
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Đã sao chép vào clipboard!"))
      .catch((err) => console.error("Không thể sao chép: ", err));
  });

  // Nút Like
  const likeBtn = document.createElement("button");
  likeBtn.className = "message-action-btn";
  likeBtn.innerHTML = `<img src="assets/img/Facebook Like.svg" alt="Like"> Hữu ích`;
  likeBtn.addEventListener("click", () => {
    alert("Cảm ơn bạn đã đánh giá!");
  });

  // Nút Dislike (dùng thẻ img và xoay 180 độ)
  const dislikeBtn = document.createElement("button");
  dislikeBtn.className = "message-action-btn";
  dislikeBtn.innerHTML = `<img src="assets/img/Facebook Like.svg" alt="Dislike" style="transform: rotate(180deg);"> Không hữu ích`;
  dislikeBtn.addEventListener("click", () => {
    alert("Cảm ơn bạn đã đánh giá!");
  });

  // Đã bỏ nút chỉnh sửa

  actions.appendChild(copyBtn);
  actions.appendChild(likeBtn);
  actions.appendChild(dislikeBtn);

  container.appendChild(actions);
  messageDiv.appendChild(container);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// NOTE: Đoạn code cần cải tiến để gọi API
// 1. Thay vì kiểm tra message === 'hello', cần gửi message đến API
// 2. Thêm đoạn code gọi API, ví dụ:
/*
async function sendMessageToAPI(message) {
  try {
    const response = await fetch('URL_API_CỦA_BẠN', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        message: message
      })
    });
    
    const data = await response.json();
    return data.reply; // Giả sử API trả về đối tượng có trường reply
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return 'Có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.';
  }
}

// Thay đoạn xử lý phản hồi bằng:
const botReply = await sendMessageToAPI(message);
addBotMessage(botReply);
*/
