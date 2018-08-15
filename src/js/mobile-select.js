document.addEventListener('DOMContentLoaded', function() {
    let btns = document.getElementsByClassName("device-filter__item");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            let showitems = document.getElementsByClassName("device-filter__item");

            if (this.classList.contains("device-filter__item_active")) {

                if (this.classList.contains("device-filter__item_show")) {

                    for (var d = 0; d < showitems.length; d++) {
                        showitems[d].classList.remove("device-filter__item_show");
                    }
                } else {

                    for (var d = 0; d < showitems.length; d++) {
                        showitems[d].classList.add("device-filter__item_show");
                    }
                }
            } else {
                document.getElementsByClassName("device-filter__item_active")[0].classList.remove("device-filter__item_active");
                this.classList.add("device-filter__item_active");
                for (var d = 0; d < showitems.length; d++) {
                    showitems[d].classList.remove("device-filter__item_show");
                }
            }
        });
    }
}, false);