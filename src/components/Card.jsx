export default function Card({
  title, imageUrl, rating, lang, year
}) {
  const cardContainerStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className="card">
      <div className="card-image" style={cardContainerStyle}></div>
      <div className="card-metadata-container">
        <h2 className="card-title">{title}</h2>
        <ul className="card-info-list">
          <li><strong>⭐{rating}</strong></li>
          <li>{lang}</li>
          <li>{year}</li>
        </ul>
      </div>
    </div>
  );
}