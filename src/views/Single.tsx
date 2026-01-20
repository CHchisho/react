import {useLocation} from 'react-router';
import type {MediaItem} from '../types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const item: MediaItem = state?.item;

  if (!item) {
    return (
      <div>
        <p>No media item selected</p>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', maxWidth: '90vw', maxHeight: '90vh'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <h2>{item.title}</h2>
        {item.description && <p>{item.description}</p>}
        <div style={{maxWidth: '100%', maxHeight: '70vh', overflow: 'auto'}}>
          {item.media_type.startsWith('image/') ? (
            <img
              src={item.filename}
              alt={item.title}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : item.media_type.startsWith('video/') ? (
            <video
              src={item.filename}
              controls
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Single;
