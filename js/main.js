'use strict';

function cat(name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
};

var model = {
	init: function() {
		model.cats = [];
	},
	addCat: function(name, image) {
		model.cats.push(new cat(name, image));
	},
	getCats: function() {
		return model.cats;
	},
	getCat: function(i) {
		return model.cats[i];
	},
	getNumberOfCats: function() {
		return model.cats.length;
	}
};


var catView = {
	init: function() {
		catView.catName = $('#cat-name');
		catView.catImage = $('#cat-image');
		catView.catClicks = $('#cat-clicks');
	},
	render: function(cat) {
		catView.catName.text(cat.name);
		catView.catImage.attr('src', cat.image);
		catView.catClicks.text(cat.clicks);
	},
	/* callback: f()
	*/
	onLike: function(callback) {
		catView.catImage.off('click');
		catView.catImage.click(callback);
	}
};

var catListView = {
	init: function() {
		catListView.catList = $('#cat-list');
		catListView.onSelectCallback = null;
	},
	render: function(cats) {
		var items = '';
		cats.forEach(
			function(cat, catNo) {
				items += '<li id="cat-'+ catNo + '">' + cat.name + '</li>';
			});
		catListView.catList.html(items);
		cats.forEach(
			function(cat, catNo) {
				$('#cat-'+ catNo).click(catListView.clickHandlerFctn(cat));
			});
	},
	clickHandlerFctn: function(cat) {
		return function() {
			if (catListView.onSelectCallback) {
				catListView.onSelectCallback(cat);
			}
		}
	},
	/* callback: f(cat)
	*/
	onSelect: function(callback) {
		catListView.onSelectCallback = callback;
	}
};

var octopus = {
	init: function() {
		model.init();
		model.addCat('Alfonsina', 'images/cat1.jpg');
		model.addCat('Margarita', 'images/cat2.jpg');
		model.addCat('Roberto', 'images/cat3.jpg');
		model.addCat('Rudolf', 'images/cat4.jpg');
		model.addCat('Gatitow', 'images/cat5.jpg');
		catListView.init();
		catListView.onSelect(octopus.selectCat);
		catListView.render(model.getCats());
		catView.init();
		catView.onLike(octopus.likeCat);
		octopus.selectedCat = model.getCat(0);
		catView.render(octopus.selectedCat);
	},
	likeCat: function () {
		octopus.selectedCat.clicks++;
		catView.render(octopus.selectedCat);
	},
	selectCat: function(cat) {
		octopus.selectedCat = cat;
		catView.render(cat);
	}
};

octopus.init();