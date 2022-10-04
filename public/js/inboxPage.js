$(document).ready(() => {
  $.get("/api/chats", (data, status, xhr) => {
    if (xhr.status == 400) {
      alert("Could not get chat list.");
    } else {
      outputChatList(data, $(".resultsContainer"));
    }
  });
});

function outputChatList(chatList, container) {
  chatList.forEach((chat) => {
    var html = createChatHtml(chat);
    container.append(html);
  });

  if (chatList.length == 0) {
    container.append("<span class='noResults'>Žádné zprávy k zobrazení</span>");
  }
}

$(document).on("click", (e) => {
  const target = $(e.target);
  if (target.hasClass("leaveChat")) {
    if (target.data().id != null) {
      const chatId = target.data().id;
      Swal.fire({
        icon: "question",
        title: "Pozor",
        text: "Chceš chat skutečně smazat?",
        showCancelButton: true,
        confirmButtonText: "Smazat",
        cancelButtonText: "Rozhodně ne",
        confirmButtonColor: "#147aed",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $.ajax({
            url: `/api/chats/${chatId}/leaveChat`,
            type: "PUT",
            success: () => location.reload(),
            error: () => confirm("Nelze aktualizovat. Prosím zkus to znovu."),
          });
        }
      });
    }
    return false;
  }
});
