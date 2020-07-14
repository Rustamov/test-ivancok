svg4everybody(); //for svg spite in ie
// objectFitImages();

let $body,
    wWidth = 0,
    wHeight = 0,
    W_SM = 576,
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,
    LOADER_HTML =
        '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';

$(document).ready(function () {
    $body = $("body");

    if ($(".s-clients__slider-item").length > 1) {
        $(".js-s-clients-slider").slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: false,

            nextArrow: $(".js-s-clients-next"),
            prevArrow: $(".js-s-clients-prev"),
            responsive: [
                {
                    breakpoint: W_LG,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: W_SM,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    mobileMenu ();

    function mobileMenu () {
        let mobileNav = $('.mobile-menu'),
            mobileNavIsOpen = mobileNav.hasClass('open'),
            openClass = 'mobile-menu-open',
            opening = false,
            transitionTime = 300,
            timeout;

        $body.on('click touch', '.js-mobile-menu-trigger', function (e) {
            e.preventDefault();
            navToggle();
        });

        $body.on('keydown', function(e) {
            if ( !opening && mobileNavIsOpen && (e.keyCode  === 27)) { // escape key maps to keycode '27'
                navToggle()
            };
        });

        function navToggle() {
            if ( opening ) {
                return 
            }
        
            opening = true;

            mobileNavIsOpen = mobileNav.hasClass('open');

            mobileNav.toggleClass('open', !mobileNavIsOpen);


            if (!mobileNavIsOpen) {
                globalOpt.freeze();
                $body.toggleClass(openClass, true);
            }
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                mobileNavIsOpen = mobileNav.hasClass('open');

                if (!mobileNavIsOpen) {
                    $body.toggleClass(openClass, false);
                    globalOpt.unfreeze();
                }
                opening = false;
            }, transitionTime)
        };       
    }
});



class makeGlobalOpt {
    // Скрипт "замораживает" страничку, запрещая скролл
    freeze() {
        const h = $('html');

        if (h.css('position') !== 'fixed') {
            const top = h.scrollTop() ? h.scrollTop() : $body.scrollTop();

            if (window.innerWidth > h.width()) {
                h.css('overflow-y', 'scroll');
            }

            h.css({
                width: '100%',
                position: 'fixed',
                top: -top,
            });
        }
    }

    unfreeze() {
        const h = $('html');

        if (h.css('position') === 'fixed') {
            h.css('position', 'static');

            $('html, body').scrollTop(-parseInt(h.css('top'), 10));

            h.css({
                position: '',
                width: '',
                top: '',
                'overflow-y': '',
            });
        }
    }

    headerMenuClose() {
        $('.header-menu').removeClass('open');
        $body.removeClass('header-menu-open');
        this.unfreeze();
    }

    
    scrollToId(href, delay) {
        let scrollOnMenuBtn = false,
            scrollOnHeaderHide = false,
            scrollSpeed = 800;


        if ( href == '#interior' 
            || href == '#magazines'
        ) {
            scrollOnMenuBtn = true;
        }


        setTimeout(function() {
            scrollTo();
        }, delay)

        function scrollTo() {

            let targetOffset = $(href).offset().top;

            // if ( wWidth >= W_MD && scrollOnMenuBtn ) {
            //     targetOffset -= $('.side-nav__trigger-icon-line--1').offset().top - $('.header').offset().top;
            // } else if (wWidth < W_MD && !scrollOnHeaderHide) {
            //     targetOffset -= $('.header').outerHeight();
            // }

            try {
                scrollSpeed = Math.abs($window.scrollTop() - targetOffset) / Math.abs($body[0].scrollHeight) * 4000
            } catch(event) {
                console.error(event);
            }

            scrollSpeed = ( scrollSpeed < 500 ) ? 500 : scrollSpeed;
     
            $('html, body').animate({ scrollTop: targetOffset }, scrollSpeed);

            location.replace(href);
            
        }
    };


}
   

const globalOpt = new makeGlobalOpt;
