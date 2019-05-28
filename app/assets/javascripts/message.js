$(function(){
  function buildHTML(message){
    var image = message.image ? '<asset_path src=${message.image} >':''
      var html =
       `<div class="message" data-group=${message.group_id} data-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
          <p class="lower-message__content">
          ${message.content}
          </p>     
          </div>
          ${image}
          </div>`
          return html;
        }
        
        $('#new_message').on('submit', function(e){
          e.preventDefault();
          
          var formData = new FormData(this);
          var url = $(this).attr('action')
          $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
          })
          .done(function(data){
            var html = buildHTML(data);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
            $('form')[0].reset();
          })
          .fail(function(){
            alert('error');
          });
          return false;
        });
        
        var reloadMessages = function() {
          last_message_id = $('.message:last').data('id');
          group_id = $('.message:last').data('group');
          console.log(group_id)
          $.ajax({
            url: '/groups/' + group_id + '/api/messages',
            type: 'get',
            dataType: 'json',
            data: {id: last_message_id}
          })
          
          .done(function(messages) {
            var insertHTML = '';
            messages.forEach(function(message){
              insertHTML += buildHTML(message);
              $('.messages').append(insertHTML);
              $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
            }) 
          })  
          
          .fail(function() {
            
          });
        };
        
        setInterval(reloadMessages, 5000);
      });
      
      