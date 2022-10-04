var typing = false;
var lastTypingTime;

$(document).ready(() => {
  socket.emit("join room", chatId);
  socket.on("typing", () => $(".typingDots").show());
  socket.on("stop typing", () => $(".typingDots").hide());

  $.get(`/api/chats/${chatId}`, (data) =>
    $("#chatName").text(getChatName(data))
  );

  $.get(`/api/chats/${chatId}/messages`, (data) => {
    var messages = [];
    var lastSenderId = "";

    data.forEach((message, index) => {
      var html = createMessageHtml(message, data[index + 1], lastSenderId);
      messages.push(html);

      lastSenderId = message.sender._id;
    });

    var messagesHtml = messages.join("");
    addMessagesHtmlToPage(messagesHtml);
    scrollToBottom(false);
    markAllMessagesAsRead();

    $(".loadingSpinnerContainer").remove();
    $(".chatContainer").css("visibility", "visible");
  });
});

$("#chatNameButton").click(() => {
  var name = $("#chatNameTextbox").val().trim();

  $.ajax({
    url: "/api/chats/" + chatId,
    type: "PUT",
    data: { chatName: name },
    success: (data, status, xhr) => {
      if (xhr.status != 204) {
        alert("could not update");
      } else {
        location.reload();
      }
    },
  });
});

$(".sendMessageButton").click(() => {
  messageSubmitted();
});

$(".inputTextbox").keydown((event) => {
  updateTyping();

  if (event.which === 13) {
    messageSubmitted();
    return false;
  }
});

function updateTyping() {
  if (!connected) return;

  if (!typing) {
    typing = true;
    socket.emit("typing", chatId);
  }

  lastTypingTime = new Date().getTime();
  var timerLength = 3000;

  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;

    if (timeDiff >= timerLength && typing) {
      socket.emit("stop typing", chatId);
      typing = false;
    }
  }, timerLength);
}

function addMessagesHtmlToPage(html) {
  $(".chatMessages").append(html);
}

function messageSubmitted() {
  var content = $(".inputTextbox").val().trim();

  if (content != "") {
    sendMessage(content);
    $(".inputTextbox").val("");
    socket.emit("stop typing", chatId);
    typing = false;
  }
}

function sendMessage(content) {
  $.post(
    "/api/messages",
    { content: content, chatId: chatId },
    (data, status, xhr) => {
      if (xhr.status != 201) {
        alert("Could not send message");
        $(".inputTextbox").val(content);
        return;
      }

      addChatMessageHtml(data);

      if (connected) {
        socket.emit("new message", data);
      }
    }
  );
}

function addChatMessageHtml(message) {
  if (!message || !message._id) {
    alert("Message is not valid");
    return;
  }

  var messageDiv = createMessageHtml(message, null, "");

  addMessagesHtmlToPage(messageDiv);
  scrollToBottom(true);
}

function createMessageHtml(message, nextMessage, lastSenderId) {
  var sender = message.sender;
  var senderName = sender.name;

  var currentSenderId = sender._id;
  var nextSenderId = nextMessage != null ? nextMessage.sender._id : "";

  var isFirst = lastSenderId != currentSenderId;
  var isLast = nextSenderId != currentSenderId;

  var isMine = message.sender._id == userLoggedIn._id;
  var liClassName = isMine ? "mine" : "theirs";

  var nameElement = "";
  if (isFirst) {
    liClassName += " first";

    if (!isMine) {
      nameElement = `<span class='senderName'>${senderName}</span>`;
    }
  }

  var profileImage = "";
  if (isLast) {
    liClassName += " last";
    profileImage = `<img src='${sender.profilePic}'>`;
  }

  var imageContainer = "";
  if (!isMine) {
    imageContainer = `<div class='imageContainer'>
                                ${profileImage}
                            </div>`;
  }

  return `<li class='message ${liClassName}'>
                ${imageContainer}
                <div class='messageContainer'>
                    ${nameElement}
                    <span class='messageBody'>
                        ${message.content}
                    </span>
                </div>
            </li>`;
}

function scrollToBottom(animated) {
  var container = $(".chatMessages");
  var scrollHeight = container[0].scrollHeight;

  if (animated) {
    container.animate({ scrollTop: scrollHeight }, "slow");
  } else {
    container.scrollTop(scrollHeight);
  }
}

function markAllMessagesAsRead() {
  $.ajax({
    url: `/api/chats/${chatId}/messages/markAsRead`,
    type: "PUT",
    success: () => refreshMessagesBadge(),
  });
}

// //ADDING A NEW MEMEBER TO A GROUP CHAT

let timer;
let userToAdd;

const searchBox = $("#addNewUserModalTextBox");
const addUser = $("#addNewUserModalButton");

if (searchBox != null) {
  searchBox.on("keydown", function () {
    clearTimeout(timer);
    const textbox = $(this);
    let value = textbox.val();

    if (value === "" && event.keyCode === 8) {
      $(".userList").html("");
      return;
    }

    timer = setTimeout(() => {
      value = textbox.val().trim();

      if (value === "") {
        $(".userList").html("");
      } else {
        searchUsers(value);
      }
    }, 1000);
  });
}

function searchUsers(searchTerm) {
  $.get("/api/users", { search: searchTerm }, (results) => {
    outputSelectableUsers(results, $(".userList"));
  });
}

function outputSelectableUsers(results, container) {
  container.html("");

  results.forEach((result) => {
    if (users.some((user) => user._id === result._id)) {
      return;
    }

    const html = createUserHtml(result);
    const element = $(html);
    element.click(() => userSelected(result));

    container.append(element);
  });
}

function createUserHtml(userData) {
  return `<div class='user'>
                <div class='userImageContainer'>
                    <img src='${userData.profilePic}'>
                </div>
                <div class='userDetailsContainer'>
                    <div class='header'>
                        <span>${userData.name}</span>
                        <span class='username'>@${userData.job}</span>
                    </div>
                </div>
            </div>`;
}

function userSelected(user) {
  searchBox.val(user.name).focus();
  $(".userList").html("");
  userToAdd = user;
}

if (addUser != null) {
  addUser.on("click", () => {
    if (userToAdd == null) {
      alert("Žádný uživatel nevybrán. Zkus to prosím znovu.");
      return;
    } else {
      $.ajax({
        url: `/api/chats/${chatId}/addNewMember`,
        data: userToAdd,
        type: "PUT",
        success: () => location.reload(),
        error: () => confirm("Nelze aktualizovat. Zkus to prosím znovu."),
      });
    }
  });
}

$("#addNewUserModal").on("hidden.bs.modal", () => {
  searchBox.val("");
  $(".userList").html("");
  userToAdd = null;
});

function getChatName(chatData) {
  var chatName = chatData.chatName;

  if (!chatName) {
    var otherChatUsers = getOtherChatUsers(chatData.users);
    var namesArray = otherChatUsers.map((user) => user.name);
    chatName = namesArray.join(", ");
  }

  return chatName;
}

function getOtherChatUsers(users) {
  if (users.length == 1) return users;

  return users.filter((user) => user._id != userLoggedIn._id);
}
