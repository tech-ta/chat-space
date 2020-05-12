$(function() {
  function buildHTML(message){
    if (message.image.url) {
      var html = `<div class="message-box" data-message-id=${message.id}>
                    <div class="message-box__contributor-date">
                      <div class="contributor">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-box__top-space"></div>
                    <div class="message-box__content">
                      <p class="message-box__text">${message.text}</p>
                      <img src="${message.image.url}">
                    </div>
                    <div class="message-box__bottom-space"></div>
                  </div>`
    } else {
      var html = `<div class="message-box" data-message-id=${message.id}>
                    <div class="message-box__contributor-date">
                      <div class="contributor">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-box__top-space"></div>
                    <div class="message-box__content">
                      ${message.text}
                    </div>
                    <div class="message-box__bottom-space"></div>
                  </div>`
    }
    return html
  }

  $(".new_message").on("submit", function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false);
    });
  });
  function reloadMessages(){
    var last_message_id = $(".message-box:last").data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    .done(function(messages){
      if (messages.length !==0) {
        var insertHTML = "";
        $.each(messages, function(i,message){
          insertHTML += buildHTML(message);
        })
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('errorr');
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
