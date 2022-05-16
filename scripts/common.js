/* script Initialization */
$(document).ready(function () {

    resize();
    $('[data-toggle="tooltip"]').tooltip();

    var header = $(".navbar");
    var headerHeight = $('.navbar').outerHeight();
    //$(".banner-caption").css({"margin-top": headerHeight/2 +'px'});
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= headerHeight) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    });

    $("#cmbReason,#cmbProfession,#cmbModelPreference").select2();

    $('.refresh').click(function () {
        $('#' + $(this).attr('data-parent')).attr('src', $('#' + $(this).attr('data-parent')).attr('src') + '/' + new Date().getTime());
    });

    $('a.spl[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({scrollTop: target.offset().top - 100}, 1000);
                return false;
            }
        }
    });

    $("#main-menu > ul").clone().appendTo("#mobile-menu");
    $("#other-links").clone().appendTo("#mobile-menu");
    $("#mobile-menu-icon").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#wrapper").animate({
                "left": "0"
            }, 500);
        } else {
            $(this).addClass("active");
            $("#wrapper").animate({
                "left": "-250px"
            }, 500);
        }
        if ($("#mobile-menu").hasClass("active")) {
            $("#mobile-menu").removeClass("active");
            $("#mobile-menu").animate({
                "right": "-250px"
            }, 500);
        } else {
            $("#mobile-menu").addClass("active");
            $("#mobile-menu").animate({
                "right": "0"
            }, 500);
        }
    });
    $('#mobile-menu ul li.dropdown-submenu>a').prepend('<span class="submenu"></span>');
    $('#mobile-menu ul li.dropdown-submenu>a').click(function (e) {
        $(this).parent().children().eq(1).slideToggle(500);
        $(this).parent().toggleClass('changebg');
        return false;
    });

    //Home page banner Slider
    $('.banner-slider').owlCarousel({
        animateIn: 'fadeIn', animateOut: 'fadeOut',  mouseDrag: false, lazyLoad: true, loop: true, dots: false, margin: 30, items: 1, nav: true, navText: ['', ''], autoplay: 7000, autoplayTimeout: 7000
    });

    //Faculty Slider
    $('#offer-slider').owlCarousel({
        lazyLoad: true, loop: true, nav: true, dots: true, margin: 30, items: 1, autoplay: false, navText: ['', ''], autoplayTimeout: 5000,
        responsive: {
            0: {items: 1, slideBy: 1, nav: true, dots: false },
            600: {items: 2, slideBy: 1, nav: true, dots: false},
            1024: {items: 3, slideBy: 1},
            1140: {items: 5, slideBy: 1}

        }
    });

    $('.fancybox-popup').fancybox();
   
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $("#totop").stop(true, false).animate({
                "bottom": "60",
                "opacity": "1"
            }, 500);
        } else {
            $("#totop").stop(true, false).animate({
                "bottom": "-60",
                "opacity": "0"
            }, 500);
        }
    });
    $('#totop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


});
 

function resize() {
    var vHHeight = $('nav.navbar').outerHeight();    
    //$('#projects-section,#disc-projects,#contact-section').css({'margin-top': vHHeight});
    //$('#inner-banner h1').css({'margin-top': vHHeight/2});
}

$(window).resize(function () {
    resize();
});