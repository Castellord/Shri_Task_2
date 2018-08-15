document.addEventListener('DOMContentLoaded', function() {

    const knob = document.getElementsByClassName('knob__control')[0];
    const knobarea = document.getElementsByClassName('knob')[0];
    const curr = document.getElementsByClassName('knob__value')[0];
    const ticks = Array.from(document.getElementsByClassName('tick'));
    let centerX, centerY, mouseX, mouseY, actives, a, plusAngle;

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

    function setAngle() {
        knob.style[transform] = `rotate(${angle}deg)`;
        for (let tick of ticks) {
            tick.classList.remove('active');
        }
        actives = (Math.round(angle / 2.6));
        if (actives <= 0) {
            for (let tick of ticks.slice(0, 1)) {
                tick.classList.add('active');
            }
        } else {
            for (let tick of ticks.slice(0, actives)) {
                tick.classList.add('active');
            }
        }
        curr.innerHTML = `+${Math.ceil(maxtemp/100*(Math.round(angle/max*100)))}`;
    }

    Math.dist = function(x1, y1, x2, y2) {
        if (!x2) x2 = 0;
        if (!y2) y2 = 0;
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    const rightAngle = (centerX, centerY, mouseX, mouseY) => {
        if (Math.dist(mouseX, mouseY, centerX, centerY) > 10) {
            a = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
            if (a < 0) {
                plusAngle = 360 + a;
            } else {
                plusAngle = a;
            }

            if (plusAngle > 0 && plusAngle < 120) {
                angle = plusAngle + 240;
            } else {
                angle = plusAngle - 120;
            }
            if (angle > 0 && angle <= 303) {
                return setAngle(angle);
            }
        }
    }

    knobarea.onmousedown = function(e) { // 1. отследить нажатие
        centerX = knobarea.getBoundingClientRect().left + knobarea.clientWidth / 2;
        centerY = knobarea.getBoundingClientRect().top + knobarea.clientHeight / 2;
        document.onmousemove = function(event) {
            mouseX = window.event.clientX;
            mouseY = window.event.clientY;
            rightAngle(centerX, centerY, mouseX, mouseY);
        }
        document.onmouseup = function() {
            document.onmousemove = null;
            knobarea.onmouseup = null;
        }
        knobarea.ondragstart = function() {
            return false;
        }
    }

    knobarea.ontouchstart = function(e) {
        centerX = knobarea.getBoundingClientRect().left + knobarea.clientWidth / 2;
        centerY = knobarea.getBoundingClientRect().top + knobarea.clientHeight / 2;
        document.ontouchmove = function(event) {
            mouseX = event.changedTouches[0].clientX;
            mouseY = event.changedTouches[0].clientY;
            rightAngle(centerX, centerY, mouseX, mouseY);
        }
    }
}, false);