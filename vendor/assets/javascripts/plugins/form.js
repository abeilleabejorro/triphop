// Function to validate email
function validate_email(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var address = email;
    if (reg.test(address) == false) {
        return false;
    }
}

// Function to validate phone number
function validatePhone(inputString) {
    var reg = /^[0-9 \-]+$/;
    var phone = inputString;
    if (reg.test(inputString) == false) {
        return false;
    }
}

// Function to read cookie - Used for captcha
function ReadCookie(name)
{
  name += '=';
  var parts = document.cookie.split(/;\s*/);
  for (var i = 0; i < parts.length; i++)
  {
    var part = parts[i];
    if (part.indexOf(name) == 0)
      return part.substring(name.length)
  }
  return null;
}

// Function to clear fields after submit
jQuery.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}

// Functions to validate form lengths in conjunction with the functions above
function checkform() {

	//Any extra fields need to be declared here
    var i_name = $("input#name").val();
    var i_email = $("input#email").val();
//  var i_company = $("input#company").val();
//    var i_phone = $("input#phone").val();
    var i_message = $("textarea#message").val();
    var i_vimage = $("input#verify").val();

    var errors = "";

    if (i_name.length < 2)
        errors = errors + "The name field is too short or empty<br/>";

    if (i_name.length > 21)
        errors = errors + "The name field must be less than 21 characters<br/>";
		
    if (i_email.length > 2 && i_email.length < 255 && validate_email(i_email) == false)
        errors = errors + "That email address appears to be invalid<br/>";

    if (i_email.length < 3)
        errors = errors + "The email field is too short or empty<br/>"

    if (i_email.length > 254)
        errors = errors + "The email field must be less than 254 characters<br/>"
	
	//Remove //s to enable company field validation
//  if (i_company.length < 2)
//        errors = errors + "The company field is too short or empty<br/>";

//  if (i_company.length == 1 || i_company.length == 2)
//        errors = errors + "The company is too short or empty<br/>";

//  if (i_company.length > 21)
//        errors = errors + "The company field must be less than 21 characters<br/>";

//    if (i_phone.length < 11)
//        errors = errors + "The phone number field must be at least 11 numbers<br/>";
//
//    if (i_phone.length > 23)
//        errors = errors + "The phone number field must be less than 22 numbers<br/>";
//
//    if (i_phone.length > 10 && i_phone.length < 22 && validatePhone(i_phone) == false)
//        errors = errors + "The phone number appears to be invalid. Numbers and Hyphens (-) only<br/>";

    if (i_message.length < 1)
        errors = errors + "The message field is too short or empty<br/>";

    if (i_vimage.length < 5)
        errors = errors + "The security captcha field is too short or empty<br/>";

    if (i_vimage.length > 5)
        errors = errors + "The security captcha field is too long<br/>";

		// MD5 captcha
		// Var captch = hex_md5(i_vimage);
        if (i_vimage.length === 5 && i_vimage !== ReadCookie('verify'))
        errors = errors + "The captcha field appears to be incorrect<br/>";

    if (errors != "") {
        $("div#success").slideUp("fast");
        $("div#error").html(errors).slideDown("fast");
       
		//Scroll to top of #form div - Useful if you have a fixed header
		var destination = $('div#form').offset().top - 75; //If you are using fixed header, change 0 to any height you wish
		$("html:not(:animated),body:not(:animated)").animate({
			scrollTop: destination
		}, 200);

       return false;
    } else {
        $.post('assets/php/EasyForm/submit.php', $("form#easy").serialize(), function (data) {
            
            if (data == "Message sent") {
                $("div#error").hide();
                $("div#success").slideDown("fast");
				
				//Scroll to top of #form div - Useful if you have a fixed header
				var destination = $('div#form').offset().top - 75; //If you are using fixed header, change 0 to any height you wish
				$("html:not(:animated),body:not(:animated)").animate({
					scrollTop: destination
				}, 200);
			
            // Clear form data
            $("#easy").reset();
            //Reload captcha when message is sent
            $('#vimage').attr('src', $('#vimage').attr('src')+'?'+Math.random());

            } else {
                //PHP validation
                $("div#error").html(data).slideDown("fast");
			
				//Scroll to top of this div - 70px from the top of your view, change this to whatever number you wish
				var destination = $('div#form').offset().top - 70;
				$("html:not(:animated),body:not(:animated)").animate({
					scrollTop: destination
				}, 200);
	
            }
        });
        return false;
    }
}