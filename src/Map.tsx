import React, { useState, useEffect } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Rectangle,
	useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DraggableRectangle = ({ bounds, options }) => {
	const map = useMap();

	useEffect(() => {
		const rectangle = L.rectangle(bounds, options).addTo(map);
		const draggable = new L.Draggable(rectangle.getElement());
		draggable.enable();

		// ドラッグ終了時に新しい境界をログに出力
		draggable.on('dragend', function () {
			console.log(rectangle.getBounds());
		});

		return () => {
			draggable.disable();
			map.removeLayer(rectangle);
		};
	}, [map, bounds, options]);

	return null;
};

const Map = () => {
	const [position, setPosition] = useState({ lat: 55.3781, lng: -3.436 }); // イギリスの中心を初期位置として設定
	const [zoom, setZoom] = useState(5); // 表示範囲を広げるためにズームレベルを調整

	return (
		<div>
			<MapContainer center={position} zoom={zoom} style={{ height: '90vh' }}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<DraggableRectangle
					bounds={[
						[54.559322, -5.767822],
						[56.1210604, -3.02124],
					]}
					options={{ color: '#ff7800', weight: 1 }}
				/>
			</MapContainer>
		</div>
	);
};

export { Map };
