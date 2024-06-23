import React, { useState } from 'react';
import { MapContainer, ImageOverlay, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng, Icon, LatLngBounds } from 'leaflet';

const Map = () => {
	const [bounds, setBounds] = useState(
		new LatLngBounds(
			[51.515, -0.1], // top left corner
			[51.495, -0.08] // bottom right corner
		)
	);

	const [markerPosition, setMarkerPosition] = useState({
		lat: 51.507913499585825,
		lng: -0.09278297424316408,
	});

	const MapClickHandler = () => {
		const map = useMap();
		map.on('click', (e) => {
			console.log(e.latlng); // クリックした座標の位置をコンソールに出力
			setMarkerPosition({ lat: e.latlng.lat, lng: e.latlng.lng }); // クリックした座標を更新
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
				<Marker position={markerPosition}></Marker> //
			</MapContainer>
		</div>
	);
};

export { Map };
