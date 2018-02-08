var server;
$(function(){
//localStorage.setItem("Service","http://mukthasis.com/spetinfo/");
localStorage.setItem("Service","http://spetinfo.com/spetinfo/");
//localStorage.setItem("Service","http://localhost/spetinfo/");
server = localStorage.getItem("Service");
//alert(server);
$("#login").on("submit", function(e){
    e.preventDefault();
    var fdata = $("#login").serialize();
    $.ajax({
       url:server+"checkLogin",
       data:fdata,
       type:"post",
       beforeSend:function(){
        $("#preloader").show();
        $("#emsg").hide();
       },
       success: function(str){
       $("#preloader").hide();
       $("#cmsg").hide();
       $("#emsg").hide();
       if(str.Status == 'Success'){
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("User",str.Name);
        localStorage.setItem("Usercode",str.Usercode);
        if(localStorage.getItem('Role') == 'SuperAdmin'){
          location.href="SuperAdmin.html";
        }else if(localStorage.getItem('Role') == 'Admin'){
          location.href="Admin.html";
        }
       }else{
         $("#emsg").show();
         $("#login")[0].reset();
       }
       },
       error: function(jqXHR, status, error){
       $("#preloader").hide();
       $("#cmsg").show();
       }
    });
});

$("#insertData").on('submit', function(e){
          e.preventDefault();
          var fdata = new FormData(this);
          $.ajax({
             url:server+"saveData",
             data:fdata,
             type:"post",
             processData:false,
             cache:false,
             contentType:false,
             beforeSend:function(){
             $("#preloader").show();
             $("#emsg").hide();
             $("#smsg").hide();
             $("#cmsg").hide();
                },
             success: function(str){
               $("#preloader").hide();
               $("#cmsg").hide();
               $("#emsg").hide();
               if(str.Status == 'Success'){
                $("#smsg").hide();
                localStorage.setItem('Infoid',str.Infoid);
                if(localStorage.getItem("Role") == 'SuperAdmin'){
                location.href="Upload_Image.html";
                }
                if(localStorage.getItem("Role") == 'Admin'){
                location.href="Upload.html";
                }

               }else{
                 $("#emsg").show();
               }
             },
              error: function(jqXHR, status, error){
               $("#preloader").hide();
               $("#cmsg").show();
                }
          });
       });

$("#updateData").on('submit', function(e){
          e.preventDefault();
          var fdata = $("#updateData").serialize();
          $.ajax({
             url:server+"updateData",
             data:fdata,
             type:"post",
             beforeSend:function(){
             $("#preloader").show();
             $("#emsg").hide();
             $("#smsg").hide();
             $("#cmsg").hide();
                },
             success: function(str){
               $("#preloader").hide();
               $("#cmsg").hide();
               $("#emsg").hide();
               if(str.Status == 'Success'){
                $("#smsg").hide();
                localStorage.setItem('Infoid',str.Infoid);
                if(localStorage.getItem("Role") == 'SuperAdmin'){
                location.href="ViewData.html";
                }
                if(localStorage.getItem("Role") == 'Admin'){
                location.href="View.html";
                }

               }else{
                 $("#emsg").show();
               }
             },
              error: function(jqXHR, status, error){
               $("#preloader").hide();
               $("#cmsg").show();
                }
          });
       });

$("#insertImage").on('submit', function(e){
          e.preventDefault();
          var fdata = new FormData(this);
          $.ajax({
             url:server+"saveImage",
             data:fdata,
             type:"post",
             processData:false,
             cache:false,
             contentType:false,
             beforeSend:function(){
             $("#preloader").show();
             $("#emsg").hide();
             $("#smsg").hide();
             $("#cmsg").hide();
                },
             success: function(str){
               $("#preloader").hide();
               $("#cmsg").hide();
               $("#emsg").hide();
               if(str.Status == 'Success'){
                $("#smsg").hide();
                location.reload();
               }else{
                 $("#emsg").show();
               }
             },
              error: function(jqXHR, status, error){
               $("#preloader").hide();
               $("#cmsg").show();
                }
          });
       });


$("#insertuser").on("submit", function(e){
    e.preventDefault();
    var fdata = $("#insertuser").serialize();
    $.ajax({
       url:server+"insertUser",
       data:fdata,
       type:"post",
       success: function(str){
       $("#preloader").hide();
       $("#cmsg").hide();
       $("#emsg").hide();
       if(str.Status == 'Success'){
        $("#smsg").show();
        $("#insertuser")[0].reset();
       }else{
         $("#emsg").show();
         $("#insertuser")[0].reset();
       }
       }
    });
});

$("#search-box").keyup(function(){
    if($(this).val().length>2){
    $.ajax({
    type: "POST",
    url: server+"categories.php",
    data:'keyword='+$(this).val(),
    beforeSend: function(){
      $("#search-box").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    },
    success: function(data){
      $("#country-list").show();
      $("#country-list").html(data);
      $("#search-box").css("background","#FFF");
    }
    });
    }else{
      $("#country-list").hide();
    }
  });

  $("#search-box1").keyup(function(){
    if($(this).val().length>2){
    $.ajax({
    type: "POST",
    url: server+"subcategories.php",
    data:'keyword='+$(this).val(),
    beforeSend: function(){
      $("#search-box1").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
    },
    success: function(data){
      $("#country-list1").show();
      $("#country-list1").html(data);
      $("#search-box1").css("background","#FFF");
    }
    });
    }else{
      $("#country-list1").hide();
    }
  });

});



function showScreen(view){
  location.href=view;
}

function showHome(view){
if(localStorage.getItem("Role") == 'SuperAdmin'){
                location.href="SuperAdmin.html";
                }
                if(localStorage.getItem("Role") == 'Admin'){
                location.href="Admin.html";
                }
}
function logout(){
localStorage.removeItem("Role");
localStorage.removeItem("User");
localStorage.removeItem("Usercode");
location.href="index.html";
}

function showPage(str){
localStorage.setItem("Infoid",str);
if(localStorage.getItem("Role") == 'SuperAdmin'){
                location.href="Upload_Image.html";
                }
                if(localStorage.getItem("Role") == 'Admin'){
                location.href="Upload.html";
                }
}

function selectCategory(str){
  $("#search-box").val(str);
  $("#country-list").hide();
}
function selectSubCategory(str){
  $("#search-box1").val(str);
  $("#country-list1").hide();
}

function removeImage(image){
  $.ajax({
    url:server+"removeImage",
    data:{"image":image},
    type:"post",
    success: function(str){
      location.reload();
    }
  });
}

function deletePage(infoid){
  $.ajax({
    url:server+"deletePage",
    data:{"infoid":infoid},
    type:"post",
    success: function(str){
      location.reload();
    }
  });
}