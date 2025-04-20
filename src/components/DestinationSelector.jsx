function DestinationSelector({ tours, onDestinationChange, selectedDestination }) {
  // Create a list of unique destinations, including an 'all' option
  const uniqueDestinations = ['all', ...new Set(tours.map(tour => tour.name))];
  
  // Handle the change event when a new destination is selected
  const handleChange = (e) => {
    onDestinationChange(e.target.value); // Pass the selected value to the parent component
  };
  
  return (
    <div className="destination-selector">
    <label htmlFor="destination">Select Destination: </label>
    
    <select 
      id="destination" 
      value={selectedDestination} // Controlled component bound to selectedDestination
      onChange={handleChange} // Trigger handleChange on selection
    > 
      {/* Render each unique destination as an option */}
      {uniqueDestinations.map(destination => (
      <option key={destination} value={destination}>
        {destination === 'all' ? 'All Destinations' : destination} {/* Display 'All Destinations' for 'all' */}
      </option>
      ))}
    </select>
    </div>
  ); 
  }
  
  export default DestinationSelector;