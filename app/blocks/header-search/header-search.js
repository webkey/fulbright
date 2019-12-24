app.headerSearch = {
	controlElement: '.js-h-search-control',
	controlMobElement: '.js-hm-search-control',
	closeElement: '.js-h-search-close',
	closeMobElement: '.js-hm-search-close',
	panelElement: '.js-h-search-panel',
	panelMobElement: '.js-hm-search-panel',
	inputElement: '.js-h-search-input',
	wrapElement: '.js-h-search-wrap',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runHeaderSearch();
			}
		});
	},
	runHeaderSearch() {
		const self = this;
		const $input = $(self.inputElement);
		$(self.controlElement).switchClass({
			removeExisting: true,
			switchClassTo: $(self.panelElement).add(self.wrapElement).add(self.panelMobElement),
			toggleEl: $(self.controlMobElement),
			removeEl: $(self.closeElement).add(self.closeMobElement),
			preventRemoveClass: 'js-h-search-prevent-hide',
			modifiers: {
				activeClass: 'h-search-panel-is-open'
			},
			afterAdd() {
				setTimeout(function () {
					$input.focus();
				}, 50);
			},
			afterRemove() {
				setTimeout(function () {
					$input.blur();
				}, 50);
			}
		});
	}
};
