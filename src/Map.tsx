import React, { useState, useEffect } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Rectangle,
	useMap,
	useMapEvent,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DraggableCircle } from './components/DraggableCircle';

const DraggableRectangle = ({ bounds, options, setBounds }) => {
	const map = useMap();

	useEffect(() => {
		const rectangle = L.rectangle(bounds, options).addTo(map);
		const draggable = new L.Draggable(rectangle.getElement() as HTMLElement);
		draggable.enable();

		// ドラッグ終了時に新しい境界をログに出力
		draggable.on('dragend', function () {
			const bounds = rectangle.getBounds();
			console.log('🚀 dragend ~ bounds:', bounds);

			const pos = map.layerPointToLatLng(this._newPos);
			console.log('🚀 ~ this:', this);
			console.log('🚀 ~ pos:', pos);
		});

		// ドラッグ終了時に新しい境界をログに出力
		draggable.on('moveend', () => {
			const center = rectangle.getCenter();
			console.log('マウスの位置座標:', center);
		});

		return () => {
			draggable.disable();
			map.removeLayer(rectangle);
		};
	}, [map, bounds, options, setBounds]);

	return null;
};

const Map = () => {
	const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // イギリスの中心を初期位置として設定
	const [zoom, setZoom] = useState(5); // 表示範囲を広げるためにズームレベルを調整
	const [rectangleBounds, setRectangleBounds] = useState([
		[54.559322, -5.767822],
		[56.1210604, -3.02124],
	]);

	return (
		<div>
			<MapContainer center={position} zoom={zoom} style={{ height: '100vh' }}>
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
					bounds={rectangleBounds}
					options={{ color: '#ff7800', weight: 1 }}
					setBounds={setRectangleBounds}
				/>
				<DraggableCircle />
			</MapContainer>
		</div>
	);
};

export { Map };
