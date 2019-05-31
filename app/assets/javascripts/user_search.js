$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUserName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_8'>
                  <input name='group[user_ids][]' type='hidden' value="${user_id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>` 

    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if(input!==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })
      .done(function(users) {
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUserName(user);
          });
        }
      })
      .fail(function() {
        alert('検索に失敗しました');
      })
    }
  });
  
    $(document).on("click", '.user-search-add',function () {
      var name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      $(this).parent().remove();
      var html = appendMembers(name, user_id);
      $('#chat-group-users').apeend(html);
    });
    $(document).on("click", '.user_search_remove', function () {
        $(this).parent().remove();
    });
});
