$(document).ready(function(){

  var socket = io();

  var room = $('#groupName').val();
  var sender = $('#sender').val();

  var userPic = $('#name-image').val();


  socket.on('connect',function(){

    var params = {
        room:room,
        name:sender
    }
    socket.emit('join',params,function(){


    });
  });


  socket.on('usersList',function(data){

      var ol = $('<ol></ol>');

      for(let i=0; i<data.length;i++){

          ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+ data[i] +'</a></p>');
      }

      $(document).on('click','#val',function(){
          $('#name').text('@'+$(this).text());
          $('#receiverName').val($(this).text());
          $('#nameLink').attr('href','/profile/'+$(this).text());
      });

      $('#numValue').text('('+data.length+')');

      $('#users').html(ol);

  });

  socket.on('newMessage',function(data){

        var template = $('#message-template').html();
        var message = Mustache.render(template,{


          text:data.text,
          sender:data.sender,
          userImage:data.image

        });


        $('#messages').append(message);


  })

  $('#message-form').on('submit',function(e){

        e.preventDefault();

        var msg = $('#msg').val();

        socket.emit('createMessage',{
            text:msg,
            room:room,
            sender:sender,
            userPic:userPic
        },
        function(){
          $('#msg').val('');
        });

        $.ajax({

            url: '/group/'+room,
            type:'POST',
            data:{
                message:msg,
                groupNamef:room
            },
            success:function(){
                $('#msg').val('');
            }

        });

  })

});
