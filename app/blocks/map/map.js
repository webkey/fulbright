app.map = {
	mapId: '#map',
	init(mapId) {
		const id = mapId || this.mapId;
		const $mapId = $(id);

		if ($mapId.length) {
			ymaps.ready(() => {
				this.runMap(id);
			});
		}
	},
	runMap(mapId) {
		const myMap = new ymaps.Map(mapId.substring(1), {
			center: mapData.coord,
			zoom: mapData.zoom,
			controls: ['fullscreenControl', 'zoomControl']
		});
		const myPlacemark = new ymaps.Placemark(mapData.coord, {
			balloonContentHeader: mapData.title,
			balloonContentBody: mapData.address,
			balloonContentFooter: mapData.coord,
			hintContent: mapData.title
		}, {
			iconLayout: 'default#image',
			iconImageHref: mapData.iconImageHref,
			iconImageSize: [36, 36],
			iconImageOffset: [-18, -36]
		});

		myMap.geoObjects.add(myPlacemark);

		myMap.behaviors.disable('scrollZoom');
	}
};
