app.headerSearch = {
	controlElement: '.js-h-search-control',
	panelElement: '.js-h-search-panel',
	inputElement: '.js-h-search-input',
	wrapElement: '.js-h-search-wrap',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			this.runHeaderSearch();
		});
	},
	runHeaderSearch() {
		const self = this;
		const $input = $(self.inputElement);
		$(self.controlElement).switchClass({
			removeExisting: true,
			switchClassTo: $(self.panelElement).add(self.wrapElement),
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
