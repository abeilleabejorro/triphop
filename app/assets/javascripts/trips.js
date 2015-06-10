$(document).ready(function(){
  $("#invite").click(function(e){
    if ($("#email1").val()=="" && $("#email2").val()=="" && $("#email2").val()=="" ){
      e.preventDefault();
      alert("please enter at least one email address!");
    };
    
  });
  $(".add-email").click(function(e){
    //debugger;
  e.preventDefault();
   $(".email-fld:last-child").append('<li class="email-fld"><span class="pic-thumb"><i class="fa fa-user"></i></span><input type="email" name="email[]" placeholder="friend@friend.com" id="email4"></li>');
                                    
  });
});








