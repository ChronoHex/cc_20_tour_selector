import TourCard from './TourCard';

function Gallery({ tours, onRemoveTour }) {
  return (
    <div className="gallery">
      {tours.map(tour => (
        <TourCard key={tour.id} tour={tour} onRemoveTour={onRemoveTour} />
      ))}
    </div>
  );
}

export default Gallery;