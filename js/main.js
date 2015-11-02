'use strict';

var clicks = 0;

document.getElementById('cat_img').addEventListener('click', addClick);

function addClick() {
    clicks = clicks + 1;
    document.getElementById('click').innerHTML = clicks;
}
