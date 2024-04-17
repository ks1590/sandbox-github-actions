import React, { useState } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';

const Map = () => {
	const [bounds, setBounds] = useState(
		new LatLngBounds(
			[51.515, -0.1], // top left corner
			[51.495, -0.08] // bottom right corner
		)
	);

	const MapClickHandler = () => {
		const map = useMap();
		map.on('click', (e) => {
			console.log(e.latlng); // クリックした座標の位置をコンソールに出力
			// ここで必要な処理を追加する
		});
		return null;
	};

	return (
		<div>
			<MapContainer
				zoomControl={false}
				scrollWheelZoom={false}
				doubleClickZoom={false}
				touchZoom={false}
				boxZoom={false}
				dragging={false}
				center={[51.505, -0.09]}
				zoom={16}
				style={{ height: '90vh' }}>
				<MapClickHandler />
				<ImageOverlay url='src/assets/Desktop.svg' bounds={bounds} />
			</MapContainer>
		</div>
	);
};

export { Map };
