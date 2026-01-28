import {useLocation, Link} from 'react-router';
import type {MediaItemWithOwner} from '../types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const item: MediaItemWithOwner = state?.item;

  if (!item) {
    return (
      <div className="single-view">
        <p>No media item selected</p>
        <Link to="/" className="link-button">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="single-view">
      <Link to="/" className="link-button" style={{marginBottom: '1rem', display: 'inline-block'}}>
        ← Back
      </Link>
      <h2>{item.title}</h2>
      <p className="owner">By: {item.username}</p>
      {item.description && <p className="description">{item.description}</p>}
      <div style={{marginTop: '1.5rem'}}>
        {item.media_type.startsWith('image/') ? (
          <img src={item.filename} alt={item.title} />
        ) : item.media_type.startsWith('video/') ? (
          <video src={item.filename} controls />
        ) : null}
      </div>
    </div>
  );
};

export default Single;
