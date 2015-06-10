$(document).ready(function(){

    //Plugins Init
    Plugins.init();
    Plugins.animations();
    Plugins.wow();
    Plugins.parallaxStellar();
    Plugins.revolutionSlider();
    Plugins.dialogEffects();
    Plugins.onePageNav();
    Plugins.owlCarousel();
    Plugins.knobs(".lbKnob", "#26C6DA");
    Plugins.modalEffects();

    $('.places').click(function(){
        var input = $('.places');
        var options = {
            types: ['(cities)']
            //, componentRestrictions: {country: "us"}
        };
    
        var autoComplete = new google.maps.places.Autocomplete( input, options ); 
        var searchBox = new google.maps.places.SearchBox( input, options );
    });//click function
    
        google.maps.event.addListener(autoComplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
        });
 

    
    //Custom JS Init
    Custom.init();
    //Custom.captchaFix();
    //Custom.loadMoreNews();
    Custom.mobileMenuAnimation();
    
});//document ready

//Google places autocomplete
function autoComplete(){
    

    debugger;



       
}//autocomplete


// google.maps.event.addDomListener(window, 'load', initAutoComplete);











