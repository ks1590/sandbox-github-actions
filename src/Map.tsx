import { useState } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

type Window = typeof window & {
	type: boolean;
};
const windowComponent = window as Window;
windowComponent.type = true;

const Map = () => {
	const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // イギリスの中心を初期位置として設定
	const [zoom, setZoom] = useState(5); // 表示範囲を広げるためにズームレベルを調整

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
				<FeatureGroup>
					<EditControl
						position='topleft'
						draw={{
							marker: false,
							circlemarker: false,
						}}
					/>
				</FeatureGroup>
			</MapContainer>
		</div>
	);
};

export { Map };
