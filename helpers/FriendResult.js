module.exports = function(async,Users,Message){

return {

    PostRequest:function(req,res,url){
          console.log('1')
      async.parallel([
          function(callback){
                console.log('1')
            if(req.body.senderId){
              console.log('1')
              Users.update({
                  '_id':req.user._id,
                  'friendsList.friendId':{$ne:req.body.senderId}
              },{
                  $push:{friendsList:{
                      friendId: req.body.senderId,
                      friendName: req.body.senderName
                  }},
                  $pull:{request:{
                      userId:req.body.senderId,
                      username:req.body.senderName
                  }},
                  $inc:{totalRequest:-1}
              },(err,count)=>{
                callback(err,count);
              });
            }
          },
          function(callback){
              console.log('2')
            if(req.body.senderId){
              console.log('2')
              Users.update({
                  '_id':req.body.senderId,
                  'friendsList.friendId':{$ne:req.user._id}
              },{
                  $push:{friendsList:{
                      friendId :req.user._id,
                      friendName: req.user.username
                  }},
                  $pull:{sentRequest:{

                      username:req.user.username
                  }},

              },(err,count)=>{
                callback(err,count);
              });
            }
          },
          function(callback){
              console.log('4')
            if(req.body.receiverName){
              console.log('4')
              Users.update({
                'username':req.body.receiverName,
                'request.userId':{$ne:req.user._id},
                'friendsList.friendId':{$ne:req.user._id}
              },
              {
                $push:{request:{userId:req.user._id,
                                username:req.user.username
                  }},
                  $inc:{totalRequest:1}
              },(err,count)=>{
                callback(err,count);
              })
            }
          },
          function(callback){
              console.log('3')
            if(req.body.receiverName){
              console.log('3')
              Users.update({
                'username':req.user.username,
                'sentRequest.username':{$ne:req.body.receiverName}
              },
              {
                $push:{sentRequest:{
                  username:req.body.receiverName
                }}
              },
              (err,count)=>{
                callback(err,count);
              }
            )
            }
          },
          function(callback){
              console.log('5')
            if(req.body.user_Id){
              console.log('5')
              Users.update({
                '_id':req.user._id,
                'request.userId':{$eq:req.body.user_Id}
              },
              {
                $pull:{request:{
                  userId:req.body.user_Id
                }},
                $inc:{totalRequest:-1}
              },
              (err,count)=>{
                callback(err,count);
              }
            )
            }
          },
          function(callback){
                console.log('6')
            if(req.body.user_Id){
              console.log('6')
              Users.update({
                '_id':req.body.user_Id,
                'sentRequest.userId':{$eq:req.user.username}
              },
              {
                $pull:{sentRequest:{
                  username:req.user.username
                }}

              },
              (err,count)=>{
                callback(err,count);
              }
            )
            }
          },function(callback){
console.log('7')
              if(req.body.chatId){
                console.log('7')

                  Message.update({
                      '_id':req.body.chatId
                  },
                  {
                      "isRead":true
                  },(err,done)=>{
                      console.log(done);
                      callback(err,done);
                  }
                  )
              }
            }
      ],(err,results) =>{
        if(err){
          console.log(err);
        }
        res.redirect(url);

      });

    }
}

}
