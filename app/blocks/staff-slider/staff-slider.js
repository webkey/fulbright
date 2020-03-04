app.staffSlider = {
	sliderElement: '.js-staff-slider',
	fractionPagination: {
		currentElement: '.js-staff-slider__fraction-current',
		totalElement: '.js-staff-slider__fraction-total'
	},
	slidesLength: 0,
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	runSlider() {
		const $slider = $(this.sliderElement);

		if ($slider.length) {
			this.slidesLength = $(this.sliderElement).find('.staff-slider__slide').length;

			const slider = new Swiper(this.sliderElement, this.options);

			slider.on('init', function () {
				$slider.addClass('is-loaded');
			});

			slider.init();
		}
	},
	options: {
		init: false,
		loop: true,
		slidesPerView: 7,
		slidesPerGroup: 7,
		spaceBetween: 15,
		watchSlidesVisibility: true,
		lazy: true,
		// parallax: true,

		pagination: {
			type: 'bullets',
			el: '.js-staff-slider__pagination',
			clickable: true,
			bulletClass: 'staff-slider__pagination-bullet',
			bulletActiveClass: 'staff-slider__pagination-bullet_active',
			renderBullet(index, className) {
				return '<div class="' + className + '"><span></span></div>';
			}
		},

		navigation: {
			nextEl: '.js-staff-slider__button-next',
			prevEl: '.js-staff-slider__button-prev'
		},

		breakpoints: {
			992: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 10
			},
			575: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 10
			},
			374: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 10
			}
		},

		on: {
			slideChange() {
				const swiper = this;
				const currentIndex = swiper.realIndex + 1;

				const $swiper = $(swiper.$el);
				$swiper.find(app.staffSlider.fractionPagination.currentElement).text(currentIndex);
			},
			init() {
				const swiper = this;
				const currentIndex = swiper.realIndex + 1;

				const $swiper = $(swiper.$el);
				$swiper.find(app.staffSlider.fractionPagination.currentElement).text(currentIndex);
				$swiper.find(app.staffSlider.fractionPagination.totalElement).text(app.staffSlider.slidesLength);
			}
		}
	}
};
