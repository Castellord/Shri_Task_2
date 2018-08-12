let container;
let step;
let promStep;
let nextPosition;

function scrollTo(element, to = 0, duration = 1000) {

    const start = element.scrollLeft;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (() => {

        currentTime += increment;

        const val = Math.easeInOutQuad(currentTime, start, change, duration);

        element.scrollLeft = val;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    });

    animateScroll();
};

Math.easeInOutQuad = function(t, b, c, d) {

    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};


function scrollNext(block, elem) {

    container = document.getElementsByClassName(block)[0];

    if (container.hasAttribute('offset')) {
        step = container.clientWidth - parseInt(container.getAttribute('offset'));
    } else {
        step = container.clientWidth;
    }
    promStep = Math.ceil(container.scrollLeft / step);

    if (Number.isInteger(Math.ceil(container.scrollLeft) / step)) {
        nextPosition = (promStep + 1) * step;
    } else {
        nextPosition = promStep * step;
    }
    scrollTo(container, nextPosition, 500);


};

function scrollPrev(block) {

    container = document.getElementsByClassName(block)[0];

    if (container.hasAttribute('offset')) {
        step = container.clientWidth - parseInt(container.getAttribute('offset'));
    } else {
        step = container.clientWidth;
    }
    promStep = Math.floor(container.scrollLeft / step);
    if (Number.isInteger(container.scrollLeft / step)) {
        nextPosition = (promStep - 1) * step;
    } else {
        nextPosition = promStep * step;
    }


    scrollTo(container, nextPosition, 500);
};

document.addEventListener('DOMContentLoaded', function() {
    const scrollBlocks = document.getElementsByClassName('scroll-block');




    for (let i = 0; i < scrollBlocks.length; i++) {
        let scrollBlock = scrollBlocks[i];
        let controls = Array.prototype.slice.call(document.getElementsByClassName(String(scrollBlock.dataset.controls)));
        let next = controls[0].getElementsByClassName('scroll-control__next')[0].getElementsByClassName('svg-scroll-arrow')[0];
        let prev = controls[0].getElementsByClassName('scroll-control__prev')[0].getElementsByClassName('svg-scroll-arrow')[0];
        if (scrollBlock.scrollWidth == scrollBlock.clientWidth) {
            controls[0].remove();
        }


        scrollBlocks[i].onscroll = function() {

            // let elem = document.getElementsByClassName('favor-devices')[0]
            if (this.scrollWidth == this.scrollLeft + this.clientWidth) {
                next.classList.remove('svg-scroll-arrow_active');
                prev.classList.add('svg-scroll-arrow_active');

            } else if (this.scrollLeft == 0) {
                next.classList.add('svg-scroll-arrow_active');
                prev.classList.remove('svg-scroll-arrow_active');
            } else {
                next.classList.add('svg-scroll-arrow_active');
                prev.classList.add('svg-scroll-arrow_active');
            }

        }


    }

    // Показываем или убираем стрелку - напоминалку в главном блоке
    document.getElementsByClassName('favor-cards')[0].onscroll = function() {
        let reminder = document.getElementsByClassName('arrow-reminder')[0];
        if (this.scrollTop == 0) {
            reminder.classList.remove('arrow-reminder_inactive');
        } else {
            reminder.classList.add('arrow-reminder_inactive');
        }
    }

    // elem.getElementsByClassName('svg-scroll-arrow')[0].remove('scroll-control_active');
}, false);