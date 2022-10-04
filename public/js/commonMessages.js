// Globals
var cropper;
let timer;
var selectedUsers = [];

$(document).ready(() => {
  refreshMessagesBadge();
});

$("#userSearchTextbox").keydown((event) => {
  clearTimeout(timer);
  var textbox = $(event.target);
  var value = textbox.val();

  if (value == "" && (event.which == 8 || event.keyCode == 8)) {
    // remove user from selection
    selectedUsers.pop();
    updateSelectedUsersHtml();
    $(".resultsContainer").html("");

    if (selectedUsers.length == 0) {
      $("#createChatButton").prop("disabled", true);
    }

    return;
  }

  timer = setTimeout(() => {
    value = textbox.val().trim();

    if (value == "") {
      $(".resultsContainer").html("");
    } else {
      searchUsers(value);
    }
  }, 1000);
});

$("#createChatButton").click(() => {
  var data = JSON.stringify(selectedUsers);

  $.post("/api/chats", { users: data }, (chat) => {
    if (!chat || !chat._id) return alert("Invalid response from server.");

    window.location.href = `/messages/${chat._id}`;
  });
});

function outputUsers(results, container) {
  container.html("");

  results.forEach((result) => {
    var html = createUserHtml(result);
    container.append(html);
  });

  if (results.length == 0) {
    container.append(
      "<span class='noResults'>Nebyly nalezeny žádné výsledky.</span>"
    );
  }
}

function createUserHtml(userData) {
  return `<div class='user'>
                <div class='userImageContainer'>
                    <img src='${userData.profilePic}'>
                </div>
                <div class='userDetailsContainer'>
                    <div class='header'>
                        <span>${userData.name}</span>
                        <span class='username'><b>@${userData.job}</b></span>
                    </div>
                </div>
            </div>`;
}

function searchUsers(searchTerm) {
  $.get("/api/users", { search: searchTerm }, (results) => {
    outputSelectableUsers(results, $(".resultsContainer"));
  });
}

function outputSelectableUsers(results, container) {
  container.html("");

  results.forEach((result) => {
    if (
      result._id == userLoggedIn._id ||
      selectedUsers.some((u) => u._id == result._id)
    ) {
      return;
    }

    var html = createUserHtml(result);
    var element = $(html);
    element.click(() => userSelected(result));

    container.append(element);
  });

  if (results.length == 0) {
    container.append(
      "<span class='noResults'>Nebyly nalezeny žádné výsledky.</span>"
    );
  }
}

function userSelected(user) {
  selectedUsers.push(user);
  updateSelectedUsersHtml();
  $("#userSearchTextbox").val("").focus();
  $(".resultsContainer").html("");
  $("#createChatButton").prop("disabled", false);
}

function updateSelectedUsersHtml() {
  var elements = [];

  selectedUsers.forEach((user) => {
    var userElement = $(`<span class='selectedUser'>${user.name}</span>`);
    elements.push(userElement);
  });

  $(".selectedUser").remove();
  $("#selectedUsers").prepend(elements);
}

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

function messageReceived(newMessage) {
  if ($(`[data-room="${newMessage.chat._id}"]`).length == 0) {
    // Show popup notification
    showMessagePopup(newMessage);
  } else {
    addChatMessageHtml(newMessage);
  }

  refreshMessagesBadge();
}

function refreshMessagesBadge() {
  $.get("/api/chats", { unreadOnly: true }, (data) => {
    var numResults = data.length;

    if (numResults > 0) {
      $("#messagesBadge").text(numResults).addClass("active");
    } else {
      $("#messagesBadge").text("").removeClass("active");
    }
  });
}

function showMessagePopup(data) {
  if (!data.chat.latestMessage._id) {
    data.chat.latestMessage = data;
  }

  var html = createChatHtml(data.chat);
  //   var element = $(html);
  //   element.hide().prependTo("#notificationList").slideDown("fast");

  setTimeout(() => element.fadeOut(400), 5000);
}

function createChatHtml(chatData) {
  var chatName = getChatName(chatData);
  var image = getChatImageElements(chatData);
  var latestMessage = getLatestMessage(chatData.latestMessage);
  var activeClass =
    !chatData.latestMessage ||
    chatData.latestMessage.readBy.includes(userLoggedIn._id)
      ? ""
      : "active";
  return `<a href="/messages/${chatData._id}" class="resultListItem ${activeClass}" title="Go to chat">
                ${image}
                <div class="resultsDetailsContainer ellipsis">
                    <span class="heading ellipsis">${chatName}</span>
                    <span class="subText ellipsis">${latestMessage}</span>
                </div>
                <button>
                <i class='fa fa-trash leaveChat' data-id="${chatData._id}" title="Opustit tento chat"></i>
                </button>
            </a>`;
}

function getLatestMessage(latestMessage) {
  if (latestMessage != null) {
    var sender = latestMessage.sender;
    return `${sender.name}: ${latestMessage.content}`;
  }

  return "New chat";
}

function getChatImageElements(chatData) {
  var otherChatUsers = getOtherChatUsers(chatData.users);

  var groupChatClass = "";
  var chatImage = getUserChatImageElement(otherChatUsers[0]);

  if (otherChatUsers.length > 1) {
    groupChatClass = "groupChatImage";
    chatImage += getUserChatImageElement(otherChatUsers[1]);
  }

  return `<div class='resultsImageContainer ${groupChatClass}'>${chatImage}</div>`;
}

function getUserChatImageElement(user) {
  if (!user || !user.profilePic) {
    return alert("User passed into function is invalid");
  }

  return `<img src='${user.profilePic}' alt='User's profile pic'>`;
}
