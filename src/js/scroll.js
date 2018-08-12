let container;
let step;
let promStep;
let nextPosition;


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

    container.scrollLeft = nextPosition;
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


    container.scrollLeft = nextPosition;
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