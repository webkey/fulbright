app.createNewGallery = {
	galleryThumbElement: '.js-gallery-tabs a',
	galleryContainerElement: '.js-gallery-container',
	galleryListElement: '.js-gallery-list',
	galleryListItemElement: '.js-gallery-list-item',
	galleryTitleElement: '.js-gallery-title',
	gallerySubTitleElement: '.js-gallery-subtitle',
	saveUrl: null,
	init(thumb) {
		if (!thumb) {
			console.error('Please, set thumb element', 'color: red');
			return false;
		}

		const self = app.createNewGallery;
		const $curThumb = $(thumb);

		if ($curThumb.attr('href') === self.saveUrl) {
			return false;
		}
		self.saveUrl = $curThumb.attr('href');

		const $preloader = $('.preloader');
		$preloader.addClass('active');

		const $galleryContainer = $(self.galleryContainerElement);

		const unfixedContainer = () => {
			$galleryContainer
				.css({
					height: '',
					overflow: ''
				});
		};

		$.ajax({
			url: self.saveUrl,
			cache: false,
			success: content => {
				const $content = $(content);

				$galleryContainer
					.css({
						height: $galleryContainer.outerHeight(),
						overflow: 'hidden'
					})
					.contents()
					.remove()
					.end()
					.append($content);

				const newTitle = $content.find('.js-gallery-new-title').html();
				$(self.galleryTitleElement).html(newTitle);

				const newSubTitle = $content.find('.js-gallery-new-subtitle').html();
				$(self.gallerySubTitleElement).html(newSubTitle);

				$content.imagesLoaded(() => {
					app.galleryList.runGallery(unfixedContainer());
					app.galleryList.runFancybox();
				});

				// Remove preloader with timeout for testing
				setTimeout(() => {
					$preloader.removeClass('active');
				}, 1000);
			}
		});
	}
};
