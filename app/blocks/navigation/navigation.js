app.navigation = {
	navElement: '.js-nav',
	init() {
		app.common.initScript('jquery.nav', 'switchClass', () => {
			if ($(this.navElement).length) {
				this.runNavigation();
			}
		});
	},
	runNavigation() {
		$(this.navElement).nav({
			// Elements
			item: 'li',
			drop: '.js-drop',
			arrow: 'li > a + em',
			// Additional settings
			arrowEnable: true,
			submenuPosition: false
		});
	}
};
