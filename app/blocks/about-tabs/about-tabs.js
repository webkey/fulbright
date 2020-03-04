app.aboutTabs = {
	tabsElement: '.js-about-tabs',
	init() {
		app.common.initScript('jquery.tabs', 'msTabs', () => {
			if ($(this.tabsElement).length) {
				this.runTabs();
			}
		});
	},
	runTabs() {
		const self = this;
		$(self.tabsElement).msTabs({
			anchor: '.js-about-tabs__thumbs a',
			panels: '.js-about-tabs__panels',
			panel: '.js-about-tabs__panel',
			setHash: true,
			compactView: {
				elem: '.js-about-tabs__select',
				drop: '.js-about-tabs__select-drop',
				openClass: 'about-tabs__select_open'
			},
			modifiers: {
				activeClass: 'about-tabs_active'
			}
		});
	}
};
