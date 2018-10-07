$(document).ready(function(){
return getResult();

});

function getResult(){

    $.ajax({

      url: 'https://content.guardianapis.com/search?order-by=newest&page-size=50&q=football&api-key=8b435306-1b3a-480d-b96d-32b7d969507a',
      type:'GET',
      dataType:'json',
      success:function(data){
        console.log(data.response.results[0]);
        var results = '';
        $.each(data.response.results, function(i){
                        results += '<form class="paginate">';
                        results += '<div class="col-md-12 news-post">';
                        results += '<div class="row">';

                        results += '<a href='+data.response.results[i].webUrl+' target="_blank" style="color:#4aa1f3; text-decoration:none;">';
                        results += '<div class="col-md-2">';
                        results += '<img src='+data.response.results[i].fields+' class="img-responsive" />'
                        results += '</div>';

                        results += '<div class="col-md-10">';
                        results += '<h4 class="news-date">'+new Date(Date.parse(data.response.results[i].webPublicationDate)).toDateString()+'</h4>';
                        results += '<h3>'+data.response.results[i].fields+'</h3>';
                        results += '<p class="news-text">'+data.response.results[i].webTitle+'</p>';
                        results += '</div>';


                        results += '</a>';
                        results += '</div>';
                        results += '</div>';
                        results += '</form>';
                    });

                    $('#newsResults').html(results);
                    $('.paginate').slice(0, 2).show();
                }
            })
        }
