app.tabsSlider = {
	sliderElement: '.js-tabs-slider',
	scaleElement: '.js-slider-scale',
	frameElement: '.js-slider-frame',
	activeSlideElement: '.swiper-slide-active',
	scaleFactor: 0.25,
	init(sliderSelector, slideChange) {
		app.common.initScript('swiper.min', 'Swiper', () => {
			const $slider = $(sliderSelector || this.sliderElement);

			if ($slider.length) {
				this.runSlider(sliderSelector, slideChange);
			}
		});
		app.common.initStyle('swiper.min');
	},
	runSlider(sliderSelector, slideChange) {
		const slider = sliderSelector || this.sliderElement;
		const $slider = $(slider);
		const $activeSlide = $(this.activeSlideElement, $slider);
		$slider.find(this.scaleElement).attr('data-swiper-parallax-scale', this.scaleFactor);

		const curSlider = new Swiper(slider, {
			init: false,
			initialSlide: $activeSlide.length ? $activeSlide.index() : 0,
			loop: true,
			watchSlidesVisibility: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			parallax: true,
			slideToClickedSlide: true,
			shortSwipes: false,
			longSwipesMs: 50,
			longSwipesRatio: 0.05,

			navigation: {
				nextEl: '.js-tabs-slider__button-next',
				prevEl: '.js-tabs-slider__button-prev'
			},

			on: {
				progress() {
					const swiper = this;
					let i = 0;
					for (i; i < swiper.slides.length; i++) {
						const thisSlider = swiper.slides[i];
						const slideProgress = thisSlider.progress;
						const intend = (1 - app.tabsSlider.scaleFactor) * 100;
						let innerTranslate = slideProgress * intend / 2;
						if (slideProgress < -1) {
							innerTranslate = slideProgress * intend + intend / 2;
						}
						if (slideProgress > 1) {
							innerTranslate = slideProgress * intend - intend / 2;
						}
						thisSlider.querySelector(app.tabsSlider.frameElement).style.transform = 'translate3d(' + innerTranslate + '%, 0, 0)';
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
						swiper.slides[i].querySelector(app.tabsSlider.frameElement).style.transition = speed + 'ms';
					}
				}
			}
		});

		curSlider.on('init', function () {
			$slider.addClass('is-loaded');
		});

		curSlider.init();

		if (slideChange && $.isFunction(slideChange)) {
			let timeout;

			curSlider.on('slideChange init', function () {
				clearInterval(timeout);
			});

			curSlider.on('transitionEnd', function () {
				const thumbs = $(curSlider.slides[curSlider.activeIndex]).find('a');

				// обнуляет таймаут
				clearTimeout(timeout);

				timeout = setTimeout(function () {
					slideChange(thumbs);
				}, 500);
			});

			$(curSlider.slides).on('click', 'a', function (e) {
				e.preventDefault();
			});
		}
	}
};
