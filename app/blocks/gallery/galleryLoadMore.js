app.galleryLoadMore = {
	galleryListElement: '.js-gallery-list',
	galleryListItemElement: '.js-gallery-list-item',
	btnElement: '.js-gallery-load-more',
	init() {
		app.common.initScript('imagesloaded.pkgd.min', 'imagesLoaded', () => {
			app.common.initScript('masonry.pkgd.min', 'masonry', () => {
				this.runLoadMore();
			});
		});
	},
	runLoadMore() {
		const self = this;
		const $preloader = $('.preloader');

		$('body').on('click', self.btnElement, function (e) {
			$preloader.addClass('active');

			$.ajax({
				url: 'temp-group-items-for-gallery-01.html',
				cache: false,
				success: content => {
					const $content = $(content);

					$(self.galleryListElement).append($content);
					$content.imagesLoaded(() => {
						$(self.galleryListElement).masonry('appended', $content);
					});

					// Remove timeout
					setTimeout(() => {
						$preloader.removeClass('active');
					}, 1000);
				}
			});

			e.preventDefault();
		});
	}
};
