/*---------------------------------------------------/
/                 Plugins Setup
/---------------------------------------------------*/

var Plugins = function($) {

    'use strict';

    /*-----------------------------------------------------------
        Replace action action for the 'touchend' or 'mouseup' 
    ------------------------------------------------------------*/
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    //set 'touchend' for touch devices - much faster response
    if (isTouchDevice) {
        var action = 'touchend';
    } else {
        var action = 'mouseup';
    }

    /*---------------------------------
        Back to top
    ----------------------------------*/
    function backToTop() {
        var offset = 220,
            duration = 500,
            selector = $('.back-to-top');
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                selector.fadeIn(duration);
            } else {
                selector.fadeOut(duration);
            }
        });

        selector.on(action, function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }

    /*---------------------------------
        Smooth scroll (from href to the ID)
    ----------------------------------*/
    function scrollTo() {
        $('a.scroll').on(action, function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 500);
                    return false;
                }
            }
        });
    }

    /*---------------------------------
        Revolution slider
    ----------------------------------*/
    function revolutionSlider() {
        $('html').removeClass('hideOveflow');
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
            // forceFullWidth: "on",
            hideArrowsOnMobile: "on"
        });
        $(window).resize(revolutionSlider);
    }

    /*---------------------------------
        Animations (justinaguilar.com/animations)
    ----------------------------------*/
    function animations() {
        $(window).scroll(function() {
            $('.animation').each(function() {
                var imagePos = $(this).offset().top,
                    topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 400) {
                    $(this).addClass("slideUp");
                }
            });
        });
    }

    /*---------------------------------
        WOW Animations
    ----------------------------------*/
    function wow() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: false,
            live: true
        });
        wow.init();
    }

    /*---------------------------------
        Dialog Effects
    ----------------------------------*/
    function dialogEffects() {
        (function() {
            [].slice.call(document.querySelectorAll('[data-dialog]')).forEach(function(trigger) {
                var dlg = new DialogFx(document.getElementById(trigger.getAttribute('data-dialog')));
                trigger.addEventListener(action, dlg.toggle.bind(dlg));
            });
        })();

        /* if a dialog window is opened, navbar will be hidden */
        $('.btn.trigger').on(action, function() {
            $('.navbar').addClass('navbar-hide');
            $('html').addClass('hideOveflow');
        });

        $('.btn.action, .dialog__overlay').on(action, function() {
            $('.navbar').removeClass('navbar-hide');
            $('html').removeClass('hideOveflow');
        });
    }

    /*---------------------------------
        One Page Navigation
    ----------------------------------*/
    function onePageNav() {
        $('#nav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 1100,
            scrollThreshold: 0.5,
            easing: 'easeInOutCubic'
        });
    }

    /*---------------------------------
        Owl Carousel
    ----------------------------------*/
    function owlCarousel() {
        //Skills slider
        $("#skillsSlider").owlCarousel({
            autoPlay: 4500, //Set AutoPlay to 3 seconds
            lazyLoad: true,
            items: 4
        });

        //Our team slider
        $("#teamSlider").owlCarousel({
            autoPlay: false,
            lazyLoad: true,
            items: 4,
            stopOnHover: true,
            itemsDesktop: [1200, 3],
            itemsDesktopSmall: [992, 2],
            itemsTablet: [768, 2],
            itemsMobile: [650, 1]
        });

        //Testimonials SLider
        $("#testimonialsSlider").owlCarousel({
            lazyLoad: true,
            autoPlay: false,
            items: 2,
            itemsDesktop: [1200, 2],
            itemsDesktopSmall: [992, 1],
            itemsTablet: [768, 1],
            itemsMobile: [480, 1]
        });

        //Latest tweets
        $("#twitterSlider").owlCarousel({
            autoPlay: 5000,
            lazyLoad: true,
            items: 1,
            stopOnHover: true,
            itemsDesktop: [1920, 1],
            itemsDesktopSmall: [992, 1],
            itemsTablet: [768, 1],
            itemsMobile: [480, 1]
        });
    }

    /*---------------------------------
        Knobs - Our skills section
    ----------------------------------*/
    //knob(".lbKnob", "#26C6DA")
    function knobs(selector, color) {
        $(selector).knob({
            min: 0,
            fgColor: color, // SET YOUR COLOR, default is #26C6DA
            max: 100,
            step: 5,
            angleOffset: 0,
            angleArc: 360,
            stopper: true,
            readOnly: true,
            cursor: false,
            lineCap: 'none',
            thickness: '0.03',
            width: 150,
            height: 150,
            displayInput: true,
            displayPrevious: true,
            inputColor: '#999999',
            font: 'Lato',
            fontWeight: 'normal',
            bgColor: '#ddd',
            draw: function() {
                if (this.$.data('skin') === 'tron') {
                    var a = this.angle(this.cv), // Angle
                        sa = this.startAngle, // Previous start angle
                        sat = this.startAngle, // Start angle
                        ea, // Previous end angle
                        eat = sat + a, // End angle
                        r = 1;
                    this.g.lineWidth = this.lineWidth;
                    this.o.cursor && (sat = eat - 0.3) && (eat += 0.3);
                    if (this.o.displayPrevious) {
                        ea = this.startAngle + this.angle(this.v);
                        this.o.cursor && (sa = ea - 0.3) && (ea += 0.3);
                        this.g.beginPath();
                        this.g.strokeStyle = this.pColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                        this.g.stroke();
                    }
                    this.g.beginPath();
                    this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                    this.g.stroke();
                    this.g.lineWidth = 2;
                    this.g.beginPath();
                    this.g.strokeStyle = this.o.fgColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                    this.g.stroke();
                    return false;
                }
            }
        });
    }

    /*---------------------------------
         Modal Effects
    ----------------------------------*/
    function modalEffects() {
        $('.md-trigger').modalEffects({
            overlaySelector: '.md-overlay',
            closeSelector: '.md-close',
            classAddAfterOpen: 'md-show',
            modalAttr: 'data-modal',
            perspectiveClass: 'md-perspective',
            perspectiveSetClass: 'md-setperspective'
        });

        /* if a dialog window is opened, navbar will be hidden */
        $('.md-trigger').on(action, function() {
            $('.navbar').addClass('navbar-hide');
            $('html').addClass('hideOveflow');
        });

        $('.md-close').on(action, function() {
            $('.navbar').removeClass('navbar-hide');
            $('html').removeClass('hideOveflow');
        });
    }

    function parallaxStellar() {
        var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
            Android = (navigator.userAgent.match(/(Android)/g) ? true : false),
            BlackBerry = (navigator.userAgent.match(/(BlackBerry)/g) ? true : false),
            Windows = (navigator.userAgent.match(/(IEMobile)/g) ? true : false),
            stellarImg = $('.bg-img').find('img');

        //parallax background is turned off for iOS, Android, BlackBerry, Windows Phone - the plugin doesn't work properly
        if (iOS || Android || BlackBerry || Windows) {
            stellarImg.attr("data-stellar-ratio", 1);
        } else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true,
                hideDistantElements: false,
                verticalOffset: 0,
                horizontalOffset: 0
            });
        }
    }


    return {
        init: function() {
            backToTop();
            scrollTo();
        },
        revolutionSlider: function() {
            revolutionSlider();
        },
        animations: function() {
            animations();
        },
        wow: function() {
            wow();
        },
        dialogEffects: function() {
            dialogEffects();
        },
        onePageNav: function() {
            onePageNav();
        },
        owlCarousel: function() {
            owlCarousel();
        },
        knobs: function(selector, color) {
            knobs(selector, color);
        },
        modalEffects: function() {
            modalEffects();
        },
        parallaxStellar: function() {
            parallaxStellar();
        }
    };

}(jQuery);
