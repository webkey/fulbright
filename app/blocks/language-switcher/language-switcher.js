app.toggleLanguage = {
	controlElement: '.js-lang-control',
	arrowElement: '.js-lang-arrow',
	dropElement: '.js-lang-drop',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runToggleLanguage();
			}
		});
	},
	runToggleLanguage() {
		const self = this;
		$(self.controlElement).switchClass({
			removeExisting: true,
			switchClassTo: $(self.arrowElement).add(self.dropElement),
			modifiers: {
				activeClass: 'language-drop-is-open'
			}
		});
	}
};
