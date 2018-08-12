document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.getElementsByClassName('modal-trigger');
    for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener("click", function() {
            let modalClass = String(triggers[i].getAttribute('data-modal'));
            document.getElementsByClassName(modalClass)[0].classList.add('modal-wrap_active');
            document.getElementsByClassName('wrap')[0].classList.add('blur');
            document.body.style.overflow = "hidden";
        });
    }




    function closeModal() {
        document.getElementsByClassName('modal-wrap_active')[0].classList.remove('modal-wrap_active');
        document.getElementsByClassName('blur')[0].classList.remove('blur');
        document.body.style.overflow = "auto";
    }

    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }


}, false);