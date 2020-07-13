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
});
