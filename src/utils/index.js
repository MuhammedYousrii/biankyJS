import { injectCoreClassMetadata } from 'cores';


@injectCoreClassMetadata({
    name: 'utils',
    related: 'bianky',
    need: ['is', 'logger']
})
class utils {

    constructor() {
    
    }


    /**
     * 
     * @param {String} env
     * @return {Boolean} 
     */
    checkEnv(env) {
        // IF ENV IS NOT NULL OF UNDEFINED
        if (!this.is.useless(env)) {
            // IF ENV IS STRING
            if (this.is.string(env)) {
                return process.env.NODE_ENV === env;
            }
            this.logger.warn('Passed Env Should Be String');
            return false;
        }
        this.logger.warn('Passed Env Should Not Be useless');
        return false;
    }


    /**
     * 
     * @param {string} word1 
     * @param {string} word2 
     * @param {string} sign
     * 
     * @return {string} connected sentence 
     */
    concatTwoWordsWithSign(word1, word2, sign) {
        return word1.concat(`${sign}${word2}`);
    }


    deepFreezeObject(obj) {
        // ES5 WAY TO GET OBJECT KEYS NAMES
        // const propNames = Object.getOwnPropertyNames(obj);


        // ES6 ENABLE US TO OBJECT.KEYS METHOD 
        Object.keys(obj).forEach(propName => {
            let prop = obj[propName];

            if (typeof prop === 'object' && prop !== null) {
                deepFreezeObject(obj);
            }
        });


        return Object.freeze(obj);
    }


    // splashSection(selector, full, responsiveConfig) {

    //     // CUSTOM BREAKPOINTS
    //     let vbreakpoints = vBreakpoints();
    //     // CURRENT SCREEN WIDTH
    //     let screenHeight = sscreenHeight();
    //     // TARGET ELEMENT
    //     let target = $(idify(selector));
    //     // INTITAL HEIGHT FOR HEADER
    //     let headerHeight = 0;


    //     // IF SCRREN-HEIGHT SMALLER OR EQUAL 600 
    //     let smallScreen = screenHeight <= vbreakpoints.small;


    //     // IF SCREEN-WIDTH BIGGER THAN 601 AND SMALLER OR EQUAL 800
    //     let mediumScreen = screenHeight > (vbreakpoints.small + 1) && screenHeight <= vbreakpoints.medium;

    //     // IF SCREEN-WIDTH BIGGER THAN 800
    //     let largeScreen = screenHeight > vbreakpoints.medium;


    //     // IF ELEMENT IS NOT ID-SELECTOR TRY CLASS ONE 
    //     if (target.length <= 0) {
    //         target = $(classify(selector));
    //     }

    //     // IF USER ENTERD NUMBER USE IT
    //     if (typeof full === 'number' || biankyIS.isNull(full)) {
    //         if (responsiveConfig) {
    //             if (smallScreen) {
    //                 headerHeight = responsiveConfig.sm;
    //             } else if (mediumScreen) {
    //                 headerHeight = responsiveConfig.md;
    //             } else if (largeScreen) {
    //                 headerHeight = responsiveConfig.lg;
    //             }
    //         } else {
    //             headerHeight = full;
    //         }
    //     }
    //     // IF USER ENTER OPTION BOOLEAN
    //     else {
    //         // IF NOT FULL SCREEN 
    //         if (!full) {
    //             if (headerEl.height() === 0) {

    //                 // STATIC VALUE
    //                 headerHeight = 250;
    //             } else {
    //                 // RETURN THE HEIGHT OF HEADER
    //                 headerHeight = headerEl.height();
    //             }
    //         }
    //     }
    //     target.height(windowEl.height() - headerHeight);
    //     // FIX BEHAVIOR OF NO-PADDING EL
    //     if (target.css('padding-left') === '0px' && target.css('padding-right') === '0px') {
    //         target.width(windowEl.width() + 18);
    //     } else {
    //         target.width(windowEl.width());
    //     }
    // }



    idify(selector) {
        const firstChar = selector.slice(0, 1);
        if (firstChar === '.') {
            let formatSelector = selector.slice(1);
            return `#${formatSelector}`;
        } else if (firstChar === '#') {
            this.logger.warn('selector is already id');
            return selector;
        } else {
            return `#${selector}`;
        }
    }

    classify(selector) {
        const firstChar = selector.slice(0, 1);

        if (firstChar === '.') {
            this.logger.wran(`it's already class selector`);
        } else if (firstChar === '#') {
            const formatSelector = selector.slice(1);
            return `.${formatSelector}`;
        } else {
            return `.${selector}`;
        }
    }


    /**
     * 
     * @param {Object} item 
     * @param {String} activeClass 
     * 
     * 
     * @return void
     */
    activeItemFromSiblings() {
        $.fn.activeItem = function (activeClass = 'active') {
            this.forEach(function () {
                this.addClass('active').siblings().removeClass('active');
            });
        }
    }

    slickBasic(name, autoplay, res, dots, custom, cArrows) {
        const slickConfig = {};
        const responsive = [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 300,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 3000
            }
        }];
        const depthResponsive = [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: false,
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
        if (res) {
            if (res === 'normal') {
                slickConfig.responsive = responsive;
            } else {
                slickConfig.responsive = depthResponsive;
            }
        }
        slickConfig.autoplay = autoplay;
        slickConfig.autoplaySpeed = 5000;
        slickConfig.arrows = true;
        slickConfig.dots = dots;
        slickConfig.mobileFirst = true;
        slickConfig.slidesToShow = 4;
        slickConfig.slidesToScroll = 1;
        if (custom) {
            if (cArrows) {
                slickConfig.prevArrow = customArrows.prevArrow;
                slickConfig.nextArrow = customArrows.nextArrow;
            } else {
                slickConfig.nextArrow = `<button class="${name}-slider-button ${name}-slider-next">`;
                slickConfig.prevArrow = `<button class="${name}-slider-button ${name}-slider-prev">`;
            }
    
        }
        return slickConfig;
    }

}


export default utils;
