app.toggleHeaderMobBg = {
	headerMob: '.js-header-mob',
	init(addClassPosition) {
		const self = this;

		$(window).on('resize scroll', function () {
			if ($(self.headerMob).is(':visible')) {
				self.runToggleScrollClass(addClassPosition);
			}
		});

		if ($(self.headerMob).is(':visible')) {
			self.runToggleScrollClass(addClassPosition);
		}
	},
	runToggleScrollClass(addClassPosition) {
		const scrollTop = $(window).scrollTop();

		addClassPosition = addClassPosition || $(this.headerMob).innerHeight();
		this.toggleClassOnScroll(scrollTop, addClassPosition);
	},
	toggleClassOnScroll(scrollTop, addClassPosition) {
		$(this.headerMob).toggleClass('show-bg', (scrollTop > addClassPosition));
	}
};
