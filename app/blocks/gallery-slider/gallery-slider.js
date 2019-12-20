app.gallerySlider = {
	sliderElement: 'js-gallery-slider',
	scaleElement: 'js-slider-scale',
	frameElement: 'js-slider-frame',
	scaleFactor: 0.52,
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	runSlider() {
		const $promoSlider = $('.' + this.sliderElement);
		$promoSlider.find('.' + this.scaleElement).attr('data-swiper-parallax-scale', this.scaleFactor);

		if (!$promoSlider.length) {
			return;
		}

		const slider = new Swiper('.' + this.sliderElement, app.gallerySlider.options);

		slider.on('init', function () {
			$promoSlider.addClass('is-loaded');
		});

		slider.init();
	},
	options: {
		init: false,
		loop: true,
		watchSlidesVisibility: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		parallax: true,
		slideToClickedSlide: true,

		pagination: {
			type: 'bullets',
			el: '.js-gallery-slider__pagination',
			clickable: true,
			bulletClass: 'gallery-slider__pagination-bullet',
			bulletActiveClass: 'gallery-slider__pagination-bullet_active',
			renderBullet(index, className) {
				return '<div class="' + className + '"><span></span></div>';
			}
		},

		navigation: {
			nextEl: '.js-gallery-slider__button-next',
			prevEl: '.js-gallery-slider__button-prev'
		},

		on: {
			progress() {
				const swiper = this;
				let i = 0;
				for (i; i < swiper.slides.length; i++) {
					const curSlider = swiper.slides[i];
					const slideProgress = curSlider.progress;
					const intend = (1 - app.gallerySlider.scaleFactor) * 100;
					let innerTranslate = slideProgress * intend / 2;
					if (slideProgress < -1) {
						innerTranslate = slideProgress * intend + intend / 2;
					}
					if (slideProgress > 1) {
						innerTranslate = slideProgress * intend - intend / 2;
					}
					curSlider.querySelector('.' + app.gallerySlider.frameElement).style.transform = 'translate3d(' + innerTranslate + '%, 0, 0)';
				}
			},
			touchStart() {
				const swiper = this;
				let i = 0;
				for (i; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = '';
				}
			},
			setTransition(speed) {
				const swiper = this;
				let i = 0;
				for (i; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + 'ms';
					swiper.slides[i].querySelector('.' + app.gallerySlider.frameElement).style.transition = speed + 'ms';
				}
			}
		}
	}
};
