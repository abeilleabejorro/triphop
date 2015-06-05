/*---------------------------------------------------/
/                 Custom JS
/---------------------------------------------------*/

var Custom = function($) {

    'use strict';

    /*-----------------------------------------------------------
        Replace 'click' action for the 'touchend' or 'mouseup' 
    ------------------------------------------------------------*/
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    //set 'touchend' for touch devices - much faster response
    if (isTouchDevice) {
        var action = 'touchend';
    } else {
        var action = 'mouseup';
    }

    /*---------------------------------
        Take 'data-background' from html
        and set it as 'background' in css
    ----------------------------------*/
    function dataBackground() {
        $(window).load(function() {
            var i, data, bg = $('.bg, .bg-img');
            for (i = 0; i < bg.length; i += 1) {
                data = bg.eq(i).data('background'); //get data
                bg.eq(i).css('background-image', 'url(' + data + ')'); //add css background-image
                bg.eq(i).removeAttr('data-background'); //remove data
            }
        });
    }


    /*---------------------------------
        Navbar
    ----------------------------------*/

    //change navbar height and background after scrolling down
    function changeNavbarHeight() {
        var navbar = $('#navbarSettings');

        $(window).scroll(function() {
            var topOffset = $(window).scrollTop();

            //make navbar smaller
            if (topOffset > 0) {
                navbar.addClass('navbar-sm');
            } else {
                navbar.removeClass('navbar-sm');
            }

            //if navbar is transparent, then add backgrount after 10px scrolling down
            if (topOffset > 10 && navbar.hasClass('navbar-height')) {
                navbar.removeClass('navbar-height').css('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.2)');
            }
            if (topOffset <= 10 && !navbar.hasClass('navbar-height')) {
                navbar.addClass('navbar-height').css('box-shadow', 'none');
            }
        });
    }

    //close mobile menu when you click on a nav item
    function closeMobileMenu() {
        $('.nav').find('.dropdown').on('click', function() {
            $('.navbar-collapse').removeClass('in');
        });
    }

    //When you open the mobile menu, that menu icon will be changed
    function mobileMenuAnimation() {
        var navbar = $('#navbarSettings'),
            navToggle = $('.navbar-toggle'),
            navOpen = 'navbar-open';

        if (navToggle.hasClass(navOpen)) {
            $('.navbar-open').on(action, function() {
                $(this).removeClass(navOpen);
            });
        } else {
            navToggle.on(action, function() {
                navToggle.toggleClass(navOpen);
            });
        }

        $('.navbar-nav').find('.dropdown').on(action, function() {
            navToggle.removeClass(navOpen);
        });
    }


    /*---------------------------------
        Load latest news by AJAX
    ----------------------------------*/
    function loadMoreNews(news1, news2) {
        $.get('assets/ajax/news/news1.html', function(data) {
            news1 = data;
        });
        $.get('assets/ajax/news/news2.html', function(data) {
            news2 = data;
        });

        //load latest news
        $('#loadNews').one(action, function() {
            $('#newsFeed').append(news1, news2);
            $('.box-load').addClass('animated').addClass('easeFade');
            $('.md-trigger').modalEffects();
            $('#removeAfterLoading').remove();
        });
    }


    /*---------------------------------
        Captcha will be loaded automatically
    ----------------------------------*/
    function captchaFix() {
        $(window).load(function() {
            document.getElementById('vimage').src = 'assets/php/EasyForm/image.php?' + Math.random();
            return false;
        });
    }


    /*---------------------------------
            Preloader
    ----------------------------------*/
    function preloader() {
        $(window).load(function() {
            $("#preloader").fadeOut('slow', function() {
                $('#page-wrap').css("visibility", "visible").animate({
                    "opacity": 1
                });
            });
        });
    }


    return {
        init: function() {
            preloader();
            changeNavbarHeight();
            closeMobileMenu();
        },
        dataBackground: function() {
            dataBackground();
        },
        loadMoreNews: function() {
            loadMoreNews();
        },
        captchaFix: function() {
            captchaFix();
        },
        mobileMenuAnimation: function() {
            mobileMenuAnimation();
        }
    };

}(jQuery);
