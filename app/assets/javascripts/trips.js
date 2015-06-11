$(document).ready(function(){
  inviteMore();
  getMaps();
});

function getMaps(){
if ($("#trip-edit-page").length>0){
   var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var thehome = new google.maps.LatLng(40.4764, -106.8267);
      var mapOptions = {
        zoom:7,
        center: thehome
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
       directionsDisplay.setMap(map);
      calcRoute();
    }

    function calcRoute() {
      var start = document.getElementById('start').value;
      var end = document.getElementById('end').value;
      var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }
   google.maps.event.addDomListener(window, 'load', initialize);
  }
}

function inviteMore(){
  if ($("#trip-edit-page").length>0){
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
  }
}
// function deleteTrip(){ 
//  if ($(".delete-trip").length>0){
//   $(".delete-trip").click(function(e){
//     debugger
//        e.stopPropagation();
     
//     });
//   }
// }  







