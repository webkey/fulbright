app.galleryList = {
	galleryListElement: '.js-gallery-list',
	galleryListItemElement: '.js-gallery-list-item',
	gridSizer: '.js-grid-sizer',
	init() {
		app.common.initScript('imagesloaded.pkgd.min', 'imagesLoaded', () => {
			app.common.initScript('masonry.pkgd.min', 'masonry', () => {
				if ($(this.galleryListElement).length) {
					this.runGallery();
				}
			});
		});
		app.common.initScript('jquery.fancybox.min', 'fancybox', () => {
			if ($(this.galleryListElement).length) {
				this.runFancybox();
			}
		});
		app.common.initStyle('jquery.fancybox.min');
	},
	runGallery(callback) {
		const self = this;

		const $galleryMasonry = $(self.galleryListElement).masonry({
			itemSelector: self.galleryListItemElement,
			percentPosition: true,
			columnWidth: self.gridSizer
		});

		$galleryMasonry.masonry();

		$galleryMasonry.on('layoutComplete', function () {
			if (callback && $.isFunction(callback)) {
				callback();
			}
		});
	},
	runFancybox() {
		const self = this;

		$().fancybox({
			selector: self.galleryListElement + ' a'
		});
	}
};
