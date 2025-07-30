import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  height: '85vh',
  width: '100%',
  borderRadius: '10px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const TrafficMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get('/api/incidents');
        setIncidents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchIncidents();
  }, []);

  return (
    <div className="map-container shadow-sm">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
        >
          {incidents.map(incident => (
            <Marker
              key={incident._id}
              position={{ 
                lat: incident.location.coordinates[1], 
                lng: incident.location.coordinates[0] 
              }}
              onClick={() => setSelected(incident)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ 
                lat: selected.location.coordinates[1], 
                lng: selected.location.coordinates[0] 
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h6>{selected.type}</h6>
                <p>{selected.description}</p>
                <small>
                  Reported {new Date(selected.createdAt).toLocaleString()}
                </small>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default TrafficMap;