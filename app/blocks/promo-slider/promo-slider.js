app.promoSlider = {
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	runSlider() {
		const $promoSlider = $('.js-promo-slider');

		if (!$promoSlider.length) {
			return;
		}

		const slider = new Swiper('.js-promo-slider', this.options);

		slider.on('init', function () {
			$promoSlider.addClass('is-loaded');
		});

		slider.init();
	},
	options: {
		init: false,
		loop: true,
		lazy: true,
		shortSwipes: false,
		longSwipesMs: 50,
		longSwipesRatio: 0.05,
		speed: 1000,
		parallax: true,
		autoplay: {
			delay: 4000
		},
		pagination: {
			type: 'bullets',
			el: '.js-promo-slider__pagination',
			clickable: true,
			bulletClass: 'promo-slider__pagination-bullet',
			bulletActiveClass: 'promo-slider__pagination-bullet_active',
			renderBullet(index, className) {
				return '<div class="' + className + '"><span></span></div>';
			}
		},

		navigation: {
			nextEl: '.js-promo-slider__button-next',
			prevEl: '.js-promo-slider__button-prev'
		}
	}
};
