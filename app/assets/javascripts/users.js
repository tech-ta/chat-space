// $(function() {
//   function buildHTML(user){
//     let html = `
//                 <div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${user.name}</p>
//                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
//                 </div>
//                 `
//     return html;
//   }
//   function appendErrUserToHTML() {
//     var html = `
//                 <div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">ユーザーが見つかりません</p>
//                 </div>`;
//     return html;
//   }
//   function addDeleteMember(userName, userId){
//     var html = `
//                 <div class='chat-group-user'>
//                   <input name='group[user_ids][]' type='hidden' value='${userId}'>
//                   <p class='chat-group-user__name'>${userName}</p>
//                   <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
//                 </div>
//                 `
//     $('#chat-group-users').append(html);
//   }
//   function addMember(userId) {
//     let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
//     $(`#${userId}`).append(html);
//   }
//   $("#user-search-field").on("keyup", function(e) {
//     e.preventDefault();
//     let input = $(this).val();
//     console.log(input);
//     $.ajax({
//       type: "GET",
//       url: '/users',
//       dataType: 'json',
//       data: {keyword: input}
//     })
//     .done(function(users) {
//       $('#user-search-result').empty();
//       if (users.length !== 0) {
//         users.forEach(function(user){
//           let html = buildHTML(user)
//           $('#user-search-result').append(html);
//           console.log(html);
//         });
//       } else {
//         let html = appendErrUserToHTML();
//         $('#user-search-result').append(html);
//       }
//     })
//     .fail(function() {
//       alert('ユーザー検索に失敗しました');
//     })
//   });
//   $(document).on('click', ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
//     let userName = $(this).attr('data-user-name');
//     let userId = "data-user-id";
//     $(this).parent().remove();
//     addDeleteMember(userName, userId);
//     addMember(userId);
//   })
//   $(document).on('click', '.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function(){
//     $(this).parent().remove();
//   })
// });

$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});