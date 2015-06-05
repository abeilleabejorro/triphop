(function($) {

    /*---------------------------------------------------
    /                 Style Switcher
    ---------------------------------------------------*/

    'use strict';

    $(function() {

        var isTouchDevice = 'ontouchstart' in document.documentElement;

        //set 'touch' for touch devices
        if (isTouchDevice) {
            styleSwitcher('touchend');
        } else {
            styleSwitcher('mouseup');
        }

        function styleSwitcher(action) {
            /* Global variables */
            var active = 'active',
                body = $('body'),

                /* Preloader */
                pageWrap = $('#page-wrap'),
                preloader = $('#preloader'),
                spinner = $('.spinner'),

                /* Navbar */
                navbarID = $('#navbarSettings'),
                navbarSpace = $('#navbarSpaceBottom'),
                navbarIsFixed = navbarID.hasClass('navbar-fixed-top'),
                navbarTrn = $('.navbar-trn'),
                navbar = $('.navbar'),
                nav = document.getElementById('nav'),
                topOffset,
                navToggle = $('.navbar-toggle'),
                navOpen = 'navbar-open',

                /* Style switcher */
                sBtn = $('.switcher-icon'),
                sBody = $('.style-switcher'),
                icon = 'fa-gears', //set a name of class from all Font Awesome package

                /* Owl Carousel reinit */
                owlCarousel = 'owlCarousel',
                owl1 = $('#skillsSlider').data(owlCarousel),
                owl2 = $('#teamSlider').data(owlCarousel),
                owl3 = $('#testimonialsSlider').data(owlCarousel),
                owl4 = $('#twitterSlider').data(owlCarousel),

                /* boxed / wide version of container */
                wide = $('#wide'),
                boxed = $('#boxed');

            /*---------------------------------
             * Reset some plugins
            ---------------------------------*/
            //reset certain plugins after changing window width and so on
            function pluginsReset(time) {
                setTimeout(function(time) {
                    /* Refresh Owl carousel */
                    owl1.reinit({
                        autoPlay: true, //Set AutoPlay to 3 seconds
                        items: 4,
                        lazyLoad: true,
                        itemsDesktop: [1200, 2],
                        itemsDesktopSmall: [992, 3],
                        itemsTablet: [768, 3],
                        itemsMobile: [650, 1]
                    });
                    owl2.reinit({
                        autoPlay: false, //Set AutoPlay to 3 seconds
                        items: 4,
                        lazyLoad: true,
                        stopOnHover: true,
                        itemsDesktop: [1200, 3],
                        itemsDesktopSmall: [992, 2],
                        itemsTablet: [768, 2],
                        itemsMobile: [650, 1]
                    });
                    owl3.reinit({
                        autoPlay: false, //Set AutoPlay to 3 seconds
                        items: 2,
                        lazyLoad: true,
                        itemsDesktop: [1200, 2],
                        itemsDesktopSmall: [992, 1],
                        itemsTablet: [768, 1],
                        itemsMobile: [480, 1]
                    });
                    owl4.reinit({
                        autoPlay: true, //Set AutoPlay to 3 seconds
                        items: 1,
                        lazyLoad: true,
                        stopOnHover: true,
                        itemsDesktop: [1920, 1],
                        itemsDesktopSmall: [992, 1],
                        itemsTablet: [768, 1],
                        itemsMobile: [480, 1]
                    });

                    /* Refresh the slider Revolution */
                    $('.tp-banner').revolution({
                        delay: 11000,
                        startheight: 700,
                        startwidth: 1170,
                        hideThumbs: 10,
                        navigationType: "none",
                        navigationStyle: "preview4",
                        touchenabled: "on",
                        onHoverStop: "on",
                        keyboardNavigation: "on",
                        lazyLoad: "on",
                        shadow: 0,
                        fullWidth: "on",
                        fullScreen: "off",
                        spinner: "spinner4",
                        autoHeight: "off",
                        forceFullWidth: "on",
                        hideArrowsOnMobile: "on"
                    });

                    $('.tp-banner-container').css({
                        'position': 'relative',
                        'overflow': 'hidden',
                        'max-height': '700px',
                        'max-width': '100%',
                        'left': 0
                    });

                    /* Refresh stellar plugin - parallax images */
                    $.stellar('refresh');
                }, time); //set time when the transition is finished!!!
            }

            $('#page-wrap').resize(function() {
                pluginsReset(100);
            });


            /*---------------------------------
             * Show / hide the style switcher 
            ---------------------------------*/

            /* Show style switcher after scrolling down (offset is set on 800px from the top) */
            function showStyleSwitcher() {
                if ($(window).scrollTop() > 800) {
                    sBtn.addClass(icon).addClass('show-it i-close').removeClass(icon);
                    sBody.addClass(active);
                }
            }

            /* Close Style switcher */
            function closeSwitcher() {
                sBody.removeClass(active);
                sBtn.removeClass('i-close').addClass(icon);
                $(window).off('scroll', showStyleSwitcher);
            }

            $('.md-trigger').on(action, function() {
                closeSwitcher();
            });
            $('.btn.trigger').on(action, function() {
                closeSwitcher();
            });

            $(window).on('scroll', showStyleSwitcher);

            if (isTouchDevice) {
                closeSwitcher();
                sBtn.addClass(icon).addClass('show-it').on(action, function() {
                    if (sBody.hasClass(active)) {
                        sBody.removeClass(active);
                        sBtn.removeClass('i-close').addClass(icon);
                    } else {
                        sBody.addClass(active);
                        sBtn.removeClass(icon).addClass('i-close');
                    }
                });
            } else {
                sBtn.on(action, function() {
                    sBody.removeClass(active);
                    sBtn.removeClass('i-close').addClass(icon);
                    $(window).off('scroll', showStyleSwitcher);
                });

                if (!sBody.hasClass(active)) {
                    sBtn.mouseenter(function() {
                        sBody.addClass(active);
                        sBtn.removeClass(icon).addClass('i-close');
                    });
                }
            }


            /*---------------------------------
             * Change a navbar style
            ---------------------------------*/

            function navbarStyle(navbarType) {
                function checkNavbarPosition() {
                    if (navbarIsFixed) {
                        navbarSpace.addClass(active);
                    } else {
                        navbarSpace.removeClass(active);
                    }
                }
                $(navbarType).on(action, function() {
                    if (navbarType === '#navDark') {
                        navbarID.removeClass('nav-trn-style navbar-default navbar-trn').addClass('navbar-inverse');
                        checkNavbarPosition();
                    }
                    if (navbarType === '#navLight') {
                        navbarID.removeClass('nav-trn-style navbar-inverse navbar-trn').addClass('navbar-default');
                        checkNavbarPosition();
                    }
                    if (navbarType === '#navTrn') {
                        navbarSpace.removeClass(active);
                        navbarID.removeClass('navbar-inverse navbar-default').addClass('navbar-trn');
                    }
                });
            }

            if (matchMedia('(max-width: 767px)').matches) {
                navbarSpace.addClass('active');
            }

            navbarStyle('#navDark');
            navbarStyle('#navLight');
            navbarStyle('#navTrn');


            /*---------------------------------
             * Change a color theme
            ---------------------------------*/
            function changeTheme(theme, hex) {
                $('#' + theme + '').on(action, function() {
                    $('h1.welcome').hide();
                    pageWrap.css('opacity', '0');
                    preloader.show();
                    spinner.show();
                    setTimeout(function() {
                        spinner.hide();
                        setTimeout(function() {
                            preloader.hide();
                            spinner.fadeOut();
                            pageWrap.css('opacity', '1');
                        }, 500);
                    }, 2000);
                    $('.tp-banner').revolution();
                    $('#mainTheme').attr('href', 'assets/css/main-theme/themes/' + theme + '-m.css');
                    $('#bootstrapTheme').attr('href', 'assets/css/bootstrap/themes/' + theme + '-b.css');
                    return false;
                });

                /*--------------------------------------------------
                 * Change a style of knobs (Our skills seciton)
                ----------------------------------------------------*/
                $("#" + theme).on(action, function(event) {
                    event.preventDefault();
                    $(".lbKnob").trigger(
                        "configure", {
                            "fgColor": hex
                        }
                    );
                });
            }

            changeTheme("red", "#EF5350");
            changeTheme("pink", "#EC407A");
            changeTheme("deepPurple", "#7E57C2");
            changeTheme("indigo", "#5C6BC0");
            changeTheme("blue", "#42A5F5");
            changeTheme("lightBlue", "#03A9F4");
            changeTheme("cyan", "#26C6DA");
            changeTheme("teal", "#009688");
            changeTheme("green", "#4CAF50");
            changeTheme("lightGreen", "#8BC34A");
            changeTheme("lime", "#C0CA33");
            changeTheme("yellow", "#FBC02D");
            changeTheme("amber", "#FFC107");
            changeTheme("orange", "#FF9800");
            changeTheme("deepOrange", "#FF7043");


            /*--------------------------------------------------
             * Change a style of container (boxed/wide version)
            ----------------------------------------------------*/

            //boxed
            boxed.on(action, function() {
                body.addClass('wrap-width');
                pluginsReset(2501);
            });

            //wide
            wide.on(action, function() {
                body.removeClass('wrap-width');
                pluginsReset(2501);
            });


            /*---------------------------------
             * Set a background image
            ---------------------------------*/

            //name = folder name have to be same as file name
            //type = png or jpg
            function changeBackground(id, name, type) {
                $('.bg-icon-' + id + '').on(action, function() {
                    body.addClass('wrap-width');
                    $('.wrap-width').css('background', 'url("assets/img/patterns/' + name + '/' + name + '.' + type + '")');
                    pluginsReset(2501);
                });
            }
            changeBackground('1', 'footer_lodyas', 'png');
            changeBackground('2', 'sativa', 'png');
            changeBackground('3', 'crossword', 'png');
            changeBackground('4', 'geometry2', 'png');
            changeBackground('5', 'greyzz', 'png');
            changeBackground('6', 'subtle_white_feathers', 'png');
            changeBackground('7', 'brickwall', 'png');
            changeBackground('8', 'geometry', 'png');
            changeBackground('9', 'pattern1', 'png');
            changeBackground('10', 'pattern2', 'jpg');
        }
    });
})(jQuery);
