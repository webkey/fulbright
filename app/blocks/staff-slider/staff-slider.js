app.staffSlider = {
	sliderElement: 'js-staff-slider',
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	runSlider() {
		const $slider = $('.' + this.sliderElement);

		if ($slider.length) {
			const slider = new Swiper('.' + this.sliderElement, this.options);

			slider.on('init', function () {
				$slider.addClass('is-loaded');
			});

			slider.init();
		}
	},
	options: {
		init: false,
		loop: false,
		slidesPerView: 6,
		slidesPerGroup: 3,
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
		}
	}
};
