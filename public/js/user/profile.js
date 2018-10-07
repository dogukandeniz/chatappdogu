$(document).ready(()=>{
$('.add-btn').on('click',()=>{
  $('#add-input').click();
})

  $('#add-input').on('change',()=>{

    var uploadInput = $('#add-input');

    if(uploadInput.val()!=''){

      var formData = new FormData();

      formData.append('upload',uploadInput[0].files[0]);
      $('#completed').html('File Uploaded Successfully');
        $.ajax({

            url:'/userUpload',
            type:'POST',
            data:formData,
            processData:false,
            contentType:false,
            success:(()=>{
              uploadInput.val('');
            })

        })
    }
    showImage(uploadInput);
  });

  $('#profile').on('click',function(){

      var username = $('#username').val();
      var fullanme = $('#fullname').val();
      var country = $('#country').val();
      var gender = $('#gender').val();
      var mantra = $('#mantra').val();
      var userImage = $('#add-input').val();


      var valid=true;

      if(valid===true){

          $.ajax({

              url: '/settings/profile',
              type:'POST',
              data:{
                  username:username,
                  fullname:fullanme,
                  gender:gender,
                  country:country,
                  mantra:mantra,
                  upload:userImage
              },
              success:function(){
                  setTimeout(function(){
                      window.location.reload();
                  },200)
              }
          });

      }else{
          return false;
      }

  });
})

function showImage(input) {
  var resim = $('#show_img');
  var dosyaSecici    =document.querySelector('input[type=file]').files[0];
  var dosyaOkuyucu  = new FileReader();

  dosyaOkuyucu.onloadend = function () {
    resim.src = dosyaOkuyucu.result;
  }

  if (dosyaSecici) {
    dosyaOkuyucu.readAsDataURL(dosyaSecici);
  } else {
    resim.src = "";
  }
}
