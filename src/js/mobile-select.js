document.addEventListener('DOMContentLoaded', function() {
    let btns = document.getElementsByClassName("device-filter__item");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            let showitems = document.getElementsByClassName("device-filter__item");
            console.log(showitems);
            if (this.classList.contains("device-filter__item_active")) {
                console.log('active');
                console.log(this);
                if (this.classList.contains("device-filter__item_show")) {
                    console.log("true");
                    for (var d = 0; d < showitems.length; d++) {
                        showitems[d].classList.remove("device-filter__item_show");
                    }
                } else {
                    console.log("false");
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