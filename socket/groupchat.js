module.exports = function(io,Users){

const users = new Users();


io.on('connection',(socket)=>{

socket.on('join',(params,callback)=>{

      socket.join(params.room);

      users.AddUserData(socket.id,params.name,params.room);

      io.to(params.room).emit('usersList',users.getUserList(params.room))


      callback();
});
  socket.on('createMessage',(message,callback)=>{

      io.to(message.room).emit('newMessage',{
          text:message.text,
          room:message.room,
          sender:message.sender,
          image:message.userPic
      });
      callback();
  });

  socket.on('disconnect',()=>{

      var user = users.RemoveUser(socket.id);

      if(user){
        io.to(user.room).emit('usersList',users.getUserList(user.room));

      }
  })
});



}
