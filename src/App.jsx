import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('all');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const refreshTours = () => {
    setLoading(true);
    setError(null);
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTours();
  };

  const filteredTours = selectedDestination === 'all' 
    ? tours 
    : tours.filter(tour => tour.name === selectedDestination);

  return (
    <div className="app">
      <h1>Tour Explorer</h1>
      <DestinationSelector 
        tours={tours} 
        onDestinationChange={handleDestinationChange} 
        selectedDestination={selectedDestination}
      />
      {loading ? (
        <p>Loading tours...</p>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={refreshTours}>Try Again</button>
        </div>
      ) : tours.length === 0 ? (
        <div>
          <p>No tours left. Refresh to reload.</p>
          <button onClick={refreshTours}>Refresh</button>
        </div>
      ) : (
        <Gallery tours={filteredTours} onRemoveTour={removeTour} />
      )}
    </div>
  );
}

export default App;