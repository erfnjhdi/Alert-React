import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import Modal from './Modal';
import Sidebar from './Sidebar'; // Import the Sidebar component

const center = {
  lat: 45.5017,
  lng: -73.5673,
};

const MapComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [points, setPoints] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleReportClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchLatLng = async (location) => {
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(geocodingApiUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('Geocoding failed');
    }
  };

  const fetchIncidents = () => {
    fetch('http://localhost:5001/incidents')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched incidents:', data);
        const newPoints = data.map(incident => ({
          lat: incident.latitude,
          lng: incident.longitude,
          type: incident.type,
          location: incident.location,
          description: incident.description,
          severity: incident.severity,
        }));
        setPoints(newPoints);
      })
      .catch((error) => console.error('Error fetching incidents:', error));
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const location = event.target.location.value;
  
    try {
      const { lat, lng } = await fetchLatLng(location);
  
      const formData = {
        type: event.target.type.value,
        location: location,
        description: event.target.description.value,
        severity: event.target.severity.value,
        latitude: lat,
        longitude: lng,
      };
  
      fetch('http://localhost:5001/submit-incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setModalOpen(false);
          fetchIncidents();
  
          setShowConfirmation(true);
  
          setTimeout(() => {
            setShowConfirmation(false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error fetching lat/lng:', error);
      alert('Error fetching location coordinates. Please try again.');
    }
  };
  

  const handleMarkerClick = (incident) => {
    setSelectedIncident(incident);
  };

  return (
    <div className='main'>
      <Sidebar   
            incident={selectedIncident || { 
            type: 'Please select a marker to view information', 
            location: '', 
            description: '', 
            severity: '' 
          }}  
        /> {/* Pass the selected incident to Sidebar */}
      <div className="mapDiv">
        {showConfirmation && (
          <div className="confirmation-message">
            Report submitted successfully!
          </div>
        )}
        <div className='map'>
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={center}
              defaultZoom={14}
              mapId={'d6f53cad5bc681cd'}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <Markers points={points} onMarkerClick={handleMarkerClick} />
            </Map>
          </APIProvider>
        </div>
        <div className='report'>
          <button onClick={handleReportClick}>Report</button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form className='incident-form' onSubmit={handleSubmit}>
            <h3>Please describe the disturbance you witnessed</h3>
            <div className="form-group">
              <label htmlFor="type">Incident Type:</label>
              <select name='type' id='type'>
                <option>Theft</option>
                <option>Assault</option>
                <option>Shooting</option>
                <option>Protest</option>
                <option>Flooding</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="loc">Location:</label>
              <input type="text" id='loc' name='location' placeholder="Enter location" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea name='description' id='description' placeholder="Provide a short description" />
            </div>

            <div className="form-group">
              <p>Severity:</p>
              <label>
                <input type='radio' name='severity' value="Low" />
                Low (Minor disturbance)
              </label>
              <label>
                <input type='radio' name='severity' value="Medium" />
                Medium (Ongoing situation)
              </label>
              <label>
                <input type='radio' name='severity' value="High" />
                High (Immediate threat)
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const Markers = ({ points, onMarkerClick }) => {
  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker 
          key={index} 
          position={point} 
          onClick={() => onMarkerClick(point)} 
        />
      ))}
    </>
  );
};

export default MapComponent;
