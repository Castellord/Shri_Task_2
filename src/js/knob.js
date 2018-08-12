document.addEventListener('DOMContentLoaded', function() {

    const knob = document.getElementsByClassName('knob__control')[0];
    const curr = document.getElementsByClassName('knob__value')[0];
    const ticks = Array.from(document.getElementsByClassName('tick'));

    const min = 0;
    const max = 300;
    let angle = 228;
    const maxtemp = 30;
    const transform = (() => {
        for (let prop of['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform']) {
            if (typeof document.body.style[prop] != 'undefined') {
                return prop;
            }
        }
    })();

    function turntUp(bool) {
        angle = (bool && angle + 2 <= max) ?
            angle + 2 : (!bool && angle - 2 >= min) ?
            angle - 2 : angle;
        return setAngle();
    }

    function setAngle() {
        // rotate knob
        knob.style[transform] = `rotate(${angle}deg)`;

        // quickly reset ticks
        for (let tick of ticks) {
            tick.classList.remove('active');
        }

        // add glow to 'active' ticks
        const actives = (Math.round(angle / 3 - 1));
        console.log(actives);
        if (actives <= 0) {
            for (let tick of ticks.slice(0, 1)) {
                tick.classList.add('active');
            }
        } else {
            for (let tick of ticks.slice(0, actives)) {
                tick.classList.add('active');
            }
        }



        // update % value as text
        curr.innerHTML = `+${Math.ceil(maxtemp/100*(Math.round(angle/max*100)))}`;

    }

    const knobarea = document.getElementsByClassName('knob')[0];


    knobarea.onmousedown = function(e) { // 1. отследить нажатие
        let start = e.pageX;
        document.onmousemove = function(e) {

            if (e.pageX > start) {
                turntUp(true);

            } else {
                turntUp(false);

            }

            start = e.pageX;
            const knobarea = document.getElementsByClassName('knob')[0];
            document.onmouseup = function() {
                document.onmousemove = null;
                knobarea.onmouseup = null;
            }

            knob.ondragstart = function() {
                return false;
            };

        }
    }


    knobarea.ontouchstart = function(e) {
        let start = e.changedTouches[0].pageX;
        knobarea.ontouchmove = function(e) {

                if (e.changedTouches[0].pageX > start) {
                    turntUp(true);
                } else {
                    turntUp(false);
                }

                start = e.changedTouches[0].pageX;
            } //   alert(e.changedTouches[0].pageX) // показ коррдинат места прикосновения по X-у.
    }

}, false);

// function getCurCoordsInsideRect(e) {
//     var x = e.offsetX == undefined ? e.layerX : e.offsetX;
//     var y = e.offsetY == undefined ? e.layerY : e.offsetY;

//     alert(x + 'x' + y);
// }

// function getElement(e, element) {
//     getCurCoordsInsideRect(e, element);
// }