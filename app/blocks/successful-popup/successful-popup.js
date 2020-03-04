app.successPopup = {
	popupElement: '#successful-popup',
	init(selector, delay) {
		app.common.initScript('jquery.fancybox.min', 'fancybox', () => {
			const el = selector || this.popupElement;
			const del = delay || 3000;
			let timeout;
			if ($(el).length) {
				$.fancybox.open({
					src: el,
					type: 'inline',
					opts: {
						closeExisting: true,
						baseClass: 'fancybox-successful-popup',
						afterShow() {
							clearTimeout(timeout);

							timeout = setTimeout(() => {
								$.fancybox.close();
							}, del);
						},
						afterClose() {
							clearInterval(timeout);
						}
					}
				});
			}
		});
		app.common.initStyle('jquery.fancybox.min');
	}
};

