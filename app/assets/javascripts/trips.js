

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

// });//document ready
