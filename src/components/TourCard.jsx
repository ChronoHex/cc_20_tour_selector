function TourCard({ tour, onRemoveTour }) {
    const [showFullInfo, setShowFullInfo] = useState(false);
  
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
              {showFullInfo ? 'Show Less' : 'Read More'}
            </button>
          </p>
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