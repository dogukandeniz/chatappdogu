'use strict';



module.exports = function(formidable,Club,aws){


return{

      SetRouting:function(router){

        router.get('/dashboard',this.adminPage);
        router.post('/uploadFile',aws.Upload.any(),this.uploadFile);
        router.post('/dashboard',this.adminPostPage);
      },
      adminPostPage:function(req,res){
        const newClub = new Club();
        newClub.name = req.body.club;
        newClub.country=req.body.country;
        newClub.image=req.body.upload;
        newClub.save((err)=>{
            res.render('admin/dashboard');
        })
      },
      
      adminPage:function(req,res){
          res.render('admin/dashboard');
      },
      uploadFile:function(req,res){

          const form = new formidable.IncomingForm();
        //  form.uploadDir = path.join(__dirname,'../public/uploads');

          form.on('file',(field,file)=>{

          });
          form.on('error',(err)=>{
              console.log(err);
          });

          form.on('end',(err)=>{
              console.log('File upload is successful');
          });

          form.parse(req);

      }

    }
}
