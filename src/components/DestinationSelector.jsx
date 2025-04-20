function DestinationSelector({ tours, onDestinationChange, selectedDestination }) {
    const uniqueDestinations = ['all', ...new Set(tours.map(tour => tour.name))];
  
    const handleChange = (e) => {
      onDestinationChange(e.target.value);
    };
  
    return (
      <div className="destination-selector">
        <label htmlFor="destination">Select Destination: </label>
        <select 
          id="destination" 
          value={selectedDestination} 
          onChange={handleChange}
        >
          {uniqueDestinations.map(destination => (
            <option key={destination} value={destination}>
              {destination === 'all' ? 'All Destinations' : destination}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default DestinationSelector;