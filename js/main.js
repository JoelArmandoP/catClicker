'use strict';

function cat (name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
}

var cats = [new cat('Alfonsina', 'images/cat1.jpg'),
			new cat('Margarita', 'images/cat2.jpg'),
			new cat('Roberto', 'images/cat3.jpg'),
			new cat('Rudolf', 'images/cat4.jpg'),
			new cat('Gatitow', 'images/cat5.jpg')
			];

var HTMLcat =
  '<div class="col-md-6">'+
    '<div class="cat-name">%name%</div>'+
    '<div class="img">%image%</div>'+
    '<div class="clicks">%clicks%</div></div>';
var HTMLcatList =
    '<li id="%cat-id%" class="cat-name">%name%</li>';

cats.displayList = function() {
	cats.forEach(
		function(c, catNumber) {
			var catId = 'cat-'+ catNumber;
			$('#cats').append(
				HTMLcatList.
				replace(/%cat-id%/g, catId).
				replace(/%name%/g, c.name)
			);
			document.getElementById(catId).addEventListener('click', displayCatFctn(c));

		});
};


function displayCatFctn(cat) {
	return function() {
		$('#catSelected').html(
		HTMLcat.
		replace(/%name%/g, cat.name).
		replace(/%image%/g, '<img id="cat-image" src="' + cat.image + '">').
		replace(/%clicks%/g, '<span id="cat-clicks">' + cat.clicks + "</span>")
		);
		document.getElementById('cat-image').addEventListener('click', addClickFctn(cat, document.getElementById('cat-clicks')));
	}
}


function addClickFctn(cat, clickDisplay) {
	return function() {
    	cat.clicks++;
	    clickDisplay.innerHTML = cat.clicks;
	}
}

cats.displayList();
