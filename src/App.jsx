import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';

function App() {
  // State to store the list of tours
  const [tours, setTours] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to handle error messages
  const [error, setError] = useState(false);
  // State to track the selected destination filter
  const [selectedDestination, setSelectedDestination] = useState('all');

  // Fetch tours data when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Fetch data from the API
        const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        // Update the tours state with the fetched data
        setTours(data);
        setLoading(false);
      } catch (err) {
        // Handle errors during the fetch process
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Handle changes in the selected destination filter
  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  // Remove a tour from the list by its ID
  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  // Refresh the tours list by re-fetching data
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

  // Filter tours based on the selected destination
  const filteredTours = selectedDestination === 'all' 
    ? tours 
    : tours.filter(tour => tour.name === selectedDestination);

  return (
    <div className="app">
      <h1>Tour Explorer</h1>
      {/* Destination selector component to filter tours */}
      <DestinationSelector 
        tours={tours} 
        onDestinationChange={handleDestinationChange} 
        selectedDestination={selectedDestination}
      />
      {loading ? (
        // Show loading message while data is being fetched
        <p>Loading tours...</p>
      ) : error ? (
        // Show error message if fetching data fails
        <div>
          <p>Error: {error}</p>
          <button onClick={refreshTours}>Try Again</button>
        </div>
      ) : tours.length === 0 ? (
        // Show message if no tours are left
        <div>
          <p>No tours left. Refresh to reload.</p>
          <button onClick={refreshTours}>Refresh</button>
        </div>
      ) : (
        // Display the gallery of tours
        <Gallery tours={filteredTours} onRemoveTour={removeTour} />
      )}
    </div>
  );
}

export default App;