'use strict';

module.exports = function(async,Club,Users){
  return {


          SetRouting: function(router){
              router.get('/results',this.getResults);
              router.post('/results',this.postREsults);
              router.get('/members',this.viewMembers);

          },
          getResults: function(req,res){
            res.redirect('/home');
          },
          postREsults:function(req,res){

              async.parallel([

                  function(callback){
                    const regex = new RegExp((req.body.country),'gi');

                    Club.find({'$or':[{'country':regex},{'name':regex}]},(err,result)=>{
                        callback(err,result);
                    })
                  }
              ],(err,results)=>{

                  const res1 = results[0];
                  const dataChunk=[];
                  const chunkSize=3;

                  for(let i=0; i<res1.length;i+=chunkSize){

                        dataChunk.push(res1.slice(i,i+chunkSize));
                    }

                    return res.render('results',{title:'Footballkik - Results',user:req.user,chunks:dataChunk
                    });
              })
          },
          viewMembers:function(req,res){

            async.parallel([

                function(callback){

                  Users.find({},(err,result)=>{
                      callback(err,result);
                  })
                }
            ],(err,results)=>{

                const res1 = results[0];
                const dataChunk=[];
                const chunkSize=4;

                for(let i=0; i<res1.length;i+=chunkSize){

                      dataChunk.push(res1.slice(i,i+chunkSize));
                  }

                  return res.render('members',{title:'Footballkik - Members',user:req.user,chunks:dataChunk
                  });


          })

      }
}
}
