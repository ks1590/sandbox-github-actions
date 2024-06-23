import React, { useState } from 'react';
import { useMapEvents, Circle } from 'react-leaflet';

const DraggableCircle = () => {
  const [center, setCenter] = useState([
    51.507913499585825, -0.09278297424316408,
  ]);

  const map = useMapEvents({
    click(e) {
      setCenter([e.latlng.lat, e.latlng.lng]);
    },
  });

  const handleDragEnd = (e) => {
    setCenter([e.target._latlng.lat, e.target._latlng.lng]);
  };

  return (
    <Circle
      center={center}
      radius={200}
      eventHandlers={{ dragend: handleDragEnd }}
      draggable={true}
      pathOptions={{ color: 'green' }}
    />
  );
};

export { DraggableCircle };
