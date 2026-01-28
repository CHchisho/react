import type {MediaItemWithOwner} from '../types/DBTypes';

type SingleViewProps = {
  item: MediaItemWithOwner | null;
  setSelectedItem: (item: MediaItemWithOwner | null) => void;
};

const SingleView = ({item, setSelectedItem}: SingleViewProps) => {
  if (!item) {
    return null;
  }

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <dialog open>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <h2>{item.title}</h2>
        <p className="owner">By: {item.username}</p>
        {item.description && <p>{item.description}</p>}
        <div style={{maxWidth: '100%', maxHeight: '60vh', overflow: 'auto'}}>
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
        <button onClick={handleClose}>Close</button>
      </div>
    </dialog>
  );
};

export default SingleView;
