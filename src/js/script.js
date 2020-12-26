var MainScript = (function () {
    var self = this;
    var REX_IS_NUMBER = new RegExp('^[0-9]*$');
    var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
    var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
    var REX_NUMBER = new RegExp('(?=.*[0-9])');
    var REX_SPECIAL = new RegExp('(?=.[!@#\$%\^&])');
    var REX_INTERGER = new RegExp('^[0-9]*$');
    var REX_PHONE = new RegExp('^(0|84)[0-9]*$');
    var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);
    var autoplay = true;
    var _init = function () {
        self.PopupValidateForm();
        self.Block1ValidateForm();
        self.Block10ValidateForm();
        self.Block5Slider();
        self.Block6SliderRunActiveList();
        self.Block9Slider();
        self.Block3Swiper();
        self.Menu();
        self.OpenMenu();
    }
    var _resize = function () { }

    this.lightbox = function () {
        $('.fancybox').fancybox();
    }

    this.Block3Swiper = function () {

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            loop: true,
            autoplay: autoplay,
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            }
        });

        swiper.on('slideChange', function () {
            let nextSlide = $(this)[0].realIndex;
            $(".block3__list li").removeClass("active");
            $(".block3__list li[data-index='" + nextSlide + "']").addClass("active");

        });

        // $(".block3__list li").on('click', function () {
        //     $(".block3__list li").removeClass("active");
        //     $(this).addClass("active");
        //     var numberSlider = $(this).attr("data-index");
        //     if (numberSlider === 0) {
        //         swiper.slideTo(numberSlider, false, false);
        //     } else {
        //         swiper.slideTo(numberSlider, false, false);
        //     }
        // });

    }

    this.Block9Slider = function () {
        if ($(".block9__slider").length === 0) {
            return false
        }

        $('.block9__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            autoplay: autoplay,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    this.Block6SliderRunActiveList = function () {
        if ($(".block6__slider").length <= 0) { return false }
        $(".block6__slider").slick({
            autoplay: autoplay,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            prevArrow: $('.prev'),
            nextArrow: $('.next')
        });

        $(".block6__slider").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $(".block6__list li").removeClass("active");
            $(".block6__list li[data-index='" + nextSlide + "']").addClass("active");
        });

        $(".block6__list li").on('click', function () {
            $(".block6__list li").removeClass("active");
            $(this).addClass("active");
            var numberSlider = $(this).attr("data-index");
            $(".block6__slider").slick('slickGoTo', parseInt(numberSlider));
        });
    }

    this.Block5Slider = function () {
        if ($(".block5__slider").length === 0) {
            return false
        }
        $(".block5__slider").slick({
            arrows: true,
            dots: false,
            autoplay: autoplay,
            autoplaySpeed: 3000,
            sliderToShow: 3,
            sliderToSroll: 1,
            centerMode: true,
            centerPadding: '16vw',
            prevArrow: $('.prev'),
            nextArrow: $('.next'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerPadding: '50px',
                    }
                }
            ]
        });
    }

    this.PopupValidateForm = function () {
        var form = [{
            name: '.PopupName',
            validators: ['required']
        }, {
            name: '.PopupPhone',
            validators: ['required', 'isNumber', 'minLength', 'maxLength'],
            minLength: 10,
            maxLength: 10,
        }, {
            name: '.PopupEmail',
            validators: ['required']
        }, {
            name: '.PopupNote',
            validators: []
        }]
        var $submit = ".popup .form__submit";
        validateForm($submit, form);
    }

    this.Block1ValidateForm = function () {
        var form = [{
            name: '.block1Name',
            validators: ['required']
        }, {
            name: '.block1Phone',
            validators: ['required', 'isNumber', 'minLength', 'maxLength'],
            minLength: 10,
            maxLength: 10,
        }, {
            name: '.block1Email',
            validators: ['required']
        }, {
            name: '.block1Note',
            validators: []
        }]
        var $submit = ".block1 .form__submit";
        validateForm($submit, form);
    }

    this.Block10ValidateForm = function () {
        var form = [{
            name: '.block10Name',
            validators: ['required']
        }, {
            name: '.block10Phone',
            validators: ['required', 'isNumber', 'minLength', 'maxLength'],
            minLength: 10,
            maxLength: 10,
        }, {
            name: '.block10Email',
            validators: ['required']
        }, {
            name: '.block10Note',
            validators: []
        }]
        var $submit = ".block10 .form__submit";
        validateForm($submit, form);
    }

    this.Menu = function () {
        $('.menu__nav-item a').click(function (e) {
            e.preventDefault();

            let link = $(this).attr('link')
            // console.log(link);

            $('.menu__nav-item .menu__nav-link').removeClass('active');
            $('.menu__nav-item .menu__nav-link[link="' + link + '"]').addClass('active');


            if (link != '' && link != undefined) {
                goToByScroll(link);
            }
        })
    }

    function goToByScroll(echo) {

        let space = 70
        switch (echo) {
            case 'tongquan':
            case 'vitri':
            case 'tienich':
                space = 20
                break;

            default:
                space = -100
                break;
        }

        $('html,body').animate({
            scrollTop: $("#" + echo).offset().top + space,
        }, 'slow');
    }

    this.OpenMenu = function () {
        // hambuger mobile=======================================================================================
        $('.hambuger').click(function () {
            $('.menu__nav').toggleClass('show')
            $('.hambuger').toggleClass('show');
            if ($('.hambuger').hasClass('show')) {
                $('body').addClass('overflowHidden')
            } else {
                $('body').removeClass('overflowHidden')
            }
        })
    }

    this.CloseMenu = function () {
        $('.menu__toggle_close').click(function () {
            $('.menu__text_toggle').removeClass('active')
            if ($('.menu__absolute').hasClass('active')) {
                $('.menu__absolute').removeClass('active')
            } else {
                $('.menu__absolute').addClass('active')
            }
        })
    }



    /**
     * Validate form
     * @param {{name,validators}[]} form
     */
    function isValidForm(form) {
        isValid = true;

        form.forEach(function (input) {
            var value = $(input.name).val();
            input.validators.forEach(function (validator) {
                switch (validator) {
                    case 'required':
                        if (value === '') {
                            isValid = false;
                        }
                        break;
                    case 'isNumber':
                        if (REX_IS_NUMBER.test(value) === false) {
                            isValid = false;
                        }
                        break;
                    case 'min':
                        if (+value < input.min) {
                            isValid = false;
                        }
                        break;
                    case 'max':
                        if (+value > input.max) {
                            isValid = false;
                        }
                        break;
                    case 'minLength':
                        if (value.length < input.minLength) {
                            isValid = false;
                        }
                        break;
                    case 'maxLength':
                        if (value.length > input.maxLength) {
                            isValid = false;
                        }
                        break;
                    case 'email':
                        if (REX_EMAIL.test(value) === false) {
                            isValid = false;
                        }
                        break;
                }
            });
        });

        return isValid;
    }

    function validateForm($submit, form) {

        function updateView() {
            $($submit).attr("disabled", !isValidForm(form));
        }

        var arrElement = [];
        form.forEach(function (element) {
            arrElement.push(element.name);
        });

        $(arrElement.join(",")).on("change keyup", function () {
            updateView();
        });
        updateView();
    }

    return {
        init: _init,
        resize: _resize
    }
});

var mainScript = new MainScript();

$(window).on("load", function () {
    mainScript.init();
    new WOW().init();

    activeItemMenu()
});

$(window).on("resize", function () {
    mainScript.resize();
});

var sections = $('section')
    , nav = $('.menu__nav')
    , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
    activeItemMenu();
});

function activeItemMenu() {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        // console.log(sections);
        let space = 70
        switch (sections.id) {
            case 'tongquan':
            case 'vitri':
            case 'tienich':
                space = 20
                break;

            default:
                space = 120
                break;
        }

        var top = $(this).offset().top - space,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
}