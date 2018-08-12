filterSelection("all");

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("card_horisontal-filter");
    if (c == "all") c = "";
    // Add the "card_horisontal-filter-show" class (display:block) to the filtered elements, and remove the "card_horisontal-filter-show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "card_horisontal-filter-show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "card_horisontal-filter-show");
    }
}

// card_horisontal-filter-show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

document.addEventListener('DOMContentLoaded', function() {
    var btns = document.getElementsByClassName("select-filter__item");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            this.parentElement.getElementsByClassName("select-filter__item_active")[0].classList.remove("select-filter__item_active");
            this.classList.add("select-filter__item_active");
        });
    }
}, false);