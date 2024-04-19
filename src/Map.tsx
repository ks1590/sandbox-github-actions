import React, { useState } from 'react';
import {
	MapContainer,
	ImageOverlay,
	useMap,
	Circle,
	Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import { DraggableMarker } from './components/DraggableMarker';
import { DraggableCircle } from './components/DraggableCircle';

const Map = () => {
	const [bounds, setBounds] = useState(
		new L.LatLngBounds(
			[51.525, -0.103], // top left corner
			[51.495, -0.08] // bottom right corner
		)
	);

	const circlePosition = { lat: 51.507913499585825, lng: -0.09278297424316408 };

	// const MapClickHandler = () => {
	// 	const map = useMap();
	// 	map.on('click', (e) => {
	// 		console.log(e.latlng); // クリックした座標の位置をコンソールに出力
	// 		// ここで必要な処理を追加する
	// 	});
	// 	return null;
	// };

	return (
		<div style={{ width: '80vw' }}>
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
				{/* <MapClickHandler /> */}
				{/* <ImageOverlay url='src/assets/Desktop.svg' bounds={bounds} /> */}
				<Circle
					center={circlePosition}
					pathOptions={{ color: 'green', fillColor: 'green' }}
					radius={35}>
					<Popup>
						iwatsuki <br /> IT Support Department
					</Popup>
				</Circle>
				{/* <DraggableMarker /> */}
				<DraggableCircle />
			</MapContainer>
		</div>
	);
};

export { Map };
