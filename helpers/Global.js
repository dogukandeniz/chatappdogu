class Global {


      constructor(){

        this.globalroom= [];

      }
      RemoveUser(id){
          var user = this.GetUser(id);
          if(user){
              this.users = this.globalroom.filter((user)=> user.id !==id);
          }
          return user;
      }
      GetUser(id){

          var getUser = this.globalroom.filter((user)=>{

              return user.id==id;
          })[0];

          return getUser;
      }

      EnterRoom(id,name,room,img){
          var roomName = {id,name,room,img};

          this.globalroom.push(roomName);
          return roomName;

      }


      getRoomList(room){

          var roomName = this.globalroom.filter((user) => user.room === room);

          var namesArray = roomName.map((user)=>{ return{ name:user.name,img:user.img } });

          return namesArray;
      }
}


module.exports = { Global };
