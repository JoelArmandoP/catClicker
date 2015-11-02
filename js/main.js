'use strict';

function cat (name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
}

var cats = [new cat('Alfonsina', 'images/cat1.jpg'),
			new cat('Margarita', 'images/cat2.jpg')];

var HTMLcat =
  '<div class="col-md-6">'+
    '<div class="cat-name">%name%</div>'+
    '<div class="img">%image%</div>'+
    '<div class="clicks">%clicks%</div></div>';

cats.display = function() {
	cats.forEach(
		function(c, catNumber) {
			var imageId = 'cat-image-' + catNumber;
			var clicksId = 'cat-clicks-' + catNumber
			$('#cats').append(
				HTMLcat.
				replace(/%name%/g, c.name).
				replace(/%image%/g, '<img id="' + imageId + '" src="' + c.image + '">').
				replace(/%clicks%/g, '<span id="' + clicksId + '">' + c.clicks + "</span>")
			);
			document.getElementById(imageId).addEventListener('click', addClickFctn(c, document.getElementById(clicksId)));
		});
};

function addClickFctn(cat, clickDisplay) {
	return function() {
    	cat.clicks++;
	    clickDisplay.innerHTML = cat.clicks;
	}
}

cats.display();
