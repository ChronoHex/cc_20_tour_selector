import React, { useState } from 'react';

// TourCard component displays information about a tour and allows toggling full info and removing the tour
function TourCard({ tour, onRemoveTour }) {
  // State to track whether full tour info is displayed or not
  const [showFullInfo, setShowFullInfo] = useState(false);
  
  // Function to toggle the display of full tour info
  const toggleInfo = () => {
    setShowFullInfo(!showFullInfo);
  };
  
  return (
    <div className="tour-card">
    <img src={tour.image} alt={tour.name} />
    
    <div className="tour-info">
      <h3>{tour.name}</h3>
      <p className="price">${tour.price}</p>
      <p>
      {showFullInfo ? tour.info : `${tour.info.substring(0, 200)}...`}
      <button onClick={toggleInfo} className="info-btn">
        {/* Button to toggle between showing full info or short description */}
        {showFullInfo ? 'Show Less' : 'Read More'}
      </button>
      </p>
      
      {/* Button to remove the tour from the list */}
      <button 
      className="not-interested-btn" 
      onClick={() => onRemoveTour(tour.id)}
      >
      Not Interested
      </button>
    </div>
    </div>
  );
  }
  
  export default TourCard;