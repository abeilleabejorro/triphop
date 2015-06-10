// suggest a new date slide up
// c
//   $('#suggest-date').click(function(){
//     $(this).hide(function(){
//       $('.proposed-dates').show('slow');
//     });
//   })
// })

// var url = "http://api.hotwire.com/v1/search/car?apikey=hkgbckq9muc4m7qbcrs5w5gz&format=json";

// $(document).ready(function() {

// $('#new_trip').submit(function() {
//      ajaxCall();

//  });
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



// //   // user hits enter while on the input field
// // 	  // $('input').keypress(function(e){
// // 	  //   if(e.which == 13){
// // 	  //     e.preventDefault();
// // 	  //     e.stopPropagation();
// // 	  //     ajaxCall();
// // 	  //   }
// // 	  // });

//   function ajaxCall() {
//   	var $inputs = $('#new_trip :input');
//   	var dest = $('#trip_origin').val();
//   	var start = $('#trip_start_date').val();
//   	var end = $('#trip_end_date').val();
//   	var data = "&dest="+dest+"&startdate="+start+"&enddate="+end+"&pickuptime=10:00&dropofftime=13:30"

// 			$.ajax({
// 			  	dataType: "json",
// 			  	url: url,
// 			  	data: data,

// 				}).done(function(response) {
//             $('body').append(response);

//             // return response; // <- tried that one as well
//         	}
// 				);

//  	}//function


