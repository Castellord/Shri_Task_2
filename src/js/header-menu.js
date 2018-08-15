document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('header-menu__switcher')[0].addEventListener('click', function() {
        document.getElementsByClassName('header-menu')[0].classList.toggle('header-menu_active');
    });

}, false);