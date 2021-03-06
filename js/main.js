'use strict';

function cat(name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
};

cat.prototype.setName = function (name) {
	this.name = name;
}

cat.prototype.setImage = function (image) {
	this.image = image;
}

cat.prototype.setClicks = function (clicks) {
	this.clicks = clicks;
}

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
		catView.catNameField = $('#cat-name-field');
		catView.catClicksField = $('#cat-clicks-field');
		catView.catImgUrlField = $('#cat-image-url-field');
		catView.adminFormDiv = $('#admin-form-div');
		$('#show-admin-button').click(function() {
			catView.adminFormDiv.show();
		});
		catView.onUpdateCallback = null;
		$('#save-button').click(function() {
			if (catView.onUpdateCallback) {
				catView.onUpdateCallback(catView.catNameField.val(),
					catView.catImgUrlField.val(), catView.catClicksField.val());
			}
			catView.adminFormDiv.hide();
		});
		$('#cancel-button').click(function() {
			catView.adminFormDiv.hide();
		});
	},
	render: function(cat) {
		catView.catName.text(cat.name);
		catView.catImage.attr('src', cat.image);
		catView.catClicks.text(cat.clicks);
		catView.catNameField.val(cat.name);
		catView.catClicksField.val(cat.clicks);
		catView.catImgUrlField.val(cat.image);
	},
	/* callback: f()
	*/
	onLike: function(callback) {
		catView.catImage.off('click');
		catView.catImage.click(callback);
	},
	/* callback: f(name, url, clicks)
	*/
	onUpdate: function(callback) {
		catView.onUpdateCallback = callback;
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
		catView.onUpdate(octopus.updateCat);
	},
	likeCat: function () {
		octopus.selectedCat.clicks++;
		catView.render(octopus.selectedCat);
	},
	selectCat: function(cat) {
		octopus.selectedCat = cat;
		catView.render(cat);
	},
	updateCat: function(catName, catImage, catClicks) {
		octopus.selectedCat.setName(catName);
		octopus.selectedCat.setImage(catImage);
		octopus.selectedCat.setClicks(catClicks);
		catView.render(octopus.selectedCat);
	}

};

octopus.init();